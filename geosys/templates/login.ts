

export const loginmenu:string= `
<div ng-controller="connexionCtrl as ctrl0">
    <div class="Geosys-centerText"><h2>{{ 'plugins.geosys.login' | translate }}</h2></div>
    <span class="Geosys-errormess Geosys-sizeerror" ng-show="ctrl0.errlog">{{ 'plugins.geosys.errlogin' | translate }}</span>
    <br/>
    <br/>
    <md-input-container class="Geosys-largeur">
    <label>{{ 'plugins.geosys.username' | translate }}</label>
    <input type="text" ng-model="ctrl0.userName" placeholder="{{ 'plugins.geosys.username' | translate }}"/>
    </md-input-container>
    <md-input-container class="Geosys-largeur">
    <label>{{ 'plugins.geosys.password ' | translate }}</label>
    <input type="password" ng-model="ctrl0.passwrd" placeholder="{{ 'plugins.geosys.password ' | translate }}"/>
    </md-input-container>
    <div class="rv-subsection">
        <md-button class="md-primary md-raised" style="float: right;"
        ng-click="ctrl0.submitConn()">
            {{ 'plugins.geosys.submit' | translate }}
            <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
        </md-button>
        <div ng-show="ctrl0.loadercirc" class="loader"></div>
    </div>
</div>`;