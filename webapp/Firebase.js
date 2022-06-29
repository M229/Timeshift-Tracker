sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    const firebaseConfig = {
        apiKey: "AIzaSyD1_iSu73YXo3v2Snp3OnHlvuXPIw_vP9o",
        authDomain: "timeshft-tracker.firebaseapp.com",
        projectId: "timeshft-tracker",
        storageBucket: "timeshft-tracker.appspot.com",
        messagingSenderId: "333146536649",
        appId: "1:333146536649:web:a726e8aa396298a8e82b18"
    };

    return {
        initializeFirebase: function () {
            // Initialize Firebase with the Firebase-config
            firebase.initializeApp(firebaseConfig);

            // Create a Firestore reference
            firebase.firestore();
        },

        dbGetCollection: function (sCollectionName) {
            return firebase.firestore().collection(sCollectionName);
        },

        dbAddDoc: function (sCollectionName, oDoc) {
            let collection = this.dbGetCollection(sCollectionName);
            return collection.add(oDoc);
        },

        dbDeleteDoc: function (sCollectionName, sDocId) {
            let collection = Firebase.dbGetCollection(sCollectionName);
            return collection.doc(sDocId).delete();
        },

        dbSignWithEmail: function (sEmail, sPass) {
            return this.dbAuth().signInWithEmailAndPassword(sEmail, sPass);
        },

        dbGetDocByUid: function (sCollection, sDocUid) {
            let docRef = this.dbGetCollection(sCollection).doc(sDocUid);
            return docRef.get();
        },

        dbGetCurrentUser: function () {
            return this.dbAuth().currentUser;
        },

        dbAddNewUser: function (sCollectionName, oUser) {
            let collection = this.dbGetCollection(sCollectionName);
            return collection.doc(oUser.uid).set({
                description: "Team member",
                displayName: "Anonymous",
                pic: "sap-icon://employee",
                uid: oUser.uid,
                email: oUser.email
            });
        },

        dbAddOrGetDocByUid: function (sCollectionName, oDoc) {
            return new Promise((resolve, reject) => {
                this.dbGetDocByUid(sCollectionName, oDoc.uid)
                    .then((doc) => {
                        if (!doc.exists) {
                            this.dbAddNewUser(sCollectionName, oDoc)
                                .then(() => {
                                    this.dbGetDocByUid(sCollectionName, oDoc.uid)
                                        .then((newDoc) => {
                                            resolve(newDoc);
                                        });
                                });
                        } else {
                            resolve(doc);
                        }
                    });
            });
        },


        dbQuery: function (sCollectionName, ...args) {
            let colRef = this.dbGetCollection(sCollectionName);
            let query = colRef.where(...args);
            return query.get();
        },

        dbAuth: function () {
            return firebase.auth();
        }



    }
});