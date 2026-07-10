// 1. Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfHWDDZuwsMJo6TvD68qhtaw2NaxhVJ1I",
    authDomain: "elbanna-booking.firebaseapp.com",
    projectId: "elbanna-booking",
    storageBucket: "elbanna-booking.firebasestorage.app",
    messagingSenderId: "966174025626",
    appId: "1:966174025626:web:63a689f8030f3061b97c23",
    measurementId: "G-7T502DC0TL"
};

// 2. Initialize Firebase & Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. Loading Screen
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {  
        loader.style.opacity = "0";  
        loader.style.visibility = "hidden";  
    }, 1500);
});

// 4. Booking Form Submission
const form = document.getElementById("bookingForm");

form.addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let stage = document.getElementById("stage").value;

    if(name == "" || phone == "" || stage == ""){
        alert("Please fill all fields!");
        return;
    }

    // Send data to Firebase bookings collection
    db.collection("bookings").add({
        studentName: name,
        studentPhone: phone,
        studentStage: stage,
        time: new Date()
    })
    .then(() => {
        alert("Done! Your booking has been sent successfully.");
        form.reset();
    })
    .catch((error) => {
        alert("Error: " + error.message);
    });
});

// 5. Card Animations
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-12px) scale(1.05)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0px) scale(1)";
    });
});

// 6. Button Effects
document.querySelectorAll("button, .heroBtn").forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(.95)";
    });
    btn.addEventListener("mouseup", () => {
        btn.style.transform = "scale(1)";
    });
});

// 7. Auto Copyright Year
document.querySelector(".copy").innerHTML = "© " + new Date().getFullYear() + " جميع الحقوق محفوظة";
    
