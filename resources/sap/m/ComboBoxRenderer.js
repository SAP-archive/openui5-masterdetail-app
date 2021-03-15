/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxBaseRenderer","sap/ui/core/Renderer","sap/ui/Device"],function(e,t){"use strict";var s=t.extend(e);s.apiVersion=2;s.CSS_CLASS_COMBOBOX="sapMComboBox";s.addOuterClasses=function(t,a){e.addOuterClasses.apply(this,arguments);t.class(s.CSS_CLASS_COMBOBOX)};s.addInnerClasses=function(t,a){e.addInnerClasses.apply(this,arguments);t.class(s.CSS_CLASS_COMBOBOX+"Inner")};s.addButtonClasses=function(t,a){e.addButtonClasses.apply(this,arguments);t.class(s.CSS_CLASS_COMBOBOX+"Arrow")};s.addPlaceholderClasses=function(t,a){e.addPlaceholderClasses.apply(this,arguments);t.class(s.CSS_CLASS_COMBOBOX+"Placeholder")};s.writeInnerAttributes=function(t,s){var a=s.getSelectedItem(),n=a&&s.getListItem(a),r=s.isOpen(),d=s.getProperty("formattedTextFocused");e.writeInnerAttributes.apply(this,arguments);t.attr("aria-expanded",r);if(d){t.attr("aria-activedescendant",s._getFormattedValueStateText().getId())}else if(r&&n&&n.hasStyleClass("sapMLIBFocused")&&s.getFocusDomRef()===document.activeElement){t.attr("aria-activedescendant",n.getId())}};return s},true);