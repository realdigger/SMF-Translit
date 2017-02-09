<?php
/**
 * @package SMF Translit Mod
 * @file Mod-Translit.php
 * @author digger <digger@mysmf.ru> <http://mysmf.ru>
 * @copyright Copyright (c) 2012-2017, digger
 * @license The MIT License (MIT) https://opensource.org/licenses/MIT
 * @version 1.0
 */

if (!defined('SMF')) {
    die('Hacking attempt...');
}


/**
 * Load all needed hooks
 */
function loadTranslitHooks()
{
    add_integration_function('integrate_load_theme', 'loadTranslitJS', false);
}

/**
 * Load mod assets
 */
function loadTranslitJS()
{
    global $settings, $context;


    $context['insert_after_template'] .= '
                <script type="text/javascript" src="' . $settings['default_theme_url'] . '/scripts/mod-translit.js"></script>
				<script language="JavaScript" type="text/javascript">showTranslitPanel();</script>';

}
