<?php
/**
 * Translit integration hooks and asset loading.
 * @package SMF Translit Mod
 * @copyright Copyright (c) 2012-2021, digger
 * @link https://github.com/realdigger/SMF-Translit
 * @license The MIT License (MIT) https://opensource.org/licenses/MIT
 * @version 1.0.4
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
                    var translit_lang_auto = ' . JavaScriptEscape($txt['translit_auto']) . ';
                    var translit_lang_on = ' . JavaScriptEscape($txt['translit_on']) . ';
                    var translit_lang_off = ' . JavaScriptEscape($txt['translit_off']) . ';
                    var translit_lang_button_on = ' . JavaScriptEscape($txt['translit_button_on']) . ';
                    var translit_lang_button_off = ' . JavaScriptEscape($txt['translit_button_off']) . ';
                    var translit_lang_button_cyr = ' . JavaScriptEscape($txt['translit_button_cyr']) . ';
                    var translit_lang_button_cyr_desc = ' . JavaScriptEscape($txt['translit_button_cyr_desc']) . ';
                    var translit_lang_button_lat = ' . JavaScriptEscape($txt['translit_button_lat']) . ';
                    var translit_lang_button_lat_desc = ' . JavaScriptEscape($txt['translit_button_lat_desc']) . ';
                // ]]></script>
                <script type="text/javascript" src="' . $settings['default_theme_url'] . '/scripts/mod-translit.js?v=1.0.4"></script>
				<script type="text/javascript">SMFTranslit.showPanel();</script>';

}
