<?php if (is_file("app/inc/meta.php")) include("app/inc/meta.php"); ?>
<!DOCTYPE html>
<html lang="en">

<head>
<title><?php echo $app_name . " - " . $metaTitle; ?></title>
<meta name="description" content="<?php echo $metaDescription; ?>">
<?php include("app/layout/overall_top.php"); ?>

</head>

<body>

<?php include("app/layout/overall_header.php"); ?>
<?php include("app/views/" . $section . ".php"); ?>
<?php include("app/layout/overall_footer.php"); ?>

<?php include("app/layout/overall_bottom.php"); ?>

</body>