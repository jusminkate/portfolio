const wrap = document.getElementById("wrap");

/* =========================
REVEAL EFFECT
========================= */

wrap.addEventListener("mousemove", (e) => {

  const rect = wrap.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  wrap.style.setProperty("--x", `${x}px`);
  wrap.style.setProperty("--y", `${y}px`);

});

/* =========================
SAFE PARALLAX
(DESKTOP ONLY)
========================= */

if(window.innerWidth > 900){

  document.addEventListener("mousemove", (e) => {

    const x =
      (window.innerWidth / 2 - e.pageX) / 80;

    const y =
      (window.innerHeight / 2 - e.pageY) / 80;

    wrap.style.transform =
      `translate3d(${x}px, ${y}px, 0)`;

  });

}