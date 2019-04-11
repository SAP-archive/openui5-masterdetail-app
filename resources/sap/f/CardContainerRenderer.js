/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.render=function(t,e){t.write("<div");t.writeControlData(e);t.addClass("sapFCardContainer");t.writeClasses();if(e.getHeight()){t.addStyle("height",e.getHeight())}if(e.getWidth()){t.addStyle("width",e.getWidth())}t.writeStyles();var i=e.getTooltip_AsString();if(i){t.writeAttributeEscaped("title",i)}t.write(">");e.getItems().forEach(function(e){t.write("<div>");t.renderControl(e);t.write("</div>")});t.write("</div>")};return t},true);