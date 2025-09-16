<?php
// vite.php
function vite($entry) {
    $manifestPath = __DIR__ . '/dist/.vite/manifest.json';
    
    if (!file_exists($manifestPath)) {
        throw new Exception("Vite manifest not found. Run `pnpm build` first.");
    }

    $manifest = json_decode(file_get_contents($manifestPath), true);
    if (!isset($manifest[$entry])) {
        throw new Exception("Entry '$entry' not found in manifest.");
    }

    $entryData = $manifest[$entry];

    // CSS
    if (isset($entryData['css'])) {
        foreach ($entryData['css'] as $css) {
            echo '<link rel="stylesheet" href="/dist/' . $css . '">' . PHP_EOL;
        }
    }

    // JS
    echo '<script type="module" src="/dist/' . $entryData['file'] . '"></script>' . PHP_EOL;
}
