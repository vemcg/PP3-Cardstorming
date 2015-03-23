//alert ("got to application.js");
//debugger;

/*require({
    baseUrl: '.', // 'javascripts',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'jquery'
    }
});
*/
//debugger;

require.config({
    paths: {
        // "jQuery": "../libs/jQuery/jquery-1.9.1",
        // "jQueryUI": "../libs/jQueryUI/jquery-ui-1.10.3.custom"
        jquery: '../libraries/jquery',
        jqueryUI: '../libraries/jquery-ui',
        'text': '../libraries/text',
        'pages': '../../pages',
        'templates': '../../pages/templates'
    },
    shim: {
        jqueryUI: {
            export: '$',
            deps: ['jquery']
        }
    }
});


require (["jquery"],
    function () { "use strict"
        require (["jqueryUI"],
            function () { "use strict"
                require (["app"],
                    function (app) { "use strict"
                        $(document).ready(function () {
                            app.init();

                        });
                    }
                );
            }
        );

    }
);
