var firebaseConfig = {
      apiKey: "AIzaSyCRNukC3iK4oOSA06euYwisc30jw33Ur1I",
      authDomain: "kwitter-65a68.firebaseapp.com",
      databaseURL: "https://kwitter-65a68-default-rtdb.firebaseio.com",
      projectId: "kwitter-65a68",
      storageBucket: "kwitter-65a68.appspot.com",
      messagingSenderId: "791163848417",
      appId: "1:791163848417:web:041c8c78979b1323d199a0",
      measurementId: "G-3ZJL4D3FDX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = " Welcome " + user_name + " !";

function addRoom() {

      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });



      localStorage.setItem("room_name", room_name);

      window.location = "kwitter_page.html"; 
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("Room Name - " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}