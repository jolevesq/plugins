export const formExtraireMD:string = `
<div ng-controller="ExtraireMD as ctrl32">
    <div ng-style="ctrl1.SelectedMenuEXMD" class="Geosys-div-Button-Uti" ng-click="ctrl1.ShowHideEXMD()">
        <h2>{{ 'plugins.geosys.extraireMD' | translate }}</h2>
    </div>
    <div ng-show="ctrl1.IsVisibleEXMD" ng-style="ctrl1.bgEnv" class="Geosys-extractspace">
        <br/>
        <div class="rv-subsection">
            <md-input-container class="Geosys-largeur">
                <label>Identifiant de métadonnée<span class="Geosys-errormess" ng-show="ctrl32.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                <input type="text" name="idMD" id="idMD" ng-value="ctrl32.mdid" placeholder="Id_MD">
            </md-input-container>

            <md-input-container class="Geosys-ddlshowEX">
                <label>Traitement en mode asynchrone</label><span class="Geosys-errormess" ng-show="ctrl32.ErrorEx">{{ 'plugins.geosys.errorWU' | translate }}</span>
                <md-select
                ng-model="ctrl32.selectedItem"
                required>
                    <md-option value="true">True</md-option>
                    <md-option value="false">False</md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="Geosys-submitbtn">
                <md-button class="md-primary md-raised" style="float: right;"
                ng-click="ctrl32.submiteMD(); ctrl1.ShowHideEXMD(); ctrl1.setColorEXMD()">
                    {{ 'plugins.geosys.submit' | translate }}
                    <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>
</div>
`;