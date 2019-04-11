/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/base/Log"],function(e,r){"use strict";var t=["no-cors","same-origin","cors"];var i=["GET","POST"];var a={};a._isValidRequest=function(e){if(t.indexOf(e.mode)===-1){return false}if(i.indexOf(e.method)===-1){return false}if(typeof e.url!=="string"){return false}return true};a.fetch=function(t){var i="Invalid request";return new Promise(function(a,n){if(!t){r.error(i);n(i)}var o={mode:t.mode||"cors",url:t.url,method:t.method&&t.method.toUpperCase()||"GET",data:t.parameters,headers:t.headers,timeout:15e3};if(o.method==="GET"){o.dataType="json"}if(this._isValidRequest(o)){e.ajax(o).done(function(e){a(e)}).fail(function(e,r,t){n(t)})}else{r.error(i);n(i)}}.bind(this))};return a});