// 1. إعدادات فايربيز الخاصة بمشروعك
const firebaseConfig = {
    apiKey: "AIzaSyAfHWDDZuwsMJo6TvD68qhtaw2NaxhVJ1I",
    authDomain: "elbanna-booking.firebaseapp.com",
    projectId: "elbanna-booking",
    storageBucket: "elbanna-booking.firebasestorage.app",
    messagingSenderId: "966174025626",
    appId: "1:966174025626:web:63a689f8030f3061b97c23",
    measurementId: "G-7T502DC0TL"
};

// 2. تفعيل فايربيز وقاعدة البيانات
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. شاشة التحميل (Loading Screen)
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {  
        loader.style.opacity = "0";  
        loader.style.visibility = "hidden";  
    }, 1500);
});

// 4. كود الحجز وإرسال البيانات لفايربيز عند الضغط على الزرار
const form = document.getElementById("bookingForm");

form.addEventListener("submit", function(e){
    e.preventDefault();

    // جلب البيانات من المربعات
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let stage = document.getElementById("stage").value;

    // التأكد أن البيانات كاملة
    if(name == "" || phone == "" || stage == ""){
        alert("من فضلك أكمل جميع البيانات");
        return;
    }

    // إرسال البيانات فوراً لجدول bookings في الفايربيز
    db.collection("bookings").add({
        studentName: name,
        studentPhone: phone,
        studentStage: stage,
        time: new Date()
    })
    .then(() => {
        // تظهر هذه الرسالة بعد نجاح الحفظ في فايربيز
        alert("✅ تم إرسال طلب الحجز بنجاح، سيتم التواصل معك قريبًا.");
        form.reset(); // تفريغ المربعات بعد الحجز
    })
    .catch((error) => {
        alert("حدث خطأ أثناء الحجز: " + error.message);
    });
});

// 5. تأثيرات حركة الكروت (Animation)
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-12px) scale(1.05)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0px) scale(1)";
    });
});

// 6. تأثيرات حركة الأزرار
document.querySelectorAll("button, .heroBtn").forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(.95)";
    });
    btn.addEventListener("mouseup", () => {
        btn.style.transform = "scale(1)";
    });
});

// 7. تحديث السنة تلقائياً في أسفل الموقع
document.querySelector(".copy").innerHTML = "© " + new Date().getFullYear() + " جميع الحقوق محفوظة";
                      
