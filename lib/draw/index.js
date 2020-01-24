"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var panel_manager_1 = require("./panel-manager");
var Draw = /** @class */ (function () {
    function Draw() {
        this._style = '';
    }
    Draw.prototype.init = function (mapApi) {
        this.mapApi = mapApi;
        // get draw config
        this.config = this._RV.getConfig('plugins').draw;
        this.config.language = this._RV.getCurrentLang();
        this.config.url = this._RV.getConfig('services').geometryUrl;
        // create mapnav panel
        this.panelManager = new panel_manager_1.PanelManager(mapApi, this.config);
        // create side menu button to toggle toolbar
        this.button = this.mapApi.mapI.addPluginButton(Draw.prototype.translations[this._RV.getCurrentLang()].draw.menu, this.onMenuItemClick());
        this.button.isActive = true;
    };
    Draw.prototype.onMenuItemClick = function () {
        var _this = this;
        return function () {
            _this.button.isActive = !_this.button.isActive;
            document.getElementsByClassName('rv-mapnav-draw-content')[0].style.display = _this.button.isActive ? 'block' : 'none';
        };
    };
    return Draw;
}());
exports.default = Draw;
Draw.prototype.translations = {
    'en-CA': {
        draw: {
            menu: 'Draw Toolbar',
            picker: 'Select color',
            point: 'Draw point',
            line: 'Draw line',
            polygon: 'Draw polygon',
            measure: 'Show/Hide measures',
            extent: 'Erase selected graphics',
            write: 'Save to download folder',
            read: 'Upload graphics file'
        }
    },
    'fr-CA': {
        draw: {
            menu: 'Barre de dessin',
            picker: 'Sélectionner la couleur',
            point: 'Dessiner point',
            line: 'Dessiner ligne',
            polygon: 'Dessiner polygon',
            measure: 'Afficher/Cacher les mesures',
            extent: 'Effacer les graphiques sélectionnés',
            write: 'Sauvegarder dans le répertoire téléchargement',
            read: 'Charger le fichier de graphiques'
        }
    }
};
window.draw = Draw;
