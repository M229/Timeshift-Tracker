sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/model/json/JSONModel"
], function (Controller, formatter, JSONModel) {
    "use strict";

    return Controller.extend("sap.ui.demo.basicTemplate.controller.BaseController", {

        formatter: formatter,

        onInit: function () {

        },

        dbGetCollection: function (sCollectionName) {
            return firebase.firestore().collection(sCollectionName);
        },

        getArrayFromCollection: function (collection) {
            let aResult = collection.docs.map((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                return obj
            });
            return aResult;
        },

        dbRefreshDataModel: function (sModelName, aCollections) {
            let oJSON_Data = this.getModel(sModelName);
            aCollections.forEach((sCollectionName) => {
                this.dbGetCollection(sCollectionName).get().then((collection) => {
                    let aData = this.getArrayFromCollection(collection);
                    oJSON_Data.setProperty("/" + sCollectionName, aData);
                });
            });
        },

        dbAddDoc: function (sCollectionName, oDoc) {
            let collection = this.dbGetCollection(sCollectionName);
            return collection.add(oDoc);
        },

        dbDeleteDoc: function (sCollectionName, sDocId) {
            let collection = this.dbGetCollection(sCollectionName);
            return collection.doc(sDocId).delete();
        },

        routerNavTo: function (sTargetId) {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(sTargetId);
        },

        dbSignWithEmail: function (sEmail, sPass) {
            return firebase.auth().signInWithEmailAndPassword(sEmail, sPass);
        },

        setCurrentUser: function (oUser, sModelName) {
            let oJSON_State = this.getView().getModel(sModelName);
            let oUserLight = {
                uid: oUser.uid,
                email: oUser.email,
                displayName: oUser.displayName
            }
            oJSON_State.setProperty("/user", oUserLight);
        },

        getCurrentUser: function () {
            let oJSON_State = this.getView().getModel("JSON_Stat");  
        },

        dbGetDocByUid: function (sCollection, sDocUid) {
            let docRef = firebase.firestore().collection(sCollection).doc(sDocUid);
            return docRef.get();
        },

        dbAddNewUser: function (sCollectionName, oUser) {
            let collection = firebase.firestore().collection(sCollectionName);
            collection.doc(oUser.uid).set({
                description: "Team member",
                displayName: "Anonymous",
                pic: "sap-icon://employee",
                uid: oUser.uid,
                email: oUser.email
            })
        },

        dbQuery: function(sCollectionName) {
            
        },

        pcJSONGenerator: function (sUsersCollectionName) {
            let JSON_PcData = {};
            return new Promise((resolve, reject) => {
                this.dbGetCollection(sUsersCollectionName).get().then((oUsersCollection) => {
                    let aUsers = this.getArrayFromCollection(oUsersCollection);
                     
                    let aPeople = [];
                    let i = 0;

                    
                    let aAppointments = [{}];
                         aAppointments[0].start = new Date("2022", "5", "27", "00", "00", "00"),
                         aAppointments[0].end = new Date("2022", "5", "27", "23", "59", "59"),
                         aAppointments[0].title = "Discussion of the plan",
                         aAppointments[0].info = "Online meeting",
                         aAppointments[0].type = "Type04",
                         aAppointments[0].tentative = false
                         
                    aUsers.forEach((item, index, arr) => {
                         aPeople[i] = {};
                         aPeople[i].role = item.description;
                         aPeople[i].name = item.displayName;
                         aPeople[i].pic = item.pic;
                         aPeople[i].appointments = aAppointments;
                         i++;
                    });
                    JSON_PcData.startDate = new Date("2017", "0", "15", "8", "0");
                    JSON_PcData.people = aPeople;
                    resolve(JSON_PcData);
            });
            
            });
            
        },

        ////////////////////////////

        getModel: function (sName) {
            return this.getView().getModel(sName) || this.getOwnerComponent().getModel(sName);
        },

        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        }
    });
});