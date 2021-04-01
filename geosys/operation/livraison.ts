import { Connexion } from "../apiConnect";
import { User } from '../user';
import { urlDeliveryUpdate, urlDeliverySansPlan } from "../config/url";


export class Livraison{

    _conn :Connexion= new Connexion();
    _theme:string;
    _idUt:string;
    _typeConn:string;
    _envopt:string = '';

    constructor(idut:string,theme:string, typeconn:string){
        this._idUt = idut;
        this._theme = theme;
        this._typeConn =typeconn;
    };

    submitForm(form:any, log:User){
        let method:string;
        if(this._typeConn === 'Update'){
            method = 'Put';
        }else{
            method = 'Post'
        }
        let apire:any = this._conn.connexionAPIFormData(log.getToken(), form , log.constructUrl(urlDeliveryUpdate,this._idUt), method);
        //for test
        if(apire == 'success'){
            //alert( this.getinfo());
            return apire;
        }else{
            //alert(this.getinfo().status);
            return apire;
        }
    }

    submitFormSR(form:any, log:User){
        let method:string;
        if(this._typeConn === 'Update'){
            method = 'Put';
        }else{
            method = 'Post'
        }
        let apire:any = this._conn.connexionAPIFormData(log.getToken(), form , log.constructUrl(urlDeliverySansPlan), method);
        //for test
        if(apire == 'success'){
            //alert( this.getinfo());
            return apire;
        }else{
            //alert(this.getinfo().status);
            return apire;
        }
    }
    

    createJsonPraramConn(host:string, port:string, dbname:string , schema:string , password :string, username:string, type_conn:string){
        let json = {
            "host":host,
            "port": port,
            "dbname":dbname,
            "schema":schema,
            "password":password,
            "username":username,
            "type_conn":type_conn
        }
        return JSON.stringify(json)
    }

    /**
    * Set an optionnal environnement for the header of the json
    * @param {string} env the optionnal environnement
    * @memberof Livraison
    */
   setOptionnalEnvironnement(env:string){
    let optEnv:string = `'env_app' : ${env}`;
    //console.log(optEnv);
    this._envopt = optEnv;
}

}
