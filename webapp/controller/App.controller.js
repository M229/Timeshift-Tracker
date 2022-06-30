sap.ui.define([
    "./BaseController",
    "../model/formatter",
    "sap/ui/model/json/JSONModel",
    "../Firebase"
], function (BaseController, formatter, JSONModel, Firebase) {
    "use strict";

    return BaseController.extend("sap.ui.demo.basicTemplate.controller.App", {

        formatter: formatter,

        onInit: function () {
            this.getOwnerComponent().getRouter().initialize();
            let oRouter = this.getOwnerComponent().getRouter();

            oRouter.attachRouteMatched(this.routeMatched, this);

            let oJSON_Data = this.getModel("JSON_Data");
            oJSON_Data.setData({});
            Firebase.initializeFirebase();
            Firebase.dbAuth().onAuthStateChanged((user) => {
                if (user) {
                    Firebase.dbAddOrGetDocByUid("Users", user)
                        .then((doc) => {
                            this.setCurrentUser(doc.data(), "JSON_State");
                        });
                } else {
                    console.log("no logged user -> go to Login page");
                    let oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Login");
                }
            });
        },

        routeMatched: function (oEvent) {
            var oParameters = oEvent.getParameters();
            var sRouteName = oParameters.name;
            //console.log(sRouteName);
            var oJSON_State = this.getModel("JSON_State");
            oJSON_State.setProperty("/routeName", sRouteName);
        }
    });
});