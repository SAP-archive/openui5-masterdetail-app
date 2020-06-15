/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseTreeModifier","./XmlTreeModifier","sap/base/util/ObjectPath","sap/ui/util/XMLHelper","sap/ui/core/Component","sap/base/util/merge","sap/ui/core/Fragment"],function(t,e,n,r,i,a){"use strict";var o={targets:"jsControlTree",setVisible:function(t,e){if(t.setVisible){this.unbindProperty(t,"visible");t.setVisible(e)}else{throw new Error("Provided control instance has no setVisible method")}},getVisible:function(t){if(t.getVisible){return t.getVisible()}else{throw new Error("Provided control instance has no getVisible method")}},setStashed:function(t,e,n){e=!!e;if(t.setStashed){var r;if(t.getStashed()===true&&e===false){t.setStashed(e);if(n instanceof i){r=this.bySelector(this.getSelector(t,n),n)}}if((r||t)["setVisible"]){this.setVisible(r||t,!e)}return r}else{throw new Error("Provided control instance has no setStashed method")}},getStashed:function(t){if(t.getStashed){return typeof t.getStashed()!=="boolean"?!this.getVisible(t):t.getStashed()}else{throw new Error("Provided control instance has no getStashed method")}},bindProperty:function(t,e,n){t.bindProperty(e,n)},unbindProperty:function(t,e){if(t){t.unbindProperty(e,true)}},setProperty:function(t,e,n){var r=t.getMetadata().getPropertyLikeSetting(e);this.unbindProperty(t,e);if(r){if(this._isSerializable(n)){n=this._escapeCurlyBracketsInString(n);var i=r._sMutator;t[i](n)}else{throw new TypeError("Value cannot be stringified","sap.ui.core.util.reflection.JsControlTreeModifier")}}},getProperty:function(t,e){var n=t.getMetadata().getPropertyLikeSetting(e);if(n){var r=n._sGetter;return t[r]()}},isPropertyInitial:function(t,e){return t.isPropertyInitial(e)},setPropertyBinding:function(t,e,n){this.unbindProperty(t,e);var r={};r[e]=n;t.applySettings(r)},getPropertyBinding:function(t,e){return t.getBindingInfo(e)},createControl:function(t,e,r,i,a,o){var g;if(this.bySelector(i,e)){g="Can't create a control with duplicated ID "+i;if(o){return Promise.reject(g)}throw new Error(g)}if(o){return new Promise(function(n,r){sap.ui.require([t.replace(/\./g,"/")],function(t){var r=this.getControlIdBySelector(i,e);n(new t(r,a))}.bind(this),function(){r(new Error("Required control '"+t+"' couldn't be created asynchronously"))})}.bind(this))}var s=n.get(t);if(!s){throw new Error("Can't create a control because the matching class object has not yet been loaded. Please preload the '"+t+"' module")}var u=this.getControlIdBySelector(i,e);return new s(u,a)},applySettings:function(t,e){t.applySettings(e)},_byId:function(t){return sap.ui.getCore().byId(t)},getId:function(t){return t.getId()},getParent:function(t){return t.getParent&&t.getParent()},getControlMetadata:function(t){return t&&t.getMetadata()},getControlType:function(t){return t&&t.getMetadata().getName()},setAssociation:function(t,e,n){var r=t.getMetadata().getAssociation(e);r.set(t,n)},getAssociation:function(t,e){var n=t.getMetadata().getAssociation(e);return n.get(t)},getAllAggregations:function(t){return t.getMetadata().getAllAggregations()},getAggregation:function(t,e){var n=this.findAggregation(t,e);if(n){return t[n._sGetter]()}},insertAggregation:function(t,e,n,r){if(e==="customData"){t.insertAggregation(e,n,r,true)}else{var i=this.findAggregation(t,e);if(i){if(i.multiple){var a=r||0;t[i._sInsertMutator](n,a)}else{t[i._sMutator](n)}}}},removeAggregation:function(t,e,n){if(e==="customData"){t.removeAggregation(e,n,true)}else{var r=this.findAggregation(t,e);if(r){t[r._sRemoveMutator](n)}}},removeAllAggregation:function(t,e){if(e==="customData"){t.removeAllAggregation(e,true)}else{var n=this.findAggregation(t,e);if(n){t[n._sRemoveAllMutator]()}}},getBindingTemplate:function(t,e){var n=t.getBindingInfo(e);return n&&n.template},updateAggregation:function(t,e){var n=this.findAggregation(t,e);if(n){t[n._sDestructor]();t.updateAggregation(e)}},findIndexInParentAggregation:function(t){var e=this.getParent(t),n;if(!e){return-1}n=this.getAggregation(e,this.getParentAggregationName(t));if(Array.isArray(n)){return n.indexOf(t)}else{return 0}},getParentAggregationName:function(t){return t.sParentAggregationName},findAggregation:function(t,e){if(t){if(t.getMetadata){var n=t.getMetadata();var r=n.getAllAggregations();if(r){return r[e]}}}},validateType:function(t,e,n,r){var i=e.type;if(e.multiple===false&&this.getAggregation(n,e.name)&&this.getAggregation(n,e.name).length>0){return false}return this._isInstanceOf(t,i)||this._hasInterface(t,i)},instantiateFragment:function(t,e,n){var i=r.parse(t);i=this._checkAndPrefixIdsInFragment(i,e);var a;var o=n&&n.getId();var g=n.getController();a=sap.ui.xmlfragment({fragmentContent:i,sId:o},g);if(!Array.isArray(a)){a=[a]}return a},destroy:function(t,e){t.destroy(e)},_getFlexCustomData:function(t,e){var r=typeof t==="object"&&typeof t.data==="function"&&t.data("sap-ui-custom-settings");return n.get(["sap.ui.fl",e],r)},attachEvent:function(t,e,r,i){var a=n.get(r);if(typeof a!=="function"){throw new Error("Can't attach event because the event handler function is not found or not a function.")}t.attachEvent(e,i,a)},detachEvent:function(t,e,r){var i=n.get(r);if(typeof i!=="function"){throw new Error("Can't attach event because the event handler function is not found or not a function.")}t.detachEvent(e,i)},bindAggregation:function(t,e,n){t.bindAggregation(e,n)},unbindAggregation:function(t,e){t.unbindAggregation(e)},getExtensionPointInfo:function(t,n){var r=n._xContent?n._xContent:n;var i=e.getExtensionPointInfo(t,r);if(i){i.index--;i.parent=i.parent&&this._byId(n.createId(i.parent.getAttribute("id")));i.defaultContent=i.defaultContent.map(function(t){var e=n.createId(t.getAttribute("id"));return this._byId(e)}.bind(this)).filter(function(t){return!!t})}return i}};return a({},t,o)},true);