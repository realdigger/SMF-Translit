<?php
/**
 * @package SMF Translit Mod
 * @file Mod-Translit.php
 * @author digger <digger@mysmf.net> <http://mysmf.net>
 * @copyright Copyright (c) 2012-2021, digger
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
    global $settings, $context, $txt;
    loadLanguage('Translit/Translit');

    // TODO: Load only when needed
    $context['insert_after_template'] .= '
                <script type="text/javascript"><!-- // --><![CDATA[
                    var translit_lang_auto = "' . $txt['translit_auto'] . '";
                    var translit_lang_on = "' . $txt['translit_on'] . '";
                    var translit_lang_off = "' . $txt['translit_off'] . '";
                    var translit_lang_button_on = "' . $txt['translit_button_on'] . '";
                    var translit_lang_button_off = "' . $txt['translit_button_off'] . '";                    
                    var translit_lang_button_cyr = "' . $txt['translit_button_cyr'] . '";
                    var translit_lang_button_cyr_desc = "' . $txt['translit_button_cyr_desc'] . '";
                    var translit_lang_button_lat = "' . $txt['translit_button_lat'] . '";
                    var translit_lang_button_lat_desc = "' . $txt['translit_button_lat_desc'] . '";
                // ]]></script>
                <script type="text/javascript" src="' . $settings['default_theme_url'] . '/scripts/mod-translit.js"></script>
				<script language="JavaScript" type="text/javascript">showTranslitPanel();</script>';

}
