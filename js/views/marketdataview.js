define([], function () {
  var MarketDataView = function(container) {
    var _this = this,
        $template, $container;

    function initialize () {
      $container = $(container);
      $template = $("#market_data_template");
    }

    //poorman's template engine
    _this.renderData = function(marketData) {
      var templateWithData = $template.html()
                            .replace(/{{(.*)}}/g, function(match, property) 
                            {
                              return marketData.get(property) || "";
                            });
      $container.html(templateWithData);                     
    }

    _this.showError = function() {
      //show error
    }

    _this.preRender = function () {

    }

    _this.postRender = function () {

    }    

    // todo: add validations on input
    function validateInput () {

    }
    
    function triggerSearch () {
      callbacks.fire($input.val());
    }     

    initialize();
  }

  return MarketDataView;
});