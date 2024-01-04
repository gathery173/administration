// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBooRw8q86fnSegmIk9PC9ynkbp6ODyQoE",
    authDomain: "opijk-f14cd.firebaseapp.com",
    databaseURL: "https://opijk-f14cd-default-rtdb.firebaseio.com",
    projectId: "opijk-f14cd",
    storageBucket: "opijk-f14cd.appspot.com",
    messagingSenderId: "970116476040",
    appId: "1:970116476040:web:c9c81ac9b47b988028433d"
  };

firebase.initializeApp(firebaseConfig);

// Reference to the users collection
var usersRef = firebase.database().ref('users');

// Function to display users on the page
// Function to display users on the page
// Function to display users on the page with input fields and buttons
// Function to display users in a single row with input fields and a dropdown
function displayUsers(users) {
    var userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear previous content

    var userDropdown = document.createElement('select');
    userDropdown.id = 'userDropdown';

    users.forEach(user => {
        var option = document.createElement('option');
        option.value = user.key;
        option.text = user.val.login;
        userDropdown.appendChild(option);
    });

    userList.appendChild(userDropdown);
}

// Function to load user details into input fields
function loadUserDetails() {
    var userId = document.getElementById('userDropdown').value;

    if (userId) {
        var userRef = usersRef.child(userId);
        userRef.once('value').then(function(snapshot) {
            var user = snapshot.val();
            document.getElementById('loginField').value = user.login;
            document.getElementById('passwordField').value = user.pwd;
            document.getElementById('mailField').value = user.mail;
        });
    }
}

// Function to save user changes
function saveUser() {
    var userId = document.getElementById('userDropdown').value;
    var loginInput = document.getElementById('loginField').value;
    var passwordInput = document.getElementById('passwordField').value;
    var mailInput = document.getElementById('mailField').value;

    if (userId) {
        usersRef.child(userId).set({
            login: loginInput,
            pwd: passwordInput,
            mail: mailInput
        });
    }
}

// Function to delete user
function deleteUser() {
    var userId = document.getElementById('userDropdown').value;

    if (userId && confirm('Are you sure you want to delete this user?')) {
        usersRef.child(userId).remove();
    }
}

// Listen for changes in the users collection
usersRef.on('value', function(snapshot) {
    var users = [];
    snapshot.forEach(function(childSnapshot) {
        users.push({ key: childSnapshot.key, val: childSnapshot.val() });
    });
    displayUsers(users);
});


// Function to edit password
function editPassword(userId) {
    var newPassword = prompt('Enter new password:');
    if (newPassword !== null) {
        usersRef.child(userId).child('pwd').set(newPassword);
    }
}

// Function to delete user
// Function to delete user
function deleteUser() {
    var userId = document.getElementById('userDropdown').value;

    if (userId && confirm('Are you sure you want to delete this user?')) {
        usersRef.child(userId).remove()
            .then(function() {
                console.log("User deleted successfully");
            })
            .catch(function(error) {
                console.error("Error deleting user: ", error);
            });
    }
}


// Listen for changes in the users collection
usersRef.on('value', function(snapshot) {
    var users = [];
    snapshot.forEach(function(childSnapshot) {
        users.push({ key: childSnapshot.key, val: childSnapshot.val() });
    });
    displayUsers(users);
});
