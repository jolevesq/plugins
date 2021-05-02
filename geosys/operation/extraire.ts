

const FileSaver = require('file-saver'); // le import
import {urlgeoDataGet,urlgeoDatGetId} from '../config/url';
import { Connexion } from '../apiConnect';
import { User } from '../user';

export class Extraire{

    /*********** Properties ***********/

    _conn :Connexion= new Connexion();
    _theme: string;
    _idUT: string;
    _listClasses:string[];
    _clip: string;
    _whereClause: string;
    _geom: string;
    _json:string;
    _type:string;
    //data from API
    _data:any;
    _envopt:string = '';
    // param connexion
    _host:string ='';
    _port:string = '';
    _dbname:string = '';
    _schema:string = '';
    _password:string = '';
    _username:string = '';
    _type_conn:string ='';
    
    
    /************* Constructor *************/

    /**
     *Creates an instance of Extraire.
     * @param {string} theme le thème sélectionner par l'utilisateur
     * @param {string} [idUT] le identifiant d'unité de travail sélectioner par l'utilisateur
     * @param {string} [clip] Si l'utilisateur veut un clip lors de l'Extraction
     * @param {string} [whereClause] si l'utilisateur a mis un where clause
     * @param {string} [geom] la géométrie entré par l'utilisateur.
     * @memberof Extraire
     */
    constructor(theme:string, type:string, idUT?:string, clip?:string,whereClause?:string, geom?:string){
        this._theme = theme;
        this._type = type;
        this._idUT = idUT;
        this._clip = clip;
        this._whereClause = whereClause;
        this._geom = geom;
    }

    set_param_conn(host:string, port:string, dbname:string, schema:string, password:string, username:string, type_conn:string){
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
     * Envoie un raw json a l'Api s'il s'agit d'un extraction sans retour ou envoie aucun json, mais 
     * envoie l'identifiant d'unité de travail dans le url s'il s'agit d'une extraction planifié
     * @param {User} log le sparamtere de l'utilisateur
     * @returns {*} retorune le succes ou l'erreur de l'opération un avec un message
     * @memberof Extraire
     */
    submitForm(log:User):any{
        //create a json and save the file in the download folder 
        let url:string;
        //if idUt is empty send an unplanned extract
        
        url = log.constructUrl(urlgeoDatGetId + this._idUT + '?format_fichier_data='+this._type);
        //alert('extract planned')
        
        //Call to the Api
        console.log(this._envopt)
        this.setData(this._conn.connexionAPI(log.getToken(), this.getJson(), url, 'Get',this._envopt));
        return this.getData();
   };


    submitFormSR(log:User):any{
        //create a json and save the file in the download folder 
        let url:string;
        //if idUt is empty send an unplanned extract
        this.getInformationToJsonSR();
        url = log.constructUrl(urlgeoDataGet);
            //alert(this.getJson())
        //if idUt et sent the idUt in the url and the json is empty
        //Call to the Api
        console.log(this._envopt)
        this.setData(this._conn.connexionAPI(log.getToken(), this.getJson(), url, 'POST',this._envopt));
        return this.getData();
    };


   /**
    * Set an optionnal environnement for the header of the json
    * @param {string} env the optionnal environnement
    * @memberof Extraire
    */
   setOptionnalEnvironnement(env:string){
        let optEnv:string = `'env_app' : ${env}`;
        //console.log(optEnv);
        this._envopt = optEnv;
   }

   /**
    *set toutes les propriété pour une extraction sans retour
    * @param {string[]} list la liste de classe sélectionner par l'utilisatuer
    * @param {string} clip si l'utilisateur veut un clip de ses données
    * @param {string} whereClause
    * @param {string} geom
    * @memberof Extraire
    */
   setInfoForSR(list:string[],clip:string,whereClause:string, geom:string){
    this._idUT = "";
    this._listClasses = list;
    this._clip = clip;
    this._whereClause = whereClause;
    this._geom = geom;
   }

    /**
     *Creation d'un fichier json pour faire l'appel à l'API
     * @returns {*} retourne un raw Json pour l'API
     * @memberof Extraire
     */
    getInformationToJsonSR(){
        //get de properties
        let output:any = {
            "theme": this._theme.toString(),
            "liste_classes": this._listClasses,
            "clip": this._clip,
            "where_clause" : this._whereClause,
            "geom": this._geom,
            "param_connexion": {
                "host": this._host.toString(),
                "port": this._port.toString(),
                "dbname": this._dbname.toString(),
                "schema": this._schema.toString(),
                "password": this._password.toString(),
                "username": this._username.toString(),
                "type_conn": this._type_conn.toString()
            }
        };
        this._json = JSON.stringify(output)
    }

    /**
     *put a json string into a blob and export into a json file in download file
     * @param {*} output the file to save
     * @memberof Extraire
     */
    saveJson(output:any):void{
        let blob = new Blob([output],{type:"application/json"});
        FileSaver.saveAs(blob,'export.json');
    }

    /*************** Accessors ***********************/
    setEnvOpt(env:string){
        this._envopt = env;
    }

    getEnvOpt():string{
       return this._envopt;
    }

    getJson():string{
        return this._json;
    }

    setJson(json:string){
        this._json =json;
    }

    getData(): any {
        return this._data;
    }

    getTheme():string{
        return this._theme;
    }

    getidUT():string{
        return this._idUT;
    }

    getclip():string{
        return this._clip;
    }

    getwhereClause():string{
        return this._whereClause;
    }

    getgeom(): string {
        return this._geom;
    }

    setTheme(them:string):void{
        this._theme = them;
    }

    setidUT(idUT:string):void{
        this._idUT = idUT;
    }

    setclip(clip:string):void{
        this._clip= clip;
    }

    setdatefinpr(v : string) {
        this._whereClause = v;
    }

    setgeom(value: string) {
        this._geom = value;
    }

    setData(data:any){
        this._data = data;
    }


}
