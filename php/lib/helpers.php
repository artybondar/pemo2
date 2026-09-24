<?php
/**
 * Общие функции для обработчиков форм. Подключается из send-lead.php
 * и send-review.php — логика не дублируется между файлами.
 */

declare(strict_types=1);

function pemo_config(): array
{
    static $config = null;
    if ($config === null) {
        $config = require __DIR__ . '/../config.php';
    }
    return $config;
}

/**
 * Настраивает CORS-заголовки и завершает preflight OPTIONS-запрос.
 * Если запрос идёт с того же домена (продакшн), Origin может отсутствовать —
 * это нормально, браузер просто не шлёт заголовок для same-origin запросов.
 */
function pemo_handle_cors(): void
{
    $config = pemo_config();
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($origin !== '' && in_array($origin, $config['allowed_origins'], true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

/** Отдаёт JSON-ответ и завершает выполнение. */
function pemo_json_response(int $status, array $payload): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Читает JSON-тело запроса (наш фронтенд отправляет именно JSON). */
function pemo_read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

/** Убирает переводы строк и обрезает пробелы — защита от header injection в письмах. */
function pemo_clean(string $value, int $maxLength = 2000): string
{
    $value = str_replace(["\r", "\n"], ' ', $value);
    $value = trim($value);
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength);
    }
    return substr($value, 0, $maxLength);
}

function pemo_client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

/**
 * Простой rate-limit на файлах: не более max_requests с одного IP
 * за window_seconds. Без БД, без cron — самоочищается по mtime.
 */
function pemo_check_rate_limit(): bool
{
    $config = pemo_config();
    $dir = __DIR__ . '/../storage/ratelimit';
    if (!is_dir($dir)) {
        @mkdir($dir, 0775, true);
    }

    $ip = pemo_client_ip();
    $file = $dir . '/' . md5($ip) . '.json';
    $now = time();
    $window = $config['rate_limit']['window_seconds'];
    $max = $config['rate_limit']['max_requests'];

    $timestamps = [];
    if (is_file($file)) {
        $content = json_decode((string) file_get_contents($file), true);
        if (is_array($content)) {
            $timestamps = $content;
        }
    }

    $timestamps = array_values(array_filter(
        $timestamps,
        static fn ($t) => is_int($t) && $t > $now - $window,
    ));

    if (count($timestamps) >= $max) {
        return false;
    }

    $timestamps[] = $now;
    @file_put_contents($file, json_encode($timestamps));
    return true;
}

/**
 * Отправляет письмо через встроенный mail(). Для чувствительной к спаму
 * доставке на Gmail рекомендуется заменить на SMTP (см. README.md в /php) —
 * mail() иногда попадает в спам с shared-хостинга.
 */
function pemo_send_mail(string $subject, string $bodyText, string $replyTo = ''): bool
{
    $config = pemo_config();

    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $headers[] = sprintf('From: %s <%s>', pemo_encode_header($config['mail_from_name']), $config['mail_from']);
    if ($replyTo !== '') {
        $headers[] = 'Reply-To: ' . $replyTo;
    }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    return mail(
        $config['mail_to'],
        $encodedSubject,
        $bodyText,
        implode("\r\n", $headers),
    );
}

function pemo_encode_header(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

/** Дописывает строку в CSV-файл (создаёт файл и шапку при первом обращении). */
function pemo_append_csv(string $path, array $row): void
{
    $isNew = !is_file($path);
    $fh = @fopen($path, 'a');
    if ($fh === false) {
        return;
    }
    if ($isNew) {
        fputcsv($fh, array_keys($row));
    }
    fputcsv($fh, array_values($row));
    fclose($fh);
}
