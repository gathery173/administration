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
    const tch = document.getElementById('teacher');
    const login = log.value.trim();
    const teacher = tch.value.trim().split(' '); // Split teachers by space

    // Check if the login and teachers are not empty
    if (login && teacher.length > 0) {
        const teacherArray = teacher.reduce((acc, teacher) => {
            if (teacher.trim() !== '') {
                acc.push(teacher.trim());
            }
            return acc;
        }, []);

        database.ref('part').child(login).set({
    
            teacher: teacherArray,
            now: false,
            votes: 0,
        }, function (error) {
            if (error) {
                console.error('Data could not be saved.', error);
            } else {
                console.log('Data saved successfully.');
                log.value = '';
                tch.value = '';
                getId(word);
                window.location.href = 'user.html';
            }
        });
    } else {
        console.log('Please enter a login and at least one teacher.');
    }
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
              const radioInput = document.createElement('input');
              radioInput.type = 'radio';
              radioInput.name = 'partRadio';
              radioInput.value = partName;
              const label = document.createElement('label');
              label.appendChild(radioInput);
              label.appendChild(document.createTextNode(` ${partName}`));
              radioContainer.appendChild(label);
          });
      });
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
  
          console.log(`Updated "now" value for part ${partName}`);
      } else {
          console.log('Please select a part.');
      }
  }
  
  function stopVoting() {
    console.log('Stop Voting function called');
    
    const selectedPart = document.querySelector('input[name="partRadio"]:checked');
  
    if (selectedPart) {
        const partName = selectedPart.value;
        const partRef = firebase.database().ref(`part/${partName}/now`);
  
        // Set "now" to false for the selected participant
        partRef.set(false)
            .then(() => {
                console.log(`Successfully stopped voting for participant: ${partName}`);
            })
            .catch(error => {
                console.error(`Error stopping voting for participant ${partName}:`, error);
            });
    } else {
        console.log('Please select a participant.');
    }
  }
  
  
   
  