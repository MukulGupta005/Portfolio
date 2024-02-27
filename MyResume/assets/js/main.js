/**
* Template Name: MyResume
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
    
const $ = (s, o = document) => o.querySelector(s);
const $$ = (s, o = document) => o.querySelectorAll(s);

function downloadResume() {
  // Specify the path to your PDF file
  var pdfPath = 'MyResume/assets/Mukul_s_CV (1).pdf';

  // Create an anchor element
  var a = document.createElement('a');

  // Set the href attribute to the path of the PDF file
  a.href = pdfPath;

  // Set the download attribute to specify the default filename
  a.download = 'Mukul_s_CV.pdf';

  // Append the anchor element to the document body
  document.body.appendChild(a);

  // Trigger a click event on the anchor element to start the download
  a.click();

  // Remove the anchor element from the document body
  document.body.removeChild(a);
}

$$('.buttonA').forEach(button => {
  let count = { number: 0 },
    icon = $('.icon', button),
    iconDiv = $('.icon > div', button),
    arrow = $('.icon .arrow', button),
    countElem = $('span', button),
    svgPath = new Proxy({
      y: null,
      s: null,
      f: null,
      l: null
    }, {
      set(target, key, value) {
        target[key] = value;
        if (target.y !== null && target.s != null && target.f != null && target.l != null) {
          arrow.innerHTML = getPath(target.y, target.f, target.l, target.s, null);
        }
        return true;
      },
      get(target, key) {
        return target[key];
      }
    });

  svgPath.y = 30;
  svgPath.s = 0;
  svgPath.f = 8;
  svgPath.l = 32;

    // Add both 'click' and 'touchstart' event listeners
  button.addEventListener('click', handleButtonClick);
  button.addEventListener('touchstart', handleButtonClick);

  function handleButtonClick(e) {
    if (!button.classList.contains('loading')) {
      if (!button.classList.contains('animation')) {
        button.classList.add('loading', 'animation');

  button.addEventListener('click', e => {
    if (!button.classList.contains('loading')) {
      if (!button.classList.contains('animation')) {
        button.classList.add('loading', 'animation');

        gsap.to(svgPath, {
          f: 2,
          l: 38,
          duration: .3,
          delay: .15
        });

        gsap.to(svgPath, {
          s: .2,
          y: 16,
          duration: .8,
          delay: .15,
          ease: Elastic.easeOut.config(1, .4)
        });

        gsap.to(count, {
          number: '100',
          duration: 3.8,
          delay: .8,
          onUpdate() {
            countElem.innerHTML = Math.round(count.number) + '%';
          }
        });

        setTimeout(() => {
          iconDiv.style.setProperty('overflow', 'visible');
          setTimeout(() => {
            button.classList.remove('animation');
          }, 600);
        }, 4820);
      }
    } else {
      if (!button.classList.contains('animation')) {
        button.classList.add('reset');

        gsap.to(svgPath, {
          f: 8,
          l: 32,
          duration: .4
        });

        gsap.to(svgPath, {
          s: 0,
          y: 30,
          duration: .4
        });

        setTimeout(() => {
          button.classList.remove('loading', 'reset');
          iconDiv.removeAttribute('style');
        }, 400);
      }
    }
    e.preventDefault();
  });
});

function getPoint(point, i, a, smoothing) {
  let cp = (current, previous, next, reverse) => {
    let p = previous || current,
      n = next || current,
      o = {
        length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
        angle: Math.atan2(n[1] - p[1], n[0] - p[0])
      },
      angle = o.angle + (reverse ? Math.PI : 0),
      length = o.length * smoothing;
    return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
  },
    cps = cp(a[i - 1], a[i - 2], point, false),
    cpe = cp(point, a[i - 1], a[i + 1], true);
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, first, last, smoothing, pointsNew) {
  let points = pointsNew ? pointsNew : [
    [first, 16],
    [20, update],
    [last, 16]
  ],
    d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
  return `<path d="${d}" />`;
}

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()
  
