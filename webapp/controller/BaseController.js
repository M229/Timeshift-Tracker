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

        sum: function(a, b) {
            return a + b;
        } 
    });
});