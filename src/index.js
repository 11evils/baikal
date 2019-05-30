import 'slick-carousel';

import './sass/reset.sass';
import './sass/fonts.sass';
import './scss/slick.scss';
import './sass/bst-grid.sass';
import './sass/white-header.sass';
import './css/humburger.css';
import './sass/modals.sass';
import './sass/main-section.sass';
import './sass/specificity.sass';
import './sass/specificity_mobile.sass';
import './sass/travel-format.sass';
import './sass/with-us.sass';
import './sass/about-us.sass';
import './sass/footer.sass';
import './sass/tours.sass';
import './sass/events.sass';
import './sass/contacts.sass';
import './sass/dev.sass';
import './sass/event-item.sass';
import './sass/descr-tour.sass';
import './sass/index_2.sass';

window.onload = () => {
    heightSectionToEndScreen(document.querySelector('.wrap-main-content'), document.querySelector('.wrap-logo-menu'));
    heightSectionToEndScreen(document.querySelector('.contacts'), document.querySelector('.white-header'));
    // heightSectionToEndScreen(document.querySelector('.main_header--mobile_menu'), document.querySelector('.main_header--wrp_logo_desktop'));
    setImg();
    setBg();
    openMobileMenuOnMainPage();
    openMobileMenu();
    showAndCloseModal();
    setHeightOnResize();
    startPageSlider();
    setSlideBg();
    showHideText();
    activeModalSlider();
    openMobileMenuOnMainPageNEW()
};

$('#modalForm').submit(function() {
    if (document.modalForm.modalPhone.value == '' ) {
        return false;
    }

    if (document.modalForm.modalName.value.length > 30) {
        return false;
    }

    
    $.ajax({
        type: "POST",
        url: "mailModal.php",
        data: $(this).serialize()
    }).done(function() {
        console.log('message sended');
        // $('.js-overlay-thank-you').fadeIn();
        // $(this).find('input').val('');
        $('#modalForm').trigger('reset');
    });
    
    return false;
});

Inputmask({ mask: '+7 (999) 999-9999'}).mask(document.querySelectorAll('#modal-form__mask-phone'));

function activeModalSlider() {
    let images = document.querySelectorAll('.show_modal_slider');
    let slider = document.querySelector('.modal_slider');
    let overlay = document.querySelector('.overlay_for_slider_modal');
    let close = document.querySelector('.modal_slider--close_cross');
    let nextBtn = document.querySelector('.modal_slider--next_btn');
    let prevBtn = document.querySelector('.modal_slider--prev_btn');
    const sections = document.querySelectorAll('section');

    if (images != null && slider != null) {
        for (const image of images) {
            image.onclick = () => {
                if (slider.classList.contains('modal_slider-active')) {
                    slider.classList.toggle('modal_slider-hidden');
                    overlay.classList.toggle('overlay_for_slider_modal-hidden');

                    for (const section of sections) {
                        section.classList.add('have-blur');
                    }
                } else {
                    slider.classList.toggle('modal_slider-hidden');
                    overlay.classList.toggle('overlay_for_slider_modal-hidden');
                    slider.classList.add('modal_slider-active');

                    $('.modal_slider--slider').slick({
                        arrows: false,
                        dots: false,
                        infinite: true,
                    });

                    for (const section of sections) {
                        section.classList.add('have-blur');
                    }
                } 
            }
        }

        if (close != null) close.onclick = () => {
            slider.classList.toggle('modal_slider-hidden');
            overlay.classList.toggle('overlay_for_slider_modal-hidden');

            for (const section of sections) {
                section.classList.remove('have-blur');
            }
        }

        if (nextBtn != null && prevBtn != null) {
            nextBtn.onclick = () => $('.modal_slider--slider').slick('slickNext');
            prevBtn.onclick = () => $('.modal_slider--slider').slick('slickPrev');
        }   
    }  
}

function startPageSlider() {
    let nextBtn = document.querySelector('.page_slider--next_btn');
    let prevBtn = document.querySelector('.page_slider--prev_btn');

    if (document.querySelector('.page_slider')) {
        $('.page_slider').slick({
            arrows: false,
            dots: false,
        });
    }

    if (nextBtn != null && prevBtn != null) {
        nextBtn.onclick = () => $('.page_slider').slick('slickNext');
        prevBtn.onclick = () => $('.page_slider').slick('slickPrev');
    } 
}

function showHideText() {
    let links = document.querySelectorAll('.text_info--open_close');
    let fullText = document.querySelector('.text_info--text-full');

    for (const link of links) {
        link.onclick = () => {
            fullText.classList.toggle('text_info--text-small');
            
            for (const link of links) {
                link.classList.toggle('text_info--hide_span');
            }
        }
    }
}

function heightSectionToEndScreen(section, menu) {
    if (section !== null && menu !== null) {
        let clientHeight = document.documentElement.clientHeight;
        let menuHeight = window.getComputedStyle(menu).height;

        menuHeight = Number(menuHeight.substring(0, menuHeight.length - 2));
        section.style.height = `${clientHeight - menuHeight}px`;
    }
}

function setImg() {
    var imgDefer = document.getElementsByTagName('img');

    for (var i = 0; i < imgDefer.length; i++) {
        if(imgDefer[i].getAttribute('data-src')) {
            imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
        } 
    }
}

function setBg() {
    var bgDefer = document.getElementsByClassName('set-background');

    for (var i = 0; i<bgDefer.length; i++) {
        if(bgDefer[i].getAttribute('data-bg')) {
            bgDefer[i].setAttribute('style', bgDefer[i].getAttribute('data-bg'));
        } 
    }
}

function setSlideBg(bgDefer) {
    var bgDefer = document.getElementsByClassName('set-slide-bg');

    for (var i = 0; i < bgDefer.length; i++) {
        if(bgDefer[i].getAttribute('data-bg')) {
            bgDefer[i].setAttribute('style', bgDefer[i].getAttribute('data-bg'));
        } 
    }
}

function openMobileMenuOnMainPage() {
    let humburger = document.querySelector('.bst-menu__humburger');
    let mobMenu = document.querySelector('.bst-menu__mobile');
    let mainContent = document.querySelector('.main-content');

    if (humburger !== null && mobMenu !== null && mainContent !== null) {
        humburger.onclick = () => {
            mobMenu.classList.toggle('show-mobile-menu');
            mainContent.classList.toggle('hide-item');
        }
    }
}

function openMobileMenuOnMainPageNEW() {
    let humburger = document.querySelector('.main_header--humburger');
    let wrpMobileMenu = document.querySelector('.main_header--mobile_menu');

    if (humburger !== null && wrpMobileMenu !== null) {
        humburger.onclick = () => {
            if (wrpMobileMenu.classList.contains('active-mobile-menu')) {
                wrpMobileMenu.style.height = '0px';
                wrpMobileMenu.classList.remove('active-mobile-menu');
            } else {
                let header = document.querySelector('.main_header--wrp_logo_desktop');
                let headerHeith = window.getComputedStyle(header).height;
                let clientHeight = document.documentElement.clientHeight;

                headerHeith = Number(headerHeith.substring(0, headerHeith.length - 2));
                wrpMobileMenu.style.height = `${clientHeight - headerHeith}px`;
                wrpMobileMenu.classList.add('active-mobile-menu');
            }
        }
    }
}

function openMobileMenu() {
    let humburger = document.querySelector('.white-header__humburger');
    let wrpMobileMenu = document.querySelector('.white-header__wrp-mobile-menu');

    if (humburger !== null && wrpMobileMenu !== null) {
        humburger.onclick = () => {
            if (wrpMobileMenu.classList.contains('active-mobile-menu')) {
                wrpMobileMenu.style.height = '0px';
                wrpMobileMenu.classList.remove('active-mobile-menu');
            } else {
                let header = document.querySelector('.white-header__wrp-logo-menu');
                let headerHeith = window.getComputedStyle(header).height;
                let clientHeight = document.documentElement.clientHeight;

                headerHeith = Number(headerHeith.substring(0, headerHeith.length - 2));
                wrpMobileMenu.style.height = `${clientHeight - headerHeith}px`;
                wrpMobileMenu.classList.add('active-mobile-menu');
            }
        }
    }
}



function showAndCloseModal() {
    const btn = document.querySelectorAll('.show-modal');
    const closeModal = document.querySelector('.modal-form__close-btn');
    const sections = document.querySelectorAll('section');
    const overlay = document.querySelector('.overlay');
    const modalForm = document.querySelector('.modal-form');

    if (btn !== null) {
        for (const button of btn) {
            button.onclick = () => {
                for (const section of sections) {
                    section.classList.add('have-blur');
                }
        
                overlay.classList.add('show-block');
                modalForm.classList.add('show-block');
            }
        }
    }

    if (closeModal !== null) {
        closeModal.onclick = () => {
            for (const section of sections) {
                section.classList.remove('have-blur');
            }
    
            overlay.classList.remove('show-block');
            modalForm.classList.remove('show-block');
        }
    }
}

function setHeightOnResize() {
    window.onresize = () => {
        heightSectionToEndScreen(document.querySelector('.wrap-main-content'), document.querySelector('.wrap-logo-menu'));
        heightSectionToEndScreen(document.querySelector('.contacts'), document.querySelector('.white-header'));      
    }
}

