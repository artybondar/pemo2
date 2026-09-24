<?php
/**
 * Обработчик формы отзыва (страница /reviews).
 * Ожидает JSON: { name, company, text, website }
 * Отзывы на сайте не публикуются автоматически (нет модерации/БД) —
 * письмо приходит администратору, который вручную добавляет отзыв
 * в src/data/content.ts после проверки.
 */

declare(strict_types=1);

require __DIR__ . '/lib/helpers.php';

pemo_handle_cors();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    pemo_json_response(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

if (!pemo_check_rate_limit()) {
    pemo_json_response(429, ['ok' => false, 'error' => 'rate_limited']);
}

$data = pemo_read_json_body();

if (!empty($data['website'])) {
    pemo_json_response(200, ['ok' => true]);
}

$name = pemo_clean((string) ($data['name'] ?? ''), 200);
$company = pemo_clean((string) ($data['company'] ?? ''), 200);
$text = pemo_clean((string) ($data['text'] ?? ''), 4000);

if ($name === '' || $text === '') {
    pemo_json_response(422, ['ok' => false, 'error' => 'validation', 'message' => 'Укажите имя и текст отзыва']);
}

$config = pemo_config();

$body = "Новый отзыв на сайте PEMO Pumps\n\n"
    . "Имя: {$name}\n"
    . 'Предприятие: ' . ($company !== '' ? $company : '—') . "\n\n"
    . "Текст отзыва:\n{$text}\n\n"
    . '---' . "\n"
    . 'IP: ' . pemo_client_ip() . "\n"
    . 'Дата: ' . date('d.m.Y H:i:s')
    . "\n\nЧтобы опубликовать отзыв на сайте, добавьте его в src/data/content.ts (testimonials).";

$sent = pemo_send_mail($config['subject_review'], $body);

if ($config['log_to_csv']) {
    pemo_append_csv(__DIR__ . '/storage/reviews.csv', [
        'date' => date('Y-m-d H:i:s'),
        'name' => $name,
        'company' => $company,
        'text' => $text,
        'ip' => pemo_client_ip(),
        'mail_sent' => $sent ? 'yes' : 'no',
    ]);
}

pemo_json_response(200, ['ok' => true]);
