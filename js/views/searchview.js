define([], function () {
  var SearchView = function(container) {
    var _this = this,
        callbacks, $container, $input, $submit;

    _this.onSearchSubmit = function(cb) {
      callbacks.add(cb);
    }

    function initialize () {
      callbacks = $.Callbacks();

      $container = $(container);
      
      $input = $(container).find("input.query");
      $input.bind("change", validateInput)
            .bind("keypress", function(e) {
                 var code = (e.keyCode ? e.keyCode : e.which);
                 if(code == 13) { //Enter keycode
                    triggerSearch.call();
                  }
              });
      
      $submit = $(container).find("button.submit");
      $submit.bind("click", triggerSearch);
             
    }

    // todo: add validations on input
    function validateInput () {

    }
    
    function triggerSearch () {
      callbacks.fire($input.val());
    }     

    initialize();
  }

  return SearchView;
});