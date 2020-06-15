/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer"],function(t){"use strict";var e={apiVersion:2};e.CSS_CLASS="sapMSliderTooltip";e.render=function(t,i){t.openStart("div",i).class(e.CSS_CLASS);if(!i.getEditable()){t.class(e.CSS_CLASS+"NonEditableWrapper")}if(i.getWidth()){t.style("width",i.getWidth())}t.openEnd();this.renderTooltipElement(t,i);t.close("div")};e.renderTooltipElement=function(t,i){var n=sap.ui.getCore().getConfiguration().getAccessibility();t.openStart("input").class(e.CSS_CLASS+"Input");if(!i.getEditable()){t.class(e.CSS_CLASS+"NonEditable")}if(n){t.accessibilityState(i,{})}t.attr("tabindex","-1").attr("value",i.getValue()).attr("type","number").attr("step",i.getStep()).attr("id",i.getId()+"-input").openEnd().close("input")};return e},true);