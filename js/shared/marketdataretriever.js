define(['models/marketdata'], function (MarketData) {
  // Fetch the market data from service calls (singleton)
  var MarketDataRetriever = new function() {
    var _this = this;
        rawUrl_endPoint1 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22{{ticker}}%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&stamp={{timestamp}}",
        rawUrl_endPoint2 = "http://ec2-54-224-143-194.compute-1.amazonaws.com/{{ticker}}?stamp={{timestamp}}";

    _this.getData = function(ticker) {
      // intentionally using replace knowing that it will replace only first instance
      // don't want to use global regex since it isn't needed here
      var url1 = rawUrl_endPoint1.replace("{{ticker}}", ticker).replace("{{timestamp}}", new Date().getTime());
      var url2 = rawUrl_endPoint2.replace("{{ticker}}", ticker).replace("{{timestamp}}", new Date().getTime());
      var deferred = $.Deferred();
      $.getJSON(url1).then(function(data) {
          if (data.results) {
            deferred.resolve(new MarketData(data));
          } else {
            getDataFromFallbackService(url2, deferred);  
          }
      }).fail(function(err) {
          getDataFromFallbackService(url2, deferred);
      });
      return deferred.promise();
    }

    function getDataFromFallbackService(url, deferred) {
      $.getJSON(url).then(function(data) {
            deferred.resolve(new MarketData(data));
          }).fail(function(error) {
            deferred.reject(error.statusText)
          });
    }
  }

  return MarketDataRetriever;
});