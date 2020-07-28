'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('#avatar');
  var userAvatar = document.querySelector('.ad-form-header__preview-avatar');
  var houseImageChooser = document.querySelector('#images');
  var houseImageContainer = document.querySelector('.ad-form__photo');

  var uploadImagesOrAvatar = function (fileChooser, imgFile) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (imgFile === undefined) {
            houseImageContainer.innerHTML = '';
            var newImagePreview = document.createElement('img');
            newImagePreview.style.width = '40px';
            newImagePreview.style.height = '44px';
            newImagePreview.style.margin = '13px 15px';
            newImagePreview.src = reader.result;
            houseImageContainer.appendChild(newImagePreview);
          } else {
            imgFile.src = reader.result;
          }
        });

        reader.readAsDataURL(file);
      }
    });
  };

  uploadImagesOrAvatar(houseImageChooser);
  uploadImagesOrAvatar(avatarFileChooser, userAvatar);
})();
