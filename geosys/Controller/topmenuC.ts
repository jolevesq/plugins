import { User } from "../user";
import { infoUser } from '../templates/infoUser';
import { helpDoc } from "../Documentation/helpDoc";

export class TopMenuController {

    constructor(){};
    /**
     * Change the environnement of the user and change the color of the backgournd if not PRO
     * @param {User} log getting all the information of the user and getting the envrionnemnt he's already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    topmenuControl(log: User, mapApi: any) {
        mapApi.agControllerRegister('topmenuCtrl', function() {
            /************** interactive List ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (let i in log.getEnvAcc()) {
                this.itemsENT.push( {name : 'Environnement : ' +log.getEnvAcc()[i]._env, value: log.getEnvAcc()[i]._env} );
            }
            this.setEnv = () => {
                log.setEnvironnementSelected(this.selectedItemENT);
                console.log(log.getEnvironnementSel());
                if (log.getEnvironnementSel() == 'TST') {
                    this.bgEnv = {
                        "background-color" : "lightgreen", 
                    }
                } else if (log.getEnvironnementSel() == 'DEV') {
                    this.bgEnv = {
                        "background-color" : "pink", 
                    }
                } else {
                    this.bgEnv = {
                        "background-color" : "white", 
                    }
                }
            }
            /*********** Info User Panel *************/
            this.openInfoUser = () => {
                if (!this.panel) {
                    // make sure both header and body have a digest cycle run on them
                    this.panel = mapApi.panels.create('infoUser');
                    this.panel.element.css( {
                        bottom: '0em',
                        width: '400px'
                    } );
                    this.panel.element.css( {top: '0px;', left : '410px;', bottom: '50%;', margin: '100px 300px 300px 500px'} );
                    let closeBtn = this.panel.header.closeButton;
                    this.panel.header.title = `Info user`;
                } else {
                    this.panel.close();
                }
                let listRight: string = '';
                for (let i in log.getRight()) {
                    listRight += log.getRight()[i].getnom() + '<br/>'
                }
                let output = infoUser.replace('(username)',log.getUsername() + ' ' + log.getPassword());
                output = output.replace('(theme)',log.getAllThemeNAme());
                output = output.replace('(right)',listRight);
                output = output.replace('(equipe)',log.getEquipe().getnom());
                output = output.replace('(envir)', log.getEnvironnementSel() + '  </br>URL : ' + log.getUrlEnvselected());
                let paneluser: TopMenuController =  new TopMenuController()
                paneluser.controlUserInfo(log,mapApi);
                this.panel.body = output;
                this.panel.open();     
            }
            this.openHelpUser = () => {
                if (!this.panel1) {
                    // make sure both header and body have a digest cycle run on them
                    this.panel1 = mapApi.panels.create('help');
                    this.panel1.element.css( {
                        bottom: '0em'
                    } );
                    this.panel1.element.css( {top: '0px;', left : '410px;', bottom: '50%;', margin: '100px 50px 100px 450px'} );
                    this.panel1.header.closeButton;
                    this.panel1.header.title = `Help`;
                } else {
                    this.panel1.close();
                }
                this.panel1.body = helpDoc;
                this.panel1.open(); 
            }
            /**************** form opening handler ***************/
            // Planification
            this.IsVisiblePlanning = false;
            // Extraction GP
            this.IsVisibleEP = false;
            // Extraction U
            this.IsVisibleSR = false;
            // Create
            this.IsVisibleEXMD = false;
            // Validate
            this.IsVisibleV = false;
            // Delivery
            this.IsVisibleD = false;
            // DeliverySR
            this.IsVisibleDSR = false;
            // Cleaning
            this.IsVisibleCL = false;
            // Cancel
            this.IsVisibleCA = false;
            // Additionnal tool
            this.IsVisibleUT = false;
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHide = () => {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    this.IsVisiblePlanning = this.IsVisiblePlanning ? false : true;
                    if (this.IsVisiblePlanning == true) {
                        //hide non-selected
                        this.IsVisibleEP = false;
                        this.IsVisibleSR = false;
                        this.IsVisibleEXMD = false;
                        this.IsVisibleV = false;
                        this.IsVisibleD = false;
                        this.IsVisibleCL = false;
                        this.IsVisibleCA = false;
                        this.IsVisibleUT = false;
                        this.IsVisibleDSR = false;
                        //highlight
                        this.SelectedMenuP = {
                            'opacity': '1', 
                        };
                        this.SelectedMenuE = {};
                        this.SelectedMenuEU = {};
                        this.SelectedMenuEXMD = {};
                        this.SelectedMenuV = {};
                        this.SelectedMenuD = {};
                        this.SelectedMenuDSR = {};
                        this.SelectedMenuC = {};
                        this.SelectedMenuCa = {};
                        this.SelectedMenuUT = {};
                    } else {
                        this.SelectedMenuP = {};
                    }
                }   
            };
            this.setColorP = () => {
                if ( log.getCloseable() === false) {
                    this.SelectedMenuP = {
                        "background-color": "red",
                    }
                    log.setCloseable(true);
                } else {
                    this.SelectedMenuP = {
                        "background-color": "green",
                    }
                }
            }
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideEX =  () => {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    this.IsVisibleEP = this.IsVisibleEP ? false : true; 
                    if (this.IsVisibleEP === true) {
                        //Advanced Setting
                        if (log.getAdvanced() === true) {
                            this.AdvancedVisible = true;
                        } else {
                            this.AdvancedVisible = false;
                        }
                        //hide non-selected
                        this.IsVisiblePlanning = false;
                        this.IsVisibleSR = false;
                        this.IsVisibleEXMD = false;
                        this.IsVisibleV = false;
                        this.IsVisibleD = false;
                        this.IsVisibleCL = false;
                        this.IsVisibleCA = false;
                        this.IsVisibleUT = false;
                        this.IsVisibleDSR = false;
                        //highlight
                        this.SelectedMenuE = {
                            'opacity': '1', 
                        };
                        this.SelectedMenuP = {};
                        this.SelectedMenuEU = {};
                        this.SelectedMenuEXMD = {};
                        this.SelectedMenuV = {};
                        this.SelectedMenuDSR = {};
                        this.SelectedMenuD = {};
                        this.SelectedMenuC = {};
                        this.SelectedMenuCa = {};
                        this.SelectedMenuUT = {};
                    } else {
                        this.SelectedMenuE = {};
                    }
                }  
            };
            this.setColorE = () => {
                if ( log.getCloseable() === false) {
                    this.SelectedMenuE = {
                        "background-color": "red",
                    }
                    log.setCloseable(true);
                } else {
                    this.SelectedMenuE = {
                        "background-color": "green",
                    }
                }
            }
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideEXSR = () => {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    this.IsVisibleSR = this.IsVisibleSR ? false : true;
                    if (this.IsVisibleSR === true) {
                        //Advanced Setting
                        if (log.getAdvanced() === true) {
                            this.AdvancedVisible = true;
                        } else {
                            this.AdvancedVisible = false;
                        }
                        //hide non-selected
                        this.IsVisiblePlanning = false;
                        this.IsVisibleEP = false;
                        this.IsVisibleEXMD = false;
                        this.IsVisibleV = false;
                        this.IsVisibleD = false;
                        this.IsVisibleCL = false;
                        this.IsVisibleDSR = false;
                        this.IsVisibleCA = false;
                        this.IsVisibleUT = false;
                        //highlight
                        this.SelectedMenuEU = {
                            'opacity' : '1', 
                        }
                        this.SelectedMenuE = {};
                        this.SelectedMenuP = {};
                        this.SelectedMenuEXMD = {};
                        this.SelectedMenuV = {};
                        this.SelectedMenuDSR = {};
                        this.SelectedMenuD = {};
                        this.SelectedMenuC = {};
                        this.SelectedMenuCa = {};
                        this.SelectedMenuUT = {};
                    } else {
                        this.SelectedMenuEU = {}
                    }
                }   
            };
            this.setColorEU = () => {
                if ( log.getCloseable() === false) {
                    this.SelectedMenuEU = {
                        "background-color": "red",
                    }
                    log.setCloseable(true);
                } else {
                    this.SelectedMenuEU = {
                        "background-color": "green",
                    }
                }
            }
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideEXMD = () => {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    this.IsVisibleEXMD = this.IsVisibleEXMD ? false : true;
                    if (this.IsVisibleEXMD === true) {
                        //hide non-selected
                        this.IsVisiblePlanning = false;
                        this.IsVisibleEP = false;
                        this.IsVisibleSR = false;
                        this.IsVisibleDSR = false;
                        this.IsVisibleV = false;
                        this.IsVisibleD = false;
                        this.IsVisibleCL = false;
                        this.IsVisibleCA = false;
                        this.IsVisibleUT = false;
                        //highlight
                        this.SelectedMenuEXMD = {
                            'opacity': '1', 
                        }
                        this.SelectedMenuEU = {}
                        this.SelectedMenuE = {};
                        this.SelectedMenuDSR = {};
                        this.SelectedMenuP = {};
                        this.SelectedMenuV = {};
                        this.SelectedMenuD = {};
                        this.SelectedMenuC = {};
                        this.SelectedMenuCa = {};
                        this.SelectedMenuUT = {};
                    } else {
                        this.SelectedMenuEXMD = {};
                    } 
                }   
            };
            this.setColorCr = () => {
                if ( log.getCloseable() === false) {
                    this.SelectedMenuEXMD = {
                        "background-color": "red",
                    }
                    log.setCloseable(true);
                } else {
                    this.SelectedMenuEXMD = {
                        "background-color": "green",
                    }
                }
            }
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideV = () => {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    this.IsVisibleV = this.IsVisibleV ? false : true;
                    if (this.IsVisibleV === true) {
                        //hide non-selected
                        this.IsVisiblePlanning = false;
                        this.IsVisibleEP = false;
                        this.IsVisibleSR = false;
                        this.IsVisibleEXMD = false;
                        this.IsVisibleD = false;
                        this.IsVisibleCL = false;
                        this.IsVisibleDSR = false;
                        this.IsVisibleCA = false;
                        this.IsVisibleUT = false;
                        //highlight
                        this.SelectedMenuV = {
                            'opacity': '1', 
                        };
                        this.SelectedMenuEXMD = {};
                        this.SelectedMenuEU = {};
                        this.SelectedMenuE = {};
                        this.SelectedMenuDSR = {};
                        this.SelectedMenuP = {};
                        this.SelectedMenuD = {};
                        this.SelectedMenuC = {};
                        this.SelectedMenuCa = {};
                        this.SelectedMenuUT = {};
                    } else {
                        this.SelectedMenuV = {};
                    } 
                }    
            };
            this.setColorV = () => {
                if ( log.getCloseable() === false) {
                    this.SelectedMenuV = {
                        "background-color": "red",
                    }
                    log.setCloseable(true);
                } else {
                    this.SelectedMenuV = {
                        "background-color": "green",
                    }
                }
            }
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideD = () => {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    this.IsVisibleD = this.IsVisibleD ? false : true;
                    if (this.IsVisibleD === true) {
                        //Advanced Setting
                        if (log.getAdvanced() === true) {
                            this.AdvancedVisible = true;
                        } else {
                            this.AdvancedVisible = false;
                        }
                        //hide non-selected
                        this.IsVisiblePlanning = false;
                        this.IsVisibleEP = false;
                        this.IsVisibleSR = false;
                        this.IsVisibleEXMD = false;
                        this.IsVisibleV = false;
                        this.IsVisibleCL = false;
                        this.IsVisibleDSR = false;
                        this.IsVisibleCA = false;
                        this.IsVisibleUT = false;
                        //highlight
                        this.SelectedMenuD = {
                            'opacity': '1', 
                        }
                        this.SelectedMenuP = {};
                        this.SelectedMenuE = {};
                        this.SelectedMenuEU = {};
                        this.SelectedMenuDSR = {};
                        this.SelectedMenuEXMD = {};
                        this.SelectedMenuV = {};
                        this.SelectedMenuC = {};
                        this.SelectedMenuCa = {};
                        this.SelectedMenuUT = {};
                    } else {
                        this.SelectedMenuD = {};
                    } 
                }    
            };
            this.setColorD = () => {
                if ( log.getCloseable() === false) {
                    this.SelectedMenuD = {
                        "background-color": "red",
                    }
                    log.setCloseable(true);
                } else {
                    this.SelectedMenuD = {
                        "background-color": "green",
                    }
                }
            }

            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideDSR = () => {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    this.IsVisibleDSR = this.IsVisibleDSR ? false : true;
                    if (this.IsVisibleD === true) {
                        //Advanced Setting
                        if (log.getAdvanced() === true) {
                            this.AdvancedVisible = true;
                        } else {
                            this.AdvancedVisible = false;
                        }
                        //hide non-selected
                        this.IsVisiblePlanning = false;
                        this.IsVisibleEP = false;
                        this.IsVisibleSR = false;
                        this.IsVisibleEXMD = false;
                        this.IsVisibleV = false;
                        this.IsVisibleCL = false;
                        this.IsVisibleCA = false;
                        this.IsVisibleUT = false;
                        this.IsVisibleD = false;
                        //highlight
                        this.SelectedMenuDSR = {
                            'opacity': '1',
                        }
                        this.SelectedMenuD = {};
                        this.SelectedMenuP = {};
                        this.SelectedMenuE = {};
                        this.SelectedMenuEU = {};
                        this.SelectedMenuEXMD = {};
                        this.SelectedMenuDSR = {};
                        this.SelectedMenuV = {};
                        this.SelectedMenuC = {};
                        this.SelectedMenuCa = {};
                        this.SelectedMenuUT = {};
                    } else {
                        this.SelectedMenuDSR = {};
                    }
                }
            };
            this.setColorDSR = () => {
                if ( log.getCloseable() === false) {
                    this.SelectedMenuDSR = {
                        "background-color": "red",
                    }
                    log.setCloseable(true);
                } else {
                    this.SelectedMenuDSR = {
                        "background-color": "green",
                    }
                }
            }
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideCl = () => {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    this.IsVisibleCL = this.IsVisibleCL ? false : true; 
                    if (this.IsVisibleCL === true) {
                        //hide non-selected
                        this.IsVisiblePlanning = false;
                        this.IsVisibleEP = false;
                        this.IsVisibleSR = false;
                        this.IsVisibleEXMD = false;
                        this.IsVisibleV = false;
                        this.IsVisibleDSR = false;
                        this.IsVisibleD = false;
                        this.IsVisibleCA = false;
                        this.IsVisibleUT = false;
                        //highlight
                        this.SelectedMenuC = {
                            'opacity': '1', 
                        }
                        this.SelectedMenuD = {};
                        this.SelectedMenuP = {};
                        this.SelectedMenuE = {};
                        this.SelectedMenuEU = {};
                        this.SelectedMenuEXMD = {};
                        this.SelectedMenuDSR = {};
                        this.SelectedMenuV = {};
                        this.SelectedMenuCa = {};
                        this.SelectedMenuUT = {};
                    } else {
                        this.SelectedMenuC = {};
                    }
                }  
            };
            this.setColorCl = () => {
                if ( log.getCloseable() === false) {
                    this.SelectedMenuC = {
                        "background-color": "red",
                    }
                    log.setCloseable(true);
                } else {
                    this.SelectedMenuC = {
                        "background-color": "green",
                    }
                }
            }
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideCa = () => {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    this.IsVisibleCA = this.IsVisibleCA ? false : true; 
                    if (this.IsVisibleCA === true) {
                        //hide non-selected
                        this.IsVisiblePlanning = false;
                        this.IsVisibleEP = false;
                        this.IsVisibleSR = false;
                        this.IsVisibleDSR = false;
                        this.IsVisibleEXMD = false;
                        this.IsVisibleV = false;
                        this.IsVisibleD = false;
                        this.IsVisibleCL = false;
                        this.IsVisibleUT = false;
                        //highlight
                        this.SelectedMenuCa = {
                            'opacity': '1', 
                        }
                        this.SelectedMenuC = {};
                        this.SelectedMenuD = {};
                        this.SelectedMenuP = {};
                        this.SelectedMenuE = {};
                        this.SelectedMenuEU = {};
                        this.SelectedMenuDSR = {};
                        this.SelectedMenuEXMD = {};
                        this.SelectedMenuV = {};
                        this.SelectedMenuUT = {};
                    } else {
                        this.SelectedMenuCa = {};
                    }
                }   
            };
            this.setColorCa = () => {
                if ( log.getCloseable() === false) {
                    this.SelectedMenuCa = {
                        "background-color": "red",
                    }
                    log.setCloseable(true);
                } else {
                    this.SelectedMenuCa = {
                        "background-color": "green",
                    }
                }
            }
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideUT = () => {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    this.IsVisibleUT = this.IsVisibleUT ? false : true;
                    if (this.IsVisibleUT === true) {
                        //hide non-selected
                        this.IsVisiblePlanning = false;
                        this.IsVisibleEP = false;
                        this.IsVisibleSR = false;
                        this.IsVisibleEXMD = false;
                        this.IsVisibleV = false;
                        this.IsVisibleDSR = false;
                        this.IsVisibleD = false;
                        this.IsVisibleCL = false;
                        this.IsVisibleCA = false;
                        //highlight
                        this.SelectedMenuUT = {
                            'opacity' : '1', 
                        };
                        this.SelectedMenuE = {};
                        this.SelectedMenuEU = {};
                        this.SelectedMenuP = {};
                        this.SelectedMenuDSR = {};
                        this.SelectedMenuEXMD = {};
                        this.SelectedMenuV = {};
                        this.SelectedMenuD = {};
                        this.SelectedMenuC = {};
                        this.SelectedMenuCa = {};
                    } else {
                        this.SelectedMenuUT = {};
                    }
                }   
            }
            
        });
    }
    /**
     *
     * @param {User} log
     * @param {*} mapApi
     * @memberof TopMenuController
     */
    controlUserInfo(log: User, mapApi: any): void {
        mapApi.agControllerRegister('infoUserCtrl', function() {
            //this.emailUser = 'jean-sebastien.bruneau-blais@canada.ca';
            this.checkAdvanced = log.getAdvanced();
            this.changeEmail = () => {
                alert('hello');
            };
            this.checkingAdvanced = () => {
                if (log.getAdvanced() === true) {
                    log.setAdvanced(false);
                } else {
                    log.setAdvanced(true);
                }
            }
        });
    }
    /**
     * Compilateur de HTML avec les variables pour les boutons
     * @param {*} template the template for the form
     * @param {*} mapApi the main API with the function to compile
     * @returns {JQuery<HTMLElement>} return the output compiled
     * @memberof manageController
     */
    compileTemplate(template,mapApi): JQuery<HTMLElement> {
        let temp = $(template);
        mapApi.$compile(temp);
        return temp;
    }
}

export interface TopMenuController {
    
    panel: any;
    panel1:any;
    
}