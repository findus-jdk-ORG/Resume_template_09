// Dynamic
document.addEventListener("DOMContentLoaded", () => {
  const c = siteContent;

  // HERO SECTION
  const heroSection = document.querySelector(".s-hero__content-about");
  heroSection.querySelector("h1").textContent = c.hero.name;
  heroSection.querySelector("h3").innerHTML = c.hero.description;

  const socialEl = heroSection.querySelector(".s-hero__content-social");
  c.hero.social.forEach(s => {
    const a = document.createElement("a");
    a.href = s.link;
    a.target = "_blank";
    a.innerHTML = `<i class="${s.icon}"></i>`;
    socialEl.appendChild(a);
  });

  // ABOUT SECTION
  const aboutSection = document.querySelector(".s-about__content");
  aboutSection.querySelector("h3").textContent = c.about.title;
  aboutSection.querySelector("p").textContent = c.about.description;

  // CAREER SECTION
  const careerSection = document.querySelectorAll(".s-resume__section")[0]
    .querySelector(".column.large-9");
  careerSection.innerHTML = "";
  c.career.forEach(job => {
    careerSection.innerHTML += `
      <div class="resume-block">
        <div class="resume-block__header">
          <h4 class="h3">${job.company}</h4>
          <p class="resume-block__header-meta">
            <span>${job.role}</span>
            <span class="resume-block__header-date">${job.period}</span>
          </p>
        </div>
        <p>${job.description}</p>
      </div>`;
  });

  // EDUCATION SECTION
  const educationSection = document.querySelectorAll(".s-resume__section")[1]
    .querySelector(".column.large-9");
  educationSection.innerHTML = "";
  c.education.forEach(edu => {
    educationSection.innerHTML += `
      <div class="resume-block">
        <div class="resume-block__header">
          <h4 class="h3">${edu.institute}</h4>
          <p class="resume-block__header-meta">
            <span>${edu.degree}</span>
            <span class="resume-block__header-date">${edu.year}</span>
          </p>
        </div>
        <p>${edu.description}</p>
      </div>`;
  });

  // SKILLS SECTION
  const skillsList = document.querySelector(".skill-bars-fat");
  skillsList.innerHTML = "";
  c.skills.forEach(skill => {
    skillsList.innerHTML += `
      <li>
        <div class="progress ${skill.level}"></div>
        <strong>${skill.name}</strong>
      </li>`;
  });

  // PORTFOLIO
  const portfolioGrid = document.querySelector(".folio-list");
  portfolioGrid.innerHTML = "";
  c.portfolio.forEach((p, i) => {
    const modalId = `modal-${i + 1}`;
    portfolioGrid.innerHTML += `
      <div class="column folio-item">
        <a href="#${modalId}" class="folio-item__thumb">
          <img src="${p.thumb}" alt="${p.title}">
        </a>
      </div>`;

    const modalContainer = document.createElement("div");
    modalContainer.id = modalId;
    modalContainer.hidden = true;
    modalContainer.innerHTML = `
      <div class="modal-popup">
        <img src="${p.gallery}" alt="${p.title}" />
        <div class="modal-popup__desc">
          <h5>${p.title}</h5>
          <p>${p.description}</p>
          <ul class="modal-popup__cat">
            ${p.categories.map(cat => `<li>${cat}</li>`).join("")}
          </ul>
        </div>
        <a href="#" class="modal-popup__details">Project link</a>
      </div>`;
    document.querySelector(".s-portfolio").appendChild(modalContainer);
  });

  // TESTIMONIALS
  const testimonialWrapper = document.querySelector(".testimonial-slider .swiper-wrapper");
  testimonialWrapper.innerHTML = "";
  c.testimonials.forEach(t => {
    testimonialWrapper.innerHTML += `
      <div class="testimonial-slider__slide swiper-slide">
        <div class="testimonial-slider__author">
          <img src="${t.img}" class="testimonial-slider__avatar" />
          <cite class="testimonial-slider__cite">
            <strong>${t.name}</strong>
            <span>${t.title}</span>
          </cite>
        </div>
        <p>${t.text}</p>
      </div>`;
  });

  // CONTACT
  const contactSection = document.querySelector(".s-about__content-bottom");
  contactSection.querySelector("p").innerHTML = `
    <a href="tel:${c.contact.phone}">${c.contact.phone}</a><br>
    <a href="mailto:${c.contact.email}">${c.contact.email}</a>`;
});

// End

(function(html) {

    "use strict";
    
    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';

    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        window.addEventListener('load', function() {
            
            document.querySelector('body').classList.remove('ss-preload');
            document.querySelector('body').classList.add('ss-loaded');

            preloader.addEventListener('transitionend', function(e) {
                if (e.target.matches("#preloader")) {
                    this.style.display = 'none';
                }
            });

        });

    }; 

    const ssParallax = function() { 

        const rellax = new Rellax('.rellax');

    };

    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#hero');
        let triggerHeight;

        if (!(hdr && hero)) return;

        setTimeout(function(){
            triggerHeight = hero.offsetHeight - 170;
        }, 300);

        window.addEventListener('scroll', function () {

            let loc = window.scrollY;
           

            if (loc > triggerHeight) {
                hdr.classList.add('sticky');
            } else {
                hdr.classList.remove('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.classList.add('offset');
            } else {
                hdr.classList.remove('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.classList.add('scrolling');
            } else {
                hdr.classList.remove('scrolling');
            }

        });

    };

    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const headerNavWrap = document.querySelector('.s-header__nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && headerNavWrap)) return;

        toggleButton.addEventListener('click', function(event){
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        headerNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {
            link.addEventListener("click", function(evt) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    };

    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");
            
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(".s-header__nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
                } else {
                    document.querySelector(".s-header__nav a[href*=" + sectionId + "]").parentNode.classList.remove("current");
                }
            });
        }

    };

    const ssSwiper = function() {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },          
            breakpoints: {
                // when window width is >= 401px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 801px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 48
                }
            }
         });

    };

    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-item a');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function(instance) {
                        //detect Escape key press
                        document.addEventListener("keydown", function(evt) {
                            evt = evt || window.event;
                            if(evt.keyCode === 27){
                            instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                modals[index].show();
            });
        });

    };

    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box) {

            box.addEventListener('click', function(e){
                if (e.target.matches(".alert-box__close")) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add("hideit");

                    setTimeout(function() {
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    };

    const ssSmoothScroll = function () {
        
        const triggers = document.querySelectorAll(".smoothscroll");

        triggers.forEach(function(trigger) {
            trigger.addEventListener("click", function() {
                const target = trigger.getAttribute("href");

                Jump(target, {
                    duration: 1200,
                });
            });
        });

    };

    const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if(!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    };

    (function ssInit() {

        ssPreloader();
        ssParallax();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();

    })();

})(document.documentElement);