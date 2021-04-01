import { User } from "../user";
import { Livraison } from "../operation/livraison";


export class DeliveryController{

    constructor(){};
      /**
     *the controller for all the function in the delivery templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    deliControl(log: User, mapApi: any): void {
        //mapApi.agDirectiveRegister()
        mapApi.agControllerRegister('submitFromD', function() {
            //error message for the metadata file
            this.errMD = false;
            //error message for the fgbd
            this.errFGDB = false;
            /************** interactive List ***************/
            //operation type on the DB
            this.typeOper = '';
            //operation type on the DB
            this.selectedItemR = '';
            //mdid
            this.mdid = '';
            //theme
            this.selectedItemE = '';
            //Working unit ID
            this.selectedItemF = '';
            //set up theme list
            this.itemsE = [];
            for (let i in log.getThemeAcc()) {
                this.itemsE.push( {name : log.getThemeAcc()[i].getnom() , value: log.getThemeAcc()[i].getId()} );
            }
            this.itemsF = [];
            this.setList = () => {
                // populate list b with new items
                this.selectedItemF = '';
                this.itemsF.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemE)
                for (let i in list) {
                    this.itemsF.push(list[i])
                }
                //log.setbaseTheme(this.selectedItemE);
            }
            /************** Advanced Setting ***************/
            this.ShowHideAdvanced = function() {
                if (log.getEnvironnementSel() !== '') {
                    this.IsVisibleASP = this.IsVisibleASP ? false : true; 
                }  
            };
            /************** interactive List Advanced Setting ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (let i in log.getEnvAcc()) {
                this.itemsENT.push( {name : log.getEnvAcc()[i]._env , value: log.getEnvAcc()[i]._env} );
            }
            //Envoie le formulaire a l'API
            this.submitFormD = function() { 
                //get all the information of the form into the class
                if ((<HTMLInputElement>document.getElementById('filefgdb')).files.length === 0) {
                    this.errFGDB = true;
                    log.setCloseable(false);
                } else {
                    let formdata = new FormData();
                    log.setCloseable(true);
                    formdata.append('format_fichier_data',this.selectedItemR);
                    formdata.append('md_id',this.mdid);
                    formdata.append('fichier_data',(<HTMLInputElement>document.getElementById('fileMD')).files[0]);
                    formdata.append('fichier_meta',(<HTMLInputElement>document.getElementById('filefgdb')).files[0]);
                    let livre:Livraison = new Livraison(this.selectedItemF,this.selectedItemE,this.typeOper);
                    livre.setOptionnalEnvironnement(this.selectedItemENT);
                    //submit form
                    let ApiReturn:any = livre.submitForm(formdata,log);
                       
                    if (ApiReturn != undefined) {
                        log.setCloseable(false);
                        alert(ApiReturn);
                    }
                }
            };
        })
    }

    deliControlSA(log: User, mapApi: any): void {
        //mapApi.agDirectiveRegister()
        mapApi.agControllerRegister('submitFromDSA', function() {
            const that = this;
            //error message for the metadata file
            this.errMD = false;
            //error message for the fgbd
            this.errFGDB = false;
            /************** interactive List ***************/
            //operation type on the DB
            this.typeOper = '';
            this.selectedItemR = '';
            //theme
            this.selectedItemE = '';
            //Working unit ID
            this.selectedItemF = '';
            // param connection
            this.host = '';
            this.port = '';
            this.dbname = '';
            this.schema = '';
            this.password = '';
            this.usernameParCo = '';
            this.type_conn = '';
            //geom
            this.geom = '';
            //set up theme list
            this.itemsE = [];
            for (let i in log.getThemeAcc()) {
                this.itemsE.push( {name : log.getThemeAcc()[i].getnom() , value: log.getThemeAcc()[i].getId()} );
            }
            this.itemsF = [];
            this.setList = () => {
                // populate list b with new items
                this.selectedItemF = '';
                this.itemsF.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemE)
                for (let i in list) {
                    this.itemsF.push(list[i])
                }
                //log.setbaseTheme(this.selectedItemE);
            }

             // Checkbox behave like radio button
             this.inputchck = () => {
                this.drawingchecked = false;
                this.filechecked = false;
            }
            this.drawchck = () => {
                this.geomp = '';
                this.inputchecked = false;
                this.filechecked = false;
            }
            this.importchck = () => {
                this.geomp = '';
                this.drawingchecked = false;
                this.inputchecked = false;
            }
            //subscribe for the drawing
            (<any>window).drawObs.drawPolygon.subscribe(value => {
                //create a geojson with the infromation obtain
                if (this.drawingchecked == true) {
                    //show the geo json in the input 
                    this.geomp = JSON.stringify(value.rings);
                    this.geomEPSG = value.spatialReference.wkid;
                }
            });
            /************** Shapefile Load ***************/
            this.loadshp = () => {
                let files: any = (<HTMLInputElement>document.getElementById('fileshp')).files
                if (files.length == 0) {
                    alert('No file');
                } else {
                    let file: any = files[0];
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        if (reader.readyState != 2 || reader.error) {
                            alert('Wrong file');
                            return;
                        } else {
                            //package to read a shapefile and get a geojson
                            let shp = require("shpjs");
                            //read the zip shapefile
                            shp(reader.result).then(function (dta) {
                                //set a variable with the coordinates for the drawing
                                let geomDR = dta.features[0].geometry.coordinates[0];
                                //set a variable with the coordinates for the geojson
                                let geomGEOJSON = dta.features[0].geometry.coordinates;
                                //set the geojson in the input
                                that.geomp = JSON.stringify(geomGEOJSON);
                                that.geomEPSG = '4326'
                                //create the polygon in the viewer with a zoom on it
                                log.createPolygons(mapApi.id, geomDR);
                            });
                        }
                    }
                    reader.readAsArrayBuffer(file);
                }
            }
            /************** Advanced Setting ***************/
            this.ShowHideAdvanced = function() {
                if (log.getEnvironnementSel() !== '') {
                    this.IsVisibleASP = this.IsVisibleASP ? false : true;
                }
            };
            /************** interactive List Advanced Setting ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (let i in log.getEnvAcc()) {
                this.itemsENT.push( {name : log.getEnvAcc()[i]._env , value: log.getEnvAcc()[i]._env} );
            }
            //Envoie le formulaire a l'API
            this.submitFormD = function() {
                //get all the information of the form into the class
                if ((<HTMLInputElement>document.getElementById('fileMD')).files.length === 0) {
                    this.errMD = true;
                    log.setCloseable(false);
                } else if ((<HTMLInputElement>document.getElementById('filefgdb')).files.length === 0) {
                    this.errFGDB = true;
                    log.setCloseable(false);
                } else {
                    let formdata = new FormData();
                    log.setCloseable(true);
                    let livre:Livraison = new Livraison(this.selectedItemF,this.selectedItemE,this.typeOper);
                    let parconn = livre.createJsonPraramConn(this.host, this.port,this.dbname, this.schema,this.password, this.usernameParCo, this.type_conn)
                    formdata.append('theme',this.selectedItemE);
                    formdata.append('md_id', this.mdid)
                    formdata.append('liste_classes','');
                    // recevoir JSON (faire JSON)
                    formdata.append('param_connexion',parconn);
                    formdata.append('format_fichier_data',this.selectedItemR);
                    formdata.append('fichier_data',(<HTMLInputElement>document.getElementById('fileMD')).files[0]);
                    formdata.append('fichier_meta',(<HTMLInputElement>document.getElementById('filefgdb')).files[0]);
                    formdata.append('geom',this.geom);
                    livre.setOptionnalEnvironnement(this.selectedItemENT);
                    //submit form
                    let ApiReturn:any = livre.submitFormSR(formdata,log);

                    if (ApiReturn != undefined) {
                        log.setCloseable(false);
                        alert(ApiReturn);
                    }
                }
            };
        })
    }

}