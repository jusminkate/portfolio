/* =========================
FLOATING BOXES
========================= */

const floatingBoxes =
document.querySelectorAll('.floating-box');

window.addEventListener('mousemove', (e) => {

  const x =
    (window.innerWidth / 2 - e.pageX) / 60;

  const y =
    (window.innerHeight / 2 - e.pageY) / 60;

  floatingBoxes.forEach((box, index) => {

    box.style.transform =
      `translate(${x * (index + 1)}px,
      ${y * (index + 1)}px)`;

  });

});

/* =========================
PROJECT SLIDER
========================= */

const cards =
document.querySelectorAll('.project-card');

const dots =
document.querySelectorAll('.dot');

const track =
document.querySelector('.project-track');

function updateActiveCard(){

  let closestCard = null;

  let closestDistance = Infinity;

  cards.forEach((card,index)=>{

    const rect =
      card.getBoundingClientRect();

    const center =
      window.innerWidth / 2;

    const distance =
      Math.abs(
        rect.left +
        rect.width / 2 -
        center
      );

    if(distance < closestDistance){

      closestDistance = distance;

      closestCard = index;

    }

  });

  cards.forEach(card=>
    card.classList.remove('active')
  );

  dots.forEach(dot=>
    dot.classList.remove('active')
  );

  if(cards[closestCard]){
    cards[closestCard]
      .classList.add('active');
  }

  if(dots[closestCard]){
    dots[closestCard]
      .classList.add('active');
  }

}

track.addEventListener(
  'scroll',
  ()=>{

    updateActiveCard();

  }
);

dots.forEach((dot,index)=>{

  dot.addEventListener('click',()=>{

    cards[index].scrollIntoView({

      behavior:'smooth',
      inline:'center'

    });

  });

});

updateActiveCard();