/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,r){var t=r.mBindingInfos;e.write("<div");e.writeControlData(r);e.addClass("sapFCardHeaderSideIndicator");if(t.title||t.number||t.unit){e.addClass("sapFCardHeaderItemBinded")}e.writeClasses();e.writeStyles();e.write(">");var i=r.getAggregation("_title");if(i){i.addStyleClass("sapFCardHeaderSITitle");e.renderControl(i)}e.write("<div");e.addClass("sapFCardHeaderSINumber");if(t.title||t.number||t.unit){e.addClass("sapFCardHeaderItemBinded")}e.writeClasses();e.write(">");var a=r.getAggregation("_number");if(a){e.renderControl(a)}var d=r.getAggregation("_unit");if(d){e.renderControl(d)}e.write("</div>");e.write("</div>")};return e},true);