// ==========================================
// 1. Firebase Live System Configuration
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
// 2. Cinematic Loader Fade-out System
// ==========================================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if(loader) {
        setTimeout(() => {  
            loader.style.opacity = "0";  
            loader.style.visibility = "hidden";  
            animateHeroText();
        }, 1500);
    }
});

function animateHeroText() {
    const heroElements = document.querySelectorAll(".heroContent > *");
    heroElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, index * 150);
    });
}

// ==========================================
// 3. Secured Booking Form Submission (Firebase)
// ==========================================
const form = document.getElementById("bookingForm");
if(form) {
    form.addEventListener("submit", function(e){
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let stage = document.getElementById("stage").value;

        if(name == "" || phone == "" || stage == ""){
            alert("من فضلك، قم باستكمال كافة حقول الحجز أولاً!");
            return;
        }

        db.collection("bookings").add({
            studentName: name,
            studentPhone: phone,
            studentStage: stage,
            time: new Date()
        })
        .then(() => {
            alert("✅ تم تسجيل طلب الحجز بنجاح عالي! سيتم التواصل معكم هاتفياً أو عبر واتساب لتأكيد المقعد.");
            form.reset();
        })
        .catch((error) => {
            alert("فشل إرسال البيانات، يرجى التحقق من الشبكة وإعادة المحاولة: " + error.message);
        });
    });
}

// ==========================================
// 4. Advanced Parallax Scrolling & Reveals
// ==========================================
const sections = document.querySelectorAll(".premium-section");
const obsOptions = { threshold: 0.1, rootMargin: "0px 0px -40px 0px" };
let isStatsAnimated = false;

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            if(entry.target.id === "stats" && !isStatsAnimated) {
                isStatsAnimated = true;
                runStatsCounter();
            }
            observer.unobserve(entry.target);
        }
    });
}, obsOptions);

sections.forEach(sec => {
    sec.classList.add("section-hidden");
    scrollObserver.observe(sec);
});

// ==========================================
// 5. Stable Numerical Counter Dynamics
// ==========================================
function runStatsCounter() {
    const counters = document.querySelectorAll(".stat-number");
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let currentNum = 0;
        const increments = target / 50;

        const update = () => {
            currentNum += increments;
            if(currentNum < target) {
                if(target === 2500) counter.innerText = "+" + Math.ceil(currentNum);
                else if(target === 98) counter.innerText = Math.ceil(currentNum) + "%";
                else counter.innerText = Math.ceil(currentNum) + "+";
                setTimeout(update, 25);
            } else {
                if(target === 2500) counter.innerText = "+" + target;
                else if(target === 98) counter.innerText = target + "%";
                else counter.innerText = target + "+";
            }
        };
        update();
    });
}

// ==========================================
// 6. Luxury UI Engine Design Styles Injection (CSS)
// ==========================================
const premiumCSS = `
:root {
    --bg-dark: #070913;
    --card-bg: rgba(18, 22, 41, 0.65);
    --neon-blue: #00f2fe;
    --neon-purple: #4facfe;
    --text-white: #ffffff;
    --gold: #f6d365;
}
body.dark-theme {
    background-color: var(--bg-dark);
    color: #e2e8f0;
    margin: 0;
    font-family: 'Cairo', sans-serif;
    overflow-x: hidden;
}
#loader {
    position: fixed; top:0; left:0; width:100%; height:100%;
    background: #070913; z-index: 99999; display: flex;
    justify-content: center; align-items: center; transition: all 0.6s ease;
}
.loader-content { text-align: center; }
.loader-pulse {
    width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
    animation: pulseGlow 1.5s infinite ease-in-out; margin: 0 auto 20px;
}
.loader-logo-text { font-size: 16pt; font-weight: 900; color: #fff; letter-spacing: 2px; }
@keyframes pulseGlow {
    0% { transform: scale(0.8); opacity: 0.5; box-shadow: 0 0 0 0 rgba(0, 242, 254, 0.7); }
    50% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 30px 10px rgba(79, 172, 254, 0.4); }
    100% { transform: scale(0.8); opacity: 0.5; box-shadow: 0 0 0 0 rgba(0, 242, 254, 0); }
}
.glass-nav {
    position: fixed; top: 15px; left: 5%; width: 90%; height: 70px;
    background: rgba(10, 14, 31, 0.75); backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px;
    z-index: 5000; box-shadow: 0 10px 40px rgba(0,0,0,0.4);
}
.nav-container {
    display: flex; justify-content: space-between; align-items: center;
    height: 100%; padding: 0 25px;
}
.logoArea { display: flex; align-items: center; position: relative; }
.logoArea img { width: 42px; height: 42px; z-index: 2; }
.logoArea span { color: #fff; font-weight: 900; font-size: 15pt; margin-right: 10px; z-index: 2; letter-spacing: 1px; }
.logo-glow { position: absolute; width: 45px; height: 45px; background: var(--neon-blue); filter: blur(15px); opacity: 0.6; }
.menu { display: flex; align-items: center; gap: 20px; }
.nav-link { color: #a0aec0; text-decoration: none; font-size: 10.5pt; font-weight: 600; transition: .3s; }
.nav-link:hover { color: var(--neon-blue); transform: translateY(-2px); }
.nav-btn {
    background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
    color: #070913; padding: 10px 22px; border-radius: 12px;
    text-decoration: none; font-weight: 700; font-size: 10.5pt;
    box-shadow: 0 5px 20px rgba(0, 242, 254, 0.3); transition: .3s;
}
.nav-btn:hover { transform: scale(1.05); box-shadow: 0 8px 25px rgba(0, 242, 254, 0.5); }
.nav-socials { display: flex; gap: 12px; }
.social-icon-top { color: #fff; width: 35px; height: 35px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; justify-content: center; align-items: center; text-decoration: none; transition: .3s; }
.social-icon-top:hover { background: var(--neon-blue); color: #070913; }

.hero-premium {
    position: relative; min-height: 100vh; padding-top: 140px; box-sizing: border-box;
    display: flex; justify-content: center; align-items: center; text-align: center;
}
.hero-grid-bg { position: absolute; top:0; left:0; width:100%; height:100%; background-image: linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.5; }
.hero-circle-glow { position: absolute; width: 500px; height: 500px; background: radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, transparent 70%); filter: blur(30px); top: 20%; left: 30%; pointer-events: none; }
.heroContent { max-width: 850px; padding: 0 20px; z-index: 5; }
.badge-2027 { display: inline-block; padding: 8px 20px; background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 30px; margin-bottom: 25px; }
.badge-2027 span { color: var(--neon-blue); font-size: 10pt; font-weight: 700; }
.main-logo-wrapper { position: relative; width: 120px; height: 120px; margin: 0 auto 20px; }
.mainLogo { width: 100%; height: 100%; object-fit: contain; }
.logo-ring { position: absolute; width: 130px; height: 130px; border: 2px dashed rgba(79, 172, 254, 0.4); border-radius: 50%; top:-7px; left:-5px; animation: spin 20s linear infinite; }
@keyframes spin { 100% { transform: rotate(300deg); } }
.heroContent h1 { font-size: 45pt; font-weight: 900; color: #fff; margin: 0; text-shadow: 0 4px 20px rgba(0,0,0,0.6); }
.sub-title { font-size: 18pt; font-weight: 600; color: var(--neon-blue); margin: 10px 0 20px; }
.hero-p { font-size: 13pt; color: #a0aec0; line-height: 1.8; margin-bottom: 35px; }
.hero-actions { display: flex; justify-content: center; gap: 15px; }
.btn-primary-neon { background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); color: #070913; padding: 15px 35px; border-radius: 14px; text-decoration: none; font-weight: 700; font-size: 12pt; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 30px rgba(0,242,254,0.3); transition: .3s; }
.btn-primary-neon:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(0,242,254,0.5); }
.btn-secondary-glass { background: rgba(255,255,255,0.03); color: #fff; padding: 15px 35px; border-radius: 14px; text-decoration: none; font-weight: 600; font-size: 12pt; border: 1px solid rgba(255,255,255,0.1); transition: .3s; }
.btn-secondary-glass:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }

.standard-padding { padding: 100px 5%; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-tag { font-size: 9.5pt; font-weight: 800; color: var(--neon-purple); text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 10px; }
.section-tag-light { font-size: 9.5pt; font-weight: 800; color: var(--neon-blue); text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 10px; }
.section-header h2 { font-size: 28pt; font-weight: 800; color: #fff; margin: 0; }
.header-line { width: 70px; height: 4px; background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple)); margin: 15px auto 0; border-radius: 2px; }

.about-card-glow { background: var(--card-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; padding: 40px; max-width: 900px; margin: 0 auto; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.about-card-glow p { font-size: 14pt; line-height: 2; color: #cbd5e0; margin: 0; }
.about-card-glow strong { color: var(--gold); font-weight: 700; }

.cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 25px; max-width: 1200px; margin: 0 auto; }
.feature-card-premium { background: var(--card-bg); border: 1px solid rgba(255,255,255,0.04); border-radius: 20px; padding: 35px 25px; text-align: center; transition: all 0.3s ease; }
.feature-card-premium:hover { transform: translateY(-10px); border-color: rgba(0, 242, 254, 0.2); box-shadow: 0 15px 45px rgba(0,0,0,0.4); }
.card-icon-box { width: 65px; height: 65px; border-radius: 16px; display: flex; justify-content: center; align-items: center; margin: 0 auto 20px; font-size: 20pt; }
.cyan-glow { background: rgba(0, 242, 254, 0.1); color: var(--neon-blue); }
.gold-glow { background: rgba(246, 211, 101, 0.1); color: var(--gold); }
.purple-glow { background: rgba(79, 172, 254, 0.1); color: #4facfe; }
.red-glow { background: rgba(255, 107, 107, 0.1); color: #ff6b6b; }
.feature-card-premium h3 { font-size: 14pt; color: #fff; margin: 0 0 12px 0; font-weight: 700; }
.feature-card-premium p { font-size: 10.5pt; color: #718096; margin: 0; line-height: 1.6; }

.stats-parallax { background: linear-gradient(135deg, #090e22 0%, #040612 100%); border-top: 1px solid rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.03); padding: 80px 5%; }
.stats-grid-container { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 40px; max-width: 1100px; margin: 0 auto; }
.stat-item-premium { text-align: center; }
.stat-number { font-size: 40pt; font-weight: 900; background: linear-gradient(120deg, #fff 0%, #a0aec0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 5px; font-family: 'Plus Jakarta Sans', sans-serif; }
.stat-label { font-size: 12pt; color: var(--neon-blue); font-weight: 600; }

.reviews-flex { display: flex; gap: 30px; flex-wrap: wrap; max-width: 1100px; margin: 0 auto; }
.review-card-premium { background: var(--card-bg); border: 1px solid rgba(255,255,255,0.04); border-radius: 22px; padding: 35px; flex: 1; min-width: 280px; position: relative; }
.quote-mark { position: absolute; left: 35px; top: 25px; font-size: 35pt; color: rgba(255,255,255,0.03); }
.stars-gold { color: var(--gold); margin-bottom: 15px; font-size: 11pt; }
.review-card-premium p { font-size: 12pt; line-height: 1.8; color: #cbd5e0; margin-bottom: 20px; }
.reviewer-info h4 { font-size: 12pt; color: #fff; margin: 0; }
.reviewer-info span { font-size: 10pt; color: #718096; }

.booking-wrapper-neon { background: radial-gradient(circle at top right, rgba(0, 242, 254, 0.05), transparent), var(--card-bg); border: 1px solid rgba(0, 242, 254, 0.15); border-radius: 32px; padding: 50px 40px; max-width: 750px; margin: 0 auto; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
.glass-form { display: flex; flex-direction: column; gap: 20px; margin-top: 40px; }
.input-group-neon { position: relative; width: 100%; }
.input-icon { position: absolute; right: 20px; top: 50%; transform: translateY(-50%); color: #4a5568; font-size: 13pt; transition: .3s; }
.glass-form input, .glass-form select { width: 100%; height: 58px; background: rgba(7, 9, 19, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 0 55px 0 20px; box-sizing: border-box; color: #fff; font-family: 'Cairo', sans-serif; font-size: 11pt; transition: all 0.3s ease; -webkit-appearance: none; }
.glass-form select { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%234a5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'); background-repeat: no-repeat; background-position: left 20px center; background-size: 16px; }
.glass-form input:focus, .glass-form select:focus { border-color: var(--neon-blue); box-shadow: 0 0 15px rgba(0, 242, 254, 0.25); outline: none; }
.glass-form input:focus + .input-icon, .glass-form select:focus + .input-icon { color: var(--neon-blue); }
.glass-form optgroup { background: #0c0f1d; color: var(--neon-blue); font-weight: 700; }
.glass-form option { background: #121629; color: #fff; }
.btn-submit-neon { height: 58px; background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); border: none; border-radius: 14px; color: #070913; font-family: 'Cairo', sans-serif; font-size: 12pt; font-weight: 700; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 12px; box-shadow: 0 10px 30px rgba(0, 242, 254, 0.2); transition: .3s; }
.btn-submit-neon:hover { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(0, 242, 254, 0.4); }

.modern-footer { background: #04060d; border-top: 1px solid #101426; padding: 40px 5%; }
.footer-bottom-grid { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; max-width: 1200px; margin: 0 auto; }
.copy { font-size: 10.5pt; color: #4a5568; margin:0; }
.footer-social-links { display: flex; gap: 15px; }
.footer-social-links a { color: #4a5568; font-size: 14pt; transition: .3s; }
.footer-social-links a:hover { color: var(--neon-purple); }

.developer-ultra-badge { background: #020307; padding: 35px 20px; text-align: center; border-top: 1px solid #0b0d16; }
.badge-content { max-width: 500px; margin: 0 auto; }
.badge-title { display: block; font-size: 9pt; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; font-family: 'Plus Jakarta Sans', sans-serif; }
.text-cyan { color: var(--neon-blue); }
.badge-name-dev { display: block; font-size: 15pt; font-weight: 900; color: #fff; font-family: 'Cairo', sans-serif; letter-spacing: 0.5px; text-shadow: 0 0 20px rgba(0,242,254,0.3); animation: devTextGlow 3s infinite alternate; }
.badge-sub-dev { font-size: 9.5pt; color: #718096; margin: 4px 0 0 0; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; letter-spacing: 0.5px; }
@keyframes devTextGlow { 0% { text-shadow: 0 0 10px rgba(0,242,254,0.1); } 100% { text-shadow: 0 0 25px rgba(0,242,254,0.5), 0 0 10px rgba(79,172,254,0.3); } }

.section-hidden { opacity: 0; transform: translateY(45px); transition: all 0.9s cubic-bezier(0.215, 0.610, 0.355, 1); }
.section-visible { opacity: 1; transform: translateY(0); }

@media (max-width: 768px) {
    .menu, .nav-socials { display: none; }
    .heroContent h1 { font-size: 32pt; }
    .sub-title { font-size: 14pt; }
    .hero-actions { flex-direction: column; gap: 10px; }
    .footer-bottom-grid { flex-direction: column; text-align: center; }
}
`;

const styleEl = document.createElement("style");
styleEl.innerText = premiumCSS;
document.head.appendChild(styleSheet);
        
