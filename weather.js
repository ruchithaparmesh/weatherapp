//var city=document.getElementById("search").value;
const key='b95bbeff0f00f7fdb646a215fb3d1573';
function weather(city) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
                   console.log('--->'+(JSON.stringify(data)));
		drawWeather(data);
    
  })
  .catch(function() {
    // catch any errors
  });
}
function drawWeather(d) {
        var celcius = Math.round(parseFloat(d.main.temp)-273.15);
        var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);

        document.getElementById('description').innerHTML = d.weather[0].description;
        document.getElementById('temp').innerHTML = celcius + '&deg;';
        document.getElementById('location').innerHTML = d.name;


      var firebaseConfig = {
    apiKey: "AIzaSyAazgFKPckp83KqfuLN82URYqHNhinxlVI",
    authDomain: "first-task-8d7a9.firebaseapp.com",
    projectId: "first-task-8d7a9",
    storageBucket: "first-task-8d7a9.appspot.com",
    messagingSenderId: "102164014504",
    appId: "1:102164014504:web:fdaee75c958e290bb8e99d",
    measurementId: "G-7MTKSEJ4SK"
  };
	var date = new Date();
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
        console.log("inside db");
db.collection(localStorage.getItem("cuser")).add({
    Location: d.name,
    Temperature: celcius + ' degree',
    Description: d.weather[0].description,
    Day: date.getDate()+" "+date.getFullYear()

})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
	console.error("Error adding document: ", error);
});


/*function checked(){
if(document.getElementById('check').checked)
	{
		document.write("<h1>HELLO WORLD</h1>");
          document.write("<table id='tbl_account_list' border='2' cellpadding='10' style='border-collapse:collapse'>");
		document.write("<thead><th>Location</th>");
		document.write("<th>Temperature</th>");
		document.write("<th>Description</th><th>Day</th></thead></table>");
*/


db.collection(localStorage.getItem("cuser")).get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    renderAccount(doc);
        });
    });

	const accountList = document.querySelector('#tbl_account_list') ;
            function renderAccount(doc){
		  
                let tr = document.createElement('tr');
                let td_loc = document.createElement('td');
                let td_temp = document.createElement('td');
                let td_destin = document.createElement('td');
		let td_date=document.createElement('td');

                tr.setAttribute('data-id', doc.id);
                td_loc.textContent = doc.data().Location;
                td_temp.textContent = doc.data().Temperature;
                td_destin.textContent = doc.data().Description;
                td_date.textContent=doc.data().Day;
                tr.appendChild(td_loc);
                tr.appendChild(td_temp);
                tr.appendChild(td_destin);
		tr.appendChild(td_date);

                accountList.appendChild(tr);

            }

	
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".button-search").addEventListener("click", () => {
        const searchedCity = document.getElementById("search");
        console.log(searchedCity.value);
        if(searchedCity.value){
            weather(searchedCity.value);
        }       
   });
}); 
