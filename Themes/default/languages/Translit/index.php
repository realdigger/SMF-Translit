<?php
/**
 * Protect the Translit language directory from direct browsing.
 * @package SMF Translit Mod
 * @version 1.0.4
 * @copyright Copyright (c) 2012-2021, digger
 * @link https://github.com/realdigger/SMF-Translit
 * @license The MIT License (MIT) https://opensource.org/licenses/MIT
 */

// Try to handle it with the upper level index.php. (it should know what to do.)
if (file_exists(dirname(dirname(__FILE__)) . '/index.php'))
	include (dirname(dirname(__FILE__)) . '/index.php');
else
	exit;

?>
