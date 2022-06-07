sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"./model/models",
	"./Firebase"
], function (UIComponent, Device, models, Firebase) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.basicTemplate.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {

			UIComponent.prototype.init.apply(this, arguments);

			console.log("Component");

			this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();
			let oRouter = this.getRouter();

			oRouter.attachRouteMatched(this.routeMatched, this);

			let oJSON_Data = this.getModel("JSON_Data");
			oJSON_Data.setData({});

			Firebase.initializeFirebase();
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					//var uid = user.uid;
					//console.log("onAuthStateChanged: User " + user.uid + "has been logged");
				} else {
					//console.log("onAuthStateChanged: There is no logged users");
					let oRouter = this.getRouter();
					oRouter.navTo("Login");
				}
			});
		},

		routeMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var sRouteName = oParameters.name;
			console.log(sRouteName);
			var oJSON_State = this.getModel("JSON_State");
			oJSON_State.setProperty("/routeName", sRouteName);
		}
	});
});