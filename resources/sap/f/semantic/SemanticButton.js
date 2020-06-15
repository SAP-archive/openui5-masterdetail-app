/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SemanticControl","sap/m/Button","sap/m/OverflowToolbarButton"],function(t,e,n){"use strict";var r=t.extend("sap.f.semantic.SemanticButton",{metadata:{library:"sap.f",abstract:true,properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true}},events:{press:{}}}});r.prototype._getControl=function(){var t=this.getAggregation("_control"),r=this._getConfiguration(),o,a;if(!r){return null}if(!t){o=r&&r.constraints==="IconOnly"?n:e;a=this._createInstance(o);a.applySettings(r.getSettings());if(typeof r.getEventDelegates==="function"){a.addEventDelegate(r.getEventDelegates(a))}this.setAggregation("_control",a,true);t=this.getAggregation("_control")}return t};r.prototype._createInstance=function(t){return new t({id:this.getId()+"-button",press:jQuery.proxy(this.firePress,this)})};return r});