<?php
require __DIR__ . '/config.php';

try {
    $stmt = db()->query('SELECT id, cim, rendezo, ev, mufaj, ertekeles FROM filmek ORDER BY id');
    json_response(['success' => true, 'data' => $stmt->fetchAll()]);
} catch (PDOException $e) {
    json_response(['success' => false, 'error' => $e->getMessage()], 500);
}
