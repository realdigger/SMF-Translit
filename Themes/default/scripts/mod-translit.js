/**
 * @package SMF Translit Mod
 * @file mod-translit.js
 * @author digger <digger@mysmf.ru> <http://mysmf.ru>
 * @copyright Copyright (c) 2012-2017, digger
 * @license The MIT License (MIT) https://opensource.org/licenses/MIT
 * @version 1.0
 */

var lat = ('/E_/e_/O_/o_Шh_Йo_Зh_Цh_Сh_Йe_Йu_Йa_Ыo_Ыu_Ыa_ШH_ЙO_ЗH_ЦH_СH_ЙE_ЙU_ЙA_ЫO_ЫU_ЫA_A_B_V_G_D_E_Z_I_J_K_L_M_N_O_P_R_S_T_U_F_X_C_ъ#_Y_ь\'_H_W_Q_шh_йo_зh_цh_сh_йe_йu_йa_ыo_ыa_a_b_v_g_d_e_z_i_j_k_l_m_n_o_p_r_s_t_u_f_x_c_#_y_\'_h_w_q_' + String.fromCharCode(220) + '_' + String.fromCharCode(214) + '_' + String.fromCharCode(196) + '_' + String.fromCharCode(252) + '_' + String.fromCharCode(246) + '_' + String.fromCharCode(228)).split('_');
var rus = ('E_e_O_o_Щ_Ё_Ж_Ч_Ш_Э_Ю_Я_Ё_Ю_Я_Щ_Ё_Ж_Ч_Ш_Э_Ю_Я_Ё_Ю_Я_А_Б_В_Г_Д_Е_З_И_Й_К_Л_М_Н_О_П_Р_С_Т_У_Ф_Х_Ц_Ъ_Ы_Ь_Х_Щ_Я_щ_ё_ж_ч_ш_э_ю_я_ё_я_а_б_в_г_д_е_з_и_й_к_л_м_н_о_п_р_с_т_у_ф_х_ц_ъ_ы_ь_х_щ_я_Ю_Ё_Э_ю_ё_э').split('_');
var rus2 = ('Щ_Ё_Ж_Ч_Ш_Э_Ю_Я_А_Б_В_Г_Д_Е_З_И_Й_К_Л_М_Н_О_П_Р_С_Т_У_Ф_Х_Ц_Ъ_Ы_Ь_щ_ё_ж_ч_ш_э_ю_я_а_б_в_г_д_е_з_и_й_к_л_м_н_о_п_р_с_т_у_ф_х_ц_ъ_ы_ь').split('_');
var lat2 = ('Shh_Jo_Zh_Ch_Sh_Je_Ju_Ja_A_B_V_G_D_E_Z_I_J_K_L_M_N_O_P_R_S_T_U_F_H_C_##_Y_\'\'_shh_jo_zh_ch_sh_je_ju_ja_a_b_v_g_d_e_z_i_j_k_l_m_n_o_p_r_s_t_u_f_h_c_#_y_\'').split('_');
var language = 1;
var prelanguage = 1;
var processhtmltags = 1;
var processbbcodetags = 1;
var maxtransliterationlength = 3;
var textareafontsize = 14; // warning: the value is also defined in the css-file !!!
var textreafontwidth = 7; // the width of the text is supposed to be 7 !!!
var bRichTextWasEnabled;

function setfoc() {
    window.document.postmodify.message.focus();
    return false;
}

function changelanguage() {
    if (!language) {
        setlat();
        if (oEditorHandle_message.bRichTextEnabled != true && bRichTextWasEnabled == true) oEditorHandle_message.toggleView();
        document.forms.postmodify.message.style.backgroundColor = '';
        document.getElementById('translit-off').style.backgroundColor = '';
        //document.getElementsByName('subject')[0].style.backgroundColor = '';
    }
    else {
        setrus();
        if (oEditorHandle_message.bRichTextEnabled == true) {
            bRichTextWasEnabled = true;
            oEditorHandle_message.toggleView();
        }
        document.forms.postmodify.message.style.backgroundColor = '#90ee90';
        document.getElementById('translit-on').style.backgroundColor = '#90ee90';
        //document.getElementsByName('subject')[0].style.backgroundColor = '#90ee90';
    }
    setfoc();
    return false;
}

function setrus() {
    language = 0;
    document.postmodify.tronoff.value = translit_lang_button_off;
    document.postmodify.trstatus.value = translit_lang_on;
    document.postmodify.trstatus.id = 'translit-on';
    setfoc();
    return false;
}

function setlat() {
    language = 1;
    document.postmodify.tronoff.value = translit_lang_button_on;
    document.postmodify.trstatus.value = translit_lang_off;
    document.postmodify.trstatus.id = 'translit-off';
    setfoc();
    return false;
}

function nofstrings(thetext, txtareawidthpix, symbolwidth) {
    var maxstrlengthallowed = Math.floor(txtareawidthpix / (symbolwidth + 1)) + 1;
    var tt, pp, ppp, tuntil, ii;
    var t2 = thetext.split("\n");
    var s = t2.length;
    for (ii = 0; ii < t2.length; ii++) {
        tt = t2[ii] + " ";
        pp = 0;
        tuntil = maxstrlengthallowed;
        while (tt.indexOf(" ", pp) != -1) {
            ppp = pp;
            pp = tt.indexOf(" ", pp) + 1;
            if (pp > tuntil && pp - ppp - 1) {
                tuntil = ppp + maxstrlengthallowed;
                if (pp < tuntil) {
                    pp = ppp;
                }
                s++;
            }
        }
    }
    return s;
}

function laststringlength(thetext) {
    var t = thetext.replace(/\n/g, " ");
    return thetext.replace(/\n/g, " ").length - thetext.replace(/\n/g, " ").lastIndexOf(" ") - 1;
}

function translate_letter(evnt) {
    var code = evnt.charCode ? evnt.charCode : void 0;
    if (!evnt.which) {
        return true;
    }
    var txt = String.fromCharCode(code);
    if (processhtmltags && (txt == '<')) {
        prelanguage = language;
        setlat();
    }
    if (processhtmltags && (txt == '>')) {
        if (prelanguage) setlat(); else setrus();
    }
    if (processbbcodetags && (txt == '[')) {
        prelanguage = language;
        setlat();
    }
    if (processbbcodetags && (txt == ']')) {
        if (prelanguage) setlat(); else setrus();
    }

    if (language) {
        return false;
    }

    if (code && code > 33 && (!(evnt.ctrlKey || evnt.altKey))) {
        if (evnt.preventDefault) {
            evnt.preventDefault();
        }
        txt = String.fromCharCode(code);
        tt = window.document.postmodify.message;
        var pretxt = tt.value.substring(0, tt.selectionStart);
        var result = "";
        var pXpix = tt.scrollTop;
        var pYpix = tt.scrollLeft;
        result = translatesymboltocyrillic(pretxt + txt); // to cyrillic
        var therest = tt.value.substr(tt.selectionEnd);
        tt.value = result + therest;
        tt.setSelectionRange(result.length, result.length);
        var vv = therest.search(/[\n\s]/);
        var r = laststringlength(result) * (textreafontwidth + 1) - pYpix - tt.clientWidth / 2;
        var dd = Math.abs(2 * r) < tt.clientWidth ? 0 : r - tt.clientWidth / 2 * (r > 0 ? 1 : -1);
        tt.scrollLeft = pYpix + dd + (dd == 0 ? 0 : (dd > 0) ? 2 : -textreafontwidth - 1);
        r = (nofstrings(result + (vv == -1 ? therest : therest.substring(0, vv)), tt.clientWidth, textreafontwidth) - 0.5) * (textareafontsize + 3) - pXpix - tt.clientHeight / 2;
        tt.scrollTop = pXpix + (Math.abs(2 * r) < (tt.clientHeight - textareafontsize - 3) ? 0 : r - (tt.clientHeight - textareafontsize - 3) / 2 * (r > 0 ? 1 : -1));
        setfoc();
    }
    return false;
}

function translatesymboltocyrillic(txt) {
    var pos = 0;
    for (var ii = 0; ii < lat.length; ii++) {
        pos = txt.length > lat[ii].length ? (txt.length - lat[ii].length) : 0;
        if (lat[ii] == txt.substr(pos, txt.length - pos)) {
            return txt.substr(0, txt.length - lat[ii].length) + rus[ii];
        }
    }
    return txt;
}

function translatesymboltolatin(symb) {
    for (var ii = 0; ii < rus2.length; ii++) {
        if (rus2[ii] == symb)
            return lat2[ii];
    }
    return symb;
}

function translateAlltoCyrillic() {
    var inloop = 1;
    var tt = window.document.postmodify.message;
    var p1 = tt.selectionStart;
    var p2 = tt.selectionEnd;
    var preval = "";
    var postval = "";
    var txtnew = "";

    if (p1 == p2) {
        txt = tt.value;
    }
    else {
        preval = tt.value.substring(0, p1);
        txt = tt.value.substring(p1, p2);
        postval = tt.value.substring(p2);
    }

    if ((!processhtmltags) && (!processbbcodetags)) {
        txtnew = translateStringtoCyrillic(txt);
    }
    else {
        var htt1, pbb1, t1, t2, txt1, txt2, tag_open, tag_close;
        var noinputtag = 0;
        if (processhtmltags) {
            tag_open = "<";
            tag_close = ">";
        }
        if (processbbcodetags) {
            tag_open = "[";
            tag_close = "]";
        }
        while (inloop) {
            if (processhtmltags && processbbcodetags) {
                htt1 = txt.indexOf("<");
                pbb1 = txt.indexOf("[");
                if (pbb1 == htt1) {
                    noinputtag = 1
                }
                if (pbb1 == -1) {
                    pbb1 = txt.length;
                }
                if (htt1 == -1) {
                    htt1 = txt.length;
                }
                if (htt1 < pbb1) {
                    t1 = htt1;
                    tag_close = ">";
                } else {
                    t1 = pbb1;
                    tag_close = "]";
                }
            }
            else {
                t1 = txt.indexOf(tag_open);
                if (t1 == -1) noinputtag = 1;
            }
            if (noinputtag) {
                inloop = 0;
                t1 = txt.length;
                t2 = txt.length;
            }
            else {
                txt2 = txt.substring(t1, txt.length);
                t2 = txt2.indexOf(tag_close);
                //if (t2==-1) {t2=txt.length; inloop=0;} else {t2=t2+t1+1};
                if (t2 == -1) {
                    t2 = t1 + 1
                } else {
                    t2 = t2 + t1 + 1
                }
                ;
            }
            txt1 = txt.substring(0, t1);
            txt2 = txt.substring(t1, t2);
            txt = txt.substring(t2, txt.length);
            txtnew = txtnew + translateStringtoCyrillic(txt1) + txt2;
        }
    }
    tt.value = preval + txtnew + postval;
    if (p1 != p2) {
        tt.setSelectionRange(p1 + txtnew.length, p1 + txtnew.length);
    }
    tt.focus();
    return false;
}

function translateStringtoCyrillic(thestringlat) {
    var symbbb, fromm, howmuch, thestringcyr = "";
    for (kk = 0; kk < thestringlat.length; kk++) {
        howmuch = thestringcyr.length > maxtransliterationlength ? maxtransliterationlength : thestringcyr.length;
        fromm = thestringcyr.length - howmuch;
        symbbb = thestringlat.substr(kk, 1);
        symbbb = translatesymboltocyrillic(thestringcyr.substr(fromm, howmuch) + symbbb);
        thestringcyr = thestringcyr.substr(0, fromm) + symbbb;
    }
    return thestringcyr;
}

function translateAlltoLatin() {
    tt = window.document.postmodify.message;
    p1 = tt.selectionStart;
    p2 = tt.selectionEnd;
    var preval = "";
    var postval = "";
    if (p1 == p2) {
        txt = tt.value;
    }
    else {
        preval = tt.value.substring(0, p1);
        txt = tt.value.substring(p1, p2);
        postval = tt.value.substring(p2);
    }
    txtnew = "";
    var symb = "";
    for (kk = 0; kk < txt.length; kk++) {
        symb = translatesymboltolatin(txt.substr(kk, 1));
        txtnew = txtnew.substr(0, txtnew.length) + symb;
    }
    tt.value = preval + txtnew + postval;
    if (p1 != p2) {
        tt.setSelectionRange(p1 + txtnew.length, p1 + txtnew.length);
    }
    tt.focus();
    return false;
}

function TranslitPanel() {
    return ('' +
    '<table class="windowbg3 translit-table" valign="middle" width="90%" border="0" cellpadding="2" cellspacing="1"><tbody><tr align="center"><td>a</td><td>b</td><td>v</td><td>g</td><td>d</td><td>e</td><td>jo,ö</td><td>zh</td><td>z</td><td>i</td><td>j</td><td>k</td><td>l</td><td>m</td><td>n</td><td>o</td><td>p</td><td>r</td><td>s</td><td>t</td><td>u</td><td>f</td><td>h,x</td><td>c</td><td>ch</td><td>sh</td><td>shh,w</td><td>#,##</td><td>y</td><td>\'</td><td>je,ä</td><td>ju,ü</td><td>ja</td><td><i>sx</i></td><td><i>j/o</i></td><td><i>j/e</i></td></tr>' +

    '<tr align="center"><td>а</td><td>б</td><td>в</td><td>г</td><td>д</td><td>е</td><td>ё</td><td>ж</td><td>з</td><td>и</td><td>й</td><td>к</td><td>л</td><td>м</td><td>н</td><td>о</td><td>п</td><td>р</td><td>с</td><td>т</td><td>у</td><td>ф</td><td>х</td><td>ц</td><td>ч</td><td>ш</td><td>щ</td><td>ъ</td><td>ы</td><td>ь</td><td>э</td><td>ю</td><td>я</td><td><i>сх</i></td><td><i>йо</i></td><td><i>йе</i></td></tr>' +
    '</tbody></table>' +
    '<p>' +
    translit_lang_auto + ': ' +
    '<input style="margin-right: 5px;" readonly="1" value="' + translit_lang_off + '" name="trstatus" class="input_text" size="4" id="translit-off" type="text">' +
    '<input style="margin-right: 5px;" onclick="changelanguage();" name="tronoff" class="button_submit" value="' + translit_lang_button_on + '" type="button">' +
    '</p><p>' +
    '<input style="margin-right: 5px;" onclick="translateAlltoCyrillic();" class="button_submit" value="' + translit_lang_button_cyr + '" title="' + translit_lang_button_cyr_desc + '" type="button">' +
    '<input style="margin-right: 5px;" onclick="translateAlltoLatin();" class="button_submit" value="' + translit_lang_button_lat + '" title="' + translit_lang_button_lat_desc + '" type="button">' +
    '</p>');
}

function showTranslitPanel() {

    // TODO: Transli topic name
    // TODO: Hotkey for language changing
    // TODO: Check for existing

    var findDiv = document.getElementById('message_resizer');
    if (findDiv == null)
        findDiv = document.forms.postmodify.message;

    parent = findDiv.parentNode;
    var panel = document.createElement('DIV');
    panel.innerHTML = TranslitPanel();

    if (typeof findDiv.nextSibling != 'undefined')
        parent.insertBefore(panel, findDiv.nextSibling);
    else
        parent.appendChild(panel);

    document.forms.postmodify.message.onkeypress = function (event) {
        translate_letter(event);
    }

    //document.getElementsByName('subject')[0].onkeypress = function (event) {
    //    translate_letter(event);
    //}


}