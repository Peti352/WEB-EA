<?php
require __DIR__ . '/config.php';

$body = read_json_body();
$cim       = trim((string)($body['cim']       ?? ''));
$rendezo   = trim((string)($body['rendezo']   ?? ''));
$ev        = (int)  ($body['ev']        ?? 0);
$mufaj     = trim((string)($body['mufaj']     ?? ''));
$ertekeles = (float)($body['ertekeles'] ?? 0);

if ($cim === '' || $rendezo === '' || $mufaj === '' || $ev <= 0) {
    json_response(['success' => false, 'error' => 'Hianyzo kotelezo mezo.'], 400);
}

try {
    $stmt = db()->prepare(
        'INSERT INTO filmek (cim, rendezo, ev, mufaj, ertekeles) VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([$cim, $rendezo, $ev, $mufaj, $ertekeles]);
    $id = (int) db()->lastInsertId();

    json_response([
        'success' => true,
        'data' => compact('id', 'cim', 'rendezo', 'ev', 'mufaj', 'ertekeles')
    ], 201);
} catch (PDOException $e) {
    json_response(['success' => false, 'error' => $e->getMessage()], 500);
}
