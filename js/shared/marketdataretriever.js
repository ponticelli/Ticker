define(['models/marketdata'], function (MarketData) {
  var MarketDataRetriever = new function() {
    var _this = this;
        rawUrl_endPoint1 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22{{ticker}}%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
        rawUrl_endPoint2 = "http://ec2-54-224-143-194.compute-1.amazonaws.com/{{ticker}}";

    _this.getData = function(ticker) {
      // intentionally using replace knowing that it will replace only first instance
      // don't want to use global regex since it isn't needed here
      var url1 = rawUrl_endPoint1.replace("{{ticker}}", ticker);
      var url2 = rawUrl_endPoint1.replace("{{ticker}}", ticker);
      var deferred = $.Deferred();
      $.getJSON(url1).then(function(data) {
          deferred.resolve(new MarketData(data));
      }).fail(function(err) {
          $.getJSON(url2).then(function(data) {
            deferred.resolve(new MarketData(data));
          }).fail(function(error) {
            deferred.reject(error.statusText)
          });
      });
      return deferred.promise();
    }
  }

  return MarketDataRetriever;
});