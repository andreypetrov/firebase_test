/**
 * Created by Andrey Petrov on 16-12-24.
 */
// Initialize Firebase
(function(){
    const config = {
        apiKey: "AIzaSyBz4wGtNaKgtsYgAK-NF168MdHr4cptHbo",
        authDomain: "mate-deba3.firebaseapp.com",
        databaseURL: "https://mate-deba3.firebaseio.com",
        storageBucket: "mate-deba3.appspot.com",
        messagingSenderId: "1046598023346"
    };

    firebase.initializeApp(config);

    const auth = firebase.auth();

    const bigOne = document.getElementById('bigOne');
    const dbRef = firebase.database().ref().child('text');
    dbRef.on('value', snap => bigOne.innerText = snap.val());

    const loginForm = document.getElementById('form_login');
    const emailInput = document.getElementById('input_email');
    const passwordInput = document.getElementById('input_password');
    const loginButton = document.getElementById('btn_login');
    const logoutButton = document.getElementById('btn_logout');

    loginButton.addEventListener('click', e => {
         const email = emailInput.value;
         const password  = passwordInput.value;

        auth.signInWithEmailAndPassword(email, password).catch(
                e => console.log(e.message)
        );



    })

    logoutButton.addEventListener('click', e=> {
        auth.signOut();
    })
    auth.onAuthStateChanged(function(user) {
        if (user) {
            logoutButton.classList.remove('hidden');
            loginButton.classList.add('hidden');
            loginForm.classList.add('hidden');

            console.log("user logged in", user);

            document.getElementById('sign-in-status').textContent = 'Signed in';


            /*// User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            user.getToken().then(function(accessToken) {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                }, null, '  ');
            });*/

        } else {
            logoutButton.classList.add('hidden');
            loginButton.classList.remove('hidden');
            loginForm.classList.remove('hidden');

            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
          //  document.getElementById('sign-in').textContent = 'Sign in';
           // document.getElementById('account-details').textContent = 'null';
        }
    }, function(error) {
        console.log(error);
    });

}());
