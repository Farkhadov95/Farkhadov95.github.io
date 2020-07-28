'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');
  var offerTemplate = document.querySelector('#card').content;
  var pinContainer = document.querySelector('.map__pins');

  var renderCards = function (card) {
    var offerElement = offerTemplate.cloneNode(true);

    var popupTitle = offerElement.querySelector('.popup__title');
    popupTitle.textContent = card.offer.title;

    var popupAddress = offerElement.querySelector('.popup__text--address');
    popupAddress.textContent = card.offer.address;

    var popupPrice = offerElement.querySelector('.popup__text--price');
    popupPrice.textContent = card.offer.price + ' ₽/ночь';

    var popupType = offerElement.querySelector('.popup__type');
    popupType.textContent = translateType(card.offer.type);

    var popupCapacity = offerElement.querySelector('.popup__text--capacity');
    popupCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests;

    var popupTime = offerElement.querySelector('.popup__text--time');
    popupTime.textContent = 'заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var popupFeatures = offerElement.querySelector('.popup__features');
    popupFeatures.textContent = card.offer.features;

    var popupDescription = offerElement.querySelector('.popup__description');
    popupDescription.textContent = card.offer.description;

    var popupPhotos = offerElement.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');
    var allPhotos = popupPhotos.querySelectorAll('.popup__photo');

    var photosArray = card.offer.photos;
    for (var i = 0; i < photosArray.length; i++) {
      var photosElement = popupPhoto.cloneNode(true);
      photosElement.src = photosArray[i];
      popupPhotos.appendChild(photosElement);
    }

    allPhotos[0].remove();

    var popupAvatar = offerElement.querySelector('.popup__avatar');
    popupAvatar.src = card.author.avatar;

    map.insertBefore(offerElement, mapFilter);

    var mapCard = document.querySelector('.map__card');
    var closePopup = mapCard.querySelector('.popup__close');
    closePopup.addEventListener('click', function () {
      mapCard.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        mapCard.remove();
      }
    });
  };

  window.manageCard = {
    autoClose: function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
    },
    show: function () {
      var allPins = pinContainer.querySelectorAll('.map__pin');
      for (var k = 1; k < allPins.length; k++) {
        allPins[k].addEventListener('click', function (evt) {
          window.manageCard.autoClose();
          renderCards(window.points[evt.currentTarget.dataset.id]);
        });
      }
    }
  };

  var translateType = function (word) {
    switch (word) {
      case 'palace':
        word = 'Дворец';
        break;
      case 'flat':
        word = 'Квартира';
        break;
      case 'house':
        word = 'Дом';
        break;
      case 'bungalo':
        word = 'Бунгало';
        break;
    }
    return word;
  };
})();
