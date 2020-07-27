var popupSent = document.querySelector(".modal-sent");
    var popupError = document.querySelector(".modal-error");
    var closeError = document.querySelector(".modal__button-error");
    var closeSent = document.querySelector(".modal__button-sent");
    var form = document.querySelector("form");
    var username = form.querySelector("[name=firstname]");
    var surname = form.querySelector("[name=surname]");
    var phone = form.querySelector("[name=phone]");
    var email = form.querySelector("[name=email]");
    var errorPhone = form.querySelector(".phone-wrapper");
    var errorEmail = form.querySelector(".email-wrapper");

    form.addEventListener("submit", function (evt) {
      if (!username.value || !surname.value || !phone.value || !email.value) {
        evt.preventDefault();
        popupError.classList.add("modal-show");
        errorPhone.classList.add("modal-outline");
        errorEmail.classList.add("modal-outline");
        username.classList.add("modal-outline");
        surname.classList.add("modal-outline");
      } else {
        evt.preventDefault();
        popupSent.classList.add("modal-show");
        popupError.classList.remove("modal-show");
        errorPhone.classList.remove("modal-outline");
        errorEmail.classList.remove("modal-outline");
        username.classList.remove("modal-outline");
        surname.classList.remove("modal-outline");
      }
    });

    closeError.addEventListener("click", function (evt) {
      evt.preventDefault();
      popupError.classList.remove("modal-show");
    })

    closeSent.addEventListener("click", function (evt) {
      evt.preventDefault();
      popupSent.classList.remove("modal-show");
    })
    window.addEventListener("keydown", function (evt) {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        if (popupSent.classList.contains("modal-show") || popupError.classList.contains("modal-show")) {
          popupSent.classList.remove("modal-show");
          popupError.classList.remove("modal-show");
        }
      }
    })
