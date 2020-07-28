'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingTypes = ['types-any', 'palace', 'flat', 'house', 'bungalo'];
  var housingPrices = ['prices-any', 'middle', 'low', 'high'];
  var housingRooms = ['rooms-any', 'rooms-1', 'rooms-2', 'rooms-3'];
  var housingGuests = ['guests-any', 'guests-1', 'guests-2', 'guests-0'];
  var housingType = 'types-any';
  var housingPrice = 'prices-any';
  var housingRoom = 'rooms-any';
  var housingGuest = 'guests-any';
  var featureWifi = false;
  var featureDishwasher = false;
  var featureParking = false;
  var featureWasher = false;
  var featureElevator = false;
  var featureConditioner = false;
  var debouncedRenderPins = window.debounce(window.renderPins);

  mapFilters.addEventListener('change', function (evt) {
    if (housingTypes.includes(evt.target.value)) {
      housingType = evt.target.value;
    } else if (housingPrices.includes(evt.target.value)) {
      housingPrice = evt.target.value;
    } else if (housingRooms.includes(evt.target.value)) {
      housingRoom = evt.target.value;
    } else if (housingGuests.includes(evt.target.value)) {
      housingGuest = evt.target.value;
    } else if (evt.target.value === 'wifi' && evt.target.checked) {
      featureWifi = true;
    } else if (evt.target.value === 'wifi' && !evt.target.checked) {
      featureWifi = false;
    } else if (evt.target.value === 'dishwasher' && evt.target.checked) {
      featureDishwasher = true;
    } else if (evt.target.value === 'dishwasher' && !evt.target.checked) {
      featureDishwasher = false;
    } else if (evt.target.value === 'parking' && evt.target.checked) {
      featureParking = true;
    } else if (evt.target.value === 'parking' && !evt.target.checked) {
      featureParking = false;
    } else if (evt.target.value === 'washer' && evt.target.checked) {
      featureWasher = true;
    } else if (evt.target.value === 'washer' && !evt.target.checked) {
      featureWasher = false;
    } else if (evt.target.value === 'elevator' && evt.target.checked) {
      featureElevator = true;
    } else if (evt.target.value === 'elevator' && !evt.target.checked) {
      featureElevator = false;
    } else if (evt.target.value === 'conditioner' && evt.target.checked) {
      featureConditioner = true;
    } else if (evt.target.value === 'conditioner' && !evt.target.checked) {
      featureConditioner = false;
    }
    window.manageCard.autoClose();

    window.filterPins(housingType, housingPrice, housingRoom, housingGuest, featureWifi, featureDishwasher, featureParking, featureWasher, featureElevator, featureConditioner);

  });

  window.filterPins = function (requiredType, requiredPrice, requiredRooms, requiredGuests, requiredWifi, requiredDishwasher, requiredParking, requiredWasher, requiredElevator, requiredConditioner) {

    var filteredHousingType = window.points.filter(function (it) {
      if (requiredType === 'types-any') {
        return it.offer.type;
      } else {
        return it.offer.type === requiredType;
      }
    });

    var filteredHousingPrice = filteredHousingType.filter(function (it) {
      if (requiredPrice === 'low') {
        return it.offer.price > 0 && it.offer.price <= 10000;
      } else if (requiredPrice === 'middle') {
        return it.offer.price > 10000 && it.offer.price <= 50000;
      } else if (requiredPrice === 'high') {
        return it.offer.price > 50000;
      } else {
        return it.offer.price >= 0;
      }
    });
    var filteredHousingRooms = filteredHousingPrice.filter(function (it) {
      if (requiredRooms === 'rooms-1') {
        return it.offer.rooms === 1;
      } else if (requiredRooms === 'rooms-2') {
        return it.offer.rooms === 2;
      } else if (requiredRooms === 'rooms-3') {
        return it.offer.rooms === 3;
      } else {
        return it.offer.rooms >= 0;
      }
    });
    var filteredHousingGuests = filteredHousingRooms.filter(function (it) {
      if (requiredGuests === 'guests-0') {
        return it.offer.guests === 0;
      } else if (requiredGuests === 'guests-1') {
        return it.offer.guests === 1;
      } else if (requiredGuests === 'guests-2') {
        return it.offer.guests === 2;
      } else {
        return it.offer.guests > 0;
      }
    });
    var filteredWifi = filteredHousingGuests.filter(function (it) {
      return requiredWifi ?
        it.offer.features.includes('wifi') :
        it.offer.features;
    });
    var filteredDishwasher = filteredWifi.filter(function (it) {
      return requiredDishwasher ?
        it.offer.features.includes('dishwasher') :
        it.offer.features;
    });
    var filteredParking = filteredDishwasher.filter(function (it) {
      return requiredParking ?
        it.offer.features.includes('parking') :
        it.offer.features;
    });
    var filteredWasher = filteredParking.filter(function (it) {
      return requiredWasher ?
        it.offer.features.includes('washer') :
        it.offer.features;
    });
    var filteredElevator = filteredWasher.filter(function (it) {
      return requiredElevator ?
        it.offer.features.includes('elevator') :
        it.offer.features;
    });
    var filteredConditioner = filteredElevator.filter(function (it) {
      return requiredConditioner ?
        it.offer.features.includes('conditioner') :
        it.offer.features;
    });

    var filteredMix = filteredConditioner;

    var uniquePins = filteredMix.filter(function (it, i) {
      return filteredMix.indexOf(it) === i;
    });

    debouncedRenderPins(uniquePins);
  };
})();
