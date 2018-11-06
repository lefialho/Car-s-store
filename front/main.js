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
        this.getAjax('company.json', this.getCompanyInfo);
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

      addCar: function addCar() {
        this.postAjax(
          'http://localhost:3000/car',
          'image=https://i.ytimg.com/vi/hXo5MutHig4/maxresdefault.jpg&brandModel=Camaro&year=2007&plate=HHC5598&color=Amarelo',
          this.postAddCar);

        this.getAjax('http://localhost:3000/car', this.getAddCar);
      },

      postAddCar: function postAddCar() {
        if (!app.isReady.call(this))
          return;
        JSON.parse(this.responseText)
      },

      getAddCar: function getAddCar() {
        if (!app.isReady.call(this))
          return;

        var data = app.parseData(this);
        var $img = $('[data-img="img"]').get();
        var $brand = $('[data-brand="brand"]').get();
        var $year = $('[data-year="year"]').get();
        var $plate = $('[data-plate="plate"]').get();
        var $color = $('[data-color="color"]').get();

        console.log(data);
        console.log($img);
        console.log($brand);
        console.log($year);
        console.log($plate);
        console.log($color);

        $img.textContent = data[0].image;
        $brand.textContent = data[0].brandModel;
        $year.textContent = data[0].year;
        $plate.textContent = data[0].plate;
        $color.textContent = data[0].color;
      },

      postAjax: function postAjax(open, send, func) {
        var post = new XMLHttpRequest();
        post.open('POST', open);
        post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        post.send(send);
        post.addEventListener('readystatechange', func, false)
      },

      getAjax: function getAjax(url, func) {
        var get = new XMLHttpRequest();
        get.open('GET', url, true);
        get.send();
        get.addEventListener('readystatechange', func, false)
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },

      parseData: function parseData(method) {
        var result;
        try {
          result = JSON.parse(method.responseText);
        } 
        catch (e) {
          result = null;
        }
        return result;
      }

    };
  })();

  app.init();


})(window.DOM);