(function ($) {
  'use strict';

  var app = (function appController() {
    return {
      init: function init() {
        this.companyInfo();
        this.initEvents();
        this.addCar();
      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },

      createNewCar: function createNewCar() {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');
        var $tdImage = document.createElement('td');
        var $tdBrand = document.createElement('td');
        var $tdYear = document.createElement('td');
        var $tdPlate = document.createElement('td');
        var $tdColor = document.createElement('td');
        var $tdRemove = document.createElement('td');
        var $buttonRemove = document.createElement('button')
        var $image = document.createElement('img');

        $tr.setAttribute('id', $('[data-js="plate"]').get().value);

        $image.setAttribute('src', $('[data-js="image"]').get().value);
        $tdImage.appendChild($image)

        $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
        $tdYear.textContent = $('[data-js="year"]').get().value;
        $tdPlate.textContent = $('[data-js="plate"]').get().value;
        $tdColor.textContent = $('[data-js="color"]').get().value;

        $tdPlate.setAttribute('class', 'plate');

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdRemove);

        $tdRemove.appendChild($buttonRemove);
        $buttonRemove.innerHTML = 'Remover';
        $buttonRemove.setAttribute('data-plate', $('[data-js="plate"]').get().value);
        $buttonRemove.classList.add('btn-remove');
        $buttonRemove.addEventListener('click', app.removeCar, false)

        return $fragment.appendChild($tr);
      },

      removeCar: function removeCar(e) {
        var $trToRemove = $('#' + e.target.getAttribute('data-plate')).get();
        $trToRemove.remove();
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false)
      },

      getCompanyInfo: function getCompanyInfo() {
        if (!app.isReady.call(this))
          return;

        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },

      addCar: function addCar() {
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost:3000/car');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send('image=http://teste&brandModel=Corsa&year=2007&plate=HHC5598&color=Branca');

        console.log('Cadastrando carro...')

        ajax.onreadystatechange = function () {
          if (ajax.readyState === 4) {
            console.log('Carro cadastrado!', JSON.parse(ajax.responseText));
          }
        };

        var get = new XMLHttpRequest();
        get.open('GET', 'http://localhost:3000/car');
        get.send();

        get.onreadystatechange = function () {
          if (get.readyState === 4) {

            var result = JSON.parse(get.responseText);
            var $img = $('[data-img="img"]').get();
            var $brand = $('[data-brand="brand"]').get();
            var $year = $('[data-year="year"]').get();
            var $plate = $('[data-plate="plate"]').get();
            var $color = $('[data-color="color"]').get();
            
            console.log($img)
            console.log($brand)
            console.log($year)
            console.log($plate)
            console.log($color)
            console.log(result)
          }
        }
      }

    };
  })();

  app.init();


})(window.DOM);