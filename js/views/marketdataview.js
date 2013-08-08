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
                            .replace(/{{([a-z0-9A-Z_\-]*)}}/g, function(match, property) 
                            {
                              return marketData.get(property) || "";
                            });
      $container.html(templateWithData);                     
    }

    _this.showError = function() {
      //show error
    }

    _this.preRender = function () {
      //show loading
    }

    _this.postRender = function () {
      //clear loading
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