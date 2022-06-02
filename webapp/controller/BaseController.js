sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/model/json/JSONModel"
], function(Controller, formatter, JSONModel) {
    "use strict";
    
    return Controller.extend("sap.ui.demo.basicTemplate.controller.BaseController", {

        formatter: formatter,

		onInit: function() {

        },

        getCollection: function(sCollection) {
            return firebase.firestore().collection(sCollection).get();
        },

        getArrayFromCollection: function(collection) {
            let aResult = collection.docs.map((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                return obj
            });
            return aResult;
        },

        dbRefreshModel: function(sModelName, sCollectionName) {
            let oJSON_Data = this.getModel(sModelName);
			this.getCollection(sCollectionName).then((collection) => {
				let aData = this.getArrayFromCollection(collection);
				oJSON_Data.setProperty("/" + sCollectionName, aData);
			});
        },

        dbAddDoc: function(sCollection, oDoc) {
            let collection = firebase.firestore().collection(sCollection);
            return collection.add(oDoc);
        },

        dbDeleteDoc: function(sCollectionName, sDocId) {
            let collection = firebase.firestore().collection(sCollectionName);
			return collection.doc(sDocId).delete();
        },

        ////////////////////////////////////////////////////////////

        getById: function(sId) {
			return this.getView().byId(sId) || sap.ui.getCore().byId(sId);
		},

		getModel: function(sName) {
			return this.getView().getModel(sName) || this.getOwnerComponent().getModel(sName);
		},

		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
    });
});