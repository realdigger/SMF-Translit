<?php
/**
 * @package SMF Translit Mod
 * @file hooks.php
 * @author digger <digger@mysmf.net> <https://mysmf.net>
 * @copyright Copyright (c) 2012-2021, digger
 * @license The MIT License (MIT) https://opensource.org/licenses/MIT
 * @version 1.0
 *
 * To run this install manually please make sure you place this
 * in the same place and SSI.php and index.php
 */

global $context, $user_info;

if (file_exists(dirname(__FILE__) . '/SSI.php') && !defined('SMF')) {
    require_once(dirname(__FILE__) . '/SSI.php');
} elseif (!defined('SMF')) {
    die('<b>Error:</b> Cannot install - please verify that you put this file in the same place as SMF\'s index.php and SSI.php files.');
}

if ((SMF == 'SSI') && !$user_info['is_admin']) {
    die('Admin privileges required.');
}

if (!empty($context['uninstalling'])) {
    $call = 'remove_integration_function';
} else {
    $call = 'add_integration_function';
}

$hooks = array(
    'integrate_pre_include' => '$sourcedir/Mod-Translit.php',
    'integrate_pre_load' => 'loadTranslitHooks'
);

foreach ($hooks as $hook => $function) {
    $call($hook, $function);
}

if (SMF == 'SSI') {
    echo 'Database changes are complete! <a href="/">Return to the main page</a>.';
}
