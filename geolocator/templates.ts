// panels template: geolocator
export const INPUT_BOX = `
<div>
    <div class ng-controller="hereCtrl as ctrl" id= "box">
        <md-input-container>  
            <label for="location">{{ 'plugins.geolocator.input' | translate }}</label>
                <input class="w3-input w3-border-green w3-pale-blue w3-round-large"
                    type = "text"
                    id = "loc"
                    ng-model= "ctrl.address"
                    ng-change= "ctrl.hereAuto()"
        </md-input-container>
    </div>        
</div>`;

export const AUTO_LIST = `
<div> 
    <div ng-controller="autoCtrl as ctrl" id= "select">
        <md-list>
            <md-list-item class="" ng-model ="ctrl.list" ng-repeat="item in ctrl.list" ng-click="ctrl.getLoc(this)">
                {{item.name}}
            </md-list-item>
        </md-list>
    </div>
</div>
`;
