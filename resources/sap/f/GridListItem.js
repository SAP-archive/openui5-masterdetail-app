/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/ListItemBase","./GridListItemRenderer"],function(t){"use strict";var e=t.extend("sap.f.GridListItem",{metadata:{library:"sap.f",defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",bindable:"bindable"}}}});e.prototype.getContentAnnouncement=function(){return this.getContent().map(function(e){return t.getAccessibilityText(e)}).join(" ").trim()};return e});