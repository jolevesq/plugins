import { connexion } from './apiConnect';
import { idWu } from './manager/idWU';
export declare class login {
    /** Send to APi **/
    _username: string;
    _password: string;
    _environnement: string;
    _conn: connexion;
    /** Return of login **/
    _token: string;
    _tokentype: string;
    _expired: number;
    _rightRead: string;
    _rightWrite: string;
    /** Dropdown List **/
    _themeAcc: string[];
    _envAcc: string[];
    _idUt: idWu;
    constructor(username?: string, password?: string);
    submitForm(): any;
    getInformationToHeader(): any;
    setDataFromAPI(token: string, token_type: string, expired: number, scope: string[], theme: string[]): void;
    setidUTtheme(theme: string): any[];
    setidUtToDDL(theme: string): any;
    getUtravail(theme: string): string[];
    getusername(): string;
    setusername(value: string): void;
    getpassword(): string;
    setpassword(value: string): void;
    getconn(): connexion;
    setconn(value: connexion): void;
    gettoken(): string;
    settoken(value: string): void;
    gettokentype(): string;
    settokentype(value: string): void;
    getexpired(): number;
    setexpired(value: number): void;
    getrightRead(): string;
    setrightRead(value: string): void;
    getrightWrite(): string;
    setrightWrite(value: string): void;
    getthemeAcc(): string[];
    setthemeAcc(value: string[]): void;
    getenvAcc(): string[];
    setenvAcc(value: string[]): void;
}
