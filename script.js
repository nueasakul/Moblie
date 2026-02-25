// ==========================================
// 1. Logic สำหรับการ Scroll (Smart Navbar)
// ==========================================
let lastScrollTop = 0;
const navbar = document.getElementById("main-nav");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // ดักจับว่าถ้าเลื่อนลงเกิน 80px ให้ซ่อนเมนู
    if (scrollTop > lastScrollTop && scrollTop > 80) {
        navbar.style.top = "-80px";
    } else {
        navbar.style.top = "0";
    }
    
    // ป้องกันค่าติดลบตอนเลื่อนสุดจอบนมือถือ
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});

// ==========================================
// 2. Logic สำหรับ Hamburger Menu (Mobile)
// ==========================================
function toggleMenu() {
    const menu = document.getElementById("menu-container");
    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
    } else {
        menu.classList.add("show");
    }
}

// ==========================================
// 3. Logic สำหรับ Multi-Slider (ทำงานได้หลายอัน)
// ==========================================
// ค้นหา Slider ทุกอันบนหน้าเว็บ
const allSliders = document.querySelectorAll('.slider-container');

// สั่งให้แต่ละ Slider ทำงานแยกกัน
allSliders.forEach((slider) => {
    const wrapper = slider.querySelector('.slider-wrapper');
    const slides = slider.querySelectorAll('.slide-item');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlide;

    // ฟังก์ชันเลื่อนรูปเฉพาะของ Slider ตัวนี้
    function updateSlider() {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // ฟังก์ชันคำนวณและสั่งเลื่อน
    function moveSlide(direction) {
        currentIndex += direction;

        if (currentIndex >= totalSlides) {
            currentIndex = 0; // ทะลุขวา กลับไปหน้าแรก
        } else if (currentIndex < 0) {
            currentIndex = totalSlides - 1; // ทะลุซ้าย ไปหน้าสุดท้าย
        }
        
        updateSlider();
        resetTimer(); // ถอน Auto slide แล้วนับใหม่
    }

    // ฟังก์ชันรีเซ็ตเวลา
    function resetTimer() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            moveSlide(1);
        }, 5000);
    }

    // ผูก Event ให้ปุ่มกดทำงาน
    if (prevBtn) prevBtn.addEventListener('click', () => moveSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => moveSlide(1));

    // สั่งให้เริ่ม Auto Slide
    autoSlide = setInterval(() => {
        moveSlide(1);
    }, 5000);
});