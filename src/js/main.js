$(function () {

    // Mobile menu
    $('.header__menu').on('click', function(e) {
        e.preventDefault();
        $('.header-nav').addClass('active');
    })
    $('.header-nav__close').on('click', function(e) {
        e.preventDefault();
        $('.header-nav').removeClass('active');
    })

    // Labeles
    $('.form__input_text').on('focus', function(e) {
        e.preventDefault();
        $(this).siblings('.form__label_text').addClass('focus');
    })
    $('.form__input_text').on('blur', function(e) {
        e.preventDefault();
        if ($(this).val() == '')
            $(this).siblings('.form__label_text').removeClass('focus');
    })

    // Range Value
    $('.form__input_range').on('input', function(e) {
        let range = $(this).val();
        $(this).siblings('.form__output').text(`${range} %`);
    })

    // Input File
    $('.form__input_file').on('change', function (e) {
        $('.form__file').addClass('visible');
        $('.form__file-name').text(e.target.files[0].name);
    });
    $('.form__file-remove').on('click', function () {
        $('.form__input_file').val('');
        $('.form__file').removeClass('visible');
    });

    // Custom Select
    $('select').each(function(){
        let $this = $(this), numberOfOptions = $(this).children('option').length;
      
        $this.addClass('select__hidden'); 
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select__styled"></div>');
    
        let $styledSelect = $this.next('div.select__styled');
        $styledSelect.text($this.children('option').eq(0).text());
      
        let $list = $('<ul />', {
            'class': 'select__options'
        }).insertAfter($styledSelect);
      
        for (let i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
      
        let $listItems = $list.children('li');
      
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select__styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select__options').hide();
            });
            $(this).toggleClass('active').next('ul.select__options').toggle();
        });
      
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
        });
      
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });    
    });
})