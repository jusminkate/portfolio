
const floatingBoxes = document.querySelectorAll('.floating-box');

window.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.pageX) / 60;
  const y = (window.innerHeight / 2 - e.pageY) / 60;

  floatingBoxes.forEach((box, index) => {
    box.style.transform = `translate(${x * (index + 1)}px, ${y * (index + 1)}px)`;
  });
});

function setupAboutCardStack() {
  const cards = Array.from(document.querySelectorAll('.about-stack-container .cyber-card'));
  if (cards.length === 0) return;

  let order = cards.map((_, i) => i);

  function updateStackTransitions() {
    const isMobile = window.innerWidth <= 1000;

    order.forEach((cardIndex, depthIndex) => {
      const card = cards[cardIndex];
      
      card.setAttribute('data-depth', depthIndex);

      if (depthIndex === 0) {
        card.style.transform = `translate3d(0px, 0px, 0) scale(1) rotate(0deg)`;
        card.style.opacity = '1';
        card.style.zIndex = '3';
        card.style.pointerEvents = 'auto'; 
      } else if (depthIndex === 1) {
        
        const translateX = isMobile ? 15 : 45;
        const translateY = isMobile ? 15 : 0;
        const rotateDeg = isMobile ? 0 : 3;

        card.style.transform = `translate3d(${translateX}px, ${translateY}px, -10px) scale(0.95) rotate(${rotateDeg}deg)`;
        card.style.opacity = '0.70';
        card.style.zIndex = '2';
        card.style.pointerEvents = 'none';
      } else {
        
        const translateX = isMobile ? 30 : 85;
        const translateY = isMobile ? 30 : 0;
        const rotateDeg = isMobile ? 0 : 6;

        card.style.transform = `translate3d(${translateX}px, ${translateY}px, -20px) scale(0.90) rotate(${rotateDeg}deg)`;
        card.style.opacity = '0.35';
        card.style.zIndex = '1';
        card.style.pointerEvents = 'none';
      }
    });
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const currentDepth = order.indexOf(parseInt(card.getAttribute('data-index')));

      if (currentDepth === 0) {
        const frontCard = order.shift();
        order.push(frontCard);

        updateStackTransitions();
      }
    });
  });

  updateStackTransitions();
  window.addEventListener('resize', updateStackTransitions);
}

function setupCarousel(trackSelector, cardSelector, dotSelector) {
  const track = document.querySelector(trackSelector);
  const cards = document.querySelectorAll(cardSelector);
  const dots = document.querySelectorAll(dotSelector);

  if (!track || cards.length === 0) return;

  function updateActiveState() {
    let closestIndex = 0;
    let closestDistance = Infinity;
    const trackLeft = track.getBoundingClientRect().left;
    const trackWidth = track.offsetWidth;
    const isMobile = window.innerWidth <= 768;
    const referencePoint = isMobile ? trackLeft + 30 : trackLeft + (trackWidth / 2);

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = isMobile ? rect.left : rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - referencePoint);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (cards[closestIndex]) cards[closestIndex].classList.add('active');
    if (dots[closestIndex]) dots[closestIndex].classList.add('active');
  }

  track.addEventListener('scroll', updateActiveState);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (!cards[index]) return;
      
      const trackWidth = track.offsetWidth;
      const cardOffsetLeft = cards[index].offsetLeft;
      const cardWidth = cards[index].offsetWidth;
      const isMobile = window.innerWidth <= 768;

      let scrollTarget;
      if (isMobile) {
        scrollTarget = cardOffsetLeft - 20; 
      } else {
        scrollTarget = cardOffsetLeft - (trackWidth / 2) + (cardWidth / 2);
      }

      track.scrollTo({
        left: scrollTarget,
        behavior: 'smooth'
      });
    });
  });

  function initPositioning() {
    const isMobile = window.innerWidth <= 768;
    if (cards[0]) {
      if (isMobile) {
        track.scrollLeft = 0;
      } else {
        const trackWidth = track.offsetWidth;
        const cardOffsetLeft = cards[0].offsetLeft;
        const cardWidth = cards[0].offsetWidth;
        const scrollTarget = cardOffsetLeft - (trackWidth / 2) + (cardWidth / 2);
        track.scrollLeft = scrollTarget;
      }
    }
    updateActiveState();
  }

  setTimeout(initPositioning, 250);
  window.addEventListener('resize', updateActiveState);
}

/* =========================
INITIALIZE PORTFOLIO CORE
========================= */
window.addEventListener('DOMContentLoaded', () => {
  
  setupAboutCardStack();

  setupCarousel('.projects-slider .project-track', '.project-card', '.slider-dots .dot');

  setupCarousel('.cert-slider .cert-track', '.cert-card', '.cert-dots .cert-dot');
});