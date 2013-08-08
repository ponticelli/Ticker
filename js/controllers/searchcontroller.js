define(['views/searchview'], function (SearchView) {
 var SearchController = function(container) {
    var _this = this,
        container = container,
        view,
        callbacks;

    _this.init = function () {
        callbacks = $.Callbacks();
        
        view = new SearchView(container);
        view.onSearchSubmit(function(newQuery) {
          callbacks.fire(newQuery);
        })
    }

    _this.onInputChange = function(cb) {
      callbacks.add(cb);
    }
  }

  return SearchController;
});