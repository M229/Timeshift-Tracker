sap.ui.define([
	"./BaseController",
	"../model/formatter",
	"sap/ui/model/json/JSONModel"
], function (BaseController, formatter, JSONModel) {
	"use strict";

	return BaseController.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {
			this.dbRefreshDataModel("JSON_Data", ["Appointments", "Projects"]);
			///////////////////////////////////////
			///////////////////////////////////////
			var oModel = new JSONModel();
			oModel.setData({
				startDate: new Date("2017", "0", "15", "8", "0"),
				people: [
					
					{
						pic: "sap-icon://employee",
						name: "Nancy Davolio",
						role: "team member",
						appointments: [
							// {
							// 	start: new Date("2017", "0", "15", "10", "00"),
							// 	end: new Date("2017", "0", "15", "10", "30"),
							// 	title: "Discussion of the plan",
							// 	info: "Online meeting",
							// 	type: "Type04",
							// 	tentative: false
							// },
							// {
							// 	start: new Date("2017", "0", "17", "10", "0"),
							// 	end: new Date("2017", "0", "17", "12", "0"),
							// 	title: "Team meeting",
							// 	info: "room 1",
							// 	type: "Type01",
							// 	pic: "sap-icon://sap-ui5",
							// 	tentative: false
							// },
						],
						headers: [
							{
								start: new Date("2017", "0", "12", "16", "30"),
								end: new Date("2017", "0", "12", "18", "00"),
								title: "Private appointment",
								type: "Type06"
							}
						]
					},
					{
						pic: "sap-icon://employee",
						name: "Andrew Fuller",
						role: "team member",
						appointments: [
							// {
							// 	start: new Date("2017", "0", "15", "10", "00"),
							// 	end: new Date("2017", "0", "15", "10", "30"),
							// 	title: "Discussion of the plan",
							// 	info: "Online meeting",
							// 	type: "Type04",
							// 	tentative: false
							// },
							// {
							// 	start: new Date("2017", "0", "15", "18", "00"),
							// 	end: new Date("2017", "0", "15", "19", "10"),
							// 	title: "Discussion of the plan",
							// 	info: "Online meeting",
							// 	type: "Type04",
							// 	tentative: false
							// },
						]
					},
					{
						pic: "sap-icon://employee",
						name: "Robert King",
						role: "team member",
						appointments: [
						// 	{
						// 		start: new Date("2017", "0", "15", "10", "00"),
						// 		end: new Date("2017", "0", "15", "12", "00"),
						// 		title: "Planning",
						// 		info: "Online meeting",
						// 		type: "Type04",
						// 		tentative: false
						// 	},
						// 	{
						// 		start: new Date("2017", "0", "17", "10", "0"),
						// 		end: new Date("2017", "0", "17", "12", "0"),
						// 		title: "Team meeting",
						// 		info: "room 1",
						// 		type: "Type01",
						// 		pic: "sap-icon://sap-ui5",
						// 		tentative: false
						// 	},
						
						]
					},
					{
						pic: "sap-icon://employee",
						name: "Janet Leverling",
						role: "team member",
						appointments: [
						
						]
					}
				]
			});
			this.getView().setModel(oModel);
			///////////////////////////////////////
			///////////////////////////////////////

		},

		pressTableCrossBtn: function (oEvent) {
			let sBindingPath = oEvent.getParameter("listItem").getBindingContextPath(),
				oJSON_Data = this.getModel("JSON_Data"),
				aShipments = oJSON_Data.getProperty("/shipments"),
				aBindingPath = sBindingPath.split("/"),
				dPosition = +aBindingPath[aBindingPath.length - 1],
				sId = aShipments[dPosition].id;
			this.dbDeleteDoc("shipments", sId);
			this.dbRefreshDataModel("JSON_Data", "shipments");
		},

		pressHomePlusBtn: function () {
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "sap.ui.demo.basicTemplate.view.AddItemDialog"
				});
			}
			this.pDialog.then(function (oDialog) {
				oDialog.open();
			});
		},

		pressAddItemDialogAddBtn: function (sCollection, oItem) {
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

		pressAddItemDialogCloseBtn: function (oEvent) {
			let dialog = this.byId("AddItemDialog");
			if (dialog) {
				dialog.close();
			}
		},

		pressHomeLogOutBtn: function() {     
			let oRouter = this.getOwnerComponent().getRouter();      
			firebase.auth().signOut().then(() => {
				console.log("pressHomeLogOutBtn: unlogged successfully");
				this.routerNavTo("Login");
				
			  }).catch((error) => {
				console.log("pressHomeLogOutBtn: error during unlog");
			  });
		}
	});
});