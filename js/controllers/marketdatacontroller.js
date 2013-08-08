define(['views/marketdataview', 'shared/marketdataretriever'], function (MarketDataView, MarketDataRetriever) {
  var MarketDataController = function(container) {
    var _this = this,
        container = container,
        view;

    _this.init = function () {
        view = new MarketDataView(container);        
    }

    _this.fetchDataAndRefresh = function(ticker) {
      view.preRender();      
     
      MarketDataRetriever.getData(ticker).then(function(marketData) {        
        view.renderData(marketData);
      }).fail(function() {
        view.showError();
      }).done(function() {
        view.postRender();
      })
    }
  }

  return MarketDataController;
});