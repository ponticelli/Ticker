define([], function () {
  
  // This class is the wrapper around the RawJson that we get from the service
  // It abstracts the details of service contract but exposes the necessary infomation needed for the view
  // (basically acts as both Model + ViewModel)
  var MarketData = function(rawJSON) {
    var _this = this,
        rawData = rawJSON,
        viewData;

    // Get the property value from view model
    _this.get = function(property) {
      var returnVal = (viewData[property] || "");

      if (returnVal === "NaN") {
        returnVal = "n/a";
      }

      return returnVal;
    }

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
        "AskRealTimeFraction": ((quote["AskRealtime"] || "").indexOf(".") == -1 ? 
                                        "00" : 
                                        (quote["AskRealtime"] || "").substring((quote["AskRealtime"] || "").indexOf(".") + 1)),
        "ChangeRealTime": parseFloat((quote["Change"] || "").replace(/^[+-]/g, "")).toFixed(2),
        "ChangeRealTimeSign": (quote["Change"] || "").indexOf("-") != -1 ? "negative" : 
                                  ((quote["Change"] || "").indexOf("+") != -1 ? "positive" : "neutral"),
        "ChangeinPercent" : (quote["ChangeinPercent"] || "").replace(/^[+-]/g, ""),
        "YearHigh": parseFloat(quote["YearHigh"]).toFixed(2),
        "Open" : parseFloat(quote["Open"]).toFixed(2),
        "DayHigh": parseFloat(quote["DaysHigh"]).toFixed(2),
        "DayLow": parseFloat(quote["DaysLow"]).toFixed(2),
        "Bid": parseFloat(quote["Bid"]).toFixed(2),
        "Ask" : parseFloat(quote["Ask"]).toFixed(2),
        "PE": parseFloat(quote["PERatio"]).toFixed(2),
        "MarketCap": parseFloat(quote["MarketCapitalization"]).toFixed(2),
        "MarketCapSize": (quote["MarketCapitalization"] || "").slice(-1),
        "EPS": parseFloat(quote["EarningsShare"]).toFixed(2),
        "DPS": parseFloat(quote["DividendShare"]).toFixed(2),
        "Volume": quote["Volume"]
      }      
    }

    initialize();
  } 

  return MarketData;
});