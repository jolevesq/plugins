export declare const formPlanifier = "\n<div ng-controller=\"submitFromP as ctrl2\">\n    <div ng-style=\"SelectedMenuP\" class=\"Geosys-div-Button\" ng-click=\"ctrl1.ShowHide()\">\n        <h2>{{ 'plugins.geosys.planif' | translate }}</h2>\n    </div>\n    <div ng-show=\"IsVisibleP\" ng-style=\"bgEnv\">\n    <form name=\"planning\">\n        <div>\n            <md-input-container class=\"Geosys-ddlshow\">\n                <label>{{ 'plugins.geosys.themet' | translate }}</label>\n                <md-select \n                \n                ng-model=\"ctrl2.selectedItemC\" \n                ng-change=\"ctrl2.setList()\" \n                id=\"theme\" \n                placeholder=\"{{ 'plugins.geosys.themet' | translate }}\" >\n                    <md-option ng-repeat=\"item in ctrl2.itemsC\" ng-value=\"item.value\" ng-selected=\"ctrl2.itemsC.indexOf(item) == 0\">\n                        {{ item.name }}\n                    </md-option>\n                </md-select>\n            </md-input-container>\n        </div>\n\n        <div>\n        <md-input-container class=\"Geosys-largeur\">\n            <label>{{ 'plugins.geosys.idUT' | translate }}<span class=\"Geosys-errormess\" ng-show=\"erridwuvs\">{{ 'plugins.geosys.errorWU' | translate }}</span></label>\n            <input type=\"text\" name=\"idUt\" id=\"idUt\" ng-value=\"ctrl2.idut\" placeholder=\"Where ...\">\n        </md-input-container>\n        </div>\n\n        <div>\n            <md-input-container class=\"Geosys-largeur\">\n                <label>{{ 'plugins.geosys.typeTrv' | translate }}<span class=\"Geosys-errormess\" ng-show=\"errwork\">{{ 'plugins.geosys.errorWT' | translate }}</span></label>\n                <md-select \n                name=\"typetrv\"\n                ng-model=\"ctrl2.selectedItemD\"  \n                placeholder=\"{{ 'plugins.geosys.typeTrv' | translate }}\">\n                    <md-option ng-repeat=\"item in ctrl2.itemsD\" ng-value=\"item.value\">\n                        {{ item.name }}\n                    </md-option>\n                </md-select>\n            </md-input-container>\n        </div>\n\n        <div>\n                <span class=\"Geosys-classeslist\"><span class=\"advanced\">{{ 'plugins.geosys.classe' | translate }}</span><span class=\"Geosys-errormess Geosys-sizeerror\" ng-show=\"errclass\">{{ 'plugins.geosys.errorClass' | translate }}</span></span><md-checkbox ng-model=\"ctrl2.listeclasse\" aria-label=\"checkall\" class=\"md-secondary Geosys-checklist\" ng-click=\"ctrl2.toggleAll()\"></md-checkbox>\n                <div class=\"planning\">\n                    <md-list-item class=\"Geosys-itemlist\" ng-repeat=\"class in ctrl2.classes\">\n                        <span class=\"Geosys-largeurlist\">{{ class.name }}</span>\n                        <md-checkbox class=\"md-secondary Geosys-checklist\" aria-label=\"{{ class.name }}\" ng-model=\"class.wanted\"></md-checkbox>\n                    </md-list-item>\n                </div>\n        </div>\n        \n        <div>\n        <md-input-container class=\"Geosys-datfinfield\">\n            <label>{{ 'plugins.geosys.datefinprv' | translate }}</label>\n            <md-datepicker name=\"dfp\" ng-model=\"ctrl2.dfp\"></md-datepicker>\n        </md-input-container>\n        </div>\n\n        <div>\n        <md-input-container class=\"Geosys-largeur\">\n            <label>{{ 'plugins.geosys.where' | translate }}</label>\n            <input type=\"text\" name=\"wherep\" ng-model=\"ctrl2.wherep\" value=\"\" placeholder=\"Where ...\">\n        </md-input-container>\n        </div>\n        <span style=\"margin-top: 0px;\" class=\"advanced\">{{ 'plugins.geosys.geome' | translate }}</span>\n        <div class='Geosys-geom-Menu'>\n            <div class=\"Geosys-geom-DivIn1\">\n                <md-checkbox class=\"Geosys-geom-CB\" ng-model=\"ctrl2.inputchecked\" aria-label=\"inputchk\" ng-click='ctrl2.inputchck()'></md-checkbox>\n                <md-input-container class=\"Geosys-containerclass1\"> \n                    <label>Coordinates</label>\n                    <input type=\"text\" name=\"geomp\" ng-model=\"ctrl2.geomp\" class=\"Geosys-geom-input\" aria-label=\"geometry\" ng-disabled=\"!(ctrl2.inputchecked)\" required> \n                </md-input-container>\n                <md-input-container class=\"Geosys-containerclass12\"> \n                    <label>EPSG</label>\n                    <input type=\"text\" name=\"geomES\" ng-model=\"ctrl2.geomEPSG\" class=\"Geosys-espg-input\" aria-label=\"geometry\" ng-disabled=\"!(ctrl2.inputchecked)\" required> \n                </md-input-container>\n            </div>\n            <div class=\"Geosys-geom-DivIn1\">\n                <md-checkbox class=\"Geosys-geom-CB\" ng-model=\"ctrl2.drawingchecked\" aria-label=\"drwchk\" ng-click='ctrl2.drawchck()'></md-checkbox>\n                <div style=\"padding-top: 10px;\" class=\"\">Drawing</div>\n                <div style=\"margin-left:35px; padding-top:5px;margin-top: 0px;\" class=\"advanced\"> Shapefile(.zip)</div>\n            </div>\n            <div class=\"Geosys-geom-DivIn\">\n                <div class=\"Geosys-containerclass\"> \n                    <md-checkbox class=\"Geosys-geom-CB\" ng-model=\"ctrl2.filechecked\" aria-label=\"mptchk\" ng-click='ctrl2.importchck()'></md-checkbox>\n                    <input  type=\"file\" id=\"fileshp\" ng-model=\"ctrl2.filshp\" accept=\".zip\" class=\"Geosys-inputshape\" ng-disabled=\"!(ctrl2.filechecked)\"/>\n                    <md-button ng-click=\"ctrl2.loadshp()\" class=\"Geosys-btnShape md-raised\" ng-disabled=\"!(ctrl2.filechecked)\">Import</md-button>\n                </div>\n            </div>\n        </div>\n        \n        <div>\n        <md-input-container class=\"Geosys-submitbtn\">\n            <md-button class=\"md-primary md-raised\" style=\"float: right;\"\n            ng-click=\"ctrl2.submitFormP(); ctrl1.ShowHide()\" ng-disabled=\"planning.geomp.$invalid && planning.geomES.$invalid\">\n                {{ 'plugins.geosys.submit' | translate }}\n                <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>\n            </md-button>\n        </md-input-container>\n        </div>\n    </form>\n    </div>\n</div>";
