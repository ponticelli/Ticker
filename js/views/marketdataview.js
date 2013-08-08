define([], function () {
   // Responsible for rendering the Market Data UI elements
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
      $container.html("Couldn't retrieve the data at this time...Please try again later.")
    }

    _this.preRender = function () {
      //show loading icon
    }

    _this.postRender = function () {
      //clear loading icon
    }
    
    initialize();
  }

  return MarketDataView;
});