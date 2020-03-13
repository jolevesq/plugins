import { INPUT_BOX} from './templates';
import {AUTO_LIST} from './templates'
import { finished } from 'stream';
import { title } from 'process';
import { Observable, BehaviorSubject, config } from 'rxjs';

export class Geolocator {
    private urls = {
        locate:  'http://geogratis.gc.ca/services/geolocation/en/locate?',
        auto: 'http://geogratis.gc.ca/services/geolocation/en/autocomplete?',
        sim: 'http://geogratis.gc.ca/services/geolocation/en/suggest?',
        suggest: 'https://autocomplete.geocoder.api.here.com/6.2/suggest.json',
        geoCode: 'https://geocoder.api.here.com/6.2/geocode.json'
    };
    private APPLICATION_ID= 'E1MhPKUsPzkp3YgELzOA';
    private APPLICATION_CODE = '9fLr_V6KE80jJvYJXz8bW8aBgGoQLYlmico_GXcbRxY-A';
// observable to detect description modification
private _complete: any;
public getDescription(): Observable<object> {
    return this._complete.asObservable();
}
private setDescription(newInfo: object): void {
    this._complete.next(newInfo);
}

    init(api: any, config:any){
        this.api = api;
        this._complete = new BehaviorSubject<string>('     ');
       
        this.button = this.api.mapI.addPluginButton(
            "{{ 'plugins.geolocator.title' | translate }}",
            this.onMenuItemClick()
        );

    
            (<any>RAMP).mapAdded.subscribe(() => {
                this.make_panel(); 
            }); 
        
    }
    // Creates original instance of the panel when plugin is loaded
    make_panel() {
      
        this.setAngular();
        this.setAuto();


        this.panel = this.api.panels.create('geolocatorPanel');

        // Size and location of original panel
        this.panel.element.css({
            top: '60px',
            left: '0px',
            bottom: '400px',
            width: '800px',
          });
          // adds a close panel button and collapse panel button 
        let closeBtn = this.panel.header.closeButton;
        let toggleBtn = this.panel.header.toggleButton;

        // Adds title for panel which will change languages if that option is changed in the menu
        this.panel.header.title = `plugins.geolocator.title`;

        // Adds the input and select boxes to the panel 
        this.panel.body = INPUT_BOX + AUTO_LIST ; //+ AUTO_COMPLETE;

        this.open_Panel();

    } // End of make_panel()  

    // Next two functions open and close panels and add and remove/add the checkmark on the plugin button
    close_Panel() {
        this.panel.close();
        this.button.isActive = false;
    }
    open_Panel() {
        this.panel.open();
        this._RV.toggleSideNav('close');
        this.button.isActive = true;
    }
    // 
    // Slight bug, when the header X (close) button is hit it doesn't make this.button.isActive set to false 
    //    
    onMenuItemClick() {
        return () => {
            if (!this.button.isActive) {
                this.open_Panel()

            } else {
                this.close_Panel();
             
            }
        };
    } // End of onMenuItemClick function

    
    // Creates a blank list upon the creation of a new panel and creates an autocomplete list when an address is entered into the input box
    setAuto() {
        const that = this
        const myMap = (<any>window).RAMP.mapById('geolocator');
        myMap.layersObj.addLayer('pointlayer');
       //Blank autocomplete list
        this.api.agControllerRegister('autoCtrl', function () {
         
            // Called everytime the input text is changed an there are new query results
            that.getDescription().subscribe(value =>{             
                console.log(value[0]);
               this.list = [
                { name: value[0].title, coords: value[0].coords },
                { name: value[1].title, coords: value[1].coords },
                { name: value[2].title, coords: value[2].coords },
                { name: value[3].title, coords: value[3].coords },
                { name: value[4].title, coords: value[4].coords }
                ];
            
            });
            // Called when an autoselect option is chosen and then initiates the zoom to location using zoom() function
                this.getLoc = (place: any) => {
               
                    let coordsLoc: Array<any> = place.item.coords;
        

                    const myMap = (<any>window).RAMP.mapById('geolocator');
                    const ramp = (<any>window).RAMP;
                    const pointLayer = myMap.layers.getLayersById('pointlayer')[0]; 
                    pointLayer.removeGeometry();
                    const iconShape = that._RV.getConfig('plugins').iconShape;
                // geolocator is the identifier for the map found in geo-index.html 27
                    pointZoom('geolocator', coordsLoc, myMap, ramp, pointLayer, iconShape);
                    
                }
        });

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
                        url: that.urls.locate,
                        cache: false,
                        dataType: 'json',
                        data: `q=${place}`
                    }).then(json => {
                      let found = json;
                      console.log(found);
                      let locat: object = that._RV.getConfig('plugins').locationInfo
                        // gets first 5 results from the json and sends the title and coordinates to the setAuto() function
                      for(let i=0; i<5; ++i){
                         
                            locat[i].title = json[i].title;
                            locat[i].coords[0] = json[i].geometry.coordinates[0];
                            locat[i].coords[1] = json[i].geometry.coordinates[1];
                        }
                        console.log(locat[0].coords)
                        that.setDescription(locat)
                    });


                }

                // Separate function meant for use with the Here api but will reference the same function to make the list and zoom to the selected location
                this.hereAuto = () => {
                    let place: string = this.address;
                    console.log(place);
             
                    var params = '?query=' + encodeURIComponent(place) + "&country=CAN" +// The search text which is the basis of the query
                    '&app_id=' + that.APPLICATION_ID +
                    '&app_code=' + that.APPLICATION_CODE;
                    $.ajax({
                        method: 'GET',
                        url: that.urls.geoCode + params,
                        cache: false,
                        dataType: 'json',
                        //data: `q=${place}`
                    }).then(json => {
                      let found = json;
                      console.log(found);
                   
                     
                    });


                }


        });

    } // End of setAngular


    

} // End of Class Geolocator
  

// Receives a set of xy coordinates and uses them to move the map to that location and zoom in
// Places a point on the map at the coordinate location
function pointZoom(mapId: string, addressCoords: Array<Number>, myMap: any, ramp: any, pointLayer:any, iconShape: string){
    const pt = new ramp.GEO.XY(addressCoords[0], addressCoords[1]);
                
    myMap.zoom = 13;
    myMap.setCenter(pt);

    let marker: any = new ramp.GEO.Point("locGeo", [addressCoords[0], addressCoords[1]], {
        style: 'ICON',
        icon: iconShape,
        colour: [45, 45, 200, 100], width:25});
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
