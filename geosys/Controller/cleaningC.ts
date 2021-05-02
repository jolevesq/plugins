import { User } from "../user";
import { Cleaning } from "../operation/nettoyer";


export class CleaningController {

    constructor(){};
    /**
     * the controller for the cleaning function
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    nettoyagecontrols(log: User, mapApi: any): void {
        mapApi.agControllerRegister('SubmitNetCtrl', function($scope) {  
            /************** interactive List ***************/
            //theme
            this.selectedItemA = '';
            //working unit ID
            this.selectedItemB = '';
            //set up the theme list
            this.itemsA = [];
            for (let i in log.getThemeAcc()) {
                this.itemsA.push({name : log.getThemeAcc()[i].getnom() , value: log.getThemeAcc()[i].getId()});
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = () => {
                this.selectedItemB = '';
                // populate list of working unit id
                this.itemsB.length = 0;
                let list: any = log.setidUTtheme(this.selectedItemA);
                for (let i in list) {
                    this.itemsB.push(list[i]);
                }
            }
            /**************** From Submission ***************/
            this.submitNett = () => { 
                //Double confirmation
                let deleted = confirm('Confirmez le nettoyage ? / Confirm the cleaning ? ');
                if (deleted) {
                    log.setCloseable(true);
                    let nettoyage: Cleaning = new Cleaning(this.selectedItemA ,this.selectedItemB);
                    let renet= nettoyage.submitForm(log);
                    
                    if (renet == 'error') {
                        log.setCloseable(false);
                        alert(renet.statusText);
                    }
                }   
            };
        });
    }
}