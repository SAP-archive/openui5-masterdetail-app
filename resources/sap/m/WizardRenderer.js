/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library"],function(e){"use strict";var r={apiVersion:2};r.render=function(e,r){this.startWizard(e,r);this.renderProgressNavigator(e,r);this.renderWizardSteps(e,r);this.endWizard(e)};r.startWizard=function(e,r){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("WIZARD_LABEL");e.openStart("div",r).class("sapMWizard").class("sapMWizardMode"+r.getRenderMode()).class("sapMWizardBg"+r.getBackgroundDesign()).style("width",r.getWidth()).style("height",r.getHeight()).accessibilityState({role:"region",label:t}).openEnd()};r.renderProgressNavigator=function(e,r){e.renderControl(r.getAggregation("_progressNavigator"))};r.renderWizardSteps=function(r,t){r.openStart("section",t.getId()+"-step-container").class("sapMWizardStepContainer").openEnd();if(t.getRenderMode()===e.WizardRenderMode.Scroll){this._getStepsRenderingOrder(t).forEach(r.renderControl,r)}r.close("section")};r.endWizard=function(e){e.close("div")};r._getStepsRenderingOrder=function(e){if(!e.getEnableBranching()){return e.getSteps()}var r=e.getSteps().slice(),t,n,i,a;var s=function(e,t,n){var i=sap.ui.getCore().byId(e);if(r.indexOf(i)<r.indexOf(n)){var a=r.indexOf(i),s=r[a];r[a]=n;r[t]=s;t=0}return t};for(t=0;t<r.length;t++){n=r[t];a=n.getSubsequentSteps();if(a.length<1&&n.getNextStep()){a=[n.getNextStep()]}for(i=0;i<a.length;i++){t=s(a[i],t,n)}}return r};return r},true);