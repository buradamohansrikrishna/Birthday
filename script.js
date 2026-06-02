// ======================================
// THE STORY HIDDEN IN TIME
// Premium Birthday Experience
// ======================================

// INTRO TEXT

const lines = [
  "Out of billions of days...",
  "Most are forgotten.",
  "Some become memories.",
  "One became..."
];

const introText = document.getElementById("introText");
const loader = document.getElementById("loader");

let currentLine = 0;

// ======================================
// TYPEWRITER EFFECT
// ======================================

function typeLine(text, callback) {

  let index = 0;

  introText.innerHTML = "";

  const typing = setInterval(() => {

    if (index < text.length) {

      introText.innerHTML += text.charAt(index);

      index++;

    } else {

      clearInterval(typing);

      setTimeout(callback, 1200);

    }

  }, 50);

}

// ======================================
// PLAY INTRO
// ======================================

function playIntro() {

  if (currentLine < lines.length) {

    typeLine(lines[currentLine], () => {

      currentLine++;

      playIntro();

    });

  } else {

    loader.style.transition = "opacity 1.5s ease";

   loader.style.opacity = "0";

setTimeout(() => {

  loader.remove();

  showBirthdayReveal();

},1500);

  }

}
function showBirthdayReveal(){

  const reveal =
    document.getElementById("birthdayReveal");

  reveal.style.visibility = "visible";

  reveal.style.opacity = "1";

  startHeartRain();

  sparkleBlast();

  setTimeout(() => {

    reveal.style.opacity = "0";

    setTimeout(() => {

      reveal.style.display = "none";

    },1000);

  },4000);

}

// ======================================
// START WEBSITE
// ======================================

window.addEventListener("load", () => {

  playIntro();

  initializeAnimations();

  createParticles();

});

// ======================================
// SCROLL REVEAL ANIMATION
// ======================================

function initializeAnimations() {

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

      }

    });

  }, {
    threshold: 0.2
  });

  document.querySelectorAll(
    ".timeline-item, .photo-card, .glass-card, .fact"
  ).forEach((element) => {

    element.classList.add("hidden");

    observer.observe(element);

  });

}

// ======================================
// SMOOTH SCROLL BUTTONS
// ======================================

document.addEventListener("click", (e) => {

  if (e.target.matches('a[href^="#"]')) {

    e.preventDefault();

    const target = document.querySelector(
      e.target.getAttribute("href")
    );

    if (target) {

      target.scrollIntoView({
        behavior: "smooth"
      });

    }

  }

});

// ======================================
// PARTICLE SYSTEM
// ======================================

function createParticles() {

  const canvas = document.getElementById("particles");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  const particleCount = 80;

  class Particle {

    constructor() {

      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;

      this.size = Math.random() * 3 + 1;

      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;

      this.opacity = Math.random();

    }

    update() {

      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;

      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;

    }

    draw() {

      ctx.beginPath();

      ctx.arc(
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(255,255,255,${this.opacity})`;

      ctx.fill();

    }

  }

  for (let i = 0; i < particleCount; i++) {

    particles.push(new Particle());

  }

  function animate() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    particles.forEach((particle) => {

      particle.update();

      particle.draw();

    });

    requestAnimationFrame(animate);

  }

  animate();

  window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

  });

}

// ======================================
// TIMELINE GLOW EFFECT
// ======================================

window.addEventListener("scroll", () => {

  const timelineItems =
    document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item) => {

    const rect = item.getBoundingClientRect();

    if (
      rect.top < window.innerHeight * 0.8 &&
      rect.bottom > 0
    ) {

      item.classList.add("active");

    }

  });

});

// ======================================
// GALLERY HOVER EFFECT
// ======================================

document.querySelectorAll(".photo-card")
.forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY =
      ((x / rect.width) - 0.5) * 20;

    const rotateX =
      ((y / rect.height) - 0.5) * -20;

    card.style.transform =
      `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
      `;

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

  });

});

// ======================================
// HERO PARALLAX
// ======================================

window.addEventListener("scroll", () => {

  const hero = document.querySelector(".hero");

  if (!hero) return;

  const scroll = window.scrollY;

  hero.style.transform =
    `translateY(${scroll * 0.2}px)`;

});

// ======================================
// END OF FILE
// ======================================
// ======================================
// LIGHTBOX GALLERY
// ======================================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery-image").forEach((img) => {

  img.addEventListener("click", () => {

    lightbox.style.display = "flex";

    lightboxImg.src = img.src;

    document.body.style.overflow = "hidden";

  });

});

if(closeLightbox){

  closeLightbox.addEventListener("click", () => {

    lightbox.style.display = "none";

    document.body.style.overflow = "auto";

  });

}

if(lightbox){

  lightbox.addEventListener("click", (e) => {

    if(e.target === lightbox){

      lightbox.style.display = "none";

      document.body.style.overflow = "auto";

    }

  });

}

// ======================================
// MUSIC BUTTON
// ======================================

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let musicPlaying = false;

if(musicBtn && bgMusic){

  musicBtn.addEventListener("click", () => {

    if(musicPlaying){

      bgMusic.pause();

      musicBtn.innerHTML = "🎵";

      musicPlaying = false;

    }else{

      bgMusic.play();

      musicBtn.innerHTML = "⏸";

      musicPlaying = true;

    }

  });

}

// ======================================
// FLOATING HEARTS
// ======================================

function createHeart(){

  const heart = document.createElement("div");

  heart.innerHTML = "❤";

  heart.style.position = "fixed";

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.bottom = "-20px";

  heart.style.fontSize =
    Math.random() * 15 + 15 + "px";

  heart.style.opacity = "0.7";

  heart.style.pointerEvents = "none";

  heart.style.zIndex = "999";

  heart.style.color = "#ff5c8a";

  document.body.appendChild(heart);

  let pos = -20;

  const rise = setInterval(() => {

    pos += 2;

    heart.style.bottom = pos + "px";

    heart.style.opacity =
      parseFloat(heart.style.opacity) - 0.003;

    if(pos > window.innerHeight){

      clearInterval(rise);

      heart.remove();

    }

  },20);

}

setInterval(createHeart,3000);

// ======================================
// BIRTHDAY GLOW EFFECT
// ======================================

window.addEventListener("scroll", () => {

  const finalSection =
    document.querySelector(".final-message");

  if(!finalSection) return;

  const rect =
    finalSection.getBoundingClientRect();

  if(rect.top < window.innerHeight * 0.7){

    finalSection.style.boxShadow =
      "0 0 80px rgba(255,215,0,.25)";

  }

});

// ======================================
// SIMPLE SPARKLES
// ======================================

function sparkle(){

  const star = document.createElement("div");

  star.innerHTML = "✨";

  star.style.position = "fixed";

  star.style.left =
    Math.random() * window.innerWidth + "px";

  star.style.top =
    Math.random() * window.innerHeight + "px";

  star.style.pointerEvents = "none";

  star.style.zIndex = "998";

  document.body.appendChild(star);

  setTimeout(() => {

    star.remove();

  },1500);

}

setInterval(sparkle,2500);

function startHeartRain(){

  for(let i=0;i<80;i++){

    setTimeout(()=>{

      const heart =
      document.createElement("div");

      heart.innerHTML="❤️";

      heart.style.position="fixed";

      heart.style.left=
      Math.random()*100+"vw";

      heart.style.top="-50px";

      heart.style.fontSize=
      (20+Math.random()*25)+"px";

      heart.style.zIndex="999999";

      document.body.appendChild(heart);

      let pos=-50;

      const fall=setInterval(()=>{

        pos+=5;

        heart.style.top=
        pos+"px";

        if(pos>
        window.innerHeight+100){

          clearInterval(fall);

          heart.remove();

        }

      },16);

    },i*60);

  }

}

function sparkleBlast(){

  for(let i=0;i<120;i++){

    const sparkle=
    document.createElement("div");

    sparkle.innerHTML="✨";

    sparkle.style.position="fixed";

    sparkle.style.left=
    Math.random()*100+"vw";

    sparkle.style.top=
    Math.random()*100+"vh";

    sparkle.style.fontSize="25px";

    sparkle.style.zIndex="999999";

    document.body.appendChild(sparkle);

    setTimeout(()=>{

      sparkle.remove();

    },3000);

  }

}