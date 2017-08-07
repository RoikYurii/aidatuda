'use strict';

;(function($){

//popup
  $('.contacts-actions__ask').click(function (e) {
    $('.ask').addClass('ask--active');
  });
  $('.ask__close').click(function () {
    $('.ask').removeClass('ask--active');
  })

  var $contactsOpen = $('.contacts-phones__open');
  var $contactsPhones = $('.contacts-phones');
  var $contactsAction = $('.contacts-actions');

  $contactsPhones.hover(function () {
    $(this).toggleClass('contacts-phones--active');
    $('.header__accent-side').toggleClass('header__accent-side--active');
    $('.contacts-phones__text').toggleClass('contacts-phones__text--active');
    $('.contacts-phones__open').toggleClass('contacts-phones__open--active');
    $contactsAction.toggleClass('contacts-actions--hidden')
  })

  //slider
  // var w = $('#slider_container').width();
  var w = 295;
  $('.slides > img').width(w);
  $('.slides').width( w * ('.slides > img').length);
  // $('.slides').css('left', -w);

  var $navActive = $('.slider-nav__active');
  var nowActiveLeftCss;
  var nowActiveLeftInt;
  var itemWidth = $navActive.width();
  var slideWidth;

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

  //order
  var $colorPicker = $('.color-chose-picker__item');
  var $divans = $('.color-chose__img');

  $colorPicker.click(function () {
    var $divanID = $(this).attr('value');
    $colorPicker.removeClass('color-chose-picker__item--active');
    $(this).addClass('color-chose-picker__item--active');
    $divans.hide();
    $('#'+$divanID).fadeIn();
  })

  //regions
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
    }else {
      removingClasses();
      $(this).addClass('regions-table-item__more--active');
      $(this).parent().parent().toggleClass('regions-table-item--active');
      $('#'+$detailBlockID).fadeIn();
    }



  })

}(jQuery));








// ``````````````````
