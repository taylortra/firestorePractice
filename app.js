// Initialize Firebase
// Get the code provided from Google Firebase's
// Paste the var config = {...}; part here
// Also keep the firebase.initializeApp(...); part
// The <script> </script> portion we will put in the <head> section of our index.html

const firebaseConfig = {
  apiKey: "AIzaSyAXFqxbP_FMdIX4R74tAkq4Ar6m3DaHezE",
  authDomain: "acit3910-c0c4d.firebaseapp.com",
  projectId: "acit3910-c0c4d",
  storageBucket: "acit3910-c0c4d.appspot.com",
  messagingSenderId: "997060362135",
  appId: "1:997060362135:web:55f9c156cb1475c9760ed2"
};

firebase.initializeApp(firebaseConfig);

const mostExpensive = document.querySelector('#mostExpensive');

firebase.firestore().collection('toyCollection').orderBy('price', "desc").limit(1)
  .onSnapshot(querySnapshot => {
    mostExpensive.innerHTML = '';
    querySnapshot.forEach(doc => {
      mostExpensive.innerHTML += 'The most expensive toy is: ' + doc.id + ' $' + doc.data().price;
    });
});

const db = firebase.firestore();

// Store a reference to the red and green buttons so we can easily add
//  click events to them later
const redButton = document.querySelector('.myButtonRed');
const greenButton = document.querySelector('.myButtonGreen');
const orangeButton = document.querySelector('.myButtonOrange');

// Store a reference to where we will display the color we get back
//  from the database
const colorContent = document.querySelector('#color-square');
const colorDescription = document.querySelector('#color-description');

// Score variable
let score = 0;

// Listen for real-time updates
db.collection("data").doc("style").onSnapshot((doc) => {
  console.log("Current data: ", doc.data());

  // Update the website with the new color
  colorContent.style.backgroundColor = doc.data().colorValue;
  colorDescription.innerHTML = doc.data().colorDescription;
});

// Red Button Click Event
redButton.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log("Red Button Pressed.");

  // Update the Firestore database with color red
  db.collection("data").doc("style").set({
    colorValue: "#de1000",
    colorDescription: "Red"
  });

  // Subtract 5 points
  score -= 5;

  // Update the score display
  document.getElementById('my-score').textContent = score;

  // Get the username
  const username = document.getElementById('userName').value;

  // Update the score in the database
  db.collection("users").doc(username).set({
    score: score
  });
});

// Green Button Click Event
greenButton.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log("Green Button Pressed.");

  // Update the Firestore database with color green
  db.collection("data").doc("style").set({
    colorValue: "#15ba10",
    colorDescription: "Green"
  });

  // add 5 points
  score += 5;

  // Update the score display
  document.getElementById('my-score').textContent = score;

  // Get the username
  const username = document.getElementById('userName').value;

  // Update the score in the database
  db.collection("users").doc(username).set({
    score: score
  });
});

// Orange Button Click Event
orangeButton.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log("Orange Button Pressed.");

  // Update the Firestore database with color orange
  db.collection("data").doc("style").set({
    colorValue: "#de7610",
    colorDescription: "Orange"
  });

  // Reset the score to 0
  score = 0;

  // Update the score display
  document.getElementById('my-score').textContent = score;

  // Get the username
  const username = document.getElementById('userName').value;e;

  // Update the score in the database
  db.collection("users").doc(username).set({
    score: score
  });
});

// Realtime listener
db.collection("users").orderBy("score", "desc").limit(1).onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === "added" || change.type === "modified") {
      // Get the user with the highest score
      const topUser = change.doc.data();
      const topUsername = change.doc.id;
      const topScore = topUser.score;

      // Display the top score and the user who holds it
      document.getElementById('top-score').textContent = `${topUsername}: ${topScore}`;
    }
  });
});