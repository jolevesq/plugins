

export const formDelivery = `
<div ng-controller="submitFromD as ctrl5">
    <div ng-style="ctrl1.SelectedMenuD" class="Geosys-div-Button" ng-click="ctrl1.ShowHideD()">
        <h2>{{ 'plugins.geosys.delivery' | translate }}</h2>
    </div>
    <div ng-show="ctrl1.IsVisibleD" ng-style="ctrl1.bgEnv">
        <form name="deliform">
            <div class="rv-subsection">
                
                <md-input-container class="Geosys-ddlshowEX">
                    <label>{{ 'plugins.geosys.postput' | translate }}</label>
                    <md-select
                    ng-model="ctrl5.typeOper"
                    required>
                        <md-option value="Insert">{{ 'plugins.geosys.insert' | translate }}</md-option>
                        <md-option value="Update">{{ 'plugins.geosys.update' | translate }}</md-option>
                    </md-select>
                </md-input-container>

                <md-input-container class="Geosys-ddlshowEX">
                    <label>{{ 'plugins.geosys.themet' | translate }}</label>
                    <md-select
                    ng-model="ctrl5.selectedItemE"
                    ng-change="ctrl5.setList()"
                    id="theme"
                    required>
                        <md-option ng-repeat="item in ctrl5.itemsE" ng-value="item.value" ng-selected="ctrl5.itemsE.indexOf(item) == 0">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container class="Geosys-ddlshowEX">
                    <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                    <md-select
                    ng-model="ctrl5.selectedItemF"
                    required>
                        <md-option ng-repeat="item in ctrl5.itemsF" ng-value="item.value">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>
                <br/>
                <br/>
                <md-input-container class="Geosys-largeur">
                    <label>MD_ID<span class="Geosys-errormess" ng-show="ctrl5.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                    <input type="text" name="mdid" id="mdid" ng-value="ctrl5.mdid" placeholder="MD_ID">
                </md-input-container>

                <md-input-container class="Geosys-ddlshowEX">
                    <label>Type</label><span class="Geosys-errormess" ng-show="ctrl5.ErrorEx">{{ 'plugins.geosys.errorWU' | translate }}</span>
                    <md-select
                    ng-model="ctrl5.selectedItemR"
                    required>
                        <md-option value="GPKG">GPKG</md-option>
                        <md-option value="FGDB">FGDB</md-option>
                    </md-select>
                </md-input-container>
                
                    <div>
                        <span><span class="Geosys-advanced">{{ 'plugins.geosys.fileMD' | translate }}</span><span class="Geosys-errormess Geosys-sizeerror" ng-show="ctrl5.errMD">{{ 'plugins.geosys.errorFMD' | translate }}</span></span>
                        <input  type="file" id="fileMD" accept="json"/>
                    </div>
                
                
                    <div>
                        <span><span class="Geosys-advanced">{{ 'plugins.geosys.fileGDB' | translate }}</span><span class="Geosys-errormess Geosys-sizeerror" ng-show="ctrl5.errFGDB">{{ 'plugins.geosys.errorFGDB' | translate }}</span></span><br/>
                        <input type="file" id="filefgdb" accept="zip"/>
                    </div>
                
                
                <div ng-show="ctrl1.AdvancedVisible" ng-click="ctrl5.ShowHideAdvanced()" class="Geosys-advanced">
                    <span>Advanced Settings</span>
                </div>
                <div ng-show="ctrl5.IsVisibleASP">
                    <md-input-container class="Geosys-ddlshowEX">
                        <label>{{ 'plugins.geosys.envir' | translate }}</label>
                        <md-select
                        class="Geosys-envSelect"
                        ng-model="ctrl5.selectedItemENT"
                        id="envE"
                        placeholder="{{ 'plugins.geosys.envir' | translate }}">
                            <md-option ng-repeat="item in ctrl5.itemsENT" ng-value="item.value" >
                                {{ item.name }}
                            </md-option>
                        </md-select>
                    </md-input-container>
                </div>
                
                <md-input-container class="Geosys-submitbtn">
                    <md-button class="md-primary md-raised" style="float: right;"
                    ng-click="ctrl5.submitFormD(); ctrl1.ShowHideD(); ctrl1.setColorD()" ng-disabled="deliform.$invalid">
                        {{ 'plugins.geosys.submit' | translate }}
                        <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                    </md-button>
                </md-input-container>
            </div>
        </form>
    </div>
</div>

`;







export const formDeliverySR = `
<div ng-controller="submitFromDSA as ctrl22">
    <div ng-style="ctrl1.SelectedMenuDSR" class="Geosys-div-Button-Uti" ng-click="ctrl1.ShowHideDSR()">
        <h2>{{ 'plugins.geosys.delivery' | translate }}</h2>
    </div>
    <div ng-show="ctrl1.IsVisibleDSR" ng-style="ctrl1.bgEnv">
        <form name="deliform">
            <div class="rv-subsection">
                
                <md-input-container class="Geosys-ddlshowEX">
                    <label>{{ 'plugins.geosys.postput' | translate }}</label>
                    <md-select
                    ng-model="ctrl22.typeOper"
                    required>
                        <md-option value="Insert">{{ 'plugins.geosys.insert' | translate }}</md-option>
                        <md-option value="Update">{{ 'plugins.geosys.update' | translate }}</md-option>
                    </md-select>
                </md-input-container>

                <md-input-container class="Geosys-ddlshowEX">
                    <label>{{ 'plugins.geosys.themet' | translate }}</label>
                    <md-select
                    ng-model="ctrl22.selectedItemE"
                    ng-change="ctrl22.setList()"
                    id="theme"
                    required>
                        <md-option ng-repeat="item in ctrl22.itemsE" ng-value="item.value" ng-selected="ctrl22.itemsE.indexOf(item) == 0">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container class="Geosys-ddlshowEX">
                    <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                    <md-select
                    ng-model="ctrl22.selectedItemF"
                    required>
                        <md-option ng-repeat="item in ctrl22.itemsF" ng-value="item.value">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>
                <br/>
                <br/>
                <span style="margin-top: 0px;" class="Geosys-advanced">Connection settings</span>
                <br/>
                <div class='Geosys-geom-Menu'>
                    <md-input-container class="Geosys-largeur">
                        <label>Host<span class="Geosys-errormess" ng-show="ctrl22.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                        <input type="text" name="host" id="host" ng-value="ctrl22.host" placeholder="Host">
                    </md-input-container>
                    <md-input-container class="Geosys-largeur">
                        
                        <label>Port<span class="Geosys-errormess" ng-show="ctrl22.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                        <input type="text" name="port" id="port" ng-value="ctrl22.port" placeholder="port">
                    </md-input-container>
                    <md-input-container class="Geosys-largeur">
                        
                        <label>dbname<span class="Geosys-errormess" ng-show="ctrl22.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                        <input type="text" name="dbname" id="dbname" ng-value="ctrl22.dbname" placeholder="dbname">
                    </md-input-container>
                    <md-input-container class="Geosys-largeur">
                        
                        <label>schema<span class="Geosys-errormess" ng-show="ctrl22.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                        <input type="text" name="schema" id="schema" ng-value="ctrl22.schema" placeholder="schema">
                    </md-input-container>
                    <md-input-container class="Geosys-largeur">
                        
                        <label>password<span class="Geosys-errormess" ng-show="ctrl22.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                        <input type="text" name="password" id="password" ng-value="ctrl22.password" placeholder="password">
                    </md-input-container>
                    <md-input-container class="Geosys-largeur">
                        
                        <label>username<span class="Geosys-errormess" ng-show="ctrl22.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                        <input type="text" name="usernameParCo" id="usernameParCo" ng-value="ctrl22.usernameParCo" placeholder="usernameParCo">
                    </md-input-container>
                    <md-input-container class="Geosys-largeur">
                        
                        <label>type_conn<span class="Geosys-errormess" ng-show="ctrl22.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                        <input type="text" name="type_conn" id="type_conn" ng-value="ctrl22.type_conn" placeholder="type_conn">
                    </md-input-container>
                </div>
                <br/>
                <md-input-container class="Geosys-largeur">
                    <label>MD_ID<span class="Geosys-errormess" ng-show="ctrl22.erridwuvs">{{ 'plugins.geosys.errorWU' | translate }}</span></label>
                    <input type="text" name="mdid" id="mdid" ng-value="ctrl22.mdid" placeholder="MD_ID">
                </md-input-container>

                <md-input-container class="Geosys-ddlshowEX">
                    <label>Type</label><span class="Geosys-errormess" ng-show="ctrl22.ErrorEx">{{ 'plugins.geosys.errorWU' | translate }}</span>
                    <md-select
                    ng-model="ctrl22.selectedItemR"
                    required>
                        <md-option value="GPKG">GPKG</md-option>
                        <md-option value="FGDB">FGDB</md-option>
                    </md-select>
                </md-input-container>

                <div>
                    <span><span class="Geosys-advanced">{{ 'plugins.geosys.fileMD' | translate }}</span><span class="Geosys-errormess Geosys-sizeerror" ng-show="ctrl22.errMD">{{ 'plugins.geosys.errorFMD' | translate }}</span></span>
                    <input  type="file" id="fileMD" accept="json"/>
                </div>
                <div>
                    <span><span class="Geosys-advanced">{{ 'plugins.geosys.fileGDB' | translate }}</span><span class="Geosys-errormess Geosys-sizeerror" ng-show="ctrl22.errFGDB">{{ 'plugins.geosys.errorFGDB' | translate }}</span></span><br/>
                    <input type="file" id="filefgdb" accept="zip"/>
                </div>
                <br/>
                <span style="margin-top: 0px;" class="Geosys-advanced">{{ 'plugins.geosys.geome' | translate }}</span>
                <div class='Geosys-geom-Menu'>
                    <div class="Geosys-geom-DivIn1">
                        <md-checkbox class="Geosys-geom-CB" ng-model="ctrl22.inputchecked" aria-label="inputchk" ng-click='ctrl22.inputchck()'></md-checkbox>
                        <md-input-container class="Geosys-containerclass1">
                            <label>Coordinates</label>
                            <input type="text" name="geomp" ng-model="ctrl22.geomp" class="Geosys-geom-input" aria-label="geometry" ng-disabled="!(ctrl22.inputchecked)" required>
                        </md-input-container>
                        <md-input-container class="Geosys-containerclass12">
                            <label>EPSG</label>
                            <input type="text" name="geomES" ng-model="ctrl22.geomEPSG" class="Geosys-espg-input" aria-label="geometry" ng-disabled="!(ctrl22.inputchecked)" required>
                        </md-input-container>
                    </div>
                    <div class="Geosys-geom-DivIn1">
                        <md-checkbox class="Geosys-geom-CB" ng-model="ctrl22.drawingchecked" aria-label="drwchk" ng-click='ctrl22.drawchck()'></md-checkbox>
                        <div style="padding-top: 10px;" class="">Drawing</div>
                        <div style="margin-left:35px; padding-top:5px;margin-top: 0px;" class="Geosys-advanced"> Shapefile(.zip)</div>
                    </div>
                    <div class="Geosys-geom-DivIn">
                        <div class="Geosys-containerclass">
                            <md-checkbox class="Geosys-geom-CB" ng-model="ctrl22.filechecked" aria-label="mptchk" ng-click='ctrl22.importchck()'></md-checkbox>
                            <input  type="file" id="fileshp" ng-model="ctrl22.filshp" accept=".zip" class="Geosys-inputshape" ng-disabled="!(ctrl22.filechecked)"/>
                            <md-button ng-click="ctrl22.loadshp()" class="Geosys-btnShape md-raised" ng-disabled="!(ctrl22.filechecked)">Import</md-button>
                        </div>
                    </div>
                </div>

                <div ng-show="ctrl1.AdvancedVisible" ng-click="ctrl22.ShowHideAdvanced()" class="Geosys-advanced">
                    <span>Advanced Settings</span>
                </div>
                <div ng-show="ctrl22.IsVisibleASP">
                    <md-input-container class="Geosys-ddlshowEX">
                        <label>{{ 'plugins.geosys.envir' | translate }}</label>
                        <md-select
                        class="Geosys-envSelect"
                        ng-model="ctrl22.selectedItemENT"
                        id="envE"
                        placeholder="{{ 'plugins.geosys.envir' | translate }}">
                            <md-option ng-repeat="item in ctrl22.itemsENT" ng-value="item.value" >
                                {{ item.name }}
                            </md-option>
                        </md-select>
                    </md-input-container>
                </div>
                
                <md-input-container class="Geosys-submitbtn">
                    <md-button class="md-primary md-raised" style="float: right;"
                    ng-click="ctrl22.submitFormD(); ctrl1.ShowHideD(); ctrl1.setColorD()" ng-disabled="deliform.$invalid">
                        {{ 'plugins.geosys.submit' | translate }}
                        <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                    </md-button>
                </md-input-container>
            </div>
        </form>
    </div>
</div>

`;