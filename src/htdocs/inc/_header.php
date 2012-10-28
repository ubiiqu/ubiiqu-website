<?php // require 'countrycheck.php'; ?>
<?php header("Content-Type: text/html; charset=utf-8"); ?>
<?php $url = $_SERVER['REQUEST_URI']; ?>
<!DOCTYPE html>
<html>
<head>

	<title>ubiiqu</title>
	<meta name="author" content="ubiiqu GmbH">
	<meta name="copyright" content="ubiiqu GmbH">
	<meta name="description" content="The information age is the age of ubiquity, and we seek to maximize the digital scope of our clients in the most dynamic ways possible.">
	<meta name="keywords" content="ubiiqu, online, internet, webdesign, usability, mobile, tablet, smartTV">
	<meta name="robots" content="index, follow">

	<meta charset="utf-8">
	<meta http-equiv="content-language" content="en">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-title" content="ubiiqu" />
	<meta name="apple-mobile-web-app-capable" content="yes" />

	<link rel="shortcut icon" href="assets/images/favicon.ico">
	<link rel="apple-touch-icon" href="assets/images/bookmark.png" />
	<link rel="apple-touch-startup-image" href="assets/images/splashscreen_320x460.png" />
	<link rel="apple-touch-startup-image" sizes="640x960" href="assets/images/splashscreen_640x960.png" />
	<link rel="apple-touch-startup-image" sizes="768x1004" href="assets/images/splashscreen_768x1004.png" />
	<link rel="apple-touch-startup-image" sizes="1024x748" href="assets/images/splashscreen_1024x748.png" />

	<!-- css -->
	<link href="assets/css/layout.min.css" rel="stylesheet" type="text/css">

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js" type="text/javascript"></script>
	<script>window.jQuery || document.write('<script src="assets/js/jquery-1.8.2.min.js"><\/script>')</script>

	<script src="assets/js/main.min.js?v=<?= (int) filemtime(dirname(__FILE__) . '/../assets/js/main.min.js'); ?>"></script>
	<script src="assets/js/libs.min.js?v=<?= (int) filemtime(dirname(__FILE__) . '/../assets/js/libs.min.js'); ?>"></script>

</head>
<body>

	<header>
		<div class="inner">
			<a href="index.html"><img src="assets/images/logo_white.png" /></a>
			<ul>
				<li<?php echo (strpos($url, 'services.html')) ? ' class="active" ' : ''; ?>><a href="services.html">services</a></li>
				<li<?php echo (strpos($url, 'technologies.html')) ? ' class="active" ' : ''; ?>><a href="technologies.html">technologies</a></li>
				<!--<li><a href="#showtime">showtime</a></li>-->
				<li<?php echo (strpos($url, 'about.html')) ? ' class="active" ' : ''; ?>><a href="about.html">about us</a></li>
				<li<?php echo (strpos($url, 'team.html')) ? ' class="active" ' : ''; ?>><a href="team.html">meet 'n greet</a></li>
				<li<?php echo (strpos($url, 'contact.html')) ? ' class="active" ' : ''; ?>><a href="contact.html">get in touch</a></li>
				<li<?php echo (strpos($url, 'career.html')) ? ' class="active" ' : ''; ?>><a href="career.html">join us</a></li>
			</ul>
			<button>&#160;</button>
		</div>
	</header>

	<div id="contents" class="original">