import { User } from '../user';
import { FileManagerController } from '../../fileManager/controller/fileManagerC';
import { FileMana } from '../../fileManager/operation/fileMana';
import { urlFolderAction, urlFileAction, urlListFile, urlFileActionUpload } from '../config/url';


export class FileController {

    constructor(){}
    /**
     * Create the first panel for the with the root 
     * @param {User} log for the token and other useful tools
     * @param {*} mapApi The object of the API
     * @param {FileMana} tfm the object File Manager to keep where you are in a repository
     * @memberof FileManagerController
     */
    fileManagercontrols(log: User, mapApi: any): void {
        mapApi.agControllerRegister('FileManagerCtrl', function() {
            // Set le starting Folder et toujours placer Root pour le premier paramètre
            let tfm: FileMana = new FileMana('root', '/dev/travail/themes/HYDRO_50K');
            // Set les Urls
            tfm.setUrl('hello', /*'http://127.0.0.1:4010/'*/'http://api.geosys-dev.services.geo.ca:30524/v1/', urlListFile, urlFolderAction, urlFileAction, urlFileActionUpload);
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.OpenFileManager = () => {
                // Check if an environnment is selected
                if (log.getEnvironnementSel() !== '') {
                    if (!this.panel) {
                        // make sure both header and body have a digest cycle run on them
                        this.panel = mapApi.panels.create('FileManager');
                        //Size of the panel
                        this.panel.element.css( {top: '0px;', margin: '100px 50px 100px 450px'} );
                        //button in the header of the panel
                        this.panel.header.toggleButton;
                        this.panel.header.closeButton;
                        this.panel1 = mapApi.panels.create('AddFolder');
                        this.panel1.element.css({
                            bottom: '0em',
                            width: '300px',
                            height: '200px'
                        });
                        this.panel1.element.css({top: '0px;', margin: '200px 50px 100px 650px'});
                        this.panel1.header.closeButton;
                        this.panel1.header.title = `Add Folder`;
                    } else {
                        this.panel.close();
                        this.panel1.close();
                    }
                    // Create the interface for the file manager
                    let mainFile: FileManagerController = new FileManagerController()
                    mainFile.fileManagercontrols(log.getToken(), mapApi, tfm, this.panel, this.panel1);
                }
            };
        });
    };
}


export interface FileController {
    panel: any;
    panel1: any;
}