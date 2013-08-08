requirejs.config({
    "baseUrl": "js",
    "WaitForSeconds": 15
});

//hack to get getJSON call to succeed in IE9
$.support.cors = true;

// Each page emits an attribute indicating the script which bootstraps the controls on that page
// Load the page level script and initialize it
requirejs([$('body').attr('data-pagejs')], function(PageJS) {
	PageJS.init();
});