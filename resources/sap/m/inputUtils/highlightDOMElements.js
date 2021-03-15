/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/inputUtils/wordStartsWithValue","sap/base/security/encodeXML"],function(n,t){"use strict";var e=function(e,r,s){var i,u,a,f,g,o=e?e.textContent:"",h="";if(!n(o,r)){return t(o)}r=r.toLowerCase();a=r.length;while(n(o,r)){i=o.toLowerCase();u=i.indexOf(r);u=u>0?i.indexOf(" "+r)+1:u;g=o.substring(0,u);o=o.substring(u);h+=t(g);g=o.substring(0,a);o=o.substring(a);h+='<span class="sapMInputHighlight">'+t(g)+"</span>";f=o.indexOf(" ");f=f===-1?o.length:f;g=o.substring(0,f);o=o.substring(f);h+=t(g);if(!s){break}}if(o){h+=t(o)}return h};var r=function(n,t,r){var s;if(!n&&!n.length){return}var i=[];for(s=0;s<n.length;s++){i.push(e(n[s],t,r))}for(s=0;s<n.length;s++){n[s].innerHTML=i[s]}};return r});