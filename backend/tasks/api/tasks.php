<?php
header('Content-Type: application/json');
$db = new SQLite3(__DIR__ . '/../tasks.db');

// CORS対応
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// ルーティング
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // 一覧取得
    $result = $db->query('SELECT id, text, completed, created_at FROM tasks ORDER BY created_at DESC');
    $tasks = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $tasks[] = $row;
    }
    echo json_encode($tasks);
    exit;
}

if ($method === 'POST') {
    // 追加
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['text']) || trim($input['text']) === '') {
        http_response_code(400);
        echo json_encode(['error' => 'text is required']);
        exit;
    }
    $stmt = $db->prepare('INSERT INTO tasks (text) VALUES (:text)');
    $stmt->bindValue(':text', $input['text'], SQLITE3_TEXT);
    $stmt->execute();
    echo json_encode(['success' => true]);
    exit;
}

if ($method === 'PUT') {
    // 完了・編集
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'id is required']);
        exit;
    }
    $fields = [];
    if (isset($input['text'])) {
        $fields[] = 'text = :text';
    }
    if (isset($input['completed'])) {
        $fields[] = 'completed = :completed';
    }
    if (empty($fields)) {
        http_response_code(400);
        echo json_encode(['error' => 'no fields to update']);
        exit;
    }
    $sql = 'UPDATE tasks SET ' . implode(', ', $fields) . ' WHERE id = :id';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':id', $input['id'], SQLITE3_INTEGER);
    if (isset($input['text'])) {
        $stmt->bindValue(':text', $input['text'], SQLITE3_TEXT);
    }
    if (isset($input['completed'])) {
        $stmt->bindValue(':completed', $input['completed'], SQLITE3_INTEGER);
    }
    $stmt->execute();
    echo json_encode(['success' => true]);
    exit;
}

if ($method === 'DELETE') {
    // 削除
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'id is required']);
        exit;
    }
    $stmt = $db->prepare('DELETE FROM tasks WHERE id = :id');
    $stmt->bindValue(':id', $input['id'], SQLITE3_INTEGER);
    $stmt->execute();
    echo json_encode(['success' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method Not Allowed']);
