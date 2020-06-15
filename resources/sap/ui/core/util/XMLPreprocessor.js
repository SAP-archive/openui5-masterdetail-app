/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log","sap/base/util/JSTokenizer","sap/base/util/ObjectPath","sap/ui/base/BindingParser","sap/ui/base/ManagedObject","sap/ui/base/SyncPromise","sap/ui/core/XMLTemplateProcessor","sap/ui/model/BindingMode","sap/ui/model/CompositeBinding","sap/ui/model/Context","sap/ui/performance/Measurement"],function(e,t,n,r,i,o,a,u,f,s,c,l){"use strict";var d="http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1",g="sap.ui.core.util.XMLPreprocessor",p=[g],m=g+"/getResolvedBinding",h=g+"/insertFragment",v=g+".process",b=a.resolve(),y=a.resolve(true),x=Object.prototype.toString,w={},C=o.extend("sap.ui.core.util._with",{metadata:{properties:{any:"any"},aggregations:{child:{multiple:false,type:"sap.ui.core.util._with"}}},updateProperty:function(){this.setAny(this.mBindingInfos.any.binding.getExternalValue())}}),N=C.extend("sap.ui.core.util._repeat",{metadata:{aggregations:{list:{multiple:true,type:"n/a",_doesNotRequireFactory:true}}},updateList:function(){}});function A(e,t,n,r){function i(t){if(!r){r=e.getBinding("any");if(r instanceof s){r=r.getBindings();if(n!==undefined){r=r[n]}}}return Array.isArray(r)?r[t]:r}function o(e){return e instanceof c?e.getPath():e.getModel().resolve(e.getPath(),e.getContext())}return{getInterface:function(e,n){var o,a,u;if(typeof e==="string"){n=e;e=undefined}i();if(Array.isArray(r)){if(e>=0&&e<r.length){a=r[e]}else{throw new Error("Invalid index of part: "+e)}}else if(e!==undefined){throw new Error("Not the root formatter of a composite binding")}else if(n){a=r}else{throw new Error("Missing path")}if(n){u=a.getModel();if(n.charAt(0)!=="/"){o=a instanceof c?a:u.createBindingContext(a.getPath(),a.getContext())}a=u.createBindingContext(n,o);if(!a){throw new Error("Model could not create binding context synchronously: "+u)}}return A(null,t,undefined,a)},getModel:function(e){var t=i(e);return t&&t.getModel()},getPath:function(e){var t=i(e);return t&&o(t)},getSetting:function(e){if(e==="bindingContexts"||e==="models"){throw new Error("Illegal argument: "+e)}return t[e]}}}function M(e,t,n,r,i){var o=false;function u(t,u){var s=t.formatter,c,l=t.model;if(t.path&&t.path.indexOf(">")>0){l=t.path.slice(0,t.path.indexOf(">"))}c=e.getModel(l);if(s&&s.requiresIContext===true){s=t.formatter=s.bind(null,A(e,n,u))}if(s&&i&&(c&&c.$$valueAsPromise||u===undefined&&o)){t.formatter=function(){var e=this;return a.all(arguments).then(function(t){return s.apply(e,t)})};t.formatter.textFragments=s.textFragments}t.mode=f.OneTime;t.parameters=t.parameters||{};t.parameters.scope=r;if(i&&c&&c.$$valueAsPromise){o=t.parameters.$$valueAsPromise=true}}try{if(t.parts){t.parts.forEach(u)}u(t);e.bindProperty("any",t);return e.getBinding("any")?a.resolve(e.getAny()):null}catch(e){return a.reject(e)}finally{e.unbindProperty("any",true)}}function P(e,t){var n=-1;function r(i){if(i){return e[n]}n+=1;if(n<e.length){return t(e[n],n,e).then(r)}}return e.length?r():b}function E(e){var t,n=e.attributes,r="<"+e.nodeName,i,o;for(i=0,o=n.length;i<o;i+=1){t=n.item(i);r+=" "+t.name+'="'+t.value+'"'}return r+(e.childNodes.length?">":"/>")}function B(e,t){return t.visitNode(e)}return{plugIn:function(e,n,r){var i=w[n];if(e!==null&&typeof e!=="function"||e===B){throw new Error("Invalid visitor: "+e)}if(!n||n===d||n==="sap.ui.core"||n.indexOf(" ")>=0){throw new Error("Invalid namespace: "+n)}t.debug("Plug-in visitor for namespace '"+n+"', local name '"+r+"'",e,g);if(r){n=n+" "+r;i=w[n]||i}w[n]=e;return i||B},visitNodeWrapper:B,process:function(o,s,A){var B=s.caller,I=t.isLoggable(t.Level.DEBUG,g),F=I,j=s.name,O={},R,S=0,$={},L=s._supportInfo,U=t.isLoggable(t.Level.WARNING,g);function q(t){return{find:function(e,t){try{return a.resolve(P(e,t))}catch(e){return a.reject(e)}},getContext:function(e){var n,r,o;e=e||"";if(e[0]==="{"){throw new Error("Must be a simple path, not a binding: "+e)}n=i.simpleParser("{"+e+"}");r=t.getModel(n.model);if(!r){throw new Error("Unknown model '"+n.model+"': "+e)}o=r.resolve(n.path,t.getBindingContext(n.model));if(!o){throw new Error("Cannot resolve path: "+e)}return r.createBindingContext(o)},getResult:function(e,n){return V(e,n,t,true)},getSettings:function(){return A},getViewInfo:function(){return e.extend(true,{},s)},insertFragment:function(e,n){return W(e,n,t)},visitAttribute:function(e,n){return re(e,n,t)},visitAttributes:function(e){return ie(e,t)},visitChildNodes:function(e){return oe(e,t)},visitNode:function(e){try{return ae(e,t)}catch(e){return a.reject(e)}},with:function(e,n){var r,i=false,o,a=new C;if(!n){t.setChild(a)}for(o in e){r=e[o];i=true;a.setModel(r.getModel(),o);a.bindObject({model:o,path:r.getPath()})}return i||n?q(a):this}}}function T(e){if(I){t.debug(X()+Array.prototype.slice.call(arguments,1).join(" "),e&&E(e),g)}}function k(e){if(I){t.debug(X()+"Finished","</"+e.nodeName+">",g)}}function _(e,n){e=e+E(n);t.error(e,B,g);throw new Error(B+": "+e)}function D(e){var t,n=Array.prototype.filter.call(e.childNodes,a),r,i,o=false;function a(e){return e.nodeType===1}function u(e,t){return e.namespaceURI===d&&e.localName===t}if(!n.length||!u(n[0],"then")){return null}for(r=1,i=n.length;r<i;r+=1){t=n[r];if(o){_("Expected </"+e.prefix+":if>, but instead saw ",t)}if(u(t,"else")){o=true}else if(!u(t,"elseif")){_("Expected <"+e.prefix+":elseif> or <"+e.prefix+":else>, but instead saw ",n[r])}}return n}function X(){return(S<10?"[ ":"[")+S+"] "}function J(e){return e&&e.charAt(0)==="."?r.get(e.slice(1),$):r.get(e||"",$)||r.get(e||"")}function V(e,t,n,r,o){var u,f;l.average(m,"",p);try{u=i.complexParser(e,$,r,true,true,true)||e}catch(e){return a.reject(e)}if(u.functionsNotFound){if(r){ue(t,"Function name(s)",u.functionsNotFound.join(", "),"not found")}l.end(m);return null}if(typeof u==="object"){f=M(n,u,A,$,!s.sync);if(r&&!f){ue(t,"Binding not ready")}else if(s.sync&&f&&f.isPending()){_("Async formatter in sync view in "+e+" of ",t)}}else{f=a.resolve(u);if(o){o()}}l.end(m);return f}function W(e,t,n){var r,i=s.sync?u.loadTemplate:u.loadTemplatePromise,o=j;n.$mFragmentContexts=n.$mFragmentContexts||{};if(n.$mFragmentContexts[e]){_("Cyclic reference to fragment '"+e+"' ",t)}S++;T(t,"fragmentName =",e);n.$mFragmentContexts[e]=true;j=e;l.average(h,"",p);r=O[e];if(!r){O[e]=r=a.resolve(i(e,"fragment"))}return r.then(function(e){e=t.ownerDocument.importNode(e,true);l.end(h);return H(e).then(function(){if(e.namespaceURI==="sap.ui.core"&&e.localName==="FragmentDefinition"){return z(e,n,t)}t.parentNode.insertBefore(e,t);return ae(e,n)})}).then(function(){t.parentNode.removeChild(t);j=o;n.$mFragmentContexts[e]=false;k(t);S-=1})}function z(e,t,n){return oe(e,t).then(function(){var t;n=n||e;while(t=e.firstChild){n.parentNode.insertBefore(t,n)}})}function G(e,t){var n=ue.bind(null,e,"Constant test condition"),r=V(e.getAttribute("test"),e,t,true,n)||a.resolve(false);return r.catch(function(t){ue(e,"Error in formatter:",t)}).then(function(t){var n=!!t&&t!=="false";if(I){if(typeof t==="string"){t=JSON.stringify(t)}else if(t===undefined){t="undefined"}else if(Array.isArray(t)){t="[object Array]"}T(e,"test ==",t,"--\x3e",n)}return n})}function H(e){var t={},r=e.getAttributeNodeNS(d,"require"),i,o;function u(){return new a(function(e,t){var n=o.map(sap.ui.require);if(n.every(Boolean)){e(n)}else{sap.ui.require(o,function(){e(arguments)},t)}}).then(function(e){Object.keys(t).forEach(function(t,n){$[t]=e[n]})})}if(r&&r.value){i=r.value;e.removeAttributeNode(r);if(i[0]==="{"){t=n.parseJS(i);o=Object.keys(t).map(function(e){return t[e]});return u()}o=i.split(" ").map(function(e){return e.replace(/\./g,"/")});if(!s.sync){return u()}o.forEach(sap.ui.requireSync)}return b}function K(e,t,n){var r=V(t.value,e,n,false);if(!r){T(e,"Binding not ready for attribute",t.name);return b}return r.then(function(n){if(n===undefined){T(e,"Removed attribute",t.name);e.removeAttributeNode(t)}else if(n!==t.value){switch(typeof n){case"boolean":case"number":case"string":T(e,t.name,"=",n);t.value=n;break;default:T(e,"Ignoring",x.call(n),"value for attribute",t.name)}}},function(n){T(e,"Error in formatter of attribute",t.name,n)})}function Q(e,t){var n=e.getAttribute("name"),r,i,o=e.getAttribute("value");if(n&&n[0]==="."){n=n.slice(1)}if(!n||n.includes(".")){_("Missing proper relative name in ",e)}r=J(o);if(!r){_("Invalid value in ",e)}i=$[n];$[n]=r;return z(e,t).then(function(){e.parentNode.removeChild(e);$[n]=i})}function Y(e,t){var n=e.getAttribute("name"),r=V(n,e,t,true);if(!r){return y}return r.then(function(r){var i=sap.ui.require("sap/ui/core/CustomizingConfiguration"),o;if(r!==n){T(e,"name =",r)}if(i){o=i.getViewExtension(j,r,s.componentId);if(o&&o.className==="sap.ui.core.Fragment"&&o.type==="XML"){return W(o.fragmentName,e,t)}}return true},function(t){ue(e,"Error in formatter:",t);return true})}function Z(e,t){var n=e.getAttribute("fragmentName"),r=V(n,e,t,true);if(!r){return b}return r.then(function(n){var r=$;$=Object.create($);return W(n,e,t).then(function(){$=r})},function(t){ue(e,"Error in formatter:",t)})}function ee(e,t){S++;return P(D(e)||[e],function(n){if(n.localName==="else"){return y}if(n.localName==="then"){n=e}return G(n,t)}).then(function(n){return(n?z(n,t,e):b).then(function(){e.parentNode.removeChild(e);k(e);S-=1})})}function te(e,t){var n=e.getAttribute("list")||"",r=i.complexParser(n,$,false,true,true,true),o,u,c,l,d,g=e.getAttribute("var");if(g===""){_("Missing variable name for ",e)}if(!r){_("Missing binding for ",e)}if(r.functionsNotFound){ue(e,"Function name(s)",r.functionsNotFound.join(", "),"not found")}l=new N;t.setChild(l);r.mode=f.OneTime;l.bindAggregation("list",r);u=l.getBinding("list");l.unbindAggregation("list",true);c=r.model;if(!u){_("Missing model '"+c+"' in ",e)}u.enableExtendedChangeDetection();o=u.getContexts(r.startIndex,r.length);if(!s.sync&&o.dataRequested){d=new a(function(e){u.attachEventOnce("change",e)}).then(function(){return u.getContexts(r.startIndex,r.length)})}else{d=a.resolve(o)}g=g||c;l.setModel(u.getModel(),g);S++;T(e,"Starting");return d.then(function(t){return P(t,function(n,r){var i=r===t.length-1?e:e.cloneNode(true);l.setBindingContext(n,g);T(e,g,"=",n.getPath());return z(i,l,e)}).then(function(){k(e);S-=1;e.parentNode.removeChild(e)})})}function ne(e,t){var n,r,o,u,f=e.getAttribute("helper"),l,d=e.getAttribute("path"),g,p,m=e.getAttribute("var");if(m===""){_("Missing variable name for ",e)}o=new C;t.setChild(o);n=i.simpleParser("{"+d+"}");m=m||n.model;if(f||m){r=t.getModel(n.model);if(!r){_("Missing model '"+n.model+"' in ",e)}p=r.resolve(n.path,t.getBindingContext(n.model));if(!p){_("Cannot resolve path for ",e)}l=r.createBindingContext(p);if(f){u=J(f);if(typeof u!=="function"){_("Cannot resolve helper for ",e)}l=u(l)}g=a.resolve(l);if(s.sync&&g.isPending()){_("Async helper in sync view in ",e)}g=g.then(function(t){if(t instanceof c){r=t.getModel();p=t.getPath()}else if(t!==undefined){if(typeof t!=="string"||t===""){_("Illegal helper result '"+t+"' in ",e)}p=t}o.setModel(r,m);o.bindObject({model:m,path:p})})}else{p=d;o.bindObject(p);g=b}return g.then(function(){S++;T(e,m,"=",p);if(o.getBindingContext(m)===t.getBindingContext(m)){ue(e,"Set unchanged path:",p);o=t}return z(e,o).then(function(){e.parentNode.removeChild(e);k(e);S-=1})})}function re(e,t,n){if(L){L({context:undefined,env:{caller:"visitAttribute",before:{name:t.name,value:t.value}}})}return K(e,t,n).then(function(){if(L){L({context:undefined,env:{caller:"visitAttribute",after:{name:t.name,value:t.value}}})}})}function ie(e,t){function n(e,t){return e.name.localeCompare(t.name)}return P(Array.prototype.slice.apply(e.attributes).sort(n),function(n){return re(e,n,t)})}function oe(e,t){return P(Array.prototype.slice.apply(e.childNodes),function(e){return ae(e,t)})}function ae(e,t){var n;function r(){return ie(e,t).then(function(){return oe(e,t)}).then(function(){if(L){L({context:e,env:{caller:"visitNode",after:{name:e.tagName}}})}})}if(e.nodeType!==1){return b}if(L){L({context:e,env:{caller:"visitNode",before:{name:e.tagName}}})}if(e.namespaceURI===d){switch(e.localName){case"alias":return Q(e,t);case"if":return ee(e,t);case"repeat":return te(e,t);case"with":return ne(e,t);default:_("Unexpected tag ",e)}}else if(e.namespaceURI==="sap.ui.core"){switch(e.localName){case"ExtensionPoint":return Y(e,t).then(function(e){if(e){return r()}});case"Fragment":if(e.getAttribute("type")==="XML"){return Z(e,t)}break}}else{n=w[e.namespaceURI+" "+e.localName]||w[e.namespaceURI];if(n){S++;T(e,"Calling visitor");return n(e,q(t)).then(function(t){if(t!==undefined){_("Unexpected return value from visitor for ",e)}k(e);S-=1})}}return r()}function ue(e){if(U){if(!F){F=true;t.warning("Warning(s) during processing of "+B,null,g)}t.warning(X()+Array.prototype.slice.call(arguments,1).join(" "),e&&E(e),g)}}l.average(v,"",p);A=A||{};if(I){T(undefined,"Start processing",B);if(A.bindingContexts instanceof c){T(undefined,"undefined =",A.bindingContexts)}else{for(R in A.bindingContexts){T(undefined,R,"=",A.bindingContexts[R])}}}if(L){L({context:o,env:{caller:"view",viewinfo:e.extend(true,{},s),settings:e.extend(true,{},A),clone:o.cloneNode(true),type:"template"}})}return H(o).then(function(){return ae(o,new C({models:A.models,bindingContexts:A.bindingContexts}))}).then(function(){T(undefined,"Finished processing",B);l.end(v);return o}).unwrap()}}},true);