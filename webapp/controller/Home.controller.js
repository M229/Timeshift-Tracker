sap.ui.define([
	"./BaseController",
	"../model/formatter"
], function (BaseController, formatter) {
	"use strict";

	return BaseController.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {
			this.dbRefreshModel("JSON_Data", "shipments");

		},

		pressTableCrossBtn: function (oEvent) {
			let sBindingPath = oEvent.getParameter("listItem").getBindingContextPath(),
				oJSON_Data = this.getModel("JSON_Data"),
				aShipments = oJSON_Data.getProperty("/shipments"),
				aBindingPath = sBindingPath.split("/"),
				dPosition = +aBindingPath[aBindingPath.length - 1],
				sId = aShipments[dPosition].id;		
			this.dbDeleteDoc("shipments", sId);
			this.dbRefreshModel("JSON_Data", "shipments");
		},

		pressHomePlusBtn: function() {
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "sap.ui.demo.basicTemplate.view.AddItemDialog"
				});
			}
			this.pDialog.then(function (oDialog) {
				oDialog.open();
			});
		},

		pressAddItemDialogAddBtn: function(sCollection, oItem) {
			let oNameInput = this.getView().byId("AddItemDialogNameInput"),
				sName = oNameInput.getValue(),
				oSurnameInput = this.getView().byId("AddItemDialogSurnameInput"),
				sSurname = oSurnameInput.getValue(),
				oDoc = {
					Name: sName,
					Surname: sSurname
				};

			this.dbAddDoc("shipments", oDoc);
			
			
		},

		pressAddItemDialogCloseBtn: function(oEvent) {
			let i = 0;
		}
	});
});