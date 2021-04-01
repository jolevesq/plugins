import { User } from '../user';


export class Creer{

    _mdId:string;
    _async:boolean;
    
    //return of the API
    _data:any;

    constructor(mdid:string,async:boolean){
        this._mdId = mdid;
        this._async = async;
    }

    submitFrom(log:User){

    }


    /********* Accessor **********/

    getData():any{
        return this._data;
    }

    setData(data:any){
        this._data = data;
    }
}