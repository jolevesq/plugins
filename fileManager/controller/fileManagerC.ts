import { FileMana } from '../operation/fileMana';
import { dragdropFunction } from "../javascript/dragndrop";

export class FileManagerController {

    constructor(){}
    /**
     * Create the first panel for the with the root 
     * @param {User} log for the token and other useful tools
     * @param {*} mapApi The object of the API
     * @param {FileMana} tfm the object File Manager to keep where you are in a repository
     * @memberof FileManagerController
     */
    fileManagercontrols(token: string, mapApi: any, tfm: FileMana, panel: any, panel1: any): void {  
        //if the panel already exist
        this.panel = panel;
        this.panel1 = panel1;
        //title on the panel
        this.panel.header.title = `{{ 'plugins.geosys.filem' | translate }}`;
        let fmc: FileManagerController = new FileManagerController();
        // make sure both header and body have a digest cycle run on them
        fmc.addingFolder(token, tfm, mapApi, this.panel, this.panel1); 
        panel.body = tfm.buildHeaderFileManager() + `<br/><div class="loader"></div>` + '<div>';
        //build the UI for the file manager
        let output = tfm.buildUI() + dragdropFunction;
        tfm.obtainArbo(token).then(values => {
            tfm.setValue(values);
            fmc.FileManaManager(token,mapApi, tfm, this.panel, this.panel1);
            this.panel.body = output;
        });   
        this.panel.open(); 
    };
    /**
     * Create the panel body when a folder is clicked
     * @param {User} log User tools
     * @param {*} mapApi the map Object
     * @param {FileMana} tfm to keep track where you are
     * @param {*} panel the panel to add the body
     * @memberof FileManagerController
     */
    FileManaManager(token: string, mapApi: any, tfm: FileMana, panel: any, panel1: any): void {
        mapApi.agControllerRegister('fileManagerPanelCtrl', function() {
            //building the list of folder and file
            this.folders = [];
            this.files = [];
            this.breadcrumbs = tfm.getBreadcrumbs();
            this.folders = tfm.buildFolderList();
            this.files = tfm.buildFileList();
            //click on the left arrow to back one folder
            this.precedent = () => {
                let rank = tfm.getList().length - 2 
                if (rank >= 0) {
                    panel.body = tfm.buildHeaderFileManager() + `<br/><div class="loader"></div>` + '<div>';
                    tfm.setbreacrumbsForNav(rank.toString());
                    let fmc: FileManagerController = new FileManagerController();
                    let output = tfm.buildUI() + dragdropFunction;
                    tfm.obtainArbo(token).then(values => {
                        tfm.setValue(values);
                        fmc.FileManaManager(token,mapApi, tfm, panel, panel1);
                        panel.body = output;
                    });
                }
            }
            //refresh the folder
            this.refresh = () => {
                panel.body = tfm.buildHeaderFileManager() + `<br/><div class="loader"></div>` + '<div>';
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI() + dragdropFunction;
                tfm.obtainArbo(token).then(values => {
                    tfm.setValue(values);
                    fmc.FileManaManager(token,mapApi, tfm, panel , panel1);
                    panel.body = output;
                });
            }
            //edit the breacrumbs
            this.edit = () => {
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildEditableUI() + dragdropFunction;
                panel.body = output;
            }
            // send the editable breadcrubs
            this.send = () => {
                console.log($('#editbread').val());
                let valuebread:string = $('#editbread').val().toString();
                tfm.setBreadcrumbs(valuebread)
                panel.body = tfm.buildHeaderFileManager() + `<br/><div class="loader"></div>` + '<div>';
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI() + dragdropFunction;
                tfm.obtainArbo(token).then(values => {
                    tfm.setValue(values);
                    fmc.FileManaManager(token,mapApi, tfm, panel , panel1);
                    panel.body = output;
                });
            }
            //open the folder from the breadcrumbs
            this.followup = (folder)  => {
                panel.body = tfm.buildHeaderFileManager() + `<br/><div class="loader"></div>` + '<div>';
                tfm.setbreacrumbsForNav(folder);
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI() + dragdropFunction;
                tfm.obtainArbo(token).then(values => {
                    tfm.setValue(values);
                    fmc.FileManaManager(token,mapApi, tfm, panel, panel1);
                    panel.body = output;
                });
            }
            //open a folder when clicked
            this.openFolder = (folder) => {
                panel.body = tfm.buildHeaderFileManager() + `<br/><div class="loader"></div>` + '<div>';
                tfm.setNextFolder(folder.name);
                tfm.setBreadcrumbs(tfm.getBreadcrumbs() + '/' + tfm.getNextFolder());
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI() + dragdropFunction;
                tfm.obtainArbo(token).then(values => {
                    tfm.setValue(values);
                    fmc.FileManaManager(token,mapApi, tfm, panel, panel1);
                    panel.body = output;
                });
            }
            //download file on download button clicked
            this.downloadFile = (file) => {
                tfm.downloadFile(file.name, tfm.getBreadcrumbs(), token);
            }
            //delete file on delete button clicked
            this.deleteFile = (file) => {
                tfm.deleteFile(file.name, tfm.getBreadcrumbs(), token);
                panel.body = tfm.buildHeaderFileManager() + `<br/><div class="loader"></div>` + '<div>';
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI() + dragdropFunction;
                tfm.obtainArbo(token).then(values => {
                    tfm.setValue(values);
                    fmc.FileManaManager(token,mapApi, tfm, panel , panel1);
                    panel.body = output;
                });
            }
            //download file on download button clicked
            this.downloadFolder = (folder) => {
                tfm.downloadFolder(folder.name, tfm.getBreadcrumbs(), token);
            }
            //delete file on delete button clicked
            this.deleteFolder = (folder) => {
                tfm.deleteFolder(folder.name, tfm.getBreadcrumbs(), token);
                panel.body = tfm.buildHeaderFileManager() + `<br/><div class="loader"></div>` + '<div>';
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI() + dragdropFunction;
                tfm.obtainArbo(token).then(values => {
                    tfm.setValue(values);
                    fmc.FileManaManager(token,mapApi, tfm, panel , panel1);
                    panel.body = output;
                });
            }
            //create a new folder
            this.createFolder = () => {
                let output: string = `<div ng-controller="folderCtrl as ctrl16">
                <md-input-container style="margin-bottom: 0px;height: 34px; width:275px; ">
                    <label>Name the folder</label>
                    <input type="text" ng-model="ctrl16.nameFolder"/>
                </md-input-container>
                <md-input-container style="float:right;">
                    <md-button class="md-raised" ng-click="ctrl16.addfolder()">
                        add Folder
                    </md-button>
                </md-input-container>
                </div>`;
                panel1.body = output; 
                panel1.open();
            }
            //upload file on drag and drop of file
            this.uploadFile = () => {
                let file = (<HTMLInputElement>document.getElementById('fileInput')).files[0];
                tfm.uploadfile(tfm.getBreadcrumbs(),token,file);
                panel.body = tfm.buildHeaderFileManager() + `<br/><div class="loader"></div>` + '<div>';
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI() + dragdropFunction;
                tfm.obtainArbo(token).then(values => {
                    tfm.setValue(values);
                    fmc.FileManaManager(token,mapApi, tfm, panel , panel1);
                    panel.body = output;
                });
            }
        });
    }
    /**
     * The panel to name the new folder and add the new folder in thje directory
     * @param {string} token
     * @param {FileMana} tfm
     * @param {*} mapApi
     * @memberof FileManagerController
     */
    addingFolder(token: string, tfm: FileMana, mapApi: any, panel:any, panel1:any): void {
        mapApi.agControllerRegister('folderCtrl', function() {
            this.addfolder = () => {
                tfm.createFolder(tfm.getBreadcrumbs(), token,this.nameFolder);
                panel1.close();
                panel.body = tfm.buildHeaderFileManager() + `<br/><div class="loader"></div>` + '<div>';
                let fmc: FileManagerController = new FileManagerController();
                let output = tfm.buildUI() + dragdropFunction;
                tfm.obtainArbo(token).then(values => {
                    tfm.setValue(values);
                    fmc.FileManaManager(token,mapApi, tfm, panel , panel1);
                    panel.body = output;
                });
            }
        });
    }
}

export interface FileManagerController {
    panel: any;
    panel1:any; 
}