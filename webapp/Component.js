sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"./model/models",
	"./Firebase"
], function(UIComponent, Device, models, Firebase) {
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
		init: function() {

			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();

			Firebase.initializeFirebase();

			let oJSON_Data = this.getModel("JSON_Data");
			oJSON_Data.setData({});
		}
	});
});