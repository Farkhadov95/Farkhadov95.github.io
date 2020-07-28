'use strict';
(function () {
  var mainSection = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');

  window.uploadHandler = {
    success: function () {
      window.isRoomsEnoughForGuests();
      var successPopup = document.querySelector('#success').content;
      var successNotification = successPopup.cloneNode(true);
      mainSection.appendChild(successNotification);
      var successNotificationBlock = document.querySelector('.success');

      var removeSuccess = function () {
        adForm.reset();
        successNotificationBlock.remove();
        window.formToggle.deactivate();
      };

      var removeSuccessOnEsc = function (evtKey) {
        if (evtKey.keyCode === 27) {
          removeSuccess();
        }
      };

      if (successNotificationBlock) {
        document.addEventListener('keydown', removeSuccessOnEsc, {once: true});
        successNotificationBlock.addEventListener('click', removeSuccess);
      }
    },
    error: function () {
      var errorTemplate = document.querySelector('#error').content;
      var errorNotification = errorTemplate.cloneNode(true);
      mainSection.appendChild(errorNotification);
      var errorNotificationBlock = document.querySelector('.error');
      var errorTryButton = errorNotificationBlock.querySelector('.error__button');

      if (errorNotificationBlock) {
        errorTryButton.focus();
        var removeError = function () {
          errorNotificationBlock.remove();
        };

        var removeErrorOnEsc = function (evtEsc) {
          if (evtEsc.keyCode === 27) {
            removeError();
          }
        };

        errorNotificationBlock.addEventListener('click', removeError);
        errorTryButton.addEventListener('click', removeError);
        errorTryButton.addEventListener('keydown', removeErrorOnEsc);
      }
    }
  };
})();
