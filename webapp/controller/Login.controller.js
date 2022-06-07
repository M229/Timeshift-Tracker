sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("sap.ui.demo.basicTemplate.controller.Login", {
        onInit: function () {

        },

        pressLoginLogBtn: function () {
            let oEmailInput = this.getView().byId("LoginEmailInput"),
                sEmail = oEmailInput.getValue(),
                oPassInput = this.getView().byId("LoginPassInput"),
                sPass = oPassInput.getValue();
            this.dbSignWithEmail(sEmail, sPass)
                .then((userCredentials) => {
                    let user = userCredentials.user;
                    this.setUserData(user, "JSON_State");
                    this.routerNavTo("home");
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorMessage);
                })
        },
    });
});