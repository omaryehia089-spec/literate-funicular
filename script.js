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
db.collection("test").add({
message: "Firebase Connected",
time: new Date()
})
.then(() => {
console.log("Firebase OK");
})
.catch((error) => {
alert(error.message);
});

// Loading Screen
window.addEventListener("load", () => {
const loader = document.getElementById("loader");

setTimeout(() => {  
    loader.style.opacity = "0";  
    loader.style.visibility = "hidden";  
}, 1500);

});

// الحجز
const form = document.getElementById("bookingForm");

form.addEventListener("submit", function(e){

e.preventDefault();

let name=document.getElementById("name").value.trim();

let phone=document.getElementById("phone").value.trim();

let stage=document.getElementById("stage").value;

if(name==""||phone==""||stage==""){

alert("من فضلك أكمل جميع البيانات");

return;

}

alert("✅ تم إرسال طلب الحجز بنجاح، سيتم التواصل معك قريبًا.");

form.reset();

});

// حركة للكروت

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px) scale(1.05)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px) scale(1)";

});

});

// تأثير للأزرار

document.querySelectorAll("button,.heroBtn").forEach(btn=>{

btn.addEventListener("mousedown",()=>{

btn.style.transform="scale(.95)";

});

btn.addEventListener("mouseup",()=>{

btn.style.transform="scale(1)";

});

});

// سنة تلقائية

document.querySelector(".copy").innerHTML="© "+new Date().getFullYear()+" جميع الحقوق محفوظة";