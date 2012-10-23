<?php
@include_once "Net/GeoIP.php";

if(class_exists('Net_GeoIP') && file_exists(dirname(__FILE__) . '/GeoIP.dat')) {

	$geoip = Net_GeoIP::getInstance(dirname(__FILE__) . '/GeoIP.dat');
	$country = $geoip->lookupCountryCode($_SERVER['REMOTE_ADDR']);

	$us = array('US', 'CA', 'MX');
	if(in_array($country, $us)) {
		// Access from US/CA/MX
		if(
			$_SERVER['SERVER_NAME'] != 'ubiiqu.us' &&
			$_SERVER['SERVER_NAME'] != 'us.ubiiqu.com' &&
			$_SERVER['SERVER_NAME'] != 'www.ubiiqu.us'
		) {
			header("Location: http://us.ubiiqu.com");
		}

	} else {

		// Access from outside US/CA/MX
		if(
			$_SERVER['SERVER_NAME'] != 'ubiiqu.com' &&
			$_SERVER['SERVER_NAME'] != 'www.ubiiqu.com'
		) {
			header("Location: http://ubiiqu.com");
		}

	}

}