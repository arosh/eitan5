/* global firebase */
/* global firebaseui */
import EventEmitter from 'eventemitter3';
import { UPDATE_LOGGED } from './EventTypes';

class FirebaseService extends EventEmitter {
  constructor() {
    super();
    this.setupApp();
    this.setupAutoStateChanged();
    this.setupUI();
  }

  setupApp() {
    const config = {
      apiKey: 'AIzaSyCkboz9C4mKfir9iFLomUw8w_aqg5JAYy0',
      authDomain: 'eitan5-555df.firebaseapp.com',
      databaseURL: 'https://eitan5-555df.firebaseio.com',
      storageBucket: 'eitan5-555df.appspot.com',
      messagingSenderId: '864017556445',
    };
    firebase.initializeApp(config);
  }

  setupAutoStateChanged() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.uid === this.user.uid) {
        return;
      }
      if (user) {
        this.handleSignedInUser(user);
      } else {
        this.handleSignedOutUser();
      }
    });
  }

  setupUI() {
    // FirebaseUI config.
    this.uiConfig = {
      // callbacks: {
      //   // Called when the user has been successfully signed in.
      //   signInSuccess(user, credential, redirectUrl) {
      //     this.handleSignedInUser(user);
      //     // Do not redirect.
      //     return false;
      //   },
      // },
      // Opens IDP Providers sign-in flow in a popup.
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: 'https://eitan5-555df.firebaseapp.com',
    };

    // Initialize the FirebaseUI Widget using Firebase.
    this.firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
  }

  startUI() {
    this.firebaseUI.start('.firebaseui-auth', this.uiConfig);
  }

  isLogged() {
    return this.user !== null;
  }

  login() {

  }

  logout() {

  }

  handleSignedInUser(user) {
    this.user = user;
    this.emit(UPDATE_LOGGED);
  }

  handleSignedOutUser() {
    this.user = null;
    this.emit(UPDATE_LOGGED);
  }
}

export default new FirebaseService();
