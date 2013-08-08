define([], function () {
  // Responsible for handling the Search UI elements/events
  var SearchView = function(container) {
    var _this = this,
        callbacks, $container, $input, $submit;

    _this.onSearchSubmit = function(cb) {
      callbacks.add(cb);
    }

    function initialize () {
      callbacks = $.Callbacks();

      $container = $(container);
      
      // attach the events for the text box
      $input = $(container).find("input.query");
      $input.bind("change", validateInput)
            .bind("keypress", function(e) {
                 var code = (e.keyCode ? e.keyCode : e.which);
                 if(code == 13) { //Enter keycode
                    triggerSearch.call();
                  }
              })
              .focus();
      
      // attach the events for the submit button
      $submit = $(container).find("button.submit");
      $submit.bind("click", triggerSearch);
             
    }

    // todo: add validations on input
    function validateInput () {

    }
    
    // fire the query change to the observers
    function triggerSearch () {
      var query = $input.val();
      if (query !== "") {
       callbacks.fire(query);
      } 
    }     

    initialize();
  }

  return SearchView;
});