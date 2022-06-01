sap.ui.define([
	"./BaseController",
	"../model/formatter"
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {
			let oJSON_Data = this.getModel("JSON_Data");
			this.getCollection("shipments").then((collection) => {
				let mData = this.getMapFromCollection(collection);
				oJSON_Data.setProperty("/shipments", mData);
			});

			

		}


	});
});