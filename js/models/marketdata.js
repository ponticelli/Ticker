define([], function () {
  
  var MarketData = function(rawJSON) {
    var _this = this,
        rawData = rawJSON,
        viewData;

    _this.get = function(property) {
      return (viewData[property] || "");
    }
   
    // helper method to fetch the value of a property (supports deep chains)
    // "query.results.quote.Ask" (not using for now)
    function fetchValueFromJSON(property) {
        var attr = property && property.split(".");
        var result;
        $.each(attr, function(index, element) {
          result = (result && result[element]) || rawJSON[element];
        });

        return result;
    };

    function initialize() {
      
      var quote = rawJSON["query"] &&
                  rawJSON["query"]["results"] &&
                  rawJSON["query"]["results"] &&
                  rawJSON["query"]["results"]["quote"];

      //ViewModel - this object should all the properties that are needed by the view
      viewData = {
        "Symbol" : quote["symbol"],
        "Name" : quote["Name"],
        "AskRealTime": parseInt(quote["AskRealtime"]),
        "AskRealTimeFraction": (quote["AskRealtime"].indexOf(".") == -1 ? 
                                        "00" : 
                                        quote["AskRealtime"].substring(quote["AskRealtime"].indexOf(".") + 1)),
        "ChangeRealTime": parseFloat(quote["Change"].replace(/^[+-]/g, "")).toFixed(2),
        "ChangeRealTimeSign": quote["Change"].indexOf("-")? "negative" : "positive",
        "ChangeInPercent" : quote["ChangeInPercent"].replace(/^[+-]/g, ""),
        "YearRange": quote["YearRange"],
        "Open" : parseFloat(quote["Open"]).toFixed(2),
        "DayHigh": parseFloat(quote["DaysHigh"]).toFixed(2),
        "DayLow": parseFloat(quote["DaysLow"]).toFixed(2),
        "Bid": parseFloat(quote["Bid"]).toFixed(2),
        "Ask" : parseFloat(quote["Ask"]).toFixed(2),
        "PE": parseFloat(quote["PERatio"]).toFixed(2),
        "MarketCap": parseFloat(quote["MarketCapitalization"]).toFixed(2),
        "MarketCapSize": quote["MarketCapitalization"].slice(-1),
        "EPS": parseFloat(quote["EarningsShare"]).toFixed(2),
        "DPS": parseFloat(quote["DividendShare"]).toFixed(2),
        "Volume": quote["Volume"]
      }      
    }

    initialize();
  } 

  return MarketData;
});