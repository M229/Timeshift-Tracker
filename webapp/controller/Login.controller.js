sap.ui.define([
    "./BaseController",
    "../Firebase"
], function (BaseController, Firebase) {
    "use strict";
    return BaseController.extend("sap.ui.demo.basicTemplate.controller.Login", {
        onInit: function () {

        },

        pressLoginLogBtn: function () {
            let oEmailInput = this.getView().byId("LoginEmailInput"),
                sEmail = oEmailInput.getValue(),
                oPassInput = this.getView().byId("LoginPassInput"),
                sPass = oPassInput.getValue();
            Firebase.dbSignWithEmail(sEmail, sPass)
                .then(() => {
                    this.routerNavTo("home");
                });
        },
    });
});