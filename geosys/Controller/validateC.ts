import { User } from "../user";
import { Valider } from '../operation/valider';



export class ValidateController {

    constructor(){};
      /**
     * The controller for all the function in the delivery templates
     * @param {User} log All the information of the user
     * @param {*} mapApi The api of of the viewer to set the controller
     * @memberof manageController
     */
    valiControl(log: User, mapApi: any): void {
        //mapApi.agDirectiveRegister()
        mapApi.agControllerRegister('submitFromV', function() {
            this.errJSON = false;
            /************** interactive List ***************/
            /*this.selectedItemE = '';
            this.selectedItemF = '';
            this.itemsE = [];
            for (let i in log.getThemeAcc()) {
                this.itemsE.push( {name : log.getThemeAcc()[i].getnom() , value: log.getThemeAcc()[i].getId()} );
            }
            this.itemsF = [];
            this.setList = () => {
                this.selectedItemF = '';
                // populate list b with new items
                this.itemsF.length = 0;
                let list: any = log.setidUTtheme(this.selectedItemE)
                for (let i in list){
                    this.itemsF.push(list[i])
                }
                //log.setbaseTheme(this.selectedItemE);
            }*/
            //Envoie le fromulaire a l'API
            this.submitFormV = () => { 
                if ((<HTMLInputElement>document.getElementById('fileJSON')).files.length === 0) {
                    this.errJSON = true;
                    log.setCloseable(false);
                } else {
                    //get all the information of the form into the class
                    let formdata = new FormData();
                    log.setCloseable(true);
                    formdata.append('fichier_json', (<HTMLInputElement>document.getElementById('fileJSON')).files[0]);
                    let vali: Valider = new Valider();
                    let api: any = vali.submitForm(formdata,log);
                    
                    if (api !== undefined) {
                        alert(api);
                        log.setCloseable(false);
                    }
                }
            };
        })
    }
}