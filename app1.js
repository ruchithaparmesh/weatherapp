(function() {
var firebaseConfig = {
    apiKey: "AIzaSyAazgFKPckp83KqfuLN82URYqHNhinxlVI",
    authDomain: "first-task-8d7a9.firebaseapp.com",
    projectId: "first-task-8d7a9",
    storageBucket: "first-task-8d7a9.appspot.com",
    messagingSenderId: "102164014504",
    appId: "1:102164014504:web:fdaee75c958e290bb8e99d",
    measurementId: "G-7MTKSEJ4SK"
  };
 
firebase.initializeApp(firebaseConfig);
const signin=document.getElementById("signin");
const signup=document.getElementById("signup");

signin.addEventListener('click',e => {
 var email = document.getElementById("user").value;
 var password = document.getElementById("pass").value;
console.log(password);
firebase.auth().signInWithEmailAndPassword(email,password)
.then((user) => {
   
    window.location ="loggedIn.html";
  })

.catch(e => console.log(e.message));
});


signup.addEventListener('click',e => {
 var emailu = document.getElementById("useru").value;
 var passwordu = document.getElementById("passu").value;
 console.log(emailu);

firebase.auth().createUserWithEmailAndPassword(emailu,passwordu)
  .then((user) => {
     

     window.location ="index.html";
  })
	.catch(e => console.log(e.message));
});

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		//const uid=firebaseUser.uid;
		  localStorage.setItem("cuser", firebaseUser.uid);
		console.log("logged in"+firebaseUser.uid);
	}else{
		console.log("not logged");
	}
});




}());



