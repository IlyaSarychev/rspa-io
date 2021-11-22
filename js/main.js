jQuery(document).ready(function () {

    let workprogSlider = jQuery('.workprog-slider').slick({
        autoplay: false,
        arrows: false,
        fade: true,
        speed: 1500,
        waitForAnimate: false,
        speed: 0,
        asNavFor: '.work-img-slider',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    dots: true,
                    dotsClass: 'slick-dots custom-list',
                    adaptiveHeight: true,
                    fade: false,
                    speed: 1500,
                }
            }
        ]
    })

    jQuery('.workprog-slider-arrows .arrow--prev').click(() => {
        workprogSlider.slick('slickPrev')
    })

    jQuery('.workprog-slider-arrows .arrow--next').click(() => {
        workprogSlider.slick('slickNext')
    })

    let workImgSlider = jQuery('.work-img-slider').slick({
        arrows: false,
        asNavFor: '.workprog-slider',
        speed: 0,
        fade: true
    })

    let guestprogSlider = jQuery('.guestprog-slider').slick({
        autoplay: false,
        arrows: false,
        asNavFor: '.guestprogramm-slider-wrapper .img-slider',
        fade: true,
        speed: 0,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    dots: true,
                    dotsClass: 'slick-dots blue-dots custom-list',
                    adaptiveHeight: true,
                    speed: 1500,
                    fade: false
                }
            }
        ]
    })

    let imgGuestSlider = jQuery('.guestprogramm-slider-wrapper .img-slider').slick({
        arrows: false,
        asNavFor: '.guestprogramm-slider-wrapper .guestprog-slider',
        fade: true,
        speed: 0
    })

    function changeSliderButtonsClasses(buttons, activeIdx) {
        buttons.each((i, el) => {
            if (i === activeIdx) {
                jQuery(el).addClass('active')
            } else {
                jQuery(el).removeClass('active')
            }
        })
    }

    function bindButtonsToSlider(buttons, slider) {
        buttons.each((i, el) => {
            jQuery(el).click(() => {
                slider.slick('slickGoTo', i)
                changeSliderButtonsClasses(buttons, i)
            })
        })

        slider.on('afterChange', (slick, currentSlide) => {
            changeSliderButtonsClasses(buttons, currentSlide.currentSlide)
        })
    }

    bindButtonsToSlider(jQuery('.section-guestprogramm .slider-buttons__btn'), guestprogSlider)

    function paddingsAndMarginsForMobileXScroll() {
        let container = jQuery('.section-offer .container').width()
        let vw = jQuery(window).width()

        if (vw < 992) {
            jQuery('.experts').css({
                'margin-left': -((vw - container) / 2) + 'px',
                'margin-right': -((vw - container) / 2) + 'px',
                'padding-left': (vw - container) / 2 + 'px',
                'padding-right': (vw - container) / 2 + 'px',
            })
        } else {
            jQuery('.experts').css({
                'margin-left': 0,
                'margin-right': 0,
                'padding-left': 0,
                'padding-right': 0,
            })
        }

        if (vw < 576) {
            jQuery('.b-nom-wrapper').css({
                'margin-left': -(vw - container) / 2 + 'px',
                'margin-right': -(vw - container) / 2 + 'px',
                'padding-left': (vw - container) / 2 + 'px',
                'padding-right': (vw - container) / 2 + 'px',
            })
        } else {
            jQuery('.b-nom-wrapper').css({
                'margin-left': 0,
                'margin-right': 0,
                'padding-left': 0,
                'padding-right': 0,
            })
        }
    }

    paddingsAndMarginsForMobileXScroll()

    jQuery(window).resize(() => {
        paddingsAndMarginsForMobileXScroll()
    })

    if (jQuery(window).width() < 992) {

        let firstRow = jQuery('.partners-list')
        let secondRow = firstRow.clone()
        secondRow.empty()
        firstRow.find('.partners-list__partner').each((i, el) => {
            if (Math.floor(firstRow.find('.partners-list__partner').length / 2) < i + 1) {
                jQuery(secondRow).append(el)
            }
        })
        jQuery('.partners-list').after(secondRow)

        firstRow.slick({
            mobileFirst: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 0,
            speed: 2000,
            variableWidth: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: 'unslick'
                }
            ]
        })

        secondRow.slick({
            mobileFirst: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 0,
            speed: 2000,
            variableWidth: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: 'unslick'
                }
            ]
        })
    }

    jQuery('.burger').click(() => {
        jQuery('.mobile-menu').addClass('show')
        setTimeout(() => {
            jQuery('.mobile-menu').addClass('animate')
        }, 100)
    })

    jQuery('.mobile-menu__button').click(() => {
        jQuery('.mobile-menu').one('transitionend', function () {
            jQuery('.mobile-menu').removeClass('show')
        })
        jQuery('.mobile-menu').removeClass('animate')
    })

    jQuery('a[href^="#"]').click(function (e) {
        if (jQuery(this).attr('href').length < 2) return
        e.preventDefault()
        jQuery('html, body').animate({ scrollTop: jQuery(`#${jQuery(this).attr('href').slice(1)}`).offset().top - jQuery('.header').height() }, 500, 'swing')
    })

    jQuery('.offer__button').click(function (e) {
        e.preventDefault()
        jQuery('html, body').animate({ scrollTop: jQuery(`.section-form`).offset().top - jQuery('.header').height() }, 500, 'swing')
    })

    jQuery('.select__header').click(function () {
        jQuery(this).closest('.select').toggleClass('show')
    })

    jQuery('.select__item').click(selectItemClickHandler)

    function selectItemClickHandler() {
        jQuery('.select').removeClass('show')
        let select = jQuery(this).closest('.select')
        let input = select.next('input[type="hidden"]')

        if (!select.hasClass('select--chosen')) {
            select.addClass('select--chosen')
            select.find('.select__header span').text(jQuery(this).text())
            input.addClass('valid')
            jQuery(this).remove()
        } else {
            select.find('.select__body').append(`
                <div class="select__item" data-type="${input.val()}">${select.find('.select__header span').text()}</div>
            `)
            select.find('.select__item:last-child').click(selectItemClickHandler)
            select.find('.select__header span').text(jQuery(this).text())
            jQuery(this).remove()
        }

        input.val(jQuery(this).attr('data-type'))
        input.trigger('change')
    }

    jQuery('[type="submit"]').click(e => {
        e.preventDefault()
    })

    jQuery('.modal').on('click', function (e) {
        if (e.target.classList.contains('modal')) {
            jQuery('.modal.show').removeClass('show');
            jQuery('body,html').removeClass('modal-active');
        }

    });

    // modal
    function openModal(id) {
        jQuery('.modal#' + id).addClass('show');
        jQuery('body,html').addClass('modal-active');
    }

    function closeModal() {
        jQuery('.modal.show').removeClass('show');
        jQuery('body,html').removeClass('modal-active');
    }

    jQuery(document).click(e => {
        if (!jQuery(e.target).hasClass('select') && !jQuery(e.target).closest('.select').length) {
            jQuery('.select').removeClass('show')
        }
    })

    jQuery('.info-wrapper .button').click(e => {
        openModal('member-modal')
    })

    jQuery('.section-workprogramm .button').click(e => {
        openModal('speaker-modal')
    })

    jQuery('.partners .button').click(e => {
        openModal('sponsor-modal')
    })

    jQuery('.modal-back').click(function (e) {
        e.preventDefault()
        closeModal(jQuery(this).closest('.modal').attr('id'))
    })

    jQuery('.modal button[type="submit"]').click(function () {
        jQuery(this).closest('.modal').find('.modal-success').show()
        jQuery(this).closest('form').hide()
    })

    jQuery('.modal-success .close-modal').click(e => {
        jQuery('.modal').removeClass('show')
        jQuery('html,body').removeClass('modal-active')
    })

    let dinamics = jQuery('.dinamics')
    dinamics.find('img:first-child').addClass('animate')
    setTimeout(() => {
        dinamics.find('img:first-child').removeClass('animate')
    }, 4000)

    setInterval(() => {
        let curDinamic = dinamics.find('img.animate').last()
        if (curDinamic.is(':last-child')) {
            dinamics.find('img:first-child').addClass('animate')
            setTimeout(() => {
                dinamics.find('img:first-child').removeClass('animate')
            }, 4000)
        } else {
            curDinamic.next('img').removeClass('animate').addClass('animate')
            setTimeout(() => {
                curDinamic.next('img').removeClass('animate')
            }, 4000)
        }
    }, 3200)

    let rellax = new Rellax('.parallax', {
        center: true,
        vertical: true,
        breakpoints: [576, 768, 1201]
    });

    jQuery('.form-part button[type="submit"]').click(function() {
        let form = jQuery(this).closest('form')
        if (form.find('input.select-input').val() === 'member') {
            openModal('member-modal')
            let modal = jQuery('#member-modal')
            modal.find('input[name="name"]').val(form.find('input[name="name"]').val()).addClass('valid')
            modal.find('input[name="email"]').val(form.find('input[name="email"]').val()).addClass('valid')
            modal.find('input[name="phone"]').val(form.find('input[name="phone"]').val()).addClass('valid')
        }
        if (form.find('input.select-input').val() === 'speaker') {
            openModal('speaker-modal')
            let modal = jQuery('#speaker-modal')
            modal.find('input[name="name"]').val(form.find('input[name="name"]').val()).addClass('valid')
            modal.find('input[name="email"]').val(form.find('input[name="email"]').val()).addClass('valid')
            modal.find('input[name="phone"]').val(form.find('input[name="phone"]').val()).addClass('valid')
        }
        if (form.find('input.select-input').val() === 'sponsor') {
            openModal('sponsor-modal')
            let modal = jQuery('#sponsor-modal')
            modal.find('input[name="name"]').val(form.find('input[name="name"]').val()).addClass('valid')
            modal.find('input[name="email"]').val(form.find('input[name="email"]').val()).addClass('valid')
            modal.find('input[name="phone"]').val(form.find('input[name="phone"]').val()).addClass('valid')
        }
    })

    jQuery('section').each(function(i, el) {
        if (jQuery(window).width() < 992) return
        jQuery(window).scroll(function() {
            let yPos = (jQuery(window).scrollTop() - jQuery(el).position().top) / jQuery(el).data('bg-speed');
            let coords = 'center '+ yPos + 'px';
            jQuery(el).css({ backgroundPosition: coords });
        })
    })

    jQuery('.section-offer').css({
        'backgroundPositionY': '-50vh'
    })

    jQuery('.section-offer').animate({
        'backgroundPositionY': '0px'
    }, 2000)

    $('input[type="tel"]').mask('+0 (000) 000-00-00', {
        onKeyPress(cep, event, currentField) {
            let form = currentField.closest('form')
            if (currentField.val().length == currentField.attr('maxlength')) {
                currentField.addClass('valid')
                changeSubmitDisabling(form)
            } else {
                currentField.removeClass('valid')
                changeSubmitDisabling(form)
            }
        }
    })

    $('textarea').change(function() {
        let form = $(this).closest('form')

        if ($(this).attr('required') !== 'required') return

        if (jQuery(this).val().length >= 3) {
            jQuery(this).addClass('valid')
            return changeSubmitDisabling(form)
        } else if ($(this).attr('type') === 'text') {
            jQuery(this).removeClass('valid')
            return changeSubmitDisabling(form)
        }
    })

    $('input[type="file"]').change(function() {
        if (this.files.length) {
            jQuery(this).addClass('valid')
            jQuery(this).closest('.input-file').addClass('contains')
            jQuery(this).next('label').find('.input-file__text').text(this.files[0].name)
            if ($(this).attr('required') === 'required') {
                changeSubmitDisabling($(this).closest('form'))
            }
        }
    })

    
    $('input').change(function() {
        let form = $(this).closest('form')

        if ($(this).attr('required') !== 'required') return

        if ($(this).attr('type') === 'text' && jQuery(this).val().length >= 3) {
            jQuery(this).addClass('valid')
            return changeSubmitDisabling(form)
        } else if ($(this).attr('type') === 'text') {
            jQuery(this).removeClass('valid')
            return changeSubmitDisabling(form)
        }

        if ($(this).attr('type') === 'email' && /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())) {
            jQuery(this).addClass('valid')
            return changeSubmitDisabling(form)
        } else if ($(this).attr('type') === 'email') {
            jQuery(this).removeClass('valid')
            return changeSubmitDisabling(form)
        }
    })

    function changeSubmitDisabling(form) {
        if (form.find('input[required]:not(.valid)').length) {
            form.find('button[type="submit"]').attr('disabled', true)
        } else {
            form.find('button[type="submit"]').attr('disabled', false)
        }
    }
})