/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","./FilterOperator","sap/base/Log","sap/ui/thirdparty/jquery"],function(t,e,r,a){"use strict";var i=t.extend("sap.ui.model.Filter",{constructor:function(t,i,n,o){if(typeof t==="object"&&!Array.isArray(t)){this.sPath=t.path;this.sOperator=t.operator;this.oValue1=t.value1;this.oValue2=t.value2;this.sVariable=t.variable;this.oCondition=t.condition;this.aFilters=t.filters||t.aFilters;this.bAnd=t.and||t.bAnd;this.fnTest=t.test;this.fnCompare=t.comparator;this.bCaseSensitive=t.caseSensitive}else{if(Array.isArray(t)){this.aFilters=t}else{this.sPath=t}if(a.type(i)==="boolean"){this.bAnd=i}else if(a.type(i)==="function"){this.fnTest=i}else{this.sOperator=i}this.oValue1=n;this.oValue2=o;if(this.sOperator===e.Any||this.sOperator===e.All){throw new Error("The filter operators 'Any' and 'All' are only supported with the parameter object notation.")}}if(this.sOperator===e.Any){if(this.sVariable&&this.oCondition){this._checkLambdaArgumentTypes()}else if(!this.sVariable&&!this.oCondition){}else{throw new Error("When using the filter operator 'Any', a lambda variable and a condition have to be given or neither.")}}else if(this.sOperator===e.All){this._checkLambdaArgumentTypes()}else{if(Array.isArray(this.aFilters)&&!this.sPath&&!this.sOperator&&!this.oValue1&&!this.oValue2){this._bMultiFilter=true;if(!this.aFilters.every(s)){r.error("Filter in Aggregation of Multi filter has to be instance of sap.ui.model.Filter")}}else if(!this.aFilters&&this.sPath!==undefined&&(this.sOperator&&this.oValue1!==undefined||this.fnTest)){this._bMultiFilter=false}else{r.error("Wrong parameters defined for filter.")}}}});i.prototype._checkLambdaArgumentTypes=function(){if(!this.sVariable||typeof this.sVariable!=="string"){throw new Error("When using the filter operators 'Any' or 'All', a string has to be given as argument 'variable'.")}if(!s(this.oCondition)){throw new Error("When using the filter operator 'Any' or 'All', a valid instance of sap.ui.model.Filter has to be given as argument 'condition'.")}};function s(t){return t instanceof i}var n={Logical:"Logical",Binary:"Binary",Unary:"Unary",Lambda:"Lambda",Reference:"Reference",Literal:"Literal",Variable:"Variable",Call:"Call",Custom:"Custom"};var o={Equal:"==",NotEqual:"!=",LessThan:"<",GreaterThan:">",LessThanOrEqual:"<=",GreaterThanOrEqual:">=",And:"&&",Or:"||",Not:"!"};var l={Contains:"contains",StartsWith:"startswith",EndsWith:"endswith"};i.prototype.getAST=function(t){var r,a,i,s,h,u,f,c,p;function b(t,e,r){return{type:n.Logical,op:t,left:e,right:r}}function d(t,e,r){return{type:n.Binary,op:t,left:e,right:r}}function y(t,e){return{type:n.Unary,op:t,arg:e}}function A(t,e,r,a){return{type:n.Lambda,op:t,ref:e,variable:r,condition:a}}function g(t){return{type:n.Reference,path:t}}function T(t){return{type:n.Literal,value:t}}function m(t){return{type:n.Variable,name:t}}function E(t,e){return{type:n.Call,name:t,args:e}}if(this.aFilters){a=this.bAnd?o.And:o.Or;i=this.bAnd?"AND":"OR";r=this.aFilters[this.aFilters.length-1].getAST(t);for(var O=this.aFilters.length-2;O>=0;O--){r=b(a,this.aFilters[O].getAST(t),r)}}else{a=this.sOperator;i=this.sOperator;s=g(this.sPath);h=T(this.oValue1);switch(a){case e.EQ:r=d(o.Equal,s,h);break;case e.NE:r=d(o.NotEqual,s,h);break;case e.LT:r=d(o.LessThan,s,h);break;case e.GT:r=d(o.GreaterThan,s,h);break;case e.LE:r=d(o.LessThanOrEqual,s,h);break;case e.GE:r=d(o.GreaterThanOrEqual,s,h);break;case e.Contains:r=E(l.Contains,[s,h]);break;case e.StartsWith:r=E(l.StartsWith,[s,h]);break;case e.EndsWith:r=E(l.EndsWith,[s,h]);break;case e.NotContains:r=y(o.Not,E(l.Contains,[s,h]));break;case e.NotStartsWith:r=y(o.Not,E(l.StartsWith,[s,h]));break;case e.NotEndsWith:r=y(o.Not,E(l.EndsWith,[s,h]));break;case e.BT:u=h;f=T(this.oValue2);r=b(o.And,d(o.GreaterThanOrEqual,s,u),d(o.LessThanOrEqual,s,f));break;case e.NB:u=h;f=T(this.oValue2);r=b(o.Or,d(o.LessThan,s,u),d(o.GreaterThan,s,f));break;case e.Any:case e.All:c=m(this.sVariable);p=this.oCondition.getAST(t);r=A(a,s,c,p);break;default:throw new Error("Unknown operator: "+a)}}if(t&&!r.origin){r.origin=i}return r};i.defaultComparator=function(t,e){if(t==e){return 0}if(t==null||e==null){return NaN}if(typeof t=="string"&&typeof e=="string"){return t.localeCompare(e)}if(t<e){return-1}if(t>e){return 1}return NaN};return i});