import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDHbxEKSCLQM7VgyEvn-BWYBaf6H5rqn-8",
    authDomain: "woodwork-2fd18.firebaseapp.com",
    databaseURL: "https://woodwork-2fd18.firebaseio.com/",
    projectId: "woodwork-2fd18",
    storageBucket: "woodwork-2fd18.appspot.com"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;