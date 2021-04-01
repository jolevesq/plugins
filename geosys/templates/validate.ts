export const validateform:string = `
<div ng-controller="submitFromV as ctrl9">
    <div ng-style="ctrl1.SelectedMenuV" class="Geosys-div-Button-Uti" ng-click="ctrl1.ShowHideV()">
        <h2>{{ 'plugins.geosys.valider' | translate }}</h2>
    </div>
    <div ng-show="ctrl1.IsVisibleV" ng-style="ctrl1.bgEnv">
        <form name="valiform">
            <div class="rv-subsection">
                <!--<md-input-container class="Geosys-ddlshowEX">
                    <label>{{ 'plugins.geosys.themet' | translate }}</label>
                    <md-select 
                    ng-model="ctrl9.selectedItemE" 
                    ng-change="ctrl9.setList()" 
                    id="theme" 
                    required>
                        <md-option ng-repeat="item in ctrl9.itemsE" ng-value="item.value" ng-selected="ctrl9.itemsE.indexOf(item) == 0">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container class="Geosys-ddlshowEX">
                    <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                    <md-select
                    ng-model="ctrl9.selectedItemF"
                    required>
                        <md-option ng-repeat="item in ctrl9.itemsF" ng-value="item.value">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>-->

                
                <span><span class="Geosys-advanced">{{ 'plugins.geosys.filejson' | translate }}</span><span class="Geosys-errormess Geosys-sizeerror" ng-show="ctrl2.errJSON">{{ 'plugins.geosys.errorFMD' | translate }}</span></span><br/>
                    <input  type="file" id="fileJSON" accept=".json"/>
                
                <md-input-container class="Geosys-submitbtn">
                    <md-button class="md-primary md-raised" style="float: right;"
                    ng-click="ctrl9.submitFormV(); ctrl1.ShowHideV(); ctrl1.setColorV()" ng-disabled="valiform.$invalid">
                        {{ 'plugins.geosys.submit' | translate }}
                        <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                    </md-button>
                </md-input-container>
            </div>
        </form>
    </div>
</div>
`;