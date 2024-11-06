<?php
header('Content-Type: text/html; charset=utf-8');

// development
ini_set("log_errors", 1);
ini_set("error_log", "error.log");

// production
ini_set('display_errors', 'off');
ini_set("display_errors", 0);


include_once("app/php/mainvars.php");
$base_href = $global_root;


$section = $_GET['section'] ?? 'homepage';
if (!empty($section) && !is_file("app/pages/{$section}.php")) {
    $section = 'homepage';
}

include("app/layout/overall_wrapper.php");
?>