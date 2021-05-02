import { User } from "../user";
import { ExtraireMD } from "../operation/extraireMD"
//import { Cancel } from "../operation/cancel";


export class ExtraireMDController {

    constructor(){};

     /**
     * The controoller for to cancel function
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    extraireMDcontrols(log: User, mapApi: any): void {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('ExtraireMD', function($scope) { 
            /************** interactive List ***************/
            //identifiant de MD
            this.mdid = '';
            //Asynchrone
            this.selectedItem = '';
           
            /**************** From Submission ***************/
             this.submiteMD = () => {
                //get all the information of the form into the class
                let ext = new ExtraireMD(
                     this.selectedItemA
                    ,this.selectedItemB);
                let ApiReturn:any = ext.submitForm(log);
                log.resetBaseTheme();
                if (ApiReturn == 'error'){
                    alert(ApiReturn.statusText)
                }
            }
                //alert(this._ApiReturn.value);
            
        });
    }
}