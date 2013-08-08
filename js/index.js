define(function (require) {    
  var SearchController = require('controllers/searchcontroller'),
      MarketDataController = require('controllers/marketdatacontroller');

  //singleton (since this script is tied to page level logic and isn't reusable in other pages)
  var index = new function () {
    var _this = this;

    _this.init = function () {
      var marketDatacontroller = new MarketDataController("#marketData");
      marketDatacontroller.init();

      var searchController = new SearchController("#search");
      searchController.init();
      searchController.onInputChange(function(newTicker) {
          marketDatacontroller.fetchDataAndRefresh(newTicker);
      });
    }
  }

  return index;  
});