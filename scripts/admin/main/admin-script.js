const firebaseConfig = {
  apiKey: "AIzaSyBooRw8q86fnSegmIk9PC9ynkbp6ODyQoE",
  authDomain: "opijk-f14cd.firebaseapp.com",
  databaseURL: "https://opijk-f14cd-default-rtdb.firebaseio.com",
  projectId: "opijk-f14cd",
  storageBucket: "opijk-f14cd.appspot.com",
  messagingSenderId: "970116476040",
  appId: "1:970116476040:web:c9c81ac9b47b988028433d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to the databas
// Get a reference to the Firebase Realtime Database
const database = firebase.database();


// Function to add a word to the database
function addUser() {
  const log = document.getElementById('login');
  const pwd = document.getElementById('pwd');
  
  const teach = document.getElementById('tch');
  const login = log.value.trim();
  const pas = pwd.value.trim();
  
  const tch = teach.value.trim();


  // Check if the user already exists
  const userRef = database.ref('users').child(login);
  userRef.once('value')
      .then(snapshot => {
          if (snapshot.exists()) {
              // User already exists, show confirm dialog
              const confirmUpdate = confirm(`User '${login}' already exists in the database. Do you want to update the data?`);
              
              if (confirmUpdate) {
                  // Update data in Firebase
                  userRef.update({
                    login: login,
                      pwd: pas,
                    
                      teacher: tch,
                  });

                  console.log('User data updated successfully.');
              }
          } else {
              // User does not exist, proceed to add
              userRef.set({
                  login: login,
                  pwd: pas,
                
                  teacher: tch,

              });

              console.log('User added successfully.');
          }

          // Clear input fields after adding/updating user
          log.value = '';
          pwd.value = '';
        
          teach.value = '';
      })
      .catch(error => {
          console.error('Error checking user existence:', error);
      });
}


  

// Function to add a word to the database



function printAllData(snapshot) {
  const data = snapshot.val();
  console.log(data["users"]);
  // Do something with the data if needed
}

// Get a reference to the root of your data structure
const dataRef = database.ref('/');

// Attach an event listener to retrieve and print data
dataRef.once('value')
  .then(printAllData)
  .catch(error => {
    console.error('Error retrieving data:', error);
  });

function populateParticipants() {
  const radioContainer = document.getElementById('radioContainer');
  firebase.database().ref('part').once('value').then(snapshot => {
      snapshot.forEach(partSnapshot => {
          const partName = partSnapshot.key;

          // Create radio input HTML with unique id
          const radioInputHTML = `<input type="radio" name="partRadio" id="${partName}" value="${partName}" class="r" onclick="handleRadioClick('fs')">`;

          // Create label HTML with correct 'for' attribute

          const labelHTML = `
          <div style = "border: white solid; margin: 5px; border-radius: 10px; " class = "kk">
            <label for="${partName}">
              ${radioInputHTML}
              <div style="display: flex; align-text: center; justify-content: center; height:30px; width:300px;">
              ${partName}
              </div>
            
            </label>
          </div>    
          `;

          // Append label HTML to the radio container
          radioContainer.innerHTML += labelHTML;
      });
  });
}
function handleRadioClick(partName) {
  // Reset styles for all labels
  document.querySelectorAll('.label-style').forEach(label => {
      label.style.fontWeight = 'normal';
  });

  // Set the selected label to bold
  const selectedLabel = document.getElementById(`label${partName}`);
  if (selectedLabel) {
      selectedLabel.style.fontWeight = 'bold';
  }
}




// Call the function to populate participants when the page loads
window.onload = populateParticipants;

function updateNowValue() {
    const selectedPart = document.querySelector('input[name="partRadio"]:checked');

    if (selectedPart) {
        const partName = selectedPart.value;
        const databaseRef = firebase.database().ref(`part/${partName}/now`);

        // Set "now" to true for the selected part and false for others
        firebase.database().ref('part').once('value').then(snapshot => {
            snapshot.forEach(partSnapshot => {
                const partRef = partSnapshot.ref.child('now');
                partRef.set(partSnapshot.key === partName);
            });
        });
}}
function stopVoting() {
  // Get the selected participant
  const selectedPart = document.querySelector('input[name="partRadio"]:checked');

  if (selectedPart) {
      const partName = selectedPart.value;
      const partRef = firebase.database().ref(`part/${partName}/now`);

      // Set "now" to false for the selected participant
      partRef.set(false)
          .then(() => {
              // Clear the selected radio button
              selectedPart.checked = false;
          })
          .catch(error => {
              console.error(`Error stopping voting for participant ${partName}:`, error);
          });
  } else {
      console.log('Please select a participant.');
  }
}

// Prevent the default form submission behavior
document.getElementById('partForm').addEventListener('submit', function (e) {
  e.preventDefault();
});

