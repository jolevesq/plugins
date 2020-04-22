"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileManagerC_1 = require("./controller/fileManagerC");
var fileMana_1 = require("./operation/fileMana");
var FileManager = /** @class */ (function () {
    function FileManager() {
    }
    /**
     * Initialize the plugins into the viewer
     * @param {*} api Ramp API
     * @memberof FileManager
     */
    FileManager.prototype.init = function (api) {
        // Set la variable api pour le plugin
        this.mapApi = api;
        // Set _RV
        this.config = this._RV.getConfig('plugins').fileManager;
        // Set la langue pour le plugin
        this.config.language = this._RV.getCurrentLang();
        // Set la config pour la geometry
        this.config.url = this._RV.getConfig('services').geometryUrl;
        // Création d'un button d'accès à partir du menu
        this.button = this.mapApi.mapI.addPluginButton(FileManager.prototype.translations[this._RV.getCurrentLang()].filem, this.onMenuItemClick());
        // Ajoute un panel
    };
    /**
     * Add a button in the side to open the plugins and close this side menu
     * @returns
     * @memberof FileManager
     */
    FileManager.prototype.onMenuItemClick = function () {
        var _this = this;
        return function () {
            _this.button.isActive = !_this.button.isActive;
            // Alert(this.mapApi.layer);
            _this._RV.toggleSideNav('close');
            // Open the panel
            _this.addPanel();
        };
    };
    /**
     * Création du panel pour le plugins et ensuite ajoute le formulaire pou la connexion
     * de l'utilisateur
     * @memberof FileManager
     */
    FileManager.prototype.addPanel = function () {
        if (!this.panel) {
            // make sure both header and body have a digest cycle run on them
            this.panel = this.mapApi.panels.create('FileManager');
            //Size of the panel
            this.panel.element.css({ top: '0px;', margin: '100px 50px 100px 450px' });
            //button in the header of the panel
            this.panel.header.toggleButton;
            this.panel.header.closeButton;
        }
        else {
            this.panel.close();
        }
        var panel;
        var tfm = new fileMana_1.FileMana();
        tfm.setUrl(this.config);
        var mainFile = new fileManagerC_1.FileManagerController();
        mainFile.fileManagercontrols('hello', this.mapApi, tfm, this.panel, panel);
    };
    /**
     * Compile a html template to read to compile and replace all the variable inside the template
     * @param {*} template The html template to compile
     * @param {*} mapApi The API of the viewer to compile it(service angular)
     * @returns {JQuery<HTMLElement>}
     * @memberof FileManager
     */
    FileManager.prototype.compileTemplate = function (template, mapApi) {
        var temp = $(template);
        mapApi.$compile(temp);
        return temp;
    };
    return FileManager;
}());
exports.default = FileManager;
;
;
// Translate label
FileManager.prototype.translations = {
    'en-CA': {
        // Commun
        // file manager
        filem: 'File Explorer (Alpha)',
    },
    'fr-CA': {
        // Commun
        // file manager
        filem: 'Explorateur de fichier (Alpha)',
    }
};
// Ajout du plugins à l'application
window.fileManager = FileManager;
