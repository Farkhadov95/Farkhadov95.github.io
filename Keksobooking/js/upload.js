'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      return xhr.status === StatusCode.OK ?
        onSuccess(xhr.response) :
        window.uploadHandler.error();
    });
    xhr.addEventListener('error', function () {
      window.uploadHandler.error();
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
