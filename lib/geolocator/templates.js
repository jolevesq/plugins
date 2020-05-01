"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// panels template: geolocator
exports.INPUT_BOX = "\n<div>\n    <div class ng-controller=\"findCtrl as ctrl\" id= \"box\">\n        <md-input-container>  \n            <label for=\"location\">{{ 'plugins.geolocator.input' | translate }}</label>\n                <input class=\"w3-input w3-border-green w3-pale-blue w3-round-large\"\n                    type = \"text\"\n                    id = \"loc\"\n                    ng-model= \"ctrl.address\"\n                    ng-change= \"ctrl.autoComplete()\"\n        </md-input-container>\n    </div>        \n</div>";
exports.AUTO_LIST = "\n<div> \n    <div ng-controller=\"autoCtrl as ctrl\" id= \"select\">\n        <md-list>\n            <md-list-item class=\"\" ng-model =\"ctrl.list\" ng-repeat=\"item in ctrl.list\" ng-click=\"ctrl.getLoc(this)\">\n                {{item.name}}\n            </md-list-item>\n        </md-list>\n    </div>\n</div>\n";
