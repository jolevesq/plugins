import { planifier } from "../operation/planifier";
import { User } from "../user";
export class PlanningController {

    constructor() {};
    /**
     *the controller for all the function in planning templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    planControl(log: User, mapApi: any): void {
        mapApi.agControllerRegister('submitFromP', function () {
            const that = this;
            this.erridwuvs = false;
            this.errclass = false;
            this.errwork = false;
            /************** interactive List ***************/
            this.selectedItemC = '';
            this.selectedItemD = '';
            this.dfp = '';
            this.geomp = '';
            this.geomEPSG  = '';
            this.wherep = '';
            this.itemsC = [];
            this.idut = '';
            this.host =''
            this.port =''
            this.dbname =''
            this.schema =''
            this.password =''
            this.usernameParCo =''
            this.type_conn  =''
            //theme list
            for (let i in log.getThemeAcc()) {
                this.itemsC.push({ name: log.getThemeAcc()[i].getnom(), value: log.getThemeAcc()[i].getId()});
            }
            //List of working type
            this.itemsD = [];
            //the group of classes for a theme
            this.classes = [];
            //function ng-chage of the theme list
            this.setList = () => {
                console.log('List')
                console.log(this.itemsC)
                console.log('selection wow : '+this.selectedItemC)
                this.selectedItemD = '';
                //set the today's date
                let today = new Date();
                let dd: string = String(today.getDate());
                let mm: string = String(today.getMonth() + 1); //January is 0!
                let yyyy: string = String(today.getFullYear());
                if (dd.length < 2) {
                    dd = '0' + dd;
                }
                if (mm.length < 2) {
                    mm = '0' + mm;
                }
                //add the name of the theme
                let slectedthem: string;
                for (let i in this.itemsC) {
                    if (this.itemsC[i].value == this.selectedItemC) {
                        console.log(this.itemsC[i].name)
                        slectedthem = this.itemsC[i].name;
                    }
                }
                //Populate the input of the working unit
                this.idut = slectedthem + '_' + yyyy + mm + dd + '_';
                //populate the working type list
                let listTT = [];
                listTT = log.setworkingtype(this.selectedItemC);
                /** liste de classes **/
                let list = [];
                list = log.getlistofclasses(this.selectedItemC);
                this.classes.length = 0;
                this.itemsD.length = 0;
                //add the new list in list for the template
                this.classes = list;
                this.itemsD = listTT;
                //log.setbaseTheme(this.selectedItemA);
                this.host =log.gethost();
                this.port =log.getport();
                this.dbname =log.getdbname();
                this.schema =log.getschema();
                this.password =log.getdbpwd();
                this.usernameParCo =log.getdbuser();
                this.type_conn  =log.gettypeConn();
            }
            //for claases list select all the info
            this.toggleAll = () => {
                if (this.listeclasse == true) {
                    for (let i in this.classes) {
                        this.classes[i].wanted = false;
                    }
                } else {
                    for (let i in this.classes) {
                        this.classes[i].wanted = true;
                    }
                }
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
            /********** Form submission ************/
            //Envoie le fromulaire a l'API
            this.submitFormP =  () => {
                //get all the information of the form into the class
                let listofclass = []
                for (let i in this.classes) {
                    if (this.classes[i].wanted == true) {
                        listofclass.push(this.classes[i].name);
                    }
                }
                if ((<HTMLInputElement>document.getElementById("idUt")).value ===  '') {
                    this.erridwuvs = true;
                    log.setCloseable(false);
                } else if (this.selectedItemD === '') {
                    this.errwork = true;
                    log.setCloseable(false);
                } else if (listofclass.length < 1) {
                    this.errclass = true;
                    log.setCloseable(false);
                } else {
                    //set the information in the the json
                    log.createGeoJson('EPSG:' + this.geomEPSG, JSON.parse(this.geomp))
                    log.setCloseable(true);
                    let plan: planifier = new planifier(
                        this.selectedItemC,
                        (<HTMLInputElement>document.getElementById("idUt")).value,
                        this.selectedItemD,
                        listofclass,
                        this.dfp,
                        this.wherep,
                        log.getGeom(),
                        this.host,
                        this.port,
                        this.dbname,
                        this.schema,
                        this.password,
                        this.usernameParCo,
                        this.type_conn);
                    //submit the form to the API
                    let ApiReturn: any = plan.submitForm(log);
                    //If the return isn't a succes
                    if (ApiReturn == 'error') {
                        alert(ApiReturn.status);
                        log.setCloseable(false);
                    }
                }
            };
        });
    }
}