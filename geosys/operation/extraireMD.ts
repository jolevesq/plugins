import { User } from '../user';
import {urlgeoDataGet,urlgeoDatGetId} from '../config/url';
import { Connexion } from '../apiConnect';
const FileSaver = require('file-saver'); // le import


export class ExtraireMD{

    _mdId:string;
    _async:boolean;
    _conn: Connexion =  new Connexion;
    //return of the API
    _data:any;

    constructor(mdid:string,async:boolean){
        this._mdId = mdid;
        this._async = async;
    }

    submitForm(log:User){
        let json= '';
        let url = log.constructUrl('meta/' + this._mdId + '?asynchrone='+this._async);
        this._data = this._conn.connexionAPI(log.getToken(), json, url, 'Get');
        let file = new Blob([this._data]);
        FileSaver.saveAs(file,'Query.json');
        return this._data;
    }


    /********* Accessor **********/

    getData():any{
        return this._data;
    }

    setData(data:any){
        this._data = data;
    }
}