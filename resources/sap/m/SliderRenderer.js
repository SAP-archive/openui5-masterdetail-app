/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SliderUtilities","sap/ui/core/InvisibleText"],function(e,t){"use strict";var a={apiVersion:2};a.CSS_CLASS="sapMSlider";a.render=function(e,t){var i=t.getEnabled(),r=t.getTooltip_AsString(),s=a.CSS_CLASS,n=t.getAriaLabelledBy().reduce(function(e,t){return e+" "+t},"");e.openStart("div",t);this.addClass(e,t);if(!i){e.class(s+"Disabled")}e.style("width",t.getWidth());if(r&&t.getShowHandleTooltip()){e.attr("title",t._formatValueByCustomElement(r))}e.openEnd();e.openStart("div",t.getId()+"-inner");this.addInnerClass(e,t);if(!i){e.class(s+"InnerDisabled")}e.openEnd();if(t.getProgress()){this.renderProgressIndicator(e,t,n)}this.renderHandles(e,t,n);e.close("div");if(t.getEnableTickmarks()){this.renderTickmarks(e,t)}this.renderLabels(e,t);if(t.getName()){this.renderInput(e,t)}e.close("div")};a.renderProgressIndicator=function(e,t){e.openStart("div",t.getId()+"-progress");this.addProgressIndicatorClass(e,t);e.style("width",t._sProgressValue);e.attr("aria-hidden","true");e.openEnd().close("div")};a.renderHandles=function(e,t,a){this.renderHandle(e,t,{id:t.getId()+"-handle",forwardedLabels:a})};a.renderHandle=function(e,a,i){var r=a.getEnabled();e.openStart("span",i&&i.id);if(a.getShowHandleTooltip()&&!a.getShowAdvancedTooltip()){this.writeHandleTooltip(e,a)}if(a.getInputsAsTooltips()){e.attr("aria-describedby",t.getStaticId("sap.m","SLIDER_INPUT_TOOLTIP"));r&&e.attr("aria-keyshortcuts","F2")}this.addHandleClass(e,a);e.style(sap.ui.getCore().getConfiguration().getRTL()?"right":"left",a._sProgressValue);this.writeAccessibilityState(e,a,i);if(r){e.attr("tabindex","0")}e.openEnd().close("span")};a.writeHandleTooltip=function(e,t){e.attr("title",t._formatValueByCustomElement(t.toFixed(t.getValue())))};a.renderInput=function(e,t){e.voidStart("input",t.getId()+"-input").attr("type","text");e.class(a.CSS_CLASS+"Input");if(!t.getEnabled()){e.attr("disabled")}e.attr("name",t.getName());e.attr("value",t._formatValueByCustomElement(t.toFixed(t.getValue())));e.voidEnd()};a.writeAccessibilityState=function(e,t,a){var i=t.getValue(),r=t._isElementsFormatterNotNumerical(i),s=t._formatValueByCustomElement(i),n;if(t._getUsedScale()&&!r){n=s}else{n=t.toFixed(i)}e.accessibilityState(t,{role:"slider",orientation:"horizontal",valuemin:t.toFixed(t.getMin()),valuemax:t.toFixed(t.getMax()),valuenow:n,labelledby:{value:(a.forwardedLabels+" "+t.getAggregation("_handlesLabels")[0].getId()).trim()}});if(r){e.accessibilityState(t,{valuetext:s})}};a.renderTickmarks=function(t,i){var r,s,n,l,o,d,c,S=i._getUsedScale();if(!i.getEnableTickmarks()||!S){return}d=Math.abs(i.getMin()-i.getMax());c=i.getStep();l=S.getTickmarksBetweenLabels();s=S.calcNumberOfTickmarks(d,c,e.CONSTANTS.TICKMARKS.MAX_POSSIBLE);n=i._getPercentOfValue(this._calcTickmarksDistance(s,i.getMin(),i.getMax(),c));t.openStart("ul").class(a.CSS_CLASS+"Tickmarks").openEnd();this.renderTickmarksLabel(t,i,i.getMin());t.openStart("li").class(a.CSS_CLASS+"Tick").style("width",n+"%;").openEnd().close("li");for(r=1;r<s-1;r++){if(l&&r%l===0){o=r*n;this.renderTickmarksLabel(t,i,i._getValueOfPercent(o))}t.openStart("li").class(a.CSS_CLASS+"Tick").style("width",n+"%;").openEnd().close("li")}this.renderTickmarksLabel(t,i,i.getMax());t.openStart("li").class(a.CSS_CLASS+"Tick").style("width","0").openEnd().close("li");t.close("ul")};a.renderTickmarksLabel=function(e,t,i){var r=t._getPercentOfValue(i);var s=sap.ui.getCore().getConfiguration().getRTL()?"right":"left";var n;i=t.toFixed(i,t.getDecimalPrecisionOfNumber(t.getStep()));n=t._formatValueByCustomElement(i,"scale");e.openStart("li").class(a.CSS_CLASS+"TickLabel").style(s,r+"%").openEnd();e.openStart("div").class(a.CSS_CLASS+"Label").openEnd().text(n).close("div");e.close("li")};a._calcTickmarksDistance=function(e,t,a,i){var r=Math.abs(t-a),s=Math.floor(r/i),n=Math.ceil(s/e);return t+n*i};a.addClass=function(e,t){e.class(a.CSS_CLASS)};a.addInnerClass=function(e,t){e.class(a.CSS_CLASS+"Inner")};a.addProgressIndicatorClass=function(e,t){e.class(a.CSS_CLASS+"Progress")};a.addHandleClass=function(e,t){e.class(a.CSS_CLASS+"Handle")};a.renderLabels=function(e,t){t.getAggregation("_handlesLabels").forEach(e.renderControl,e)};return a},true);