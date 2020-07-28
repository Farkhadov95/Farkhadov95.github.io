'use strict';
(function () {
  window.disableAll = function (elements, status) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = status;
    }
  };
})();
