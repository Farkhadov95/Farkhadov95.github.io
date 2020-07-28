'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var roomsQuantity = adForm.querySelector('#room_number');
  var guestQuantity = adForm.querySelector('#capacity');

  window.isRoomsEnoughForGuests = function () {
    var roomsNumber = parseInt(roomsQuantity.value, 10);
    var guestNumber = parseInt(guestQuantity.value, 10);
    if (roomsNumber < guestNumber) {
      roomsQuantity.setCustomValidity('Количество комнат недостаточно для данного количества гостей');
      return false;
    } else if (roomsNumber === 100 && guestNumber > 0) {
      roomsQuantity.setCustomValidity('Это количество комнат недоступно для гостей');
      return false;
    } else if (roomsNumber < 100 && guestNumber === 0) {
      roomsQuantity.setCustomValidity('Это количество комнат доступно только для гостей');
      return false;
    }
    roomsQuantity.setCustomValidity('');
    roomsQuantity.reportValidity();
    return true;
  };

})();
