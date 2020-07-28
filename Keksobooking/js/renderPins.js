'use strict';
(function () {
  var pinContainer = document.querySelector('.map__container');

  window.renderPins = function (filteredPoints) {
    var SHIFT_X = '25';
    var SHIFT_Y = '70';
    var pinTemplate = document.querySelector('#pin').content;
    var fragment = document.createDocumentFragment();

    var MAX_LENGTH = 5;
    pinContainer.innerHTML = '';

    for (var i = 0; (i < filteredPoints.length) && (i < MAX_LENGTH); i++) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinImage = pinElement.querySelector('img');
      var pinButton = pinElement.querySelector('button');
      pinElement.querySelector('.map__pin').style = 'left: ' + (filteredPoints[i].location.x - SHIFT_X) + 'px;' + 'top: ' + (filteredPoints[i].location.y - SHIFT_Y) + 'px; ';
      pinImage.src = filteredPoints[i].author.avatar;
      pinImage.alt = filteredPoints[i].offer.title;
      pinButton.dataset.id = filteredPoints[i].id;
      fragment.appendChild(pinElement);
    }
    pinContainer.appendChild(fragment);
    window.manageCard.show();
  };

})();
