'use strict';

;(function($){

  //menuSliding
  function menuSlide() {
    var $navLink = $('.main-nav__link');
    var $headerHeight;
    var $top, $section;
    $navLink.click(function (e) {
      e.preventDefault;
      $headerHeight = +$('.header').css('height').slice(0, -2) + 20;
      console.log($headerHeight);
      $section = $(this).attr('href');
      console.log($section);
      $top = $($section).offset().top - $headerHeight;
      $('body, html').animate({
        scrollTop : $top
      }, 500)
    })
  };
  menuSlide();

  //popup(.ask)
  function showPopup() {
    $('.contacts-actions__ask').click(function (e) {
      $('.ask').addClass('ask--active');
    });
    $('.ask__close').click(function () {
      $('.ask').removeClass('ask--active');
    });
  };
  showPopup();

  //header-contacts
  function showContacts() {
    var $contactsOpen = $('.contacts-phones__open');
    var $contactsPhones = $('.contacts-phones');
    var $contactsAction = $('.contacts-actions');
    $contactsPhones.hover(function () {
      $(this).toggleClass('contacts-phones--active');
      $('.header__accent-side').toggleClass('header__accent-side--active');
      $('.contacts-phones__text').toggleClass('contacts-phones__text--active');
      $('.contacts-phones__open').toggleClass('contacts-phones__open--active');
      $contactsAction.toggleClass('contacts-actions--hidden')
    });
  };
  showContacts();

  //slider
  function sliderActions() {
    var $navActive = $('.slider-nav__active');
    var nowActiveLeftCss;
    var nowActiveLeftInt;
    var itemWidth = $navActive.width();
    var slideWidth;
    var w = $('.slides__img').width();

    $('.slides > img').width(w);
    $('.slides').width( w * ('.slides > img').length);
    // $('.slides').css('left', -w);

    function getLeft(){
      nowActiveLeftCss = $navActive.css('left');
      nowActiveLeftInt = +nowActiveLeftCss.slice(0, -2);
      return nowActiveLeftInt
    };

    function slideRight() {
      nowActiveLeftInt = getLeft();
      slideWidth = nowActiveLeftInt + itemWidth;
      if (slideWidth >= itemWidth*4) {
        slideWidth = 0;
      }
      $navActive.css('left', slideWidth);
    };
    function slideLeft() {
      nowActiveLeftInt = getLeft();
      slideWidth = nowActiveLeftInt - itemWidth;
      if (slideWidth < 0) {
        slideWidth = itemWidth*3;
      }
      $navActive.css('left', slideWidth);
    };

    function next() {
      slideRight();
      $('.slides').animate({
        'margin-left' : -w
      }, 300, function(){
        $('.slides > div:first-child').appendTo('.slides').hide().fadeIn('fast');
        $('.slides').css('margin-left', 0);
     })
    };
    function prev() {
      slideLeft();
      $('.slides').animate({
        'margin-left' : w
      }, 300, function(){
        $('.slides > div:last-child').prependTo('.slides').hide().fadeIn('fast');
        $('.slides').css('margin-left', 0);
     })
    };

    $('#prevSlide').click(prev);
    $('#nextSlide').click(next);
  }
  sliderActions();

  //features
  function wheelMove() {
    var $wheelRoll = $('.wheel-roll');
    var $wheelRollItems = $('.wheel-roll__item');
    var $wheelRollItemActive;
    var $wheelRollIcons = $('.wheel-roll__icon');
    var $wheelTexts = $('.wheel-text')
    var rotateWheel;
    var rotateIcon;
    var itemSelfNumber;
    var wheelTextId;
    var wheelText;

    function getDeg() {
      switch(itemSelfNumber){
        case '0':
          rotateWheel = 0;
          break;
        case '1':
          rotateWheel = -36;
          break;
        case '2':
          rotateWheel = -71;
          break;
        case '3':
          rotateWheel = -109;
          break;
        case '4':
          rotateWheel = -143;
          break;
        case '5':
          rotateWheel = 143;
          break;
        case '6':
          rotateWheel = 109;
          break;
        case '7':
          rotateWheel = 71;
          break;
        case '8':
          rotateWheel = 36;
          break;
       }
      return rotateWheel
    };
    function getWheelText($this) {
      wheelTextId = $this.attr('value');
      wheelText = $('#wheel-text-'+wheelTextId);
      $wheelTexts.css('opacity', '0');
    }
    function rotate($this, rotateWheel) {
      console.log(rotateWheel);
      rotateIcon = -rotateWheel;
      $wheelRollIcons.css('transform', 'rotateZ(' + rotateIcon + 'deg)');
      $wheelRoll.css('transform', 'rotateZ(' + rotateWheel + 'deg)');
      $wheelRollItems.removeClass('wheel-roll__item--active');
      setTimeout(function() {
        $this.addClass('wheel-roll__item--active');
        wheelText.css('opacity', '1');
      }, 500);
    }
    function makeActions($this) {
      getWheelText($this);
      rotateWheel = getDeg();
      rotate($this, rotateWheel);
    }

    $wheelRollItems.click(function () {
      var $this = $(this);
      itemSelfNumber = $(this).attr('value');
      makeActions($this);
    });
    $('#wheelRollNext').click(function () {
      $wheelRollItemActive = $('.wheel-roll__item--active');
      itemSelfNumber = +$wheelRollItemActive.attr('value')+1;
      if (itemSelfNumber > 8) {
        itemSelfNumber = 0
      };
      itemSelfNumber = itemSelfNumber + '';
      var $this = $('.wheel-roll__item--'+itemSelfNumber);
      makeActions($this);
    })
    $('#wheelRollPrev').click(function () {
      $wheelRollItemActive = $('.wheel-roll__item--active');
      itemSelfNumber = +$wheelRollItemActive.attr('value')-1;
      if (itemSelfNumber < 0) {
        itemSelfNumber = 8
      };
      itemSelfNumber = itemSelfNumber + '';
      var $this = $('.wheel-roll__item--'+itemSelfNumber);
      makeActions($this);
    })
  };
  wheelMove();

  //order
  function chooseColor() {
    var $colorPicker = $('.color-chose-picker__item');
    var $divans = $('.color-chose__img');

    $colorPicker.click(function () {
      var $divanID = $(this).attr('value');
      $colorPicker.removeClass('color-chose-picker__item--active');
      $(this).addClass('color-chose-picker__item--active');
      $divans.hide();
      $('#'+$divanID).fadeIn();
    });
  };
  chooseColor();

  //regions
  function showRegions() {
    var $regionPicker = $('.regions-table-item__more');
    var $detailsBlocks = $('.regions-details');
    var $tableBlockItem = $('.regions-table-item');

    function removingClasses() {
      $regionPicker.removeClass('regions-table-item__more--active');
      $tableBlockItem.removeClass('regions-table-item--active');
      $detailsBlocks.hide();
    }

    $regionPicker.click(function () {
      var $detailBlockID = $(this).attr('value');
      if ($(this).hasClass('regions-table-item__more--active')) {
        removingClasses();
      }else{
        removingClasses();
        $(this).addClass('regions-table-item__more--active');
        $(this).parent().parent().toggleClass('regions-table-item--active');
        $('#'+$detailBlockID).fadeIn();
      }
    });
  }
  showRegions()

}(jQuery));








// ``````````````````
