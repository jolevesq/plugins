/****** Import ******/
const FileSaver = require('file-saver'); // le import
import { connexion } from "../apiConnect";
import { urlPlaniPost } from "../config/url";


export class planifier{

    /*********** Properties ***********/
    _conn: connexion = new connexion();

    _environnement: string;
    _theme: string;
    _idUT: string;
    _typetravail: string;
    _classes: string;
    _datefinpre: string;
    _whereclause: string;  
    _geom: string;

    //data from API
    _data: any;
    

    /*********** Constructor ***********/

    constructor(env:string,theme:string,idut:string,tt:string,classes:string,datefin:string,wc:string,geom:string){
        this._environnement =  env;
        this._theme = theme;
        this._idUT = idut;
        this._typetravail = tt;
        this._classes = classes;
        this._datefinpre = datefin;
        this._whereclause = wc;
        this._geom = geom;
    }

    /************* Methods *************/

   //Send a json to the API and return with the information 
    submitForm(token:string):any{
        let json:string = this.getInformationToJson();
        //this.saveJson(json);
        this.setdata(this._conn.connexionAPIPost(token, json ,urlPlaniPost,'POST'));

        //for test
        if(this.getdata().status != undefined) {
            return this.getdata();
        }else{
            alert(this.getdata().value + ' 9');
            return this.getdata().value;
        }
    }
   

    //get the infromation out of the form into a string json
    getInformationToJson():any{
        //get de properties
        let classes:string[] = ['no value'];
        let output:any = {
            "env": this.getenvironnement(),
            "theme": this.gettheme(),
            "id_ut": this.getidUT(),
            "type_travail": this.gettypetravail(),
            "liste_classes": classes,
            "date_fin_prevue": this.getdatefinpre(),
            "where_clause": this.getzonetravail(),
            "geom": this.getgeom()
        };
        /*let output:any = {
                "env": "string"
          };*/
        
        
        let json:any = JSON.stringify(output)
        return json
    }

    saveJson(output:any):void{
        let blob = new Blob([output],{type:"application/json"});
        FileSaver.saveAs(blob,'export.json');
    }

    setClassesIntoList():string[]{
        let classes:string[]



        return classes;
    }


    /******** Accessors *********/

    getdata(): any {
        return this._data;
    }
    setdata(value: any) {
        this._data = value;
    }

    //Connexion a l'API
    getconn(): connexion {
        return this._conn;
    }
    setconn(value: connexion) {
        this._conn = value;
    }

    //Environnement
    getenvironnement(): string {
        return this._environnement;
    }
    setenvironnement(value: string) {
        this._environnement = value;
    }

    //theme
    gettheme(): string {
        return this._theme;
    }
    settheme(value: string) {
        this._theme = value;
    }

    //zone de travail
    getzonetravail(): string {
        return this._whereclause;
    }
    setzonetravail(value: string) {
        this._whereclause = value;
    }

    //identifiant d'unité de travail
    getidUT(): string {
        return this._idUT;
    }
    setidUT(value: string) {
        this._idUT = value;
    }

    //type de travail
    gettypetravail(): string {
        return this._typetravail;
    }
    settypetravail(value: string) {
        this._typetravail = value;
    }

    //classes
    getclasses(): string {
        return this._classes;
    }
    setclasses(value: string) {
        this._classes = value;
    }

    //datefinprevu
    getdatefinpre(): string {
        return this._datefinpre;
    }
    setdatefinpre(value: string) {
        this._datefinpre = value;
    }

    //logfile
    getgeom(): string {
        return this._geom;
    }
    setgeom(value: string) {
        this._geom = value;
    }
}