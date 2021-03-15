/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/PlanningCalendarLegend","sap/ui/unified/CalendarLegendItem","./PlanningCalendarInCardLegendRenderer"],function(e,t,n){"use strict";var i=e.extend("sap.f.PlanningCalendarInCardLegend",{metadata:{library:"sap.m",properties:{visibleLegendItemsCount:{type:"int",group:"Data",defaultValue:2}}}});i.prototype.exit=function(){e.prototype.exit.call(this,arguments);if(this._oItemsLink){this._oItemsLink.destroy();this._oItemsLink=null}};i.prototype._getMoreItemsText=function(e){if(!this._oItemsLink){this._oItemsLink=new sap.ui.unified.CalendarLegendItem({text:"More ("+e+")"})}return this._oItemsLink};return i});