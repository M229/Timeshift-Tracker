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

        getCollection: function (sCollection) {
            return firebase.firestore().collection(sCollection).get();
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
                this.getCollection(sCollectionName).then((collection) => {
                    let aData = this.getArrayFromCollection(collection);
                    oJSON_Data.setProperty("/" + sCollectionName, aData);
                });
            });
        },

        dbAddDoc: function (sCollection, oDoc) {
            let collection = firebase.firestore().collection(sCollection);
            return collection.add(oDoc);
        },

        dbDeleteDoc: function (sCollectionName, sDocId) {
            let collection = firebase.firestore().collection(sCollectionName);
            return collection.doc(sDocId).delete();
        },

        routerNavTo: function (sTargetId) {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(sTargetId);
        },

        dbSignWithEmail: function (sEmail, sPass) {
            return firebase.auth().signInWithEmailAndPassword(sEmail, sPass);
        },

        setUserData: function (oUser, sCollectionName, sModelName) {
            let oCollection = this.getCollection(sCollectionName).then();
            let oJSON_State = this.getView().getModel(sModelName);
            let oUserLight = {
                uid: oUser.uid,
                email: oUser.email,
                displayName: oUser.displayName
            }
            oJSON_State.setProperty("/user", oUserLight);
        },

        pcJSONGenerator: function (sCollectionName) {
            // function pcHumanGenerator() {
                
            // };
            this.getCollection(sCollectionName).then((collection) => {
                let result = {};
                result.startDate = new Date("2022", "6", "1", "0", "0");
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