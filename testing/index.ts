/****** Import ******/
import { loginmenu, AUTO_COMPLETE } from './config/html-assets';
import { manageController } from './manager/ControllerManager'
import { login } from './login';
import { menuManager } from './manager/menuManager';

export default class Testing{
    
    //initiation
    init(api: any) {
        //set la variable api pour le plugin
        this.mapApi = api;
        //set _RV
        this.config = this._RV.getConfig('plugins').testing;
        //set la langue pour le plugin
        this.config.language = this._RV.getCurrentLang();
        //création d'un button d'accès à partir du menu
        this.button = this.mapApi.mapI.addPluginButton(
            Testing.prototype.translations[this._RV.getCurrentLang()].testbutton,
            this.onMenuItemClick()
        );
        
        //Ajoute un panel
        this.addLoginPanel();
    }

    //add side menu item
    onMenuItemClick() {
        return () => {
            //this.button.isActive = !this.button.isActive;
            this._RV.toggleSideNav('close');
            //open the panel
            this.panel.open();
        };
    }


    //Creating a login menu
    addLoginPanel(){
        //permet d'Activer le bouton connexion/ login
        let mb = new manageController();
        let output:string = loginmenu;


        //creating the panel with the dimension and a title for the application
        this.panel = this.mapApi.panels.create('Test Login');
        this.panel.element.css({bottom: '0em', width: '400px', top: '50px'})
        this.panel.header.title = 'Generic Title';

        //add control for the login button
        this.connexionControls(this.panel,this.mapApi);
        
        
        //compile the login template
        mb.compileTemplate(output,this.mapApi);

        // *** AUTOCOMPLETE SECTION ***
        this.mapApi.agControllerRegister('autoCtrl', function($scope){
            this.selectedItemA = '';
            this.selectedItemB = '';

            this.itemsA = [
                { name: 'item 1', value: 'value1' },
                { name: 'item 2', value: 'value2' },
                { name: 'item 3', value: 'value3' }
            ];

            const newList = {
                value1: [{ name: 'a', value: 'a1' }, { name: 'b', value: 'b1' }, { name: 'c', value: 'c1' }],
                value2: [{ name: '1', value: '11' }, { name: '2', value: '21' }, { name: '3', value: '31' }],
                value3: [{ name: '@', value: '@1' }, { name: '#', value: '#1' }, { name: '$', value: '$1' }]
            };

            this.itemsB = [];

            this.setList = () => {
                console.log(`set: ${this.selectedItemA}`);

                // populate list b with new items
                this.itemsB.length = 0;
                newList[this.selectedItemA].forEach(item => this.itemsB.push(item))
            }
        });

        // compile autocomplete
        const auto = mb.compileTemplate(AUTO_COMPLETE, this.mapApi);

        //add a close button 
        let closeBtn = this.panel.header.closeButton;
        //add a toggle button
        let toggleBtn = this.panel.header.toggleButton;
        //add the template to the panel
        this.panel.body = output;

        this.panel.body.append(auto);
    }


    connexionControls( panel:any,mapApi:any,){
        //ajoute un controller au formulaire html
        this.mapApi.agControllerRegister('connexionCtrl', function($scope){
            //ajoute la fonction sous le controller au formulaire html
            this.submitConn = function() { 
                //prends les informations des input pour envoyer a l'API
                let log:login = new login((<HTMLInputElement>document.getElementById("username")).value
                ,(<HTMLInputElement>document.getElementById("password")).value);
                
                
                //Envoie le formulaire a l API
                let loginfo:any = log.submitForm();

                //si le retour ne contient pas de code d'erreur continue
                if (loginfo.status != 401){
                    alert('Connected'); 
                    let menu:menuManager = new menuManager();

                    let outputExt:string;
                    let outputPlan:string;

                    outputExt = menu.extractManager(log,panel,mapApi);
                    outputPlan = menu.planifManager(log,panel,mapApi);
                    
                    
                    panel.body = "<div>"  + outputExt+ "</div>";

                //si le retour de l'API contient un code d'erreur et le message
                }else{
                    alert(loginfo.code);
                    alert(loginfo.message);
                }
            }; 
        });
    }

};

//Inteface pour avoir accèes au element du viewer
export default interface Testing{
    mapApi: any,
    _RV: any,
    config: any,
    button:any,
    translations: any,
    panel:any;
};

//translate label
Testing.prototype.translations = {
    'en-CA': {
        //Commun
        envir: 'Select an environnement :',
        themet: 'Select a theme :',
        idUT: 'Select a working unity id :',
        geome: 'Add your Geometry :',
        submit: 'Submit',
        cancel: 'Cancel',
        //Extraction seulement
        extrac: 'Extract',
        clip: 'If clip :',
        where: 'Enter a Where Clause :',
        //Planifier seulement
        testbutton: 'Planning Work Place',
        planif: 'Planning',
        zoneTrv: 'Working Zone :',
        typeTrv: 'working type :',
        classe: 'Select a class :',
        datefinprv: 'Final date planned :',
        log: 'Add a log file :',
        //Login seulement
        login: 'Login',
        username : "username",
        password : 'password'
        //Livraison seulement
    },

    'fr-CA': {
        
        //Commun
        envir: 'Environnement :',
        themet: 'Theme :',
        idUT: 'Selectionne un identifiant d unité de travail :',
        geome: 'Ajouter votre Géométrie :',
        submit: 'Soumettre',
        cancel: 'Annuler',
        //Extraction seulement
        extrac: 'Extraction',
        clip: 'Si clip :',
        where: 'Entrer une Where Clause :',
        //Planifier seuelement
        testbutton: 'Planifiez zone de travail',
        planif: 'Planifier',
        zoneTrv: 'Zone de travail :',
        typeTrv: 'Type de travail :',
        classe: 'selectionne une classe :',
        datefinprv: 'Date fin prévue :',
        log: 'Ajout d un fichier log :',
        //Login seulement
        login: 'connexion :',
        username : "nom d'usager",
        password : 'mot de passe' 
        //Livraison seulement  
    }
};

//accès du plugins à l'application
(<any>window).testing = Testing;
