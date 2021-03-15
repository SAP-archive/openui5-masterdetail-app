//@ui5-bundle sap/f/library-preload.support.js
sap.ui.predefine('sap/f/library.support', [
    'sap/ui/support/library',
    './rules/Avatar.support',
    './rules/DynamicPage.support'
], function (SupportLib, AvatarSupport, DynamicPageSupport) {
    'use strict';
    return {
        name: 'sap.f',
        niceName: 'UI5 Fiori Library',
        ruleset: [
            AvatarSupport,
            DynamicPageSupport
        ]
    };
}, true);
sap.ui.predefine('sap/f/rules/Avatar.support', [
    'sap/ui/support/library',
    '../library'
], function (SupportLib, library) {
    'use strict';
    var Categories = SupportLib.Categories, Severity = SupportLib.Severity, Audiences = SupportLib.Audiences;
    var oAvatarWithCustomDisplaySize = {
        id: 'avatarWithCustomDisplaySize',
        title: 'Avatar: Invalid combination of customDisplaySize and displaySize properties',
        minversion: '1.46',
        audiences: [Audiences.Application],
        categories: [Categories.Usage],
        description: 'Avatar customDisplaySize property takes affect, only when displaySize property is set to Custom.',
        resolution: 'Set displaySize property to Custom',
        check: function (oIssueManager, oCoreFacade, oScope) {
            oScope.getElementsByClassName('sap.f.Avatar').forEach(function (oElement) {
                var sElementId = oElement.getId(), sElementName = oElement.getMetadata().getElementName(), bIsDefaultCustomDisplaySize = oElement.getCustomDisplaySize() === oElement.getMetadata().getProperty('customDisplaySize').getDefaultValue();
                if (!bIsDefaultCustomDisplaySize && oElement.getDisplaySize() !== library.AvatarSize.Custom) {
                    oIssueManager.addIssue({
                        severity: Severity.Medium,
                        details: 'Avatar \'' + sElementName + '\' (' + sElementId + ') has customDisplaySize property, without setting displaySize to Custom',
                        context: { id: sElementId }
                    });
                }
            });
        }
    };
    var oAvatarWithCustomFontSize = {
        id: 'avatarWithCustomFontSize',
        title: 'Avatar: Invalid combination of customFontSize and displaySize properties',
        minversion: '1.46',
        audiences: [Audiences.Application],
        categories: [Categories.Usage],
        description: 'Avatar customFontSize property takes affect, only when displaySize property is set to Custom.',
        resolution: 'Set displaySize property to Custom',
        check: function (oIssueManager, oCoreFacade, oScope) {
            oScope.getElementsByClassName('sap.f.Avatar').forEach(function (oElement) {
                var sElementId = oElement.getId(), sElementName = oElement.getMetadata().getElementName(), bIsDefaultCustomFontSize = oElement.getCustomFontSize() === oElement.getMetadata().getProperty('customFontSize').getDefaultValue();
                if (!bIsDefaultCustomFontSize && oElement.getDisplaySize() !== library.AvatarSize.Custom) {
                    oIssueManager.addIssue({
                        severity: Severity.Medium,
                        details: 'Avatar \'' + sElementName + '\' (' + sElementId + ') has customFontSize property, without setting displaySize to Custom',
                        context: { id: sElementId }
                    });
                }
            });
        }
    };
    return [
        oAvatarWithCustomDisplaySize,
        oAvatarWithCustomFontSize
    ];
}, true);
sap.ui.predefine('sap/f/rules/DynamicPage.support', ['sap/ui/support/library'], function (SupportLib) {
    'use strict';
    var Categories = SupportLib.Categories, Severity = SupportLib.Severity, Audiences = SupportLib.Audiences;
    var oDynamicPageFitContentRule = {
        id: 'dynamicPageFitContentRule',
        title: 'DynamicPage fitContent property recommendations',
        minversion: '1.42',
        audiences: [Audiences.Application],
        categories: [Categories.Usage],
        description: 'It is recommended to use DynamicPage fitContent=false, when sap.m.Table is used, ' + 'or fitContent=true, when sap.ui.table.Table (with visibleRowCountMode=Auto) is used.',
        resolution: 'Set fitContent property according to recommendations.',
        check: function (oIssueManager, oCoreFacade, oScope) {
            var tableLibrary = sap.ui.require('sap/ui/table/library');
            oScope.getElementsByClassName('sap.f.DynamicPage').forEach(function (oElement) {
                var sElementId = oElement.getId(), oContent = oElement.getAggregation('content');
                if (oContent && oContent.isA('sap.m.Table') && oElement.getFitContent()) {
                    oIssueManager.addIssue({
                        severity: Severity.Medium,
                        details: 'It is recommended to use DynamicPage \'' + '\' (' + sElementId + ') with fitContent=false, when sap.m.Table is used.',
                        context: { id: sElementId }
                    });
                }
                if (oContent && oContent.isA('sap.ui.table.Table') && tableLibrary && oContent.getVisibleRowCountMode() === tableLibrary.VisibleRowCountMode.Auto && !oElement.getFitContent()) {
                    oIssueManager.addIssue({
                        severity: Severity.Medium,
                        details: 'It is recommended to use DynamicPage \'' + '\' (' + sElementId + ') with fitContent=true, when sap.ui.table.Table (with visibleRowCountMode=Auto) is used.',
                        context: { id: sElementId }
                    });
                }
            });
        }
    };
    return [oDynamicPageFitContentRule];
}, true);
