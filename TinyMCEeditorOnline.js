jQuery(document).ready(function () {
    var h = window.innerHeight - 180;
    var resizeHeight = h + "px";
    var w = window.innerWidth - 80;
    var resizeWidth = w + "px";
    tinymce.init({
        mode : "textareas",
        height : 780,
        code_dialog_width : w,
        code_dialog_height : h,
        entity_encoding : "raw",
        paste_auto_cleanup_on_paste : true,
        force_p_newlines : true,
        forced_root_block : false,
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor"
        ],
        toolbar: "insertfile undo redo | styleselect template | formath1 formath2 formath3 formathP | bold italic underline strikethrough superscript subscript | forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | emoticons link image code",
    image_advtab: true,
    templates: [
        {title: 'Paragrafo titolato', description: 'Paragrafo con titolo iniziale', content: '<h3>TITOLO</h3><p>paragrafo</p>'},
        {title: 'Elenco puntato con titolo', description: 'Elenco puntato con titolo iniziale', content: '<h3>ELENCO PUNTATO</h3><ul><li>uno</li><li>due</li><li>tre</li></ul>'},
        {title: 'Elenco numerato con titolo', description: 'Elenco numerato con titolo iniziale', content: '<h3>ELENCO NUMERATO</h3><ol><li>uno</li><li>due</li><li>tre</li></ol>'}
    ],
        oninit: function () { 
            tinymce.get('textarea').execCommand('mceFullScreen');
        },
        setup : function(ed) {
            ed.on('PostProcess', function(ed) {                
                //alert(ed.content);
                // we are cleaning empty paragraphes
                ed.content = ed.content.replace(/<[^\/>][^>]*>\s<\/[^>]+>/gmi,'<br />').replace(/<br \/>\s/g,'<br />\r');
            });
            ed.addButton('formath1', // name to add to toolbar button list
            {
                title : 'Make h1', // tooltip text seen on mouseover
                image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAS1BMVEX///8zMzOZmZnk5OQ4ODidnZ3a2tqGhobV1dXExMQ8PDyOjo7R0dFCQkJVVVWRkZHy8vLq6urf399vb29fX1/09PRNTU2pqam8vLz1f6JRAAAAb0lEQVQokb3RXQ+AEBiG4ZeofBRK8f9/ab1m1oZ10roPPOY6BNDNTpioYSAY/QW2KFwDdo+nqiFHeyCPDhBRwSnTBHwKxhTwENPy+0UQwgooGDMMij2BFlhw2rC2wei5DQDfg6WYBpcX8Mbr73ntAlheBACPeY1sAAAAAElFTkSuQmCC',
                onclick : function() {ed.execCommand('FormatBlock', false, 'h1');}
            });
            ed.addButton('formath2', // name to add to toolbar button list
            {
                title : 'Make h2', // tooltip text seen on mouseover
                image : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQyvRI4l5nyC4qaNeheu_eo2YJl2ZwIjbGEgf-T1RpeUHQuWNrc',
                onclick : function() {ed.execCommand('FormatBlock', false, 'h2');}
            });
            ed.addButton('formath3', // name to add to toolbar button list
            {
                title : 'Make h3', // tooltip text seen on mouseover
                image : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRrjlbUeW6_Znv3hKnoS_PoEAwkhgkwEttUlC-hrEHWWAjS4bXD1g',
                onclick : function() {ed.execCommand('FormatBlock', false, 'h3');}
            });
            ed.addButton('formathP', // name to add to toolbar button list
            {
                title : 'Make paragraph', // tooltip text seen on mouseover
                image : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT_g2hnxqSP8_htb64NyrAk1NbOMlpYzSG1zrn2pdStJViWigow',
                onclick : function() {ed.execCommand('FormatBlock', false, 'p');}
            });             
        },        
        paste_preprocess : function(pl, o) {
            // Content string containing the HTML from the clipboard
            var str = o.content;
            //alert(str);
            var ta = document.createElement("textarea");
            ta.innerHTML = str.replace(/<[^\/>][^>]*>\s<\/[^>]+>/gmi,'<br />');
            o.content = ta.value;
            //alert(o.content);
        }
    });
});
