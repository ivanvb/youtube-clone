require('./connection');
const firebase = require('firebase/app');
require('firebase/auth');

exports.signUp = async (email, password) => {
    let user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            throw error;
        });
    console.log(user);
};

exports.login = async (email, password) => {
    await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            throw error;
        });
    return firebase.auth().currentUser.email;
};

exports.logout = async () => {
    await firebase.auth().signOut();
    return 'Logged Out Succesfully!';
};

exports.getUserToken = async () => {
    const user = firebase.auth().currentUser;
    if (user === null) {
        return null;
    } else {
        const token = await user.getIdToken();
        return token;
    }
};
