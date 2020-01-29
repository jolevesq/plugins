import { urlLoginGet } from './url';
import { connexion } from './apiConnect';


export class login{

    _username: string = 'hello';
    _password: string = 'hello';
    _conn: connexion = new connexion();
    
    /**Return of login**/
    _token: string;
    _tokentype: string;
    _expired: number = 3600;
    _rightRead: string;
    _rightWrite: string;
    

    //Constructor with only username and pasword for the login
    constructor(username?:string, password?:string){
        this._username =  username;
        this._password = password;
    }

    //submit the from to the API
    submitForm():any{
        //To Change
             //create a json and save the file in the download folder 
         let header:any = this.getInformationToHeader();
         let data:any = this._conn.connexionAPILogin(urlLoginGet,header);
         alert(data.access_token);
         if (!data.code){
            this.setDataFromAPI(data.access_token,data.token_type,data.expired, data.scope);
        }else{
            alert(data.code)
        }
         return data;
             
    };

    //get the infromation out of the form into a string json
    getInformationToHeader():any{
        //get de properties
        let output:any = {
            "username": this._username,
            "password": this._password,
            "duree_token": this._expired
        };
        //let json:any = JSON.stringify(output)
        return output
    }

    setDataFromAPI(token:string,token_type:string,expired:number, scope:string[]){
        this._token = token;
        this._tokentype = token_type;
        this._expired = expired;
        this._rightRead = scope[0];
        this._rightWrite = scope[1]
        alert(this._rightRead + " " + this._rightWrite);

    }

    //accessor
    /*Username */
    getusername(): string {
        return this._username;
    }
    setusername(value: string) {
        this._username = value;
    }

    /*Password */
    getpassword(): string {
        return this._password;
    }
    setpassword(value: string) {
        this._password = value;
    }

    /*Conn */
    getconn(): connexion {
        return this._conn;
    }
    setconn(value: connexion) {
        this._conn = value;
    }

    /*Token */
    gettoken(): string {
        return this._token;
    }
    settoken(value: string) {
        this._token = value;
    }

    /*Tokentype */
    gettokentype(): string {
        return this._tokentype;
    }
    settokentype(value: string) {
        this._tokentype = value;
    }

    /*Expired */
    getexpired(): number {
        return this._expired;
    }
    setexpired(value: number) {
        this._expired = value;
    }

    /* RightRead*/
    getrightRead(): string {
        return this._rightRead;
    }
    setrightRead(value: string) {
        this._rightRead = value;
    }

    /*RightWrite */
    getrightWrite(): string {
        return this._rightWrite;
    }
    setrightWrite(value: string) {
        this._rightWrite = value;
    }

}