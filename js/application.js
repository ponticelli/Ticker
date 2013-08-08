requirejs.config({
    "baseUrl": "js",
    "WaitForSeconds": 15
});

requirejs([$('body').attr('data-pagejs')], function(PageJS) {
	PageJS.init();
});