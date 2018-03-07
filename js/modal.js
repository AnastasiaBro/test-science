'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var firstWindow = document.querySelector('.window');
  var addButton = firstWindow.querySelectorAll('.window__button')[0];
  var editButton = firstWindow.querySelectorAll('.window__button')[1];
  var deleteButton = firstWindow.querySelectorAll('.window__button')[2];

  var modalWindow = document.querySelector('.add');
  var saveButton = modalWindow.querySelector('.add__button');
  var cancelButton = modalWindow.querySelector('.add__button-cancel');

  var container = firstWindow.querySelector('.card__container');
  var avatarChooser = modalWindow.querySelector('input[type=file]');

  var cardContainer = document.querySelector('.section-edit__cards-container');

  container.addEventListener('click', onRowClick);

  addButton.addEventListener('click', onAddButtonClick);
  deleteButton.addEventListener('click', onDeleteButtonClick);
  editButton.addEventListener('click', onEditButtonClick);

  saveButton.addEventListener('click', onSaveButtonClick);
  cancelButton.addEventListener('click', onCancelButtonClick);

  avatarChooser.addEventListener('change', onLoadChange);

  function onRowClick(event) {
    var row = container.querySelectorAll('.card__row-container');
    if (firstWindow.querySelector('.card__row--active')) {
      firstWindow.querySelector('.card__row--active').classList.remove('card__row--active');
    }
    for (var i = 0; i < row.length; i++) {
      var elem = row[i].querySelectorAll('.card__title');
      if (event.target === row[i] || event.target === row[i].querySelector('.card__photo') || event.target === elem[0] || event.target === elem[1] || event.target === elem[2] || event.target === elem[3] || event.target === elem[4] || event.target === elem[5] || event.target === elem[6]  || event.target === elem[7] || event.target === row[i].querySelectorAll('.card__checkbox-input') || event.target === row[i].querySelectorAll('.card__checkbox-label')) {
        row[i].classList.add('card__row--active');
        var activeRow = firstWindow.querySelector('.card__row--active');
        activeRow.addEventListener('click', function () {
          activeRow.classList.remove('card__row--active');
        });
      }
    }
  }

  function onAddButtonClick() {
    modalWindow.classList.remove('add--hidden');
    if (modalWindow.querySelector('.add__photo img')) {
      var imageContainer = modalWindow.querySelector('.add__photo');
      var imageDelete = modalWindow.querySelectorAll('.add__photo img');
      for (var i = 0; i < imageDelete.length; i++) {
        imageContainer.removeChild(imageDelete[i]);
      }
    }
  }

  function onEditButtonClick() {
    var row = container.querySelectorAll('.card__row-container');
    for (var i = 0; i < row.length; i++) {
      if (firstWindow.querySelector('.card__row--active').classList.contains('card__row--active')) {
        if (row[i] === firstWindow.querySelector('.card__row--active')) {
          var index = i;
          var activeCard = cardContainer.querySelectorAll('.edit')[i];
          activeCard.classList.remove('edit__card--hidden');

          var editSaveButton = activeCard.querySelector('.edit__button');
          var editCancelButton = activeCard.querySelector('.edit__button-cancel');

          var avatar = activeCard.querySelector('input[type=file]');

          editSaveButton.addEventListener('click', onEditSaveButtonClick);
          editCancelButton.addEventListener('click', onEditCancelButtonClick);

          function onEditCancelButtonClick() {
            activeCard.classList.add('edit__card--hidden');
          }

          avatar.addEventListener('change', onEditLoadChange);

          function onEditLoadChange(evt) {
            var fileChooserEdit = evt.target;
            var fileEdit = fileChooserEdit.files[0];
            var fileNameEdit = fileEdit.name.toLowerCase();

            var matches = FILE_TYPES.some(function (it) {
              return fileNameEdit.endsWith(it);
            });

            if (matches) {
              var editReader = new FileReader();

              editReader.addEventListener('load', function () {
                var editResult = editReader.result;
                var editImage = document.createElement('img');
                var editPhotoPlace = activeCard.querySelector('.edit__photo');
                editImage.src = editResult;
                editImage.style = 'position: absolute; top: 190px; left: 110px; width: 95px; height: 64px;';
                editPhotoPlace.appendChild(editImage);
              });
              editReader.readAsDataURL(fileEdit);
            }
          }

          function onEditSaveButtonClick() {
            var editName = activeCard.querySelector('.edit__name-input');
            var editSurname = activeCard.querySelector('.edit__surname-input');
            var editDate = activeCard.querySelector('.edit__date-input');
            var editSelect = activeCard.querySelector('.edit__select');
            var editCheckbox = activeCard.querySelector('.edit__checkbox-input');
            var editCity = activeCard.querySelector('.edit__city-input');
            var editStreet = activeCard.querySelector('.edit__street-input');
            var editHouse = activeCard.querySelector('.edit__house-input');
            var editFlat = activeCard.querySelector('.edit__flat-input');

            (function saveOneRow() {
              if (activeCard.querySelector('.edit__photo img')) {
                var editAllImages = activeCard.querySelectorAll('.edit__photo img');
                row[index].querySelector('img').src = editAllImages[editAllImages.length - 1].src;
              }
              row[index].querySelectorAll('p')[0].innerHTML = editName.value;
              row[index].querySelectorAll('p')[1].innerHTML = editSurname.value;
              row[index].querySelectorAll('p')[2].innerHTML = editDate.value;
              var editData = editDate.value;
              row[index].querySelectorAll('p')[3].innerHTML = 2018 - Number(editData[0] + editData[1] + editData[2] + editData[3]) - 1;
              row[index].querySelectorAll('p')[4].innerHTML = editSelect.value;
              if (editCheckbox.checked) {
                row[index].querySelector('.card__checkbox-input').checked = true;
              }
              if (!editCheckbox.checked) {
                row[index].querySelector('.card__checkbox-input').checked = false;
              }
              row[index].querySelectorAll('p')[5].innerHTML = 'г. ' + editCity.value + ', ' + editStreet.value + ', ' + editHouse.value + ', кв.' + editFlat.value;
            })();

            activeCard.classList.add('edit__card--hidden');
          }
        }
      }
    }
  }

  function onDeleteButtonClick() {
    var row = container.querySelectorAll('.card__row-container');
    for (var i = 0; i < row.length; i++) {
      if (row[i] === firstWindow.querySelector('.card__row--active')) {
        var activeCardDelete = cardContainer.querySelectorAll('.edit')[i];
        cardContainer.removeChild(activeCardDelete);
      }
    }

    if (firstWindow.querySelector('.card__row--active').classList.contains('card__row--active')) {
      var deleteRow = firstWindow.querySelector('.card__row--active');
      container.removeChild(deleteRow);
    }
  }

  function onCancelButtonClick() {
    modalWindow.classList.add('add--hidden');
  }

  function onLoadChange(evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var result = reader.result;
        var newImage = document.createElement('img');
        var photoPlace = modalWindow.querySelector('.add__photo');
        newImage.src = result;
        newImage.style = 'position: absolute; top: 190px; left: 110px; width: 95px; height: 64px;';
        photoPlace.appendChild(newImage);
      });
      reader.readAsDataURL(file);
    }
  }

  function onSaveButtonClick() {
    var name = modalWindow.querySelector('.add__name-input');
    var surname = modalWindow.querySelector('.add__surname-input');
    var date = modalWindow.querySelector('.add__date-input');
    var select = modalWindow.querySelector('.add__select');
    var checkbox = modalWindow.querySelector('.add__checkbox-input');
    var city = modalWindow.querySelector('.add__city-input');
    var street = modalWindow.querySelector('.add__street-input');
    var house = modalWindow.querySelector('.add__house-input');
    var flat = modalWindow.querySelector('.add__flat-input');

    function createOneRow() {
      var rowElement = document.createElement('li');
      rowElement.setAttribute('class', 'card__row-container');
      rowElement.innerHTML = '<div class="card__title card__title--first card__image"><img class="card__photo" src="" alt="Фото"></div><p class="card__title card__title--first"></p><p class="card__title card__title--fourth"></p><p class="card__title card__title--fourth"></p><p class="card__title card__title--third"></p><p class="card__title card__title--first"></p><div class="card__title card__title--second card__title-checkbox"><input class="card__checkbox-input" type="checkbox" name="work" id="work" disabled><label class="card__checkbox-label" for="work"></label></div><p class="card__title card__title--last"></p>';
      if (modalWindow.querySelector('.add__photo img')) {
        var allImages = modalWindow.querySelectorAll('.add__photo img');
        rowElement.querySelector('img').src = allImages[allImages.length - 1].src;
      }
      rowElement.querySelectorAll('p')[0].innerHTML = name.value;
      rowElement.querySelectorAll('p')[1].innerHTML = surname.value;
      rowElement.querySelectorAll('p')[2].innerHTML = date.value;
      var data = date.value;
      rowElement.querySelectorAll('p')[3].innerHTML = 2018 - Number(data[0] + data[1] + data[2] + data[3]) - 1;
      rowElement.querySelectorAll('p')[4].innerHTML = select.value;
      if (checkbox.checked) {
        rowElement.querySelector('.card__checkbox-input').setAttribute('checked', 'checked');
      }
      rowElement.querySelectorAll('p')[5].innerHTML = 'г. ' + city.value + ', ' + street.value + ', ' + house.value + ', кв.' + flat.value;
      return rowElement;
    }
    container.appendChild(createOneRow());

    function createEditCard() {
      var cardElement = document.createElement('li');
      cardElement.setAttribute('class', 'section-edit__card edit edit__card--hidden');
      cardElement.innerHTML = '<div class="edit__title"><h3 class="edit__title-text">Добавление/Редактирование</h3></div><form class="edit__form"><fieldset class="edit__photo"><input class="edit__photo-input" type="file"><label class="edit__photo-label">Здесь должно быть ваше фото - нажмите сюда для загрузки</label><img class="edit__image" src="../img/photo-third.jpg" alt="Фото"></fieldset><div class="edit__container"><fieldset class="edit__name"><input class="edit__name-input" type="text" placeholder="Имя" value="Женя"><label class="edit__name-label"></label></fieldset><fieldset class="edit__surname"><input class="edit__surname-input" type="text" placeholder="Фамилия" value="Безымянный"><label class="edit__surname-label"></label></fieldset><fieldset class="edit__date"><input class="edit__date-input" type="date" value="1983-01-12"><label class="edit__date-label"></label></fieldset><fieldset class="edit__work"><select class="edit__select"><option>должность</option><option selected>бухгалтер</option><option>программист</option><option>админ</option><option>техник</option><option>садовод</option><option>охранник</option><option>на дуде игрец</option></select></fieldset><fieldset class="edit__checkbox"><input class="edit__checkbox-input" type="checkbox" id="checkbox-2" name="checkbox-2"><label class="edit__checkbox-label" for="checkbox-2">Удаленка</label></fieldset></div><div class="edit__container edit__container--second"><fieldset class="edit__city"><input class="edit__city-input" type="text" placeholder="Город" value="СПб"><label class="edit__city-label"></label></fieldset><fieldset class="edit__street"><input class="edit__street-input" type="text" placeholder="Улица" value="ул. Гжатская"><label class="edit__street-label"></label></fieldset><fieldset class="edit__house"><input class="edit__house-input" type="text" placeholder="Дом" value="21/2"><label class="edit__house-label"></label></fieldset><fieldset class="edit__flat"><input class="edit__flat-input" type="text" placeholder="Квартира" value="3"><label class="edit__flat-label"></label></fieldset></div><div class="edit__buttons"><button class="edit__button button" type="button">Сохранить</button><button class="edit__button-cancel button" type="button">Отмена</button></div></form>';
      var rows = modalWindow.querySelectorAll('.card__row-container');
      cardElement.querySelector('.edit__photo-input').id = 'photo-' + (rows.length - 1);
      cardElement.querySelector('.edit__photo-input').name = 'photo-' + (rows.length - 1);
      cardElement.querySelector('.edit__photo-label').for = 'photo-' + (rows.length - 1);
      cardElement.querySelector('.edit__checkbox-input').id = 'checkbox-' + (rows.length - 1);
      cardElement.querySelector('.edit__checkbox-input').name = 'checkbox-' + (rows.length - 1);
      cardElement.querySelector('.edit__checkbox-label').for = 'checkbox-' + (rows.length - 1);
      return cardElement;
    }

    cardContainer.appendChild(createEditCard());

    modalWindow.classList.add('add--hidden');
  }
})();
