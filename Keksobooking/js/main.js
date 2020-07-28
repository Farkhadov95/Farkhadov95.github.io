'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var roomsQuantity = adForm.querySelector('#room_number');
  var guestQuantity = adForm.querySelector('#capacity');
  var houseImageContainer = document.querySelector('.ad-form__photo');
  var userAvatar = document.querySelector('.ad-form-header__preview-avatar');

  roomsQuantity.addEventListener('change', window.isRoomsEnoughForGuests);
  guestQuantity.addEventListener('change', window.isRoomsEnoughForGuests);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (window.isRoomsEnoughForGuests()) {
      window.upload(new FormData(adForm), window.uploadHandler.success);
    }
  });

  var resetButton = adForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {
    adForm.reset();
    window.formToggle.deactivate();
    houseImageContainer.innerHTML = '';
    userAvatar.src = 'img/muffin-grey.svg';
  });

  window.movePin();
  window.formToggle.deactivate();

})();
