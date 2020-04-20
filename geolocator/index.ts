import { INPUT_BOX } from './templates';
import { AUTO_LIST } from './templates'
import { Observable, BehaviorSubject } from 'rxjs';
import { resolve } from 'dns';
import { rejects } from 'assert';

export class Geolocator {
private _applicationID= 'miMeQ93j7vrCxpB1o1ZN'; // Remove before commiting to github as it is sensitive information
private _applicationCODE = 'cuZCYLz7ynPh60E_2UY3-A'; 
private _cssPanel =  {top: '60px',
                    left: '0px',
                    bottom: '400px',
                    width: '800px'};
// Observable to detect description modification
private _complete: any;
private _finalCoords: Array<any>;
public getDescription(): Observable<object> {
    return this._complete.asObservable();
}
private setDescription(newInfo: object): void {
    this._complete.next(newInfo);
}

    init(api: any, config: any) {
        this.api = api;
        this._complete = new BehaviorSubject<string>('     ');
        this.button = this.api.mapI.addPluginButton(
            Geolocator.prototype.translations[this._RV.getCurrentLang()].title, this.onMenuItemClick());
        (<any>RAMP).mapAdded.subscribe(() => { // Must wait for the map to be defined so the panel will load properly
            this.make_panel(); 
        }); 
    }
    // Creates original instance of the panel when plugin is loaded
    make_panel() {
        this.setAngular();
        this.setAuto();

        this.panel = this.api.panels.create('geolocatorPanel');;

        // Size and location of original panel
        this.panel.element.css(this._cssPanel);

        // Adds a close panel button and collapse panel button
        let closeBtn = this.panel.header.closeButton;
        let toggleBtn = this.panel.header.toggleButton;

        // Adds title for panel which will change languages if that option is changed in the menu
        this.panel.header.title =  Geolocator.prototype.translations[this._RV.getCurrentLang()].title;

        // Adds the input and select boxes to the panel 
        this.panel.body = INPUT_BOX + AUTO_LIST ; 

        this.panel.open();
        this.button.isActive=!this.button.isActive;
    } // End of make_panel()  

    // 
    // Slight bug, when the header X (close) button is hit it doesn't make this.button.isActive set to false 
    // 

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

    // Creates a blank list upon the creation of a new panel and creates an autocomplete list when an address is entered into the input box
    setAuto() {
        const that = this;
        const myMap = (<any>window).RAMP.mapById('geolocator');
        myMap.layersObj.addLayer('pointLayer');
        // Start of controller

        this.api.agControllerRegister('autoCtrl', function () {
        // Called everytime the input text is changed an there are new query results
        
            that.getDescription().subscribe((value: object) =>{             
               this.list = [
                { name: "", location: "" },
                { name: "", location: "" }, 
                { name: "", location: "" },
                { name: "", location: "" },
                { name: "", location: "" }
                ];
                for(let i in this.list) {
                    this.list[i].name = value[i].title;
                    this.list[i].location = value[i].locationID;
                }
              this._finalCoords = [0,0];
            });

            // Called when an autoselect option is chosen and then initiates the zoom to location using zoom() function
            this.getLoc = (place: any) => {
                console.log(place.item.location);

            // Parameters for Here api call 
            const params = `?locationid=  ${encodeURIComponent(place.item.location)}
            &app_id=  ${that._applicationID}
            &app_code= ${that._applicationCODE}`;
            
            new Promise(resolve => {
            $.ajax({
                method: 'GET',
                url: `${that._RV.getConfig('plugins').geolocator.GEOCODER_URL}${params}`, // Second api call to get the coordinates
                cache: false,
                type: 'get',
                dataType: 'json',
                success: function(json){
                console.log("json", json);
                resolve(json)
               },
            });
            }).then((json: any) => {
            console.log(json);
            
            //Getting coordinates from the returned json 
            this._finalCoords[0] = json.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
            this._finalCoords[1] = json.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
           
            let coordsLoc: Array<any> = this._finalCoords;
        
            const myMap = (<any>window).RAMP.mapById('geolocator');
            const ramp = (<any>window).RAMP;
            const pointLayer = myMap.layers.getLayersById('pointLayer')[0]; 
            pointLayer.removeGeometry();
            const iconShape = that._RV.getConfig('plugins').iconShape;

            // Geolocator is the identifier for the map found in geo-index.html 27
            pointZoom('geolocator', coordsLoc, myMap, ramp, pointLayer, iconShape);

            //Zooms to the coordinates on the map and adds an icon
            }); // Put all of then inside a function

            
         }
    });// End of getLoc

}// End of set Auto


      // Used to query when the results of the input field are changed and initiates update of autocomplete box
      setAngular() {
        const that = this;
            this.api.agControllerRegister('findCtrl', function () {   
                this.autoComplete = () => {
                    let place: string = this.address;
                    console.log(place);
                    $.ajax({
                        method: 'GET',
                        url: that._RV.getConfig('plugins').geolocator.locate,
                        cache: false,
                        dataType: 'json',
                        data: `q=${place}`
                    }).then(json => {
                      let found = json;
                      console.log(found);
                      let locat: object = that._RV.getConfig('plugins').locationInfo
                      // Gets first 5 results from the json and sends the title and coordinates to the setAuto() function
                      
                      for (let i in locat) {
                            locat[i].title = json[i].title;
                            locat[i].coords[0] = json[i].geometry.coordinates[0];
                            locat[i].coords[1] = json[i].geometry.coordinates[1];
                        }
                        console.log(locat[0].coords);
                        that.setDescription(locat);
                    });
                }
         });
            this.api.agControllerRegister('hereCtrl', function () {
                // Separate function meant for use with the Here api but will reference the same function to make the list and zoom to the selected location
               
                this.hereAuto = () => {
                    const place: string = this.address;
                    console.log(place);
                    // Parameters for api call using Here api

                    const params = `?query= ${place} &country=CAN 
                    &maxresults=5
                    &app_id= ${that._applicationID}
                    &app_code= ${that._applicationCODE}` ;
                    // The search text (place) which is the basis of the query
                  
                    new Promise(resolve => {
                    $.ajax({
                        method: 'GET',
                        url: `${that._RV.getConfig('plugins').geolocator.suggest}${params}`,
                        cache: false,
                        dataType: 'json',
                        success: function(json){
                        console.log("json", json);
                            resolve(json);
                      }
                    });
                    }).then((json: any) => {
                      
                      console.log(json);
                      let locat: object = that._RV.getConfig('plugins').locationInfo

                      // Gets first 5 results from the json and sends the title and coordinates to the setAuto() function
                      
                      for (let i in locat) {
                            locat[i].title = json.suggestions[i].label;
                            locat[i].locationID = json.suggestions[i].locationId;
                      }
                      that.setDescription(locat);
                    });
            }// End of hereAuto
        });
    } // End of setAngular
} // End of Class Geolocator

// Receives a set of xy coordinates and uses them to move the map to that location and zoom in
// Places a point on the map at the coordinate location
function pointZoom(mapId : string, addressCoords : Array<Number>, myMap : any, ramp : any, pointLayer : any, iconShape : string){
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
