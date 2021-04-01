/****** Import ******/
import { loginmenu } from './templates/login';
import { User } from './user';
import { menuManager } from './manager/menuManager';

export default class Geosys {
    /**
     * Initialize the plugins into the viewer
     * @param {*} api Ramp API
     * @memberof Geosys
     */
    init(api: any): void {
        // Set la variable api pour le plugin
        this.mapApi = api;
        // Set _RV
        this.config = this._RV.getConfig('plugins').geosys;
        // Set la langue pour le plugin
        this.config.language = this._RV.getCurrentLang();
        // Set la config pour la geometry
        this.config.url = this._RV.getConfig('services').geometryUrl;
        // Création d'un button d'accès à partir du menu
        this.button = this.mapApi.mapI.addPluginButton(
            Geosys.prototype.translations[this._RV.getCurrentLang()].testbutton,
            this.onMenuItemClick()
        );
        // Ajoute un panel
        this.addLoginPanel();
    }
    /**
     * Add a button in the side to open the plugins and close this side menu
     * @returns 
     * @memberof Geosys
     */
    onMenuItemClick(): any {
        return () => {
            this.button.isActive = !this.button.isActive;
            // Alert(this.mapApi.layer);
            this._RV.toggleSideNav('close');
            // Open the panel
            this.panel.open();  
        };
    }
    /**
     * Création du panel pour le plugins et ensuite ajoute le formulaire pou la connexion 
     * de l'utilisateur 
     * @memberof Geosys
     */
    addLoginPanel(): void {
        // Permet d'activer le bouton connexion/ login
        let output: string = loginmenu;
        // Creating the panel with the dimension and a title for the application
        this.panel = this.mapApi.panels.create('geosys');
        this.panel.element.css( { bottom: '0em', width: '400px', top: '50px' } )
        this.panel.header.title = 'Geosys (Alpha)';
        this.panel.allowUnderlay = true;
        // Add control for the login button
        this.connexionControls(this.panel,this.mapApi,this.config); 
        // Compile the login template/ Add a close button/ Add a toggle button
        this.compileTemplate(output,this.mapApi);
        let closeBtn = this.panel.header.closeButton;
        let toggleBtn = this.panel.header.toggleButton;
        // Add the template to the panel
        this.panel.body = output;
    }
    /**
     * First controller, the one function is the submit button to do a connexion call to the API and
     * receive from API all the information for the user and stored in the usr class.
     * @param {*} panel The panel from the viewer
     * @param {*} mapApi The API from the viewer and angular
     * @param {*} config The config of the viewer(the other file in samples)
     * @memberof Geosys
     */
    connexionControls(panel: any, mapApi: any, config: any): void {
        // Ajoute un controller au formulaire html
        this.mapApi.agControllerRegister('connexionCtrl', function() {
            // Ajoute la fonction sous le controller au formulaire html
            this.userName = '';
            this.passwrd = '';
            this.submitConn = () => {
                // Prends les informations des input pour envoyer a l'API
                let log: User = new User(this.userName, this.passwrd);
                // Envoie le formulaire a l API
                let loginfo: any = log.submitForm(config);
                // Si le retour ne contient pas de code d'erreur continue
                if (loginfo.status === undefined) {
                    let menu: menuManager =  new menuManager(log, panel, mapApi);
                }
            };
        });
    }
    /**
     * Compile a html template to read to compile and replace all the variable inside the template
     * @param {*} template The html template to compile
     * @param {*} mapApi The API of the viewer to compile it(service angular)
     * @returns {JQuery<HTMLElement>}
     * @memberof Geosys
     */
    compileTemplate(template: string, mapApi: any): JQuery<HTMLElement> {
        let temp = $(template);
        mapApi.$compile(temp);
        return temp;
    }
};

// Interface pour avoir accès au element du viewer
export default interface Geosys {
    mapApi: any,
    _RV: any,
    config: any,
    button: any,
    translations: any,
    windowD: any,
    panel: any;
};

// Translate label
Geosys.prototype.translations = {
    'en-CA': {
        // Commun
        uti: 'Utilities',
        geo: 'Processus Geosys',
        envir: 'Select an environnement:',
        themet: 'Select a theme:',
        idUT: 'Select a working unit id:',
        geome: 'Add your Geometry:',
        submit: 'Submit',
        cancel: 'Cancel',
        where: 'Enter a Where Clause:',
        shp: 'Download Shapefile (.zip)',
        // Extraction seulement
        extrac: 'Checkout',
        extract: 'Extract',
        clip: 'If clip',
        // Planifier seulement
        testbutton: 'GeoSys',
        planif: 'Schedule',
        typeTrv: 'Working type :',
        classe: 'Select class(es) :',
        datefinprv: 'Final date planned',
        // Login seulement
        login: 'Login',
        username: 'username',
        password: 'password',
        // Livraison seulement
        delivery: 'Deliver',
        postput: 'Select an operation :',
        insert: 'Overwrite',
        update: 'Update',
        fileMD: 'File metadata: ',
        fileGDB: 'Data file: ',
        // CréerMD seulement
        creer: 'CreateMD (work in progress)',
        source: 'Select the sources ID: ',
        precision: 'Select the precision ID: ',
        contrainte: 'Select the legal constraint ID: ',
        // ValiderMd seulement
        valider: 'ValidateMD',
        filejson: 'Metadata fiel: ',
        // Nettoyage seulement
        nettoyage: 'Clean',
        // Annuler seulement
        annuler: 'Cancel (work in progress)',
        // ExtraireMD
        extraireMD : 'ExtractMD',
        // Info user
        themeI: 'Theme',
        right: 'Right',
        equipe: 'Team',
        enviro: 'Environnement',
        // Unité de travail
        unit: 'Query tool',
        // file manager
        filem: 'File manager (Alpha)',
        // Error Message
        errorWT: 'Add a working type',
        errorClass : 'you must choose 1 class',
        errorFMD: 'Add a metadata file',
        errorFGDB: 'Add a FGDB',
        errorWU: 'Add a working unit',
        errorSources: 'You must choose 1 sources',
        errorPrecision: 'You must add 1 precision',
        errorContr: 'You must add 1 constraint',
        errorTooMany: 'Too many options',
    },

    'fr-CA': {
        
        // Commun
        uti: 'Utilitaires',
        geo: 'Processus Geosys',
        envir: 'Sélectionne un environnement :',
        themet: 'Sélectionne un theme :',
        idUT: 'Selectionne un identifiant d unité de travail :',
        geome: 'Ajouter votre géométrie :',
        submit: 'Soumettre',
        cancel: 'Annuler',
        where: 'Entrer une where clause :',
        shp: 'Téléchargement Shapefile (.zip)',
        // Extraction seulement
        extrac: 'Emprunter',
        extract: 'Extraire des donnée',
        clip: 'Si clip',
        // Planifier seulement
        testbutton: 'GeoSys',
        planif: 'Planifier',
        typeTrv: 'Type de travail :',
        classe: 'selectionne une ou des classe(s) :',
        datefinprv: 'Date de fin prévue',
        // Login seulement
        login: 'connexion :',
        username: 'nom d usager',
        password: 'mot de passe',
        // Livraison seulement
        delivery: 'Livrer',
        postput: 'Sélectionne une opération :',
        insert: 'Écraser',
        update: 'Mise à jour',
        fileMD: 'Fichier métadonnée : ',
        fileGDB: 'Fichier de donnée : ',
        // CréerMD seulement
        creer: 'Creer une MD (work in progress)',
        source: 'Sélectionner les identifiants des sources : ',
        precision: 'Sélectionner les identifiants de précison : ',
        contrainte: 'Sélectionner les identifiants de contraintes légales : ',
        // ValiderMD seulement
        valider: 'Valider une métadonnée',
        filejson: 'fichier JSON à valider : ',
        // Nettoyage seulement
        nettoyage: 'Nettoyer',
        // Annuler seulement
        annuler: 'Annuler (work in progress)',
        // ExtraireMD
        extraireMD : 'ExtraireMD',
        // Info user
        themeI: 'Thème',
        right: 'Droit',
        equipe: 'Equipe',
        enviro: 'Environnement',
        // unité de travail
        unit: 'Requêter la base de données',
        // file manager
        filem: 'Explorateur de fichier (Alpha)',
        // errormessage
        errorWT: 'Ajouter un type de travail',
        errorClass: 'Ajouter une classe',
        errorFMD: 'Ajouter un fichier MD',
        errorFGDB: 'Ajouter un FGDB',
        errorWU: 'Ajouter un unité de travail',
        errorSources: 'Ajouter une sources',
        errorPrecision: 'Ajouter une precision',
        errorContr: 'Ajouter une contrainte',
        errorTooMany: 'Trop d option',
    }
};
// Ajout du plugins à l'application
(<any>window).geosys = Geosys;
