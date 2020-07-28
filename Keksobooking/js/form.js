'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var mapFiltersSet = mapFilters.querySelectorAll('select');
  var mainAddress = adForm.querySelector('#address');
  var map = document.querySelector('.map');
  var pinContainer = document.querySelector('.map__container');
  var mapFiltersArray = mapFilters.querySelectorAll('select');
  var adSelectsArray = adForm.querySelectorAll('select');
  var adSelectType = adForm.querySelector('#type');
  var typeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var formCheckboxes = mapFilters.querySelectorAll('.map__checkbox');

  window.formToggle = {
    deactivate: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      pinContainer.innerHTML = '';
      housingFeatures.disabled = true;
      adFormHeader.disabled = true;
      window.disableAll(adFormElements, true);
      window.disableAll(mapFiltersSet, true);
      window.manageCard.autoClose();

      formCheckboxes.forEach(function (item) {
        item.checked = false;
      });

      var selectNone = function (array) {
        array.forEach(function (item) {
          item.selectedIndex = '0';
        });
      };
      selectNone(mapFiltersArray);
      selectNone(adSelectsArray);
      adSelectType.selectedIndex = '1';

      priceInput.placeholder = '1000';
      priceInput.min = 1000;
      priceInput.max = 1000000;

      mainPin.dataset.isActive = false;
      mainPin.style.top = 375 + 'px';
      mainPin.style.left = 570 + 'px';
      mainAddress.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;
    },
    activate: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      housingFeatures.disabled = false;
      adFormHeader.disabled = false;
      window.disableAll(adFormElements, false);
      mainPin.dataset.isActive = true;
      window.isRoomsEnoughForGuests();
    }
  };

  var syncCheckinAndCheckout = function (changeWhat, syncWhat) {
    changeWhat.addEventListener('change', function (evt) {
      syncWhat.value = evt.target.value;
    });
  };

  var changeMinPriceOnHousingType = function () {
    typeInput.addEventListener('change', function (evt) {
      switch (evt.target.value) {
        case 'bungalo':
          priceInput.min = 0;
          priceInput.placeholder = 0;
          break;
        case 'flat':
          priceInput.min = 1000;
          priceInput.placeholder = 1000;
          break;
        case 'house':
          priceInput.min = 5000;
          priceInput.placeholder = 5000;
          break;
        case 'palace':
          priceInput.min = 10000;
          priceInput.placeholder = 10000;
          break;
      }
    });
  };

  syncCheckinAndCheckout(timeIn, timeOut);
  syncCheckinAndCheckout(timeOut, timeIn);
  changeMinPriceOnHousingType();
})();
