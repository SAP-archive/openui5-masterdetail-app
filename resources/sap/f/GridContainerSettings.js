/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/dom/units/Rem","sap/base/Log"],function(e,t,n){"use strict";function i(e){if(e===null||e===undefined){return e}if(e===0||e==="0"){return 0}var i=e.match(/^(\d+(\.\d+)?)(px|rem)$/),o;if(i){if(i[3]==="px"){o=parseFloat(i[1])}else{o=t.toPx(parseFloat(i[1]))}}else{n.error("Css size '"+e+"' is not supported for some features in GridContainer. Only 'px' and 'rem' are supported.");o=NaN}return Math.ceil(o)}var o=e.extend("sap.f.GridContainerSettings",{metadata:{library:"sap.f",properties:{columns:{type:"int"},columnSize:{type:"sap.ui.core.CSSSize",defaultValue:"80px"},minColumnSize:{type:"sap.ui.core.CSSSize"},maxColumnSize:{type:"sap.ui.core.CSSSize"},rowSize:{type:"sap.ui.core.CSSSize",defaultValue:"80px"},gap:{type:"sap.ui.core.CSSSize",defaultValue:"16px"}}}});o.prototype.getColumnSizeInPx=function(){return i(this.getColumnSize())};o.prototype.getMinColumnSizeInPx=function(){return i(this.getMinColumnSize())};o.prototype.getRowSizeInPx=function(){return i(this.getRowSize())};o.prototype.getGapInPx=function(){return i(this.getGap())};o.prototype.getComputedColumnsCount=function(e){if(this.getColumns()){return this.getColumns()}var t=this.getGapInPx(),n=this.getColumnSizeInPx();return Math.floor((e+t)/(n+t))};o.prototype.calculateRowsForItem=function(e){var t=this.getGapInPx(),n=this.getRowSizeInPx();return Math.ceil((e+t)/(n+t))};o.prototype.calculateColumnsForItem=function(e){var t=this.getGapInPx(),n=this.getColumnSizeInPx();return Math.ceil((e+t)/(n+t))};return o});