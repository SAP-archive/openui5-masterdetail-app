/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/f/CardRenderer"],function(e,t){"use strict";var r=e.extend("sap.f.Card",{metadata:{library:"sap.f",interfaces:["sap.f.ICard"],properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"auto"}},aggregations:{header:{type:"sap.f.cards.IHeader",multiple:false},content:{type:"sap.ui.core.Control",multiple:false}}},renderer:t});r.prototype.getCardHeader=function(){return this.getHeader()};r.prototype.getCardContent=function(){return this.getContent()};return r});