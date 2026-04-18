<?php
require __DIR__ . '/config.php';

$body = read_json_body();
$id = (int)($body['id'] ?? 0);
if ($id <= 0) {
    json_response(['success' => false, 'error' => 'Hianyzo id.'], 400);
}

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
        'UPDATE filmek SET cim = ?, rendezo = ?, ev = ?, mufaj = ?, ertekeles = ? WHERE id = ?'
    );
    $stmt->execute([$cim, $rendezo, $ev, $mufaj, $ertekeles, $id]);

    json_response([
        'success' => true,
        'data' => compact('id', 'cim', 'rendezo', 'ev', 'mufaj', 'ertekeles'),
        'rows' => $stmt->rowCount()
    ]);
} catch (PDOException $e) {
    json_response(['success' => false, 'error' => $e->getMessage()], 500);
}
