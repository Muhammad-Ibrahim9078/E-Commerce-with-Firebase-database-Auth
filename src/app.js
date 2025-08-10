import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
// Firebase Auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// Firebase Database
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyClUj8OZbs_rHI_nj10cmUeorLB_XLV6H8",
    authDomain: "project-5211b.firebaseapp.com",
    projectId: "project-5211b",
    storageBucket: "project-5211b.firebasestorage.app",
    messagingSenderId: "934446735313",
    appId: "1:934446735313:web:629c9f306e0bd974e08af0",
    measurementId: "G-EV0G3ZNCHS"
};

// Firebase Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Firebase Database
const db = getFirestore(app);

// Signup Method / Function
let getSbtn = document.querySelector('#sbtn')

if (getSbtn) {
  let popup = document.getElementById("popup");
  let popupText = document.getElementById("popup-text");
    
  getSbtn.addEventListener('click', () => {
    let email = document.querySelector("#semail").value.trim()
    let password = document.querySelector("#spass").value.trim()
    
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      popup.style.display = "flex";
      popupText.innerText = "Creating account...";
      const user = userCredential.user;
      console.log(user.email)
      popupText.innerText = "✅ Successfully Created Account!";
      setTimeout(() => {
        popup.style.display = "none";
        window.location.replace("/login");
      }, 1000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      if (errorCode === 'auth/email-already-in-use') {
        alert("Email already exists. Please use a different email or login.");
      } else if (errorCode === 'auth/invalid-email') {
        alert("Please enter a valid email address.");
      } else {
        alert("Error creating account. Please try again.");
      }
    });
  })
}

// Login Method / Function
let lbtn = document.querySelector("#lbtn")

if (lbtn) {
  let popup = document.getElementById("popup");
  let popupText = document.getElementById("popup-text");
  
  lbtn.addEventListener('click', () => {
    let email = document.querySelector("#lemail").value.trim()
    let password = document.querySelector("#lpass").value.trim()
    
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      popup.style.display = "flex";
      popupText.innerText = "Logging in...";
      const user = userCredential.user;
      console.log(`${user.email} login success`)
      popupText.innerText = "✅ Successfully Logged In!";
      
      setTimeout(() => {
        popup.style.display = "none";
        if(email === 'adminbro@gmail.com'){         // check email This is Admin or Not
          window.location.replace("/dashboard");
        } else {      // check email This is Admin or Not
          window.location.replace("/user-dashboard");
        }
      }, 1000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      if (errorCode === 'auth/user-not-found') {
        alert("User not found. Please check your email or sign up.");
      } else if (errorCode === 'auth/wrong-password') {
        alert("Incorrect password. Please try again.");
      } else if (errorCode === 'auth/invalid-email') {
        alert("Please enter a valid email address.");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    });
  })
}

// SignOut/Logout Method / Function
let logout = document.getElementById("logout");
if(logout){
  logout.addEventListener("click", ()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("logout")
      window.location.replace("/login");
    }).catch((error) => {
      // An error happened.
      console.error("Logout error:", error);
      window.location.replace("/login");
    });
  })
}

// Database
let addItemBtn = document.getElementById("addItemBtn");

if(addItemBtn){
  addItemBtn.addEventListener("click", async()=>{
    let itemName = document.getElementById("iName").value.trim();
    let itemPrice = document.getElementById("iPrice").value.trim();
    let itemdes = document.getElementById("ides").value.trim();
    let itemurl = document.getElementById("iurl").value.trim();

    if (!itemName || !itemPrice || !itemdes || !itemurl) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "items"), {
        itemName,
        itemPrice,
        itemdes,
        itemurl
      });
      console.log("Document written with ID: ", docRef.id);
      prodctsPrinting()

      // page Reload after some Seconds
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error adding item. Please try again.");
    }
  })
}

// Products/Items Print 
let prodctsPrinting = async()=>{
  let itemsPrint = document.getElementById("itemsPrint");

  if (!itemsPrint) return;

  itemsPrint.innerHTML = ""
  
  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    querySnapshot.forEach((doc, index) => {
      let data = doc.data();

      itemsPrint.innerHTML += `
         <section class="card bg-base-100 shadow-sm m-2" style="width: 300px;">
      <figure style="width: 100%; height: 200px; overflow: hidden;">
        <img
          src="${data.itemurl}"
          alt="${data.itemName}"
          style="width: 100%; height: 100%; object-fit: contain; display: block; margin: 0 auto;"
          onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'"
        />
      </figure>
      <div class="card-body" style="padding: 10px;">
        <h1 class="card-title">${data.itemName}</h1>
        <p><b>Description:</b><br>${data.itemdes}</p>
        <h4 class="card-title">Rs: ${data.itemPrice}</h4>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" onclick="addtoList('${doc.id}', '${data.itemName}', '${data.itemPrice}', '${data.itemurl}')">Add To list</button>
        </div>
      </div>
    </section>`
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    itemsPrint.innerHTML = "<p>Error loading items. Please try again.</p>";
  }
}

// Initialize products printing if on dashboard pages
if (document.getElementById("itemsPrint")) {
  prodctsPrinting()
}

let emailinthis = ()=>{
  onAuthStateChanged(auth, (user) => {
    let emailPr = document.getElementById("emailPr");
    if (user && emailPr) {
      // Sirf currently logged-in user ki email
      emailPr.innerHTML = user.email;
    }
  });
}

// Initialize email display if on dashboard pages
if (document.getElementById("emailPr")) {
  emailinthis()
}

// addToList Function / Method
function addtoList(id, name, price, imgUrl){
  alert("Added Successfully")
  let addCardPrint = document.getElementById("addCardPrint");

  if (addCardPrint) {
    addCardPrint.innerHTML += `
    <p> ${name} </p>
    <p><b>Price:</b> ${price} </p>
    <img src="${imgUrl}" width="50px" height="50px" alt="${name}" onerror="this.src='https://via.placeholder.com/50x50?text=Image'">
    `
  }
}

window.addtoList = addtoList;