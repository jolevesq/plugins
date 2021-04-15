import { urlgetidWu, urlEnvList,
     urlClassesList,urlWorkingType, urlGetCode } from './config/url';
import { Connexion } from './apiConnect';
import { IdWu } from './util/idWU';
import { Environnement } from './util/environnement';
import { ApiReturn } from './util/apireturn';


export class User{
    /** Send to APi **/
    private _username: string;
    private _password: string;
    /** Environnement **/
    private _environnementSel: string;
    private _urlEnvselected: string;
    private _baseTheme: string;
    _baseThemeU: string;
    _baseThemeT: string;
    _baseThemeC: string;
    /** Connexion **/
    private _conn: Connexion = new Connexion();
    /** Return of login **/
    private _token: string;
    private _tokentype: string;
    private _expired: number;
    private _right: ApiReturn[] = [];
    /** List **/
    private _themeAcc: ApiReturn[] = [];
    private _envAcc: Environnement[] = [];
    private _equipe: ApiReturn;
    private _idUt: IdWu;
    private _classeslist: string[];
    private _workinType: ApiReturn[] = [];
    /** other **/
    private _geom: string;
    private _advanced: boolean = false;
    private _closeable: boolean = true;

    /**
     * Creates an instance of User. with only the username and a password for the connections
     * @param {string} [username] Name of the user
     * @param {string} [password] Password of the user
     * @memberof User
     */
    constructor(username: string, password: string) {
        this._username =  username;
        this._password = password;
    }
    /**
     * Contruct an url with the environnement selected and the url for the action
     * @param {string} url Url of the action
     * @param {string} [adding] Add the theme or id at the end (optional)
     * @returns {string} An url with the url of the nevironnemtn and the API one
     * @memberof User
     */
    constructUrl(url: string, adding: string = ''): string {
        return /*this._urlEnvselected*/ "http://api.geosys-dev.services.geo.ca:30524/v1/" + url + adding
    }
    /**
     * With the connexion to the APi send a json file with the username and the password in the header to get
     * the token for the rest of the connexion.
     * @returns {*} the data from the API. we dont know the return of the API so ANY.
     * @memberof User
     */
    submitForm(config: any): any {
        let data: any;
        // let header: any = this.getInformationToHeader();
        data = this._conn.connexionAPILogin(config.url_login,this.getUsername(),this.getPassword());
        console.log(data)
        // Destroy the password for the session
        this._password = '';
        console.log(config.url_env)
        // Set the data from the connexion
        if (data.status === undefined) {
            let json = '';
            this.setDataFromAPI(data.access_token,data.token_type,data.expired, data.scope ,data.theme, data.equipe,config);
        } else {
            alert(data.status)
        }
        return data;
    };
    /**
     * Create the list of environnement and their url and place the PRO environnment in first
     * @param {*} output Its the data from API.
     * @memberof User
     */
    setListEnv(output: any) {
        for (let i in output.envs) {
            if (output.envs[i].env === 'DEV') {
                this._envAcc.push(new Environnement(output.envs[i].env,output.envs[i].url))
                break;
            } 
        }
        for (let i in output.envs) {
            if (output.envs[i].env != 'DEV') {
                this._envAcc.push(new Environnement(output.envs[i].env,output.envs[i].url))
            }
        }
        this.setEnvironnementSelected('DEV')
    }
    /**
     * Set the environnement url to a properties with the environnement selected
     * @param {string} env the environnement selected by the user
     * @memberof User
     */
    setEnvironnementSelected(env: string) {
        for (let i in this._envAcc) {
            if (this._envAcc[i]._env === env) {
                this._environnementSel = this._envAcc[i]._env;
                this._urlEnvselected = this._envAcc[i]._urlEnv;
                break;
            }
        }
    }
    /**
     * put the information of the user in a header for the first connexion to the API
     * @returns {*}
     * @memberof User
     */
    getInformationToHeader(): any {
        //get de properties
        let output: any = {
            'usager': this._username,
            'mot_de_passe': this._password,
            'duree_token': this._expired
        };
        //let json:any = JSON.stringify(output)

        return output
    }
    /**
     * Reset Base theme for the form
     * @memberof User
     */
    resetBaseTheme(): void {
        this._baseThemeU = this._baseTheme;
        this._baseThemeT = this._baseTheme;
        this._baseThemeC = this._baseTheme;
    }
    /**
     * Set all the info information obtain form a login into the properties of the class
     * @param {string} token
     * @param {string} token_type
     * @param {number} expired
     * @param {string[]} scope
     * @param {string[]} theme
     * @param {string} equipe
     * @memberof User
     */
    setDataFromAPI(token: string, token_type: string, expired: number, scope: string[], theme: string[] , equipe: string, config: any): void {
        let json = ""
        // Set the data from the connexion return
        this._token = token;
        this._tokentype = token_type;
        this._expired = expired;

        // Set environnement
        this.setListEnv(this._conn.connexionAPI(this.getToken(), json, config.url_env, 'Get'));

        for (let i in scope) {
            this._right.push(new ApiReturn(scope[i]));
            let data = this._conn.connexionAPI(this.getToken(),json,this.constructUrl(urlGetCode,this._right[i].getId()),'Get');
            this._right[i].setRemaining(data.id_liste_code,data.nom,data.desc_en,data.desc_fr);
        }
        this._equipe = new ApiReturn(equipe);
        let data: any;
        data = this._conn.connexionAPI(this.getToken(),json,this.constructUrl(urlGetCode,this._equipe.getId()),'Get');
        this._equipe.setRemaining(data.id_liste_code,data.nom,data.desc_en,data.desc_fr);
        // Set base theme from the config
        this._baseTheme = config.base_theme;
        this._baseThemeU = config.base_theme;
        this._baseThemeT = config.base_theme;
        this._baseThemeC = config.base_theme;
        // Order the theme
        let ordertheme: any =this.orderThemeList(theme,config);
        for (let i in ordertheme){
            this._themeAcc.push(new ApiReturn(ordertheme[i]));
            this.getinfoForCode(ordertheme[i],i)
        }
        let basethemeString:string = ''
        for (let i in this._themeAcc){
            if(this._themeAcc[i].getId().toString() == this._baseTheme){
                basethemeString = this._themeAcc[i].getnom()
            }
        }
        //set all form with the base theme
        this.callAPIWorkingUnit(this._baseTheme);
        this.callAPIListeClasse(basethemeString);
        this.callAPIWorkingType(this._baseTheme);
    }
    /**
     * Call Api for a list of working unit
     * @param {string} theme The theme related to the working unit
     * @memberof User
     */
    callAPIWorkingUnit(theme: string): void {
        let json = '';
        let output: any =this._conn.connexionAPI(this.getToken(), json, this.constructUrl(urlgetidWu + theme), 'Get');
        this._idUt = new IdWu(theme,output.value);
    }
    /**
     * Call the API for a list of classes
     * @param {string} theme The theme related to the list of classes
     * @memberof User
     */
    callAPIListeClasse(theme: string) {
        let resstheme: string = theme;
        let ressjson = this.createJsonRessources(resstheme/*,path*/);
        let data: any = this._conn.connexionAPI(this.getToken(), ressjson , this.constructUrl(urlClassesList),'Post');
        this._classeslist = data.param_fgp_viewer.value.liste_classes;
        console.log(data)
        console.log(this._classeslist)
    }
    /**
     * call the API for a list of working type
     * @param {string} theme the theme related to the working type
     * @memberof User
     */
    callAPIWorkingType(theme: string) {
        console.log('type de travail'+theme)
        let json = '';
        let ttoutput: any = this._conn.connexionAPI(this.getToken(), json, this.constructUrl(urlWorkingType+ theme.toString()), 'Get');
        this._workinType = [];
        for (let j in ttoutput) {
            this._workinType.push(new ApiReturn(ttoutput[j].id));
            this._workinType[j].setRemaining(ttoutput[j].id_list_code, ttoutput[j].nom,ttoutput[j].desc_en, ttoutput[j].desc_fr);
        }
    }
    /**
     * Ordering the list to set the base theme in first place
     * @param {string[]} theme List of theme
     * @param {*} config The base theme
     * @returns
     * @memberof User
     */
    orderThemeList(theme: string[],config: any): any {
        let newtheme: string[] = [];
        for (let i in theme) {
            if (theme[i] === config.base_theme.toString()) {
                newtheme.push(theme[i]);
                break;
            }
        }
        for (let i in theme) {
            if (theme[i] !== config.base_theme.toString()) {
                newtheme.push(theme[i]);
            }
        }
        return newtheme
    }
    /**
     * Get all the information of a code into the properties _themeAcc
     * @param {string} theme The code of the theme to get all of his info
     * @param {string} rank The rankl of the list _themeAcc
     * @memberof User
     */
    getinfoForCode(theme: string, rank: string) {
        let json: string = '';
        let data: any;
        data = this._conn.connexionAPI(this.getToken(),json,this.constructUrl(urlGetCode,theme),'Get');
        this._themeAcc[rank].setRemaining(data.id_liste_code,data.nom,data.desc_en,data.desc_fr);
    }
    /**
     * Build the object for the working unit id and setting the theme in front for the mocking
     * and set a list for the dropdown list int the forms.
     * @param {string} theme The theme selected by the user
     * @returns Return a list of working unit id with a name and a value for a dropdownlist
     * @memberof User
     */
    setidUTtheme(theme: string) {
        //set the new url and get the connection
        if (theme.toString() !== this._baseThemeU.toString()) {
            this._baseThemeU = theme;
            this.callAPIWorkingUnit(theme)
        }
        let list = [];
        for (let j in this._idUt._wUnit) {
            list.push( { name: this._idUt._wUnit[j], value: this._idUt._wUnit[j]});
        }

        return list;
    }
    /**
     * build the list for the working type and
     * and set a list for the dropdown list int the forms.
     * @param {string} theme the theme selected by the user
     * @returns return a list of working type name with a name and a value for a dropdownlist
     * @memberof User
     */
    setworkingtype(theme: string) {

        console.log('pour la liste : ' + theme)
        //set the new url and get the connection
        if (theme.toString() !== this._baseThemeT.toString()) {
            this._baseThemeT = theme;

            this.callAPIWorkingType(theme);
        }
        let list = [];
        for (let j in this._workinType) {
            list.push( { name: this._workinType[j].getnom(), value: this._workinType[j].getId()});
        }

        return list;
    }
    /**************** Reading Ressources files *********************/
    /**
     * create a json file for getting a list of classes
     * mostly hardcoded.
     * @param {string} theme the theme selected by the user (nom en string)
     * @returns {string} return a raw json
     * @memberof User
     */
    createJsonRessources(theme: string/*, path:string */): string {
        let output:any = {
            'fichiers': [
                this._environnementSel.toLowerCase() +'/ressources/themes/'+ theme + '/fgp_viewer_plugin_geosys.json'
            ],
            'chemin_recherche': [
                'param_fgp_viewer'
            ]
          }
        let json:any = JSON.stringify(output)
        return json
    }
    /**
     * the call to get the classes needed from the API 
     * @param {string} theme the theme selected by the user
     * @memberof User
     */
    getlistofclasses(theme: string/*,path:string*/) {
        console.log(theme)
        let listS = [];
        if (theme.toString() !== this._baseThemeC.toString()) {
            this._baseThemeC = theme;
            let basethemeString:string = ''
            for (let i in this._themeAcc){
                if(this._themeAcc[i].getId().toString() == theme){
                    basethemeString = this._themeAcc[i].getnom()
                }
            }
            this.callAPIListeClasse(basethemeString);
        }
        for (let i in this._classeslist) {
            listS.push( { name: this._classeslist[i] , wanted: false });
        }
        return listS;
    }
    /************************* For Geometry ******************************/
    /**
     * Work around for a follow-up duplicates
     * @param {*} coord coordinates with a follow-up duplicates
     * @returns {*} reyurn the coordinates with no folow-up duplicates
     * @memberof User
     */
    eliminateFollowUpDuplicate(coord:any):any{
        //create a list to push the non-duplicates
        let nodupes = [];
        //search the array
        for (let i in coord[0]) {
            let j = +i;
            //check the postion is not 0(for no previous)
            if (j != 0) {
                //check if not duplicates with the previous one
                if (coord[0][i][0] !== coord[0][j-1][0] && coord[0][i][1] !== coord[0][j-1][1]) {
                    //push in the non-duplicates array
                    nodupes.push(coord[0][i]);
                }
            } else {
                //always push the first into the non-duplicates array
                nodupes.push(coord[0][i])
            }
        }
        let newCoord:any = [nodupes];

        return newCoord;
    }

    /**
     *Create a geojson for a drawing geometry or the imported geometry
     * @memberof planifier
     */
    createGeoJson(crs: string,coord: any) {
        coord = this.eliminateFollowUpDuplicate(coord);
        let geojson:any = {
            'type': 'Polygon',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': crs
                }
            },
            'coordinates': 
                coord
        };
        this._geom = JSON.stringify(geojson);
    }
    /**
     * Create a layer in the viewer to add a polygon in viewer
     * @param {string} mapId the map ID of the viewer
     * @param {*} values the coordinates of the drawing
     * @memberof User
     */
    createPolygons(mapId: string,values: any) {
        //create a constant to get the map in the viewer
        const myMap = (<any>window).RAMP.mapById(mapId);
        //create a layer in the map in the viewer
        (<any>window).RAMP.mapById(mapId).layersObj.addLayer('shpUpload');
        //create a polygons with all the coordinates(the coordinates needs to be in lat/lon)
        const poly1 = new (<any>window).RAMP.GEO.Polygon(0, values);
        //create a multipolygon with an id
        const polyAll = new (<any>window).RAMP.GEO.MultiPolygon(`location${Math.round(Math.random() * 100000)}`, [poly1],{ outlineColor: [55, 50, 200], outlineWidth: 3 });
        // add the multipolygon to the graphic layer
        const shpUpload = myMap.layers.getLayersById('shpUpload')[0];
        //add the geometry in the layer created
        shpUpload.addGeometry([polyAll]);
        //zoom to extent of polygon(s)
        this.zoomExtent(mapId, values, 2);
        //console.log(shpUpload)
    }

    /**
     * zoom in the polygon in the viewer
     * @param {string} mapId the id of the map in the viewer
     * @param {[]} coords the coordinates of the polygon
     * @param {number} [expand=1] the zoom 
     * @memberof User
     */
    zoomExtent (mapId: string, coords: [], expand: number = 1): void {
        const myMap = (<any>window).RAMP.mapById(mapId);
        const ramp = (<any>window).RAMP;
        let x = [];
        let y = [];
        //set coordinates of the polygons
        coords.forEach(item => {
            x.push(item[0]);
            y.push(item[1]);
        })
        //set the coordinates for the windows
        let ext = ramp.GAPI.proj.projectEsriExtent({
            'xmin': Math.min(...x), 'ymin': Math.min(...y), 'xmax': Math.max(...x), 'ymax': Math.max(...y),
            'spatialReference': { 'wkid': 4326 } }, myMap.esriMap.spatialReference);
        //the zoom on the polygon
        myMap.setExtent(ext.expand(expand));
    }
    /*************** Accessors ***********************/
    // Username
    getUsername(): string {
        return this._username;
    }
    setUsername(value: string) {
        this._username = value;
    }
    // Password
    getPassword(): string {
        return this._password;
    }
    setPassword(value: string) {
        this._password = value;
    }
    //basetheme
    getbaseTheme(): string {
        return this._baseTheme;
    }
    setbaseTheme(value: string) {
        this._baseTheme = value;
    }
    // Connexion
    getConn(): Connexion {
        return this._conn;
    }
    setConn(value: Connexion) {
        this._conn = value;
    }
    // Token
    getToken(): string {
        return this._token;
    }
    setToken(value: string) {
        this._token = value;
    }
    // Tokentype 
    getTokenType(): string {
        return this._tokentype;
    }
    setTokenType(value: string) {
        this._tokentype = value;
    }
    // Expired
    getExpired(): number {
        return this._expired;
    }
    setExpired(value: number) {
        this._expired = value;
    }
    // RightRead
    getRight(): ApiReturn[] {
        return this._right
    }
    setRight(value: string, rank:number) {
        this._right[rank].setnom(value);
    }
    // List de theme
    getThemeAcc(): ApiReturn[] {
        return this._themeAcc;
    }
    getAllThemeNAme(): string {
        let output:string;
        output = this.getThemeAcc()[0].getnom();
        for (let i in this.getThemeAcc()) {
            if ( i !== '0') {
                output += `<div>${this.getThemeAcc()[i].getnom()}</div>`
            }  
        }
        return output;
    }
    setThemeAcc(value: string) {
        this._themeAcc[0].setnom(value);
    }
    // Liste d' environnement
    getEnvAcc(): Environnement[] {
        return this._envAcc;
    }
    setEnvAcc(value: Environnement[]) {
        this._envAcc = value;
    }
    // Environnemental selection
    getEnvironnementSel(): string {
        return this._environnementSel;
    }
    setEnvironnementSel(value: string) {
        this._environnementSel = value;
    }
    // Environnement URL Selected
    getUrlEnvselected(): string {
        return this._urlEnvselected;
    }
    setUrlEnvselected(value: string) {
        this._urlEnvselected = value;
    }
    // If the form is closeable
    getCloseable(): boolean {
        return this._closeable;
    }
    setCloseable(value: boolean) {
        this._closeable = value;
    }
    // Geometry for planning and extract
    getGeom(): string {
        return this._geom;
    }
    setGeom(value: string) {
        this._geom = value;
    }
    // If Advanced is visble
    getAdvanced(): boolean {
        return this._advanced;
    }
    setAdvanced(value: boolean) {
        this._advanced = value;
    }
    //equipe
    getEquipe(): ApiReturn {
        return this._equipe;
    }
    setEquipe(value: ApiReturn) {
        this._equipe = value;
    }
}