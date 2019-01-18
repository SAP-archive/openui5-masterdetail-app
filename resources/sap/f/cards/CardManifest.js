/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={"sap.card/title":"sap.app/title","sap.card/subtitle":"sap.app/subtitle","sap.card/info":"sap.app/info","sap.card/i18n":"sap.app/i18n","sap.card/description":"sap.app/description","sap.card/icons":"sap.ui/icons","sap.card/view":"sap.ui5/rootView"};function i(t){this.oJson=t}i.prototype.registerTranslator=function(t){this.oTranslator=t};i.prototype.getJson=function(){return this.oJson};i.prototype.get=function(i){var s=i.split("/"),n=0,r=s[n],a=this.oJson;if(!r){return null}while(a&&r){a=a[r];if(typeof a==="string"&&this.oTranslator&&a.indexOf("{{")===0&&a.indexOf("}}")===a.length-2){a=this.oTranslator.getText(a.substring(2,a.length-2))}n++;r=s[n]}if(t[i]&&(a===null||a===undefined)){return this.get(t[i])}return a};return i},true);