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


// Get a reference to the Firebase Realtime Database
const database = firebase.database();

// Create a transporter using your email provider's SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gathery@school173.com.ua',
        pass: 'tgod ptdz ince lpqs',
    },
});

// Retrieve user emails from Firebase
const usersRef = database.ref('users');
usersRef.once('value', (snapshot) => {
    const users = snapshot.val();
    console.log(users)

    if (users) {
        // Iterate through each user and send email
        Object.keys(users).forEach((userId) => {
            const user = users[userId];
            const userEmail = user.mail;

            const mailOptions = {
                subject: "GV173",
                from: 'gathery@school173.com.ua',
                to: userEmail,
                text: 'Вітаємо в системі голосування Gathery\nВаші данні для входу:\n\n\tlogin: rimon\n\tpassword: iis',
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(`Error sending email to ${userEmail}: ${error.message}`);
                } else {
                    console.log(`Email sent to ${userEmail}: ${info.response}`);
                }
            });
        });
    }
});
