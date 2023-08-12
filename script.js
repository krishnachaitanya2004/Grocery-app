import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getDatabase, ref, onValue,push,remove} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js";



const firebaseConfig = {
  apiKey: "AIzaSyDk3Lo9unmA7MBG5zYbdrVO_sxy51t-CUI",
  authDomain: "fir-fronte-fc66c.firebaseapp.com",
  databaseURL: "https://fir-fronte-fc66c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-fronte-fc66c",
  storageBucket: "fir-fronte-fc66c.appspot.com",
  messagingSenderId: "890898570749",
  appId: "1:890898570749:web:c1c1436e2dabb90d144d94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const itemsinDB = ref(db, "list");



const elem = document.getElementById("input")
const addBtn = document.getElementById("add")
const list_shop = document.getElementById("list_shop")


onValue(itemsinDB, (snapshot) => {

    if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val());
    list_shop.innerHTML = "";

    for(let i = 0; i < itemsArray.length; i++){
        let item = itemsArray[i];
        console.log(item);  
        appenditem(item);
        
    }
}
else{
    list_shop.innerHTML = "No items in the list Please add items ...";
}
});
    
function appenditem(item) {
    let itemKey = item[0];
    let itemValue = item[1];
    let newLi = document.createElement("li");
    newLi.textContent = itemValue;
    list_shop.appendChild(newLi);
    newLi.addEventListener("click", () => {
        let location = ref(db, `list/${itemKey}`); // Corrected reference path
        remove(location);
    });
}


addBtn.addEventListener("click", () => {
    const newItemValue = elem.value; // Store the value before clearing the input field
    push(itemsinDB, newItemValue) 
    reset(); // Clear the input field
});

function reset(){
    elem.value = "";

}

