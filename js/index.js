define(function (require) {    
  var SearchController = require('controllers/searchcontroller'),
      MarketDataController = require('controllers/marketdatacontroller');

  //singleton (Page level script - initialize and hookup the handlers for all necessary controllers)
  var index = new function () {
    var _this = this;

    _this.init = function () {
      
      // initialize market data controller
      var marketDatacontroller = new MarketDataController("#marketData");
      marketDatacontroller.init();

      // initialize search controller and listen for the search input change
      var searchController = new SearchController("#search");
      searchController.init();
      searchController.onInputChange(function(newTicker) {
          marketDatacontroller.fetchDataAndRefresh(newTicker);
      });
    }
  }

  return index;  
});