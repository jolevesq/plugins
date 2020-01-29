import { form,loginmenu } from './html-assets';
import {Extraire} from './extraire';
//import {urlgeoDataGet} from './url';
import { manageMenu } from './menuManager'
import { login } from './login';
//const FileSaver = require('file-saver');


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
            this.panel.open();
        };
    }


    //Creating a login menu
    addLoginPanel(){
        let mp = new manageMenu();
        let output:string = loginmenu;

        //if (!this.panel) {
            //creating the panel
            this.panel = this.mapApi.panels.create('Test Login');
            this.panel.element.css({bottom: '0em', width: '400px', top: '50px'})
            this.panel.header.title = 'Generic Title';
        //} else {
            this.panel.close();
       // }

        //add control here   
        this.connexionControls(this.panel,this.mapApi);
        
        
        //compile the login template
        mp.compileTemplate(output,this.mapApi);
        //add a close button 
        let closeBtn = this.panel.header.closeButton;
        //add the template
        this.panel.body = output;
    }


    connexionControls( panel:any,mapApi:any,){
        //ajoute un controller (html)
        this.mapApi.agControllerRegister('connexionCtrl', function($scope){
            //ajoute la focntion sous le controller(html)
            this.submitConn = function() { 
                //get all the information of the form into the class
                let log:login = new login((<HTMLInputElement>document.getElementById("username")).value
                ,(<HTMLInputElement>document.getElementById("password")).value);

                console.log(log._username,log._password)
                //submit the form to the API
                let loginfo:any = log.submitForm();
                //si le retour ne contient pas de code d'erreur
                if (!loginfo.code){
                    alert('Connected'); 
        
                    /****** List a recevoir *******/
                    let list = ["Hydro","Route","building"];
                    let listserver = ["Dev", "Tst", "Pro"];

                    /****** Extraire *******/
                    let ext = new Extraire('','','','','','');
                    let mp = new manageMenu();
                    //activate the controls for Extraction
                    mp.angularcontrols(ext, log._token, mapApi);
                    //set the dropdown list for the form
                    let ddlEnv = ext.interactiveDropDownList(listserver);
                    let ddltheme = ext.interactiveDropDownList(list);

                    //add the dropdown list for the form
                    let output = form.replace(/{dropdowntheme}/, ddltheme);
                    output = output.replace(/{dropdownenv}/,ddlEnv);

                    //console.log('hello', ddltheme);
                    //alert(output)

                    // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
                    // Append element
                    mp.compileTemplate(output,mapApi);

                    //add the compile template to the panel
                    panel.body = output;
                //si le retour de l'API contient un code d'erreur
                }else{
                    alert(loginfo.code);
                    alert(loginfo.message);
                }
            }; 
        });
    }

};

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
        testbutton: 'Planning Work Place',
        envir: 'Environnement',
        themet: 'Select a theme',
        idlot: 'Select an id',
        typeTrv: 'working type',
        datefinprv: 'Final date planned',
        geome: 'Add your Geometry',
        submit: 'Submit',
        extrac: 'Extract',
        login: 'Login'
    },

    'fr-CA': {
        testbutton: 'Planifiez zone de travail',
        envir: 'Environnement',
        themet: 'Theme',
        idlot: 'Selectionne un id de lot',
        typeTrv: 'Type de travail',
        datefinprv: 'Date fin prévue',
        geome: 'Ajouter votre Géométrie',
        submit: 'Soumettre',
        extrac: 'Extraction',
        login: 'connexion'   
    }
};

(<any>window).testing = Testing;
