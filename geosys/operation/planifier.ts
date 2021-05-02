/****** Import ******/
const FileSaver = require('file-saver'); // le import
import { Connexion } from "../apiConnect";
import { urlPlaniPost } from "../config/url";
import { User } from '../user';


export class planifier{

    /*********** Properties ***********/
    _conn: Connexion = new Connexion();

    _theme: string;
    _idUT: string;
    _typetravail: string;
    _classes: string[];
    _datefinpre: string;
    _whereclause: string;
    _geom: string;
    _json:string = '';
    _host:string ='';
    _port:string = '';
    _dbname:string = '';
    _schema:string = '';
    _password:string = '';
    _username:string = '';
    _type_conn:string ='';

    //data from API
    _data: any;
    

    /*********** Constructor ***********/

    /**
     *Creates an instance of planifier.
     * @param {string} theme un theme choisi par l'utilisateur parmi la liste
     * @param {string} idut un id avec préfixe du theme et de la date créer avant le nom
     * @param {string} tt un type de travail sélectionner selon une liste créer par sélectio d'un theme
     * @param {string[]} classes une liste de classes sélectionner relier a un theme
     * @param {string} datefin une date de fin prévu entré par l'utilisateur
     * @param {string} wc si un where clause est entré par l'tuilsateur
     * @param {string} geom une geométrie entré par l'utilisateur
     * @memberof planifier
     */
    constructor(theme:string,idut:string,tt:string,classes:string[],datefin:string,wc:string,geom:string, host:string, port:string, dbname:string, schema:string, password:string, username:string, type_conn:string){
        this._theme = theme;
        this._idUT = idut;
        this._typetravail = tt;
        this._classes = classes;
        this._datefinpre = datefin;
        this._whereclause = wc;
        this._geom = geom;
        this._host = host;
        this._port = port;
        this._dbname = dbname;
        this._schema = schema;
        this._password= password;
        this._username = username;
        this._type_conn = type_conn;
    }
    /************* Methods *************/
    /**
     *Send a json to the API and return with the information
     *
     * @param {User} log les parametre de l'utilisateur de la classe user
     * @returns {*} retourne les informations de l'API si le fromulaire a été envoyé avec succès ou non
     * @memberof planifier
     */
    submitForm(log:User):any{
        this.getInformationToJson();
        this.setdata(this._conn.connexionAPI(log.getToken(), this.getJson() ,log.constructUrl(urlPlaniPost),'POST'));
        //what we get from the API
        return this.getdata();
    }
    /**
     * Transfrome les infromation du formulaire en fichier raw json
     * @param {User} log
     * @returns {*} retourne un raw json pour envoyer a l'Api
     * @memberof planifier
     */
    getInformationToJson(){
        //get de properties
        //alert(this.getclasses());
        let output:any = {
            "theme": this.gettheme().toString(),
            "id_ut": this.getidUT(),
            "type_travail": this.gettypetravail().toString(),
            "liste_classes": this.getclasses(),
            "date_fin_prevue": this.getdatefinpre(),
            "where_clause": this.getzonetravail(),
            "geom": this.getgeom(),
            "param_connexion":{
                "host": this._host.toString(),
                "port": this._port.toString(),
                "dbname": this._dbname.toString(),
                "schema": this._schema.toString(),
                "password": this._password.toString(),
                "username": this._username.toString(),
                "type_conn": this._type_conn.toString()
            }
        };
        this._json= JSON.stringify(output)
    }
    /**
     * sauvegarde un fichier json dans le fichier de download de l'utilisateur
     * @param {*} output le fichier json a sauvegarder.
     * @memberof planifier
     */
    saveJson():void{
        let blob = new Blob([this._json],{type:"application/json"});
        FileSaver.saveAs(blob,'export.json');
    }
    /******** Accessors *********/
    getJson():string{
        return this._json;
    }

    setJson(json:string){
        this._json = json;
    }

    getdata(): any {
        return this._data;
    }
    setdata(value: any) {
        this._data = value;
    }

    //Connexion a l'API
    getconn(): Connexion {
        return this._conn;
    }
    setconn(value: Connexion) {
        this._conn = value;
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
    getclasses(): string[] {
        return this._classes;
    }
    setclasses(value: string[]) {
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