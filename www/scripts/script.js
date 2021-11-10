$(document).ready(function(){


  // mobile menu

  $('.js-burger').on('click', function(){
    $('.js-burger').prev().slideToggle();
  })

  // Аккордион FAQ

  let prevBtn;
  $('.js-accordion-btn').on('click', function() {

    if (prevBtn === $(this)[0]) {
      $(this).next().slideToggle();
      $(this).find('.js-faq-icon').toggleClass('faq-icon-minus');
      return;
    }

    $('.js-accordion-btn').next().slideUp();
    $('.js-faq-icon').removeClass('faq-icon-minus');
    $(this).next().slideDown();
    $(this).find('.js-faq-icon').addClass('faq-icon-minus');
    prevBtn = $(this)[0];
  });



  // Contacts tabs

  $('.tabs-link').on('click', function(event) {
    event.preventDefault();

    let index = $(this).index('.tabs-link');

    $('.tabs-link').removeClass('active');
    $(this).addClass('active');

    $('.contacts-content').removeClass('active');
    $('.contacts-content').eq(index).addClass('active');

  });

  // Slider

  if ( $('.js-reviews-wrap').length) {
    $('.js-reviews-wrap').each(function() {
      $(this).find('.js-reviews-content').slick({
        prevArrow: $(this).find('.js-btn-prev'),
        nextArrow: $(this).find('.js-btn-next')
      });
    });
  }




  // Catalog filter
  $('.filter-link').on('click', function(event) {
    event.preventDefault();

    let linkType = $(this).data('type');

    $('.filter-link').removeClass('active');
    $(this).addClass('active');

    if (linkType === 'all') {
      $('.portfolio-pic').show();
      return;
    }

    $('.portfolio-pic').each(function(){
      let itemType = $(this).data('type');

      if (linkType === itemType) {
        $(this).show();
        return;
      }

      $(this).hide();
    });

  });

  // catalog download new item's

  $('.js-btn-catalog').on('click', function() {

    let button = $(this);
    button.text('...');

    $.ajax({
      type: 'POST',
      url: '../json/catalog.json',
      data: 'count=4',
      success: function(response){
        let html = createHtml(response);
        addToHtml(html);
        button.text('Больше бабочек');
      },
      error: function(){}
    });

    function addToHtml(string) {
      $('.js-portfolio-wrap').append(string);
    }

    function createHtml(data) {
      let dataArray = data.reviews;
      let htmlString = '';

      dataArray.forEach(function(item){
        htmlString = htmlString +
        `<div class="portfolio-pic" data-type="${item.dataType}">
        <figure class="portfolio-figure">
          <img src="${item.imageUrl}" alt="${item.imageAlt}" class="portfolio-photo">
          <figcaption class="portfolio-pic-text">${item.description}</figcaption>
        </figure>
      </div>`;
      });

      return htmlString;
    }

  });







});



















