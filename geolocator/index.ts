import { INPUT_BOX } from './templates';
import { NRCan } from './nrcan';
import { Here } from './here';
export class Geolocator {
private _cssPanel =  {top: '60px',
                     left: '0px',
                     bottom: '400px',
                     width: '800px'};
public _finalCoords: Array<any>;

    /**
    * Plugin init
    * @function init
    * @param {Any} api the viewer api
    */
    init(api: any) {
        this.api = api;
        this.button = this.api.mapI.addPluginButton(
            Geolocator.prototype.translations[this._RV.getCurrentLang()].title, this.onMenuItemClick());
        (<any>RAMP).mapAdded.subscribe(() => { // Must wait for the map to be defined so the panel will load properly
            this.makePanel(); 
        }); 
    }

    /**
    * Creates original instance of the panel when plugin is loaded
    * @function makePanel
    * @class Decides which class to activate based on the config file chosen 
    */
    makePanel() {
        // Chose which api to use
        if(this._RV.getConfig('plugins').geolocator.api.type === "Here") {
            new Here(this);
        }
        else if(this._RV.getConfig('plugins').geolocator.api.type === "NRCan") {
            new NRCan(this);
        }

        this.panel = this.api.panels.create('geolocatorPanel');;

        // Size and location of original panel
        this.panel.element.css(this._cssPanel);

        // Adds a close panel button and collapse panel button
        let closeBtn = this.panel.header.closeButton;
        let toggleBtn = this.panel.header.toggleButton;

        // Adds title for panel which will change languages if that option is changed in the menu
        this.panel.header.title =  Geolocator.prototype.translations[this._RV.getCurrentLang()].title;

        // Adds the input and select boxes to the panel 
        this.panel.body = INPUT_BOX;

        this.panel.open();
        this.button.isActive=!this.button.isActive;
    } 

     /**
    * Event to fire on side menu item click. Open/Close the panel
    * @function onMenuItemClick
    * @return {function} The function to run, open/close
    */
    onMenuItemClick() {
        return () => {
            this.button.isActive=!this.button.isActive;
            if (this.button.isActive) {
                this.panel.open();
                this._RV.toggleSideNav('close');
            } else {
                this.panel.close();
            }
        };
    }

    /**
     * Receives a set of xy coordinates and uses them to move the map to that location and zoom in
     * Places a point on the map at the coordinate location
     * @param {string} mapId Map identifier found in geo-index.html
     * @param {Array<Number>} addressCoords Coords to zoom to & place the icon
     * @param {any} myMap Api variable
     * @param {any} ramp Api
     * @param {any} pointLayer Layer the icon is added to 
     * @param {string} iconShape Info about the shape being placed
     * @static 
     */
    static pointZoom(mapId : string, addressCoords : Array<Number>, myMap : any, ramp : any, pointLayer : any, iconShape : string){ 
        const pt = new ramp.GEO.XY(addressCoords[0], addressCoords[1]);          
        myMap.zoom = 13;
        myMap.setCenter(pt);
        let marker: any = new ramp.GEO.Point('locGeo', [addressCoords[0], addressCoords[1]], {
            style : 'ICON',
            icon : iconShape,
            colour : [45, 45, 200, 100], 
            width : 25
        });
        pointLayer.addGeometry(marker);
    }

} // End of Class Geolocator

export interface Geolocator {
    api: any;
    translations: any;
    _RV: any;
    panel: any;
    button: any;
    isActive: boolean;
    name: string;
    geometry: any;
    loc: string;
    config: any; 
}

Geolocator.prototype.translations = {
    'en-CA': {
        title: 'Geolocation',
        input: 'Your Address',
        auto: 'Click here to choose the correct address'
    },
    'fr-CA': {
        title: 'Géolocalisation',
        input: 'Votre Addresse',
        auto: 'Cliquez ici pour choisir la bonne adresse'
    }
};

(<any>window).geolocator = Geolocator;



