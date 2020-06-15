/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./DragInfo","./DropInfo","sap/ui/Device","sap/base/Log"],function(e,t,r,o){"use strict";var a=t.extend("sap.ui.core.dnd.DragDropInfo",{metadata:{library:"sap.ui.core",interfaces:["sap.ui.core.dnd.IDragInfo","sap.ui.core.dnd.IDropInfo"],properties:{sourceAggregation:{type:"string",defaultValue:null}},associations:{targetElement:{type:"sap.ui.core.Element",multiple:false}},events:{dragStart:{allowPreventDefault:true},dragEnd:{}}}});a.prototype.isDraggable=e.prototype.isDraggable;a.prototype.fireDragEnd=e.prototype.fireDragEnd;a.prototype.fireDragStart=function(t){if(r.browser.msie){t.originalEvent.dataTransfer.effectAllowed=this.getDropEffect().toLowerCase()}return e.prototype.fireDragStart.apply(this,arguments)};a.prototype.getDropTarget=function(){var e=this.getTargetElement();if(e){return sap.ui.getCore().byId(e)}return this.getParent()};a.prototype.setGroupName=function(){o.error("groupName property must not be set on "+this);return this};return a});