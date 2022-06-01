sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    const firebaseConfig  = {
        apiKey: "AIzaSyD1_iSu73YXo3v2Snp3OnHlvuXPIw_vP9o",
        authDomain: "timeshft-tracker.firebaseapp.com",
        projectId: "timeshft-tracker",
        storageBucket: "timeshft-tracker.appspot.com",
        messagingSenderId: "333146536649",
        appId: "1:333146536649:web:a726e8aa396298a8e82b18"
    };

    return {
        initializeFirebase: function() {
           // Initialize Firebase with the Firebase-config
			firebase.initializeApp(firebaseConfig);
			
			// Create a Firestore reference
			firebase.firestore();	           
        }
    }
});