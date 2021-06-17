//YOUR FIREBASE LINKS
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

room_name = localStorage.getItem("room_name");

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + msg + "</h4>";
                like_with_tag = "<button class='btn btn-primary' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_with_tag + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("msg").value = "";
}

function logout() {

    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location.replace("index.html");
}

function updateLike(message_id) {

    console.log("clicked on the like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_Likes = Number(likes) + 1;
    console.log(updated_Likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_Likes
    });
}