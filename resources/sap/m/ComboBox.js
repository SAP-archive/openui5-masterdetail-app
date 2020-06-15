/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxTextField","./ComboBoxBase","./List","./library","sap/ui/Device","sap/ui/core/Item","./StandardListItem","./ComboBoxRenderer","sap/ui/base/ManagedObjectObserver","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","./Toolbar","sap/base/assert","sap/base/security/encodeXML","sap/ui/core/Core","sap/base/Log","sap/ui/dom/jquery/control"],function(e,t,s,i,o,r,n,a,l,h,c,u,p,d,g,f,m){"use strict";var y=i.ListType;var I=i.ListMode;var S=t.extend("sap.m.ComboBox",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ComboBox.designtime",properties:{selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},filterSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{change:{parameters:{value:{type:"string"},itemPressed:{type:"boolean"}}},selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},dnd:{draggable:false,droppable:true}}});function v(e,t){if(!t){return}var s=e.getFocusDomRef(),i=e._getSelectionRange().start,o=s.value.substring(0,s.selectionStart),r=e._shouldResetSelectionStart(t),n=e.getSelectedItem(),a=t.isA("sap.ui.core.SeparatorItem"),l=this.getListItem(t);e.handleListItemsVisualFocus(l);e.setSelection(t);if(t!==n&&!a){e.updateDomValue(t.getText());e.fireSelectionChange({selectedItem:t});t=e.getSelectedItem();if(r){i=0}e.selectText(i,s.value.length);e._bIsLastFocusedItemHeader=false}if(a){e.setSelectedItem(null);e.fireSelectionChange({selectedItem:null});e.updateDomValue(o);e._bIsLastFocusedItemHeader=true;e._getGroupHeaderInvisibleText().setText(e._oRb.getText("LIST_ITEM_GROUP_HEADER")+" "+t.getText())}if(e.isOpen()){e.removeStyleClass("sapMFocus");e._getList().addStyleClass("sapMListFocus")}else{e.addStyleClass("sapMFocus")}e.scrollToItem(t)}S.prototype.scrollToItem=function(e){var t=this.getPicker(),s=t.getDomRef("cont"),i=this.getListItem(e),o=e&&i&&i.getDomRef();if(!t||!s||!o){return}var r=s.scrollTop,n=o.offsetTop,a=s.clientHeight,l=o.offsetHeight;if(r>n){s.scrollTop=n}else if(n+l>r+a){s.scrollTop=Math.ceil(n+l-a)}};S.prototype._createSuggestionsPopover=function(){var e=t.prototype._createSuggestionsPopover.call(this,arguments);e._bEnableHighlighting=false;return e};function _(e,t){if(document.activeElement===this.getFocusDomRef()){this.selectText(e,t)}}function b(e){var t=this.getSelectedItem(),s=this.getListItem(t),i=t&&s&&s.getDomRef(),o=i&&i.offsetTop,r=i&&i.offsetHeight,n=this.getPicker(),a=n.getDomRef("cont"),l=a.clientHeight;if(t&&o+r>l){if(!e){this._getList().$().css("visibility","hidden")}else{a.scrollTop=o-r/2;this._getList().$().css("visibility","visible")}}}S.prototype._getSelectedItemText=function(e){e=e||this.getSelectedItem();if(!e){e=this.getDefaultSelectedItem()}if(e){return e.getText()}return""};S.prototype._setItemVisibility=function(e,t){var s=e&&this.getListItem(e).$(),i="sapMSelectListItemBaseInvisible";if(t){e.bVisible=true;s.length&&s.removeClass(i)}else{e.bVisible=false;s.length&&s.addClass(i)}};S.prototype.setSelectedIndex=function(e,t){var s;t=t||this.getItems();e=e>t.length-1?t.length-1:Math.max(0,e);s=t[e];if(s){this.setSelection(s)}};S.prototype.revertSelection=function(){var e,t=this.getPickerTextField();this.setSelectedItem(this._oSelectedItemBeforeOpen);this.setValue(this._sValueBeforeOpen);if(this.getSelectedItem()===null){e=this._sValueBeforeOpen}else{e=this._oSelectedItemBeforeOpen.getText()}t&&t.setValue(e)};S.prototype.filterItems=function(e){var s=this.getItems(),i=[],o=[],r=e.properties.indexOf("additionalText")>-1,n=this.fnFilter||t.DEFAULT_TEXT_FILTER,a=[],l=false;this._oFirstItemTextMatched=null;s.forEach(function(t){if(t.isA("sap.ui.core.SeparatorItem")){if(!t.getText()){this.getListItem(t).setVisible(false);return}a.push({separator:t,show:false});l=true;this.getListItem(t).setVisible(false);return}var s=n.call(this,e.value,t,"getText");var h=n.call(this,e.value,t,"getAdditionalText");if((s||h)&&l){a[a.length-1].show=true;l=false}if(s){o.push(t);i.push(t)}else if(h&&r){i.push(t)}}.bind(this));s.forEach(function(e){if(e.isA("sap.ui.core.SeparatorItem")){return}var t=i.indexOf(e)>-1;var s=o.indexOf(e)>-1;if(!this._oFirstItemTextMatched&&s){this._oFirstItemTextMatched=e}this.getListItem(e).setVisible(t)},this);a.forEach(function(e){if(e.show){this.getListItem(e.separator).setVisible(true)}}.bind(this));return i};S.prototype._filterStartsWithItems=function(e,t){var s=e.toLowerCase();var i=this.getItems(),o=i.filter(function(e){return e[t]&&e[t]().toLowerCase().startsWith(s)});return o};S.prototype._getFilters=function(){return this.getFilterSecondaryValues()?["text","additionalText"]:["text"]};S.prototype.getNextFocusableItem=function(e){var t=this.getSelectableItems(),s=this.getNonSeparatorSelectableItems(t),i=this.hasStyleClass("sapMFocus"),o=this.getSelectedItem()||this._getItemByListItem(this._oLastFocusedListItem),r=this.getFormattedTextFocused(),n;if(i&&this.isOpen()||r){n=t[0]}else if(i&&!this.getValueStateLinks().length){n=s[s.indexOf(o)+(e?1:-1)]}else{n=t[t.indexOf(o)+(e?1:-1)]}if(r||!r&&o===t[0]&&!e&&this.getValueStateLinks().length){this.setProperty("formattedTextFocused",!r)}return n};S.prototype.getNonSeparatorSelectableItems=function(e){return e.filter(function(e){return!e.isA("sap.ui.core.SeparatorItem")})};S.prototype._itemsTextStartsWithTypedValue=function(e,t){if(!e||typeof t!="string"||t==""){return false}return e.getText().toLowerCase().startsWith(t.toLowerCase())};S.prototype._shouldResetSelectionStart=function(e){var t=this.getFocusDomRef(),s=this._getSelectionRange(),i=s.start!==s.end,o=t.value.substring(0,s.start),r=this._itemsTextStartsWithTypedValue(e,o);return!(r&&(i||this._bIsLastFocusedItemHeader))};S.prototype._getSelectionRange=function(){var e=this.getFocusDomRef(),t=this.getValue(),s=e.selectionStart,i=e.selectionEnd,r={start:s,end:i};if(!(o.browser.msie||o.browser.edge)){return r}if(this._bIsLastFocusedItemHeader){r.start=t.length;r.end=t.length}return r};S.prototype.handleListItemsVisualFocus=function(e){if(this._oLastFocusedListItem){this._oLastFocusedListItem.removeStyleClass("sapMLIBFocused");this._oLastFocusedListItem=null}if(e){this._oLastFocusedListItem=e;e.addStyleClass("sapMLIBFocused")}};S.prototype.setSelection=function(e){var t=this._getList(),s,i;this.setAssociation("selectedItem",e);this._setPropertyProtected("selectedItemId",e instanceof r?e.getId():e,true);if(typeof e==="string"){e=g.byId(e)}if(t){s=this.getListItem(e);if(s){t.setSelectedItem(s,true)}else{t.removeSelections(true)}}i=e?e.getKey():"";this._setPropertyProtected("selectedKey",i);if(this._oSuggestionPopover){this._oSuggestionPopover._iPopupListSelectedIndex=this.getItems().indexOf(e)}};S.prototype.isSelectionSynchronized=function(){var e=this.getSelectedItem();return this.getSelectedKey()===(e&&e.getKey())};S.prototype.isFiltered=function(){var e=this._getList();return e&&e.getVisibleItems().length!==this.getItems().length};S.prototype.isItemVisible=function(e){return e&&(e.bVisible===undefined||e.bVisible)};S.prototype._mapItemToListItem=function(e){var t,s,i,o;var r=this.getRenderer();if(!e){return null}o=e.getAdditionalText&&this.getShowSecondaryValues()?e.getAdditionalText():"";s=r.CSS_CLASS_COMBOBOXBASE+"Item";i=this.isItemSelected(e)?s+"Selected":"";if(e.isA("sap.ui.core.SeparatorItem")){t=this._mapSeparatorItemToGroupHeader(e,r)}else{t=new n({type:y.Active,info:o,visible:e.getEnabled()}).addStyleClass(s+" "+i)}t.setTitle(e.getText());this.setSelectable(e,e.getEnabled());t.setTooltip(e.getTooltip());e.data(r.CSS_CLASS_COMBOBOXBASE+"ListItem",t);e.getCustomData().forEach(function(e){t.addCustomData(e.clone())});this._oItemObserver.observe(e,{properties:["text","additionalText","enabled","tooltip"]});return t};S.prototype._forwardItemProperties=function(e){var t=e.object,s=t.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"ListItem"),i={text:"title",enabled:"visible",tooltip:"tooltip"},o,r,n;if(Object.keys(i).indexOf(e.name)>-1){r=i[e.name];n="set"+r.charAt(0).toUpperCase()+r.slice(1);s[n](e.current)}if(e.name==="additionalText"){o=this.getShowSecondaryValues()?e.current:"";s.setInfo(o)}};S.prototype.isItemSelected=function(e){return e&&e.getId()===this.getAssociation("selectedItem")};S.prototype.setAssociation=function(e,s,i){var o=this._getList();if(o&&e==="selectedItem"){if(!(s instanceof r)){s=this.findItem("id",s)}o.setSelectedItem(this.getListItem(s),true)}return t.prototype.setAssociation.apply(this,arguments)};S.prototype.removeAllAssociation=function(e,i){var o=this._getList();if(o&&e==="selectedItem"){s.prototype.removeAllAssociation.apply(o,arguments)}return t.prototype.removeAllAssociation.apply(this,arguments)};S.prototype.init=function(){this._oRb=g.getLibraryResourceBundle("sap.m");t.prototype.init.apply(this,arguments);this.bOpenValueStateMessage=true;this._sValueBeforeOpen="";this._sInputValueBeforeOpen="";this._oSelectedItemBeforeOpen=null;this._oFirstItemTextMatched=null;this.bIsFocused=false;if(o.system.phone){this.attachEvent("_change",this.onPropertyChange,this)}this._oLastFocusedListItem=null;this._bIsLastFocusedItemHeader=null;this._oItemObserver=new l(this._forwardItemProperties.bind(this))};S.prototype.onBeforeRendering=function(){t.prototype.onBeforeRendering.apply(this,arguments);var e=this.getSelectedItem(),s=this._getList(),i=e&&this.getListItem(e),r=this.getProperty("formattedTextFocused"),n=this.getPicker()&&this.getPicker().getCustomHeader(),a=o.browser.msie&&n&&n.getFormattedText?n.getFormattedText():n;this.synchronizeSelection();if(r){a.addStyleClass("sapMPseudoFocus");s.removeStyleClass("sapMListFocus");i.removeStyleClass("sapMLIBFocused");this.removeStyleClass("sapMFocus")}else if(a){a.removeStyleClass("sapMPseudoFocus")}};S.prototype._fillList=function(){var e=this._getList(),t,s,i,o,r;if(!e){return}if(this._oLastFocusedListItem){r=this._getItemByListItem(this._oLastFocusedListItem)}e.destroyItems();t=this.getItems();if(this._sInputValueBeforeOpen){t=this.filterItems({properties:this._getFilters(),value:this._sInputValueBeforeOpen})}for(o=0,i=t.length;o<i;o++){s=this._mapItemToListItem(t[o]);e.addAggregation("items",s,true)}if(r){this._oLastFocusedListItem=this.getListItem(r)}};S.prototype.exit=function(){t.prototype.exit.apply(this,arguments);this._oRb=null;this._oSelectedItemBeforeOpen=null;this._oFirstItemTextMatched=null;this._oLastFocusedListItem=null;if(this._oSuggestionPopover){if(this._oPickerCustomHeader){this._oPickerCustomHeader.destroy();this._oPickerCustomHeader=null}this._oSuggestionPopover.destroy();this._oSuggestionPopover=null}if(this._oItemObserver){this._oItemObserver.disconnect();this._oItemObserver=null}};S.prototype.onBeforeRenderingPicker=function(){var e=this["onBeforeRendering"+this.getPickerType()];e&&e.call(this)};S.prototype.onBeforeRenderingDropdown=function(){var e=this.getPicker(),t=this.$().outerWidth()/parseFloat(i.BaseFontSize)+"rem";if(e){e.setContentMinWidth(t)}};S.prototype.onBeforeRenderingList=function(){if(this.bProcessingLoadItemsEvent){var e=this._getList(),t=this.getFocusDomRef();if(e){e.setBusy(true)}if(t){t.setAttribute("aria-busy","true")}}};S.prototype.onAfterRenderingPicker=function(){var e=this["onAfterRendering"+this.getPickerType()];e&&e.call(this);b.call(this,false)};S.prototype.onAfterRenderingList=function(){var e=this.getSelectedItem(),t=this.getListItem(e);if(this.bProcessingLoadItemsEvent&&this.getItems().length===0){return}var s=this._getList(),i=this.getFocusDomRef();this._highlightList(this._sInputValueBeforeOpen);if(e){s.setSelectedItem(t);this.handleListItemsVisualFocus(t)}if(s){s.setBusy(false)}if(i){i.removeAttribute("aria-busy")}};S.prototype.oninput=function(e){t.prototype.oninput.apply(this,arguments);this.syncPickerContent();if(e.isMarked("invalid")){return}this.loadItems(function(){this.handleInputValidation(e,this.isComposingCharacter())},{name:"input",busyIndicator:false});if(this.bProcessingLoadItemsEvent&&this.getPickerType()==="Dropdown"){this.open()}this.setFormattedTextFocused(false);this.addStyleClass("sapMFocus");this._getList().removeStyleClass("sapMListFocus");if(this._getItemsShownWithFilter()){this.toggleIconPressedStyle(true)}};S.prototype.handleInputValidation=function(e,t){var s=this.getSelectedItem(),i=e.target.value,o=i==="",r=e.srcControl,n,a=this.getPickerType()==="Dropdown";if(o&&!this.bOpenedByKeyboardOrButton&&!this.isPickerDialog()){n=this.getItems()}else{n=this.filterItems({properties:this._getFilters(),value:i})}var l=!!n.length;var h=n[0];var c=n.some(function(e){return e.getKey()===this.getSelectedKey()},this);if(l&&this.getSelectedKey()&&!c){this._setPropertyProtected("selectedKey",null,false)}if(!o&&h&&h.getEnabled()){this.handleTypeAhead(r,n,i,t)}if(o||!l||!r._bDoTypeAhead&&this._getSelectedItemText()!==i){this.setSelection(null);if(s!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()})}}this._sInputValueBeforeOpen=i;if(this.isOpen()){setTimeout(function(){this._highlightList(i)}.bind(this))}if(l){if(o&&!this.bOpenedByKeyboardOrButton){this.close()}else if(a){this.open();this.scrollToItem(this.getSelectedItem())}}else if(this.isOpen()){if(a&&!this.bOpenedByKeyboardOrButton){this.close()}}else{this.clearFilter()}};S.prototype.handleTypeAhead=function(e,t,s,i){var r=this.intersectItems(this._filterStartsWithItems(s,"getText"),t);var n=this.getFilterSecondaryValues();var a=o.system.desktop;var l=this.getSelectedItem();if(e._bDoTypeAhead){var h=this.intersectItems(this._filterStartsWithItems(s,"getAdditionalText"),t);if(n&&!r[0]&&h[0]){!i&&e.updateDomValue(h[0].getAdditionalText());this.setSelection(h[0])}else if(r[0]){!i&&e.updateDomValue(r[0].getText());this.setSelection(r[0])}}else{this.setSelection(r[0])}if(l!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()})}if(e._bDoTypeAhead){if(a){_.call(e,s.length,e.getValue().length)}else{setTimeout(_.bind(e,s.length,e.getValue().length),0)}}this.addStyleClass("sapMFocus");this._getList().removeStyleClass("sapMListFocus")};S.prototype.onSelectionChange=function(e){var t=this._getItemByListItem(e.getParameter("listItem")),s=this.getChangeEventParams(),i=t!==this.getSelectedItem();this.updateDomValue(t.getText());this.setSelection(t);this.fireSelectionChange({selectedItem:this.getSelectedItem()});if(i){s.itemPressed=true;this.onChange(null,s)}};S.prototype.onItemPress=function(e){var t=e.getParameter("listItem"),s=t.getTitle(),i=this.getChangeEventParams(),o=t!==this.getListItem(this.getSelectedItem());if(t.isA("sap.m.GroupHeaderListItem")){return}this.handleListItemsVisualFocus(t);this.updateDomValue(s);if(!o){i.itemPressed=true;this.onChange(null,i)}this._setPropertyProtected("value",s,true);if(this.getPickerType()==="Dropdown"&&!this.isPlatformTablet()){this.selectText.bind(this,this.getValue().length,this.getValue().length)}this.close()};S.prototype.onBeforeOpen=function(){t.prototype.onBeforeOpen.apply(this,arguments);var e=this["onBeforeOpen"+this.getPickerType()],s=this.getFocusDomRef();this.setProperty("open",true);if(this.hasLoadItemsEventListeners()&&!this.bProcessingLoadItemsEvent){this.loadItems()}if(s){s.setAttribute("aria-controls",this.getPicker().getId())}this.addContent();e&&e.call(this)};S.prototype.onBeforeOpenDialog=function(){var e=this.getPickerTextField();this._oSelectedItemBeforeOpen=this.getSelectedItem();this._sValueBeforeOpen=this.getValue();if(this.getSelectedItem()){this.filterItems({properties:this._getFilters(),value:""})}e.setValue(this._sValueBeforeOpen)};S.prototype.onAfterOpen=function(){var e=this.getSelectedItem(),t=this._getSelectionRange(),s=this.isPlatformTablet();this.closeValueStateMessage();b.call(this,true);if(!s&&e&&t.start===t.end&&t.start>1){setTimeout(function(){this.selectText(0,t.end)}.bind(this),0)}};S.prototype.onBeforeClose=function(){t.prototype.onBeforeClose.apply(this,arguments);var e=this.getFocusDomRef();this.setProperty("open",false);this.setProperty("formattedTextFocused",false);if(e){e.removeAttribute("aria-controls")}this.toggleIconPressedStyle(false)};S.prototype.onAfterClose=function(){this.clearFilter();this._sInputValueBeforeOpen="";if(this.isPickerDialog()){t.prototype.closeValueStateMessage.apply(this,arguments)}};S.prototype.onItemChange=function(e){var t=this.getAssociation("selectedItem"),s=e.getParameter("newValue"),i=e.getParameter("name");if(t===e.getParameter("id")){switch(i){case"text":if(!this.isBound("value")){this.setValue(s)}break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(s)}break}}};S.prototype.onkeydown=function(e){var s=e.srcControl;t.prototype.onkeydown.apply(s,arguments);if(!s.getEnabled()||!s.getEditable()){return}var i=c;s._bDoTypeAhead=!o.os.android&&e.which!==i.BACKSPACE&&e.which!==i.DELETE};S.prototype.oncut=function(e){var s=e.srcControl;t.prototype.oncut.apply(s,arguments);s._bDoTypeAhead=false};S.prototype.onsapenter=function(e){var s=e.srcControl,i=s.getSelectedItem();if(i&&this.getFilterSecondaryValues()){s.updateDomValue(i.getText())}t.prototype.onsapenter.apply(s,arguments);if(!s.getEnabled()||!s.getEditable()){return}if(s.isOpen()&&!this.isComposingCharacter()){s.close()}};S.prototype.onsapdown=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}this.syncPickerContent();e.setMarked();e.preventDefault();this.loadItems(function e(){v.call(this,t,this.getNextFocusableItem(true))})};S.prototype.onsapup=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}this.syncPickerContent();e.setMarked();e.preventDefault();this.loadItems(function e(){v.call(this,t,this.getNextFocusableItem(false))})};S.prototype.onsaphome=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}this.syncPickerContent();e.setMarked();if(this.getValueStateLinks().length){this.setProperty("formattedTextFocused",true)}e.preventDefault();this.loadItems(function e(){var s=this.getSelectableItems()[0];v.call(this,t,s)})};S.prototype.onsapend=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}this.syncPickerContent();e.setMarked();e.preventDefault();if(this.getValueStateLinks().length&&this.getFormattedTextFocused()){this.setProperty("formattedTextFocused",false)}this.loadItems(function e(){var s=this.findLastEnabledItem(this.getSelectableItems());v.call(this,t,s)})};S.prototype.onsappagedown=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}this.syncPickerContent();e.setMarked();e.preventDefault();if(this.getValueStateLinks().length&&this.getFormattedTextFocused()){this.setProperty("formattedTextFocused",false)}this.loadItems(function(){var e=this.getNonSeparatorSelectableItems(this.getSelectableItems()),s=e.indexOf(this.getSelectedItem())+10,i;s=s>e.length-1?e.length-1:Math.max(0,s);i=e[s];v.call(this,t,i)})};S.prototype.onsappageup=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}this.syncPickerContent();e.setMarked();e.preventDefault();this.loadItems(function(){var e=this.getNonSeparatorSelectableItems(this.getSelectableItems()),s=e.indexOf(this.getSelectedItem())-10,i;s=s>e.length-1?e.length-1:Math.max(0,s);i=e[s];v.call(this,t,i)})};S.prototype.onsapshow=function(e){var s,i,o=this.getEditable(),r;t.prototype.onsapshow.apply(this,arguments);this.syncPickerContent();if(!this.getValue()&&o){s=this.getSelectableItems();i=this.getNonSeparatorSelectableItems(s)[0];if(i){r=this.getListItem(i);if(this.isOpen()){this.removeStyleClass("sapMFocus");this._getList().addStyleClass("sapMListFocus");this.handleListItemsVisualFocus(r)}else{this.addStyleClass("sapMFocus")}this.setSelection(i);this.updateDomValue(i.getText());this.fireSelectionChange({selectedItem:i});setTimeout(function(){this.selectText(0,i.getText().length)}.bind(this),0)}}};S.prototype.onsaphide=S.prototype.onsapshow;S.prototype.ontap=function(e){var t=this.getFocusDomRef(),s="aria-activedescendant";this.addStyleClass("sapMFocus");if(this.getFormattedTextFocused()){this.setFormattedTextFocused(false)}else if(this.getOpen()&&this._getList().hasStyleClass("sapMListFocus")||this._oLastFocusedListItem){this._getList().removeStyleClass("sapMListFocus");this._oLastFocusedListItem.removeStyleClass("sapMLIBFocused");this._oLastFocusedListItem=null;t.removeAttribute(s)}};S.prototype.onfocusin=function(e){var t=this.getPickerType()==="Dropdown";if(this._bIsBeingDestroyed){return}if(e.target===this.getOpenArea()){this.bOpenValueStateMessage=false;if(t&&!this.isPlatformTablet()){this.focus()}}else{if(t){setTimeout(function(){if(document.activeElement===this.getFocusDomRef()&&!this.bIsFocused&&!this.bFocusoutDueRendering&&!this.getSelectedText()){this.selectText(0,this.getValue().length)}this.bIsFocused=true}.bind(this),0)}if(!this.isOpen()&&this.bOpenValueStateMessage&&this.shouldValueStateMessageBeOpened()){this.openValueStateMessage()}this.bOpenValueStateMessage=true}if(this.getEnabled()&&(!this.isOpen()||!this.getSelectedItem()||!this._getList().hasStyleClass("sapMListFocus"))){this.addStyleClass("sapMFocus")}};S.prototype.onsapfocusleave=function(e){this.bIsFocused=false;var s,i,o,r,n=this.getSelectedItem();if(n&&this.getFilterSecondaryValues()){this.updateDomValue(n.getText())}t.prototype.onsapfocusleave.apply(this,arguments);if(this.isPickerDialog()){return}i=this.getPicker();if(!e.relatedControlId||!i){return}s=this.isPlatformTablet();o=g.byId(e.relatedControlId);r=o&&o.getFocusDomRef();if(h(i.getFocusDomRef(),r)&&!s&&!this.getFormattedTextFocused()){this.focus()}};S.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return}var e=this.getSelectedKey(),t=this.getItemByKey(""+e);if(t&&e!==""){this.setAssociation("selectedItem",t,true);this._setPropertyProtected("selectedItemId",t.getId(),true);if(this._sValue===this.getValue()){this.setValue(t.getText());this._sValue=this.getValue()}}};S.prototype.configPicker=function(e){var t=this.getRenderer(),s=t.CSS_CLASS_COMBOBOXBASE;e.setHorizontalScrolling(false).addStyleClass(s+"Picker").addStyleClass(s+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this)};S.prototype._configureList=function(e){var t=this.getRenderer();if(!e){return}e.setMode(I.SingleSelectMaster).addStyleClass(t.CSS_CLASS_COMBOBOXBASE+"List").addStyleClass(t.CSS_CLASS_COMBOBOX+"List");e.attachSelectionChange(this.onSelectionChange,this).attachItemPress(this.onItemPress,this);e.addEventDelegate({onBeforeRendering:this.onBeforeRenderingList,onAfterRendering:this.onAfterRenderingList},this)};S.prototype.destroyItems=function(){this.destroyAggregation("items");if(this._getList()){this._getList().destroyItems()}return this};S.prototype.getDefaultSelectedItem=function(){return null};S.prototype.getChangeEventParams=function(){return{itemPressed:false}};S.prototype.clearSelection=function(){this.setSelection(null)};S.prototype.selectText=function(e,s){t.prototype.selectText.apply(this,arguments);this.textSelectionStart=e;this.textSelectionEnd=s;return this};S.prototype.removeAllItems=function(){var e=t.prototype.removeAllItems.apply(this,arguments);this._fillList();return e};S.prototype.clone=function(e){var s=t.prototype.clone.apply(this,arguments),i=this._getList();if(!this.isBound("items")&&i){s.syncPickerContent();s.setSelectedIndex(this.indexOfItem(this.getSelectedItem()))}return s};S.prototype.open=function(){this.syncPickerContent();var e=this._getList();t.prototype.open.call(this);if(this.getSelectedItem()){e.addStyleClass("sapMListFocus");this.removeStyleClass("sapMFocus")}return this};S.prototype.syncPickerContent=function(){var e,t=this.getPicker(),s=this.getInputForwardableProperties();if(!t){var i,o;t=this.createPicker(this.getPickerType());e=this.getPickerTextField();this._fillList();if(e){s.forEach(function(t){t=t.charAt(0).toUpperCase()+t.slice(1);i="set"+t;o="get"+t;if(e[i]){e[i](this[o]())}},this)}this._oSuggestionPopover.updateValueState(this.getValueState(),this.getValueStateText(),this.getShowValueStateMessage())}this.synchronizeSelection();return t};S.prototype.findAggregatedObjects=function(){var e=this._getList();if(e){return s.prototype.findAggregatedObjects.apply(e,arguments)}return[]};S.prototype.setSelectedItem=function(e){if(typeof e==="string"){this.setAssociation("selectedItem",e,true);e=g.byId(e)}if(!(e instanceof r)&&e!==null){return this}if(!e){e=this.getDefaultSelectedItem()}this.setSelection(e);this.setValue(this._getSelectedItemText(e));return this};S.prototype.setSelectedItemId=function(e){e=this.validateProperty("selectedItemId",e);if(!e){e=this.getDefaultSelectedItem()}this.setSelection(e);e=this.getSelectedItem();this.setValue(this._getSelectedItemText(e));return this};S.prototype.setSelectedKey=function(e){e=this.validateProperty("selectedKey",e);var t=e==="",s=this.isBound("selectedKey")&&this.isBound("value")&&this.getBindingInfo("selectedKey").skipModelUpdate;if(t){this.setSelection(null);if(!s){this.setValue("")}return this}var i=this.getItemByKey(e);if(i){this.setSelection(i);if(!s){this.setValue(this._getSelectedItemText(i))}return this}this._sValue=this.getValue();return this._setPropertyProtected("selectedKey",e)};S.prototype._setPropertyProtected=function(e,t,s){try{return this.setProperty(e,t,s)}catch(e){f.warning("setSelectedKey update failed due to exception. Loggable in support mode log",null,null,function(){return{exception:e}})}};S.prototype.getSelectedItem=function(){var e=this.getAssociation("selectedItem");return e===null?null:g.byId(e)||null};S.prototype.updateItems=function(){var e,s=this.getSelectedItem(),e=t.prototype.updateItems.apply(this,arguments);clearTimeout(this._debounceItemsUpdate);this._debounceItemsUpdate=setTimeout(this["_syncItemsSelection"].bind(this,s),0);return e};S.prototype._syncItemsSelection=function(e){var t,s,i=this.getSelectedKey();if(!e||e===this.getSelectedItem()){return}s=this.getItems();t=s.some(function(e){return i===e.getKey()});this.setSelectedItem(t&&i?this.getItemByKey(i):null)};S.prototype.removeItem=function(e){e=t.prototype.removeItem.apply(this,arguments);var s;if(this._getList()){this._getList().removeItem(e&&this.getListItem(e))}if(this.isBound("items")&&!this.bItemsUpdated){return e}var i=this.getValue();if(this.getItems().length===0){this.clearSelection()}else if(this.isItemSelected(e)){s=this.getDefaultSelectedItem();this.setSelection(s);this.setValue(i)}return e};S.prototype._modifyPopupInput=function(e){t.prototype._modifyPopupInput.apply(this,arguments);e.addEventDelegate({onsapenter:function(){var t=e.getValue();this.updateDomValue(t);this.onChange();if(t){this.updateDomValue(t);this.onChange();this.close()}}},this);return e};S.prototype.applyShowItemsFilters=function(){var e,t;this.syncPickerContent();e=this.getPicker();t=function(){e.detachBeforeOpen(t,this);e=null;this.filterItems({value:this.getValue()||"_",properties:this._getFilters()})};e.attachBeforeOpen(t,this)};S.prototype._getFormattedValueStateText=function(){if(this.isOpen()){return this._getSuggestionsPopover()._getValueStateHeader().getFormattedText()}else{return e.prototype.getFormattedValueStateText.call(this)}};return S});