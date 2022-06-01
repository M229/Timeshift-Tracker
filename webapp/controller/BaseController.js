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

        getMapFromCollection: function(collection) {
            let mResult = collection.docs.map((doc) => {
                return doc.data();
            });
            return mResult;
        },

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