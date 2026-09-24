<?php
/**
 * Обработчик формы заявки (страница /contacts).
 * Ожидает JSON: { name, contact, message, website }
 * "website" — honeypot-поле, невидимое человеку (заполняется только ботами).
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
$contact = pemo_clean((string) ($data['contact'] ?? ''), 200);
$message = pemo_clean((string) ($data['message'] ?? ''), 4000);

if ($name === '' || $contact === '') {
    pemo_json_response(422, ['ok' => false, 'error' => 'validation', 'message' => 'Укажите имя и контакт']);
}

$config = pemo_config();

$body = "Новая заявка с сайта PEMO Pumps\n\n"
    . "Имя: {$name}\n"
    . "Контакт: {$contact}\n"
    . "Задача:\n{$message}\n\n"
    . '---' . "\n"
    . 'IP: ' . pemo_client_ip() . "\n"
    . 'Дата: ' . date('d.m.Y H:i:s');

$replyTo = filter_var($contact, FILTER_VALIDATE_EMAIL) ? $contact : '';

$sent = pemo_send_mail($config['subject_lead'], $body, $replyTo);

if ($config['log_to_csv']) {
    pemo_append_csv(__DIR__ . '/storage/leads.csv', [
        'date' => date('Y-m-d H:i:s'),
        'name' => $name,
        'contact' => $contact,
        'message' => $message,
        'ip' => pemo_client_ip(),
        'mail_sent' => $sent ? 'yes' : 'no',
    ]);
}

pemo_json_response(200, ['ok' => true]);
