// ==========================================
// 1. Firebase System Configuration
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyAfHWDDZuwsMJo6TvD68qhtaw2NaxhVJ1I",
    authDomain: "elbanna-booking.firebaseapp.com",
    projectId: "elbanna-booking",
    storageBucket: "elbanna-booking.firebasestorage.app",
    messagingSenderId: "966174025626",
    appId: "1:966174025626:web:63a689f8030f3061b97c23",
    measurementId: "G-7T502DC0TL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ==========================================
// 2. Smooth Loading Screen Fade Out
// ==========================================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if(loader) {
        setTimeout(() => {  
            loader.style.opacity = "0";  
            loader.style.visibility = "hidden";  
            triggerHeroAnimations();
        }, 1200);
    }
});

function triggerHeroAnimations() {
    const heroContent = document.querySelector(".heroContent");
    if(heroContent) {
        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateY(30px)";
        heroContent.style.transition = "all 1s ease";
        setTimeout(() => {
            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateY(0)";
        }, 100);
    }
}

// ==========================================
// 3. Smart Booking Submission Process
// ==========================================
const form = document.getElementById("bookingForm");
if(form) {
    form.addEventListener("submit", function(e){
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let stage = document.getElementById("stage").value;

        if(name == "" || phone == "" || stage == ""){
            alert("من فضلك أكمل جميع البيانات المطلوبة للحجز!");
            return;
        }

        db.collection("bookings").add({
            studentName: name,
            studentPhone: phone,
            studentStage: stage,
            time: new Date()
        })
        .then(() => {
            alert("✅ تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريباً جداً.");
            form.reset();
        })
        .catch((error) => {
            alert("حدث خطأ ما، يرجى المحاولة مرة أخرى: " + error.message);
        });
    });
}

// ==========================================
// 4. Advanced Fluid Card Hover & Press Effects
// ==========================================
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-15px) scale(1.04)";
        card.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0px) scale(1)";
        card.style.boxShadow = "none";
    });
});

document.querySelectorAll("button, .heroBtn").forEach(btn => {
    btn.style.transition = "all 0.2s ease";
    btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(0.94)";
    });
    btn.addEventListener("mouseup", () => {
        btn.style.transform = "scale(1)";
    });
});

// ==========================================
// 5. Scroll Animations (Fade In Sections)
// ==========================================
const sections = document.querySelectorAll(".fade-in-section");
const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

let countersStarted = false; // لمنع تكرار العداد عند الصعود والنزول

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            if(entry.target.id === "stats" && !countersStarted) { 
                countersStarted = true; 
                startCounters(); 
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(sec => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(40px)";
    sec.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    sectionObserver.observe(sec);
});

// ==========================================
// 6. Interactive Stats Counters (Fixed & Stable)
// ==========================================
function startCounters() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const speed = target / 40; 

        const updateCount = () => {
            count = count + speed;
            if (count < target) {
                if(target === 2500) counter.innerText = "+" + Math.ceil(count);
                else if(target === 98) counter.innerText = Math.ceil(count) + "%";
                else counter.innerText = Math.ceil(count) + "+";
                setTimeout(updateCount, 30);
            } else {
                if(target === 2500) counter.innerText = "+" + target;
                else if(target === 98) counter.innerText = target + "%";
                else counter.innerText = target + "+";
            }
        };
        updateCount();
    });
}

// ==========================================
// 7. Dynamic Footer Auto-Date System
// ==========================================
const copyElement = document.querySelector(".copy");
if(copyElement) {
    copyElement.innerHTML = "© " + new Date().getFullYear() + " جميع الحقوق محفوظة لـ أ / السيد البنا";
}

// ==========================================
// 8. Elegant Styles Injection for Developer Badge
// ==========================================
const customStyles = `
.fade-in-section { opacity: 0; transform: translateY(40px); }
.developer-badge-container {
    display: block;
    text-align: center;
    padding: 30px 15px;
    background: #0f111a;
    border-top: 1px solid #1e2235;
    position: relative;
    overflow: hidden;
}
.dev-badge {
    display: inline-block;
    padding: 15px 35px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 50px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    transition: all 0.5s ease;
}
.dev-badge:hover {
    transform: translateY(-5px);
    border-color: #0072ff;
    box-shadow: 0 15px 40px rgba(0, 114, 255, 0.3);
}
.dev-icon {
    font-size: 18pt;
    color: #0072ff;
    vertical-align: middle;
    margin-left: 10px;
    animation: devPulse 2s infinite ease-in-out;
}
.dev-text {
    font-size: 11pt;
    color: #a0aec0;
    font-family: 'Cairo', sans-serif;
    margin-left: 8px;
}
.dev-name {
    font-size: 12pt;
    color: #ffffff;
    font-family: 'Cairo', sans-serif;
    text-shadow: 0 0 10px rgba(255,255,255,0.2);
}
@keyframes devPulse {
    0% { transform: scale(1); opacity: 0.8; text-shadow: 0 0 0 rgba(0,114,255,0); }
    50% { transform: scale(1.1); opacity: 1; text-shadow: 0 0 15px rgba(0,114,255,0.8); }
    100% { transform: scale(1); opacity: 0.8; text-shadow: 0 0 0 rgba(0,114,255,0); }
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);
        
