/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/ObjectPath","sap/ui/base/ManagedObjectMetadata","sap/ui/core/Renderer"],function(e,t,r,n){"use strict";var i=function(e,t){r.apply(this,arguments)};i.prototype=Object.create(r.prototype);i.prototype.constructor=i;i.uid=r.uid;i.prototype.getElementName=function(){return this._sClassName};i.prototype.getRendererName=function(){return this._sRendererName};i.prototype.getRenderer=function(){if(this._oRenderer){return this._oRenderer}var r=this.getRendererName();if(!r){return undefined}this._oRenderer=t.get(r);if(this._oRenderer){return this._oRenderer}e.warning("Synchronous loading of Renderer for control class '"+this.getName()+"', due to missing Renderer dependency.","SyncXHR",null,function(){return{type:"SyncXHR",name:r}});this._oRenderer=sap.ui.requireSync(r.replace(/\./g,"/"))||t.get(r);return this._oRenderer};i.prototype.applySettings=function(e){var o=e.metadata;this._sVisibility=o.visibility||"public";var a=e.hasOwnProperty("renderer")?e.renderer||"":undefined;delete e.renderer;r.prototype.applySettings.call(this,e);var d=this.getParent();this._sRendererName=this.getName()+"Renderer";this.dnd=Object.assign({draggable:false,droppable:false},d.dnd,typeof o.dnd=="boolean"?{draggable:o.dnd,droppable:o.dnd}:o.dnd);if(typeof a!=="undefined"){if(typeof a==="string"){this._sRendererName=a||undefined;return}if(typeof a==="object"&&typeof a.render==="function"){var s=t.get(this.getRendererName());if(s===a){this._oRenderer=a;return}if(s===undefined&&typeof a.extend==="function"){t.set(this.getRendererName(),a);this._oRenderer=a;return}}if(typeof a==="function"){a={render:a}}var p;if(d instanceof i){p=d.getRenderer()}this._oRenderer=n.extend.call(p||n,this.getRendererName(),a)}};i.prototype.afterApplySettings=function(){r.prototype.afterApplySettings.apply(this,arguments);this.register&&this.register(this)};i.prototype.isHidden=function(){return this._sVisibility==="hidden"};var o=i.prototype.metaFactoryAggregation;function a(e,t,r){o.apply(this,arguments);this.dnd=Object.assign({draggable:false,droppable:false,layout:"Vertical"},typeof r.dnd=="boolean"?{draggable:r.dnd,droppable:r.dnd}:r.dnd)}a.prototype=Object.create(o.prototype);a.prototype.constructor=a;i.prototype.metaFactoryAggregation=a;i.prototype.getDragDropInfo=function(e){if(!e){return this.dnd}var t=this._mAllAggregations[e]||this._mAllPrivateAggregations[e];if(!t){return{}}return t.dnd};return i},true);