/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(e){"use strict";var t={apiVersion:2};t.render=function(e,t){e.openStart("div",t);e.accessibilityState(t,{role:"list",roledescription:t._oRb.getText("GRIDCONTAINER_ROLEDESCRIPTION")});e.class("sapFGridContainer");if(t.getSnapToRow()){e.class("sapFGridContainerSnapToRow")}if(t.getAllowDenseFill()){e.class("sapFGridContainerDenseFill")}if(t.getWidth()){e.style("width",t.getWidth())}if(t.getMinHeight()){e.style("min-height",t.getMinHeight())}this.addGridStyles(e,t);var i=t.getTooltip_AsString();if(i){e.attr("title",i)}e.openEnd();this.renderDummyArea(e,t,"before",-1);var r=0,s=t.getItems();for(r=0;r<s.length;r++){this.renderItem(e,s[r],t,r,s.length)}this.renderDummyArea(e,t,"after",-1);e.close("div")};t.addGridStyles=function(e,t){var i=t._getActiveGridStyles();for(var r in i){e.style(r,i[r])}};t.renderItem=function(e,i,r,s,n){var a=t.getStylesForItemWrapper(i,r),o=a.styles,l=a.classes;e.openStart("div",r.getId()+"-item-"+s);e.accessibilityState(r,{role:"listitem",labelledby:i.getId()});o.forEach(function(t,i){e.style(i,t)});l.forEach(function(t){e.class(t)});e.attr("tabindex","0");e.openEnd();i.addStyleClass("sapFGridContainerItemInnerWrapper");e.renderControl(i);e.close("div")};t.getStylesForItemWrapper=function(e,t){var i=new Map,r=["sapFGridContainerItemWrapper"];var s=e.getLayoutData();if(s){var n=s.getColumns(),a=t.getActiveLayoutSettings().getColumns();if(n&&a){n=Math.min(n,a)}if(n){i.set("grid-column","span "+n)}if(t.getInlineBlockLayout()){i.set("grid-row","span 1")}else if(s.getRows()||s.getMinRows()){i.set("grid-row","span "+s.getActualRows())}if(!s.hasAutoHeight()){r.push("sapFGridContainerItemFixedRows")}}if(!e.getVisible()){r.push("sapFGridContainerInvisiblePlaceholder")}if(t._hasOwnVisualFocus(e)){r.push("sapFGridContainerItemWrapperNoVisualFocus")}return{styles:i,classes:r}};t.renderDummyArea=function(e,t,i,r){e.openStart("div",t.getId()+"-"+i);e.attr("tabindex",r);e.class("sapFGridContainerDummyArea");e.openEnd();e.close("div")};return t},true);