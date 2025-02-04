// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNZ16gwzaWxVMY8EOvo2NekKeaJ_Zql1I",
  authDomain: "attend-61616.firebaseapp.com",
  databaseURL: "https://attend-61616-default-rtdb.firebaseio.com",
  projectId: "attend-61616",
  storageBucket: "attend-61616.firebasestorage.app",
  messagingSenderId: "1022893657985",
  appId: "1:1022893657985:web:d1d9e0929b221c835da280",
  measurementId: "G-GP7RFCN0Z3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to Save Data
function saveBook() {
    const userName = document.getElementById("userName").value.trim();
    const bookName = document.getElementById("bookName").value.trim();

    if (userName === "" || bookName === "") {
        alert("Please fill in both fields.");
        return;
    }

    db.collection("books").add({
        user: userName,
        book: bookName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("Book saved!");
        document.getElementById("userName").value = "";
        document.getElementById("bookName").value = "";
        loadBooks(); // Refresh list
    })
    .catch(error => {
        console.error("Error adding document: ", error);
    });
}

// Function to Load Data
function loadBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = ""; // Clear list

    db.collection("books").orderBy("timestamp", "desc").get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            const data = doc.data();
            const li = document.createElement("li");
            li.textContent = `${data.user} - ${data.book}`;
            bookList.appendChild(li);
        });
    });
}

// Load books on page load
window.onload = loadBooks;
