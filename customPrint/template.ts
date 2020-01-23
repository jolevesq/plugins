// panels templates: customPrint
export const PRINT_FORM_TEMPLATE = `
<div class="">
    <div class="" ng-controller="printFormCtrl as ctrl">
        <md-input-container class="md-block" ng-repeat="control in ctrl.controls" name="{{ control.label }}">
            <input
                aria-label="{{ control.label }}"
                placeholder="{{ control.label }}"
                ng-model="control.value">
        </md-input-container>

        <md-button
            aria-label="{{ 'plugins.customPrint.title' | translate }}"
            class="v-button-square md-button ng-scope md-ink-ripple"
            ng-click="ctrl.print()">
                {{ 'plugins.customPrint.title' | translate }}
            <md-tooltip>{{ 'plugins.customPrint.title' | translate }}</md-tooltip>
        </md-button>
    </div>
</div>
`;

export const PRINT_BUTTON = `
<div class="" ng-controller="printExportCtrl as ctrl">
    <md-button
        aria-label="{{ 'plugins.customPrint.export' | translate }}"
        class="rv-button-square md-button ng-scope md-ink-ripple"
        ng-click="ctrl.print()">
            {{ 'plugins.customPrint.export' | translate }}
        <md-tooltip>{{ 'plugins.customPrint.export' | translate }}</md-tooltip>
    </md-button>
</div>
`;