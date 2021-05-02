export class Connexion {

    constructor(){}

   /**
    * The connexion to the Api for the login
    * @param {string} urlgoto The url for the login
    * @param {*} header The header with the username and the password
    * @returns {*} Return the infromation of the user
    * @memberof connexion
    */
   connexionAPILogin(urlgoto: string, username: string, password: string): any {
        let outputValue: any;
        /********* API CALL Login **********/
        const promises = [];
        promises.push(
            new Promise(resolve => {
                $.ajax( {
                    url: urlgoto,
                    headers: {
                        'usager': username,
                        'mot_de_passe': password,
                        'duree_token': '8000'
                    },
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    success: //data => resolve()
                    function(response) {
                        outputValue = response;
                        //console.log(outputValue);
                    },
                    error: (xhr) => {
                        alert(xhr.statusText);
                        outputValue = xhr;
                    }
                })
            })
        );
        Promise.all(promises).then(values => {
            console.log(values);
        });        
        return outputValue;
    };
    /**
     * connection to the Api with ajax and promises
     * @param {string} token the token for the connection
     * @param {*} jsonstring the body in json
     * @param {string} urlgoto the url to jion the API
     * @param {string} typeConn the type of connection Get, Post, put ...
     * @returns {*} return all the information we get from the Api
     * @memberof connexion
     */
    connexionAPI(token: string, jsonString: any, urlgoto: string, typeConn: string, optEnv: string = ''): any {
        let outputValue: any;
        /********* API CALL **********/
        const promises = [];
        promises.push(
            new Promise(resolve =>{
                $.ajax( {
                    url: urlgoto,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'content-Type': 'application/json',
                        optEnv
                    },
                    type: typeConn,
                    async: false,
                    data: jsonString,
                    dataType: 'json',
                    processData: false,
                    success: //data => resolve()
                    function(response, jqXHR) {
                        if (response === undefined) {
                            outputValue = 'success';
                        } else {
                            if (response.message !== undefined) {
                                outputValue = jqXHR;
                            } else {
                                outputValue = response;
                            }
                        }
                    },
                    error: (response,xhr) => {
                        alert(response.responseJSON.message)
                        console.log(xhr)
                        outputValue = xhr;
                    }
                })
            })
        );
        Promise.all(promises).then(values => {
            values;
        });
        return outputValue;
    };
   /**
     * connection to the Api with ajax and promises for files
     * @param {string} token the token for the connection
     * @param {*} jsonstring the body in formdata (File)
     * @param {string} urlgoto the url to join the API
     * @param {string} typeConn the type of connection Get, Post, put ...
     * @returns {*} return all the information we get from the Api
    * @memberof connexion
    */
    connexionAPIFormData(token: string, formdata: any, urlgoto: string, typeConn: string, optEnv: string = ''): any {
        let outputValue: any;
        /********* API CALL **********/
        const promises = [];
        promises.push(
            new Promise(resolve => {
                $.ajax( {
                    url: urlgoto,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        optEnv
                    },
                    type: typeConn,
                    async: false,
                    data: formdata,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: //data => resolve()
                    function(response, jqXHR) {
                        if (response.message !== undefined) {
                            outputValue = jqXHR;
                        } else {
                            outputValue = response;
                        }
                    },
                    error: (response,xhr) => {
                        alert(response.responseJSON.message)
                        console.log(xhr)
                        console.log(response.responseJSON.message)
                        outputValue = xhr;
                    }
                })
            })
        );
        Promise.all(promises).then(values => {
            console.log(values);
        });
        return outputValue;
    };
}