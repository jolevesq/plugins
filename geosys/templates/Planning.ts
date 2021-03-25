export const formPlanifier = `
<div ng-controller="submitFromP as ctrl2">
    <div ng-style="ctrl1.SelectedMenuP" class="Geosys-div-Button" ng-click="ctrl1.ShowHide()">
        <h2>{{ 'plugins.geosys.planif' | translate }}</h2>
    </div>
    <div ng-show="ctrl1.IsVisiblePlanning" ng-style="ctrl1.bgEnv">
    <form name="planning">
        <div>
            <md-input-container class="Geosys-ddlshow">
                <label>{{ 'plugins.geosys.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl2.selectedItemC" 
                ng-change="ctrl2.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.geosys.themet' | translate }}" >
                    <md-option ng-repeat="item in ctrl2.itemsC" ng-value="item.value" ng-selected="ctrl2.itemsC.indexOf(item) == 0">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
        </div>

        <div>
        <md-input-container class="Geosys-largeur">
            <label>{{ 'plugins.geosys.idUT' | translate }}<span class="Geosys-errormess" ng-show="ctrl2.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
            <input type="text" name="idUt" id="idUt" ng-value="ctrl2.idut" placeholder="Where ...">
        </md-input-container>
        </div>

        <div>
            <md-input-container class="Geosys-largeur">
                <label>{{ 'plugins.geosys.typeTrv' | translate }}<span class="Geosys-errormess" ng-show="ctrl2.errwork">{{ 'plugins.geosys.errorWT' | translate }}</span></label>
                <md-select 
                name="typetrv"
                ng-model="ctrl2.selectedItemD"  
                placeholder="{{ 'plugins.geosys.typeTrv' | translate }}">
                    <md-option ng-repeat="item in ctrl2.itemsD" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
        </div>

        <div>
            <span class="Geosys-classeslist"><span class="Geosys-advanced">{{ 'plugins.geosys.classe' | translate }}</span><span class="Geosys-errormess Geosys-sizeerror" ng-show="ctrl2.errclass">{{ 'plugins.geosys.errorClass' | translate }}</span></span><md-checkbox ng-model="ctrl2.listeclasse" aria-label="checkall" class="md-secondary Geosys-checklist" ng-click="ctrl2.toggleAll()"></md-checkbox>
            <div class="Geosys-planning">
                <md-list-item class="Geosys-itemlist" ng-repeat="class in ctrl2.classes">
                    <span class="Geosys-largeurlist">{{ class.name }}</span>
                    <md-checkbox class="md-secondary Geosys-checklist" aria-label="{{ class.name }}" ng-model="class.wanted"></md-checkbox>
                </md-list-item>
            </div>
        </div>
        
        <div>
            <md-input-container class="Geosys-datfinfield">
                <label>{{ 'plugins.geosys.datefinprv' | translate }}</label>
                <md-datepicker name="dfp" ng-model="ctrl2.dfp"></md-datepicker>
            </md-input-container>
        </div>

        <div>
        <md-input-container class="Geosys-largeur">
            <label>{{ 'plugins.geosys.where' | translate }}</label>
            <input type="text" name="wherep" ng-model="ctrl2.wherep" value="" placeholder="Where ...">
        </md-input-container>
        </div>
        <span style="margin-top: 0px;" class="Geosys-advanced">{{ 'plugins.geosys.geome' | translate }}</span>
        <div class='Geosys-geom-Menu'>
            <div class="Geosys-geom-DivIn1">
                <md-checkbox class="Geosys-geom-CB" ng-model="ctrl2.inputchecked" aria-label="inputchk" ng-click='ctrl2.inputchck()'></md-checkbox>
                <md-input-container class="Geosys-containerclass1"> 
                    <label>Coordinates</label>
                    <input type="text" name="geomp" ng-model="ctrl2.geomp" class="Geosys-geom-input" aria-label="geometry" ng-disabled="!(ctrl2.inputchecked)" required> 
                </md-input-container>
                <md-input-container class="Geosys-containerclass12"> 
                    <label>EPSG</label>
                    <input type="text" name="geomES" ng-model="ctrl2.geomEPSG" class="Geosys-espg-input" aria-label="geometry" ng-disabled="!(ctrl2.inputchecked)" required> 
                </md-input-container>
            </div>
            <div class="Geosys-geom-DivIn1">
                <md-checkbox class="Geosys-geom-CB" ng-model="ctrl2.drawingchecked" aria-label="drwchk" ng-click='ctrl2.drawchck()'></md-checkbox>
                <div style="padding-top: 10px;" class="">Drawing</div>
                <div style="margin-left:35px; padding-top:5px;margin-top: 0px;" class="Geosys-advanced"> Shapefile(.zip)</div>
            </div>
            <div class="Geosys-geom-DivIn">
                <div class="Geosys-containerclass"> 
                    <md-checkbox class="Geosys-geom-CB" ng-model="ctrl2.filechecked" aria-label="mptchk" ng-click='ctrl2.importchck()'></md-checkbox>
                    <input  type="file" id="fileshp" ng-model="ctrl2.filshp" accept=".zip" class="Geosys-inputshape" ng-disabled="!(ctrl2.filechecked)"/>
                    <md-button ng-click="ctrl2.loadshp()" class="Geosys-btnShape md-raised" ng-disabled="!(ctrl2.filechecked)">Import</md-button>
                </div>
            </div>
        </div>
        <span style="margin-top: 0px;" class="Geosys-advanced">Connection settings</span>
        <br/>
        <br/>
        <div class='Geosys-geom-Menu'>
            <md-input-container class="Geosys-largeur">
                <label>Host<span class="Geosys-errormess" ng-show="ctrl2.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                <input type="text" name="host" id="host" ng-value="ctrl2.host" placeholder="Host">
            </md-input-container>
            <md-input-container class="Geosys-largeur">
                <br/>
                <label>Port<span class="Geosys-errormess" ng-show="ctrl2.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                <input type="text" name="port" id="port" ng-value="ctrl22.port" placeholder="port">
            </md-input-container>
            <md-input-container class="Geosys-largeur">
                <br/>
                <label>dbname<span class="Geosys-errormess" ng-show="ctrl2.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                <input type="text" name="dbname" id="dbname" ng-value="ctrl2.dbname" placeholder="dbname">
            </md-input-container>
            <md-input-container class="Geosys-largeur">
                <br/>
                <label>schema<span class="Geosys-errormess" ng-show="ctrl2.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                <input type="text" name="schema" id="schema" ng-value="ctrl2.schema" placeholder="schema">
            </md-input-container>
            <md-input-container class="Geosys-largeur">
                <br/>
                <label>password<span class="Geosys-errormess" ng-show="ctrl2.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                <input type="text" name="password" id="password" ng-value="ctrl2.password" placeholder="password">
            </md-input-container>
            <md-input-container class="Geosys-largeur">
                <br/>
                <label>username<span class="Geosys-errormess" ng-show="ctrl2.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                <input type="text" name="usernameParCo" id="usernameParCo" ng-value="ctrl2.usernameParCo" placeholder="usernameParCo">
            </md-input-container>
            <md-input-container class="Geosys-largeur">
                <br/>
                <label>type_conn<span class="Geosys-errormess" ng-show="ctrl2.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                <input type="text" name="type_conn" id="type_conn" ng-value="ctrl2.type_conn" placeholder="type_conn">
            </md-input-container>
        </div>
        <div>
        <md-input-container class="Geosys-submitbtn">
            <md-button class="md-primary md-raised" style="float: right;"
            ng-click="ctrl2.submitFormP(); ctrl1.ShowHide(); ctrl1.setColorP();" ng-disabled="planning.geomp.$invalid && planning.geomES.$invalid">
                {{ 'plugins.geosys.submit' | translate }}
                <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
            </md-button>
        </md-input-container>
        </div>
    </form>
    </div>
</div>`;