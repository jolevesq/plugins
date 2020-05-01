import { Geolocator } from './index';
export class Here {   
    private geolocator: any
    private _applicationID = ''; // HERE api verification credentials must be provided separately as they are account specific
    private _applicationCODE = '';

    /**
     * 
     * @param {any} geolocator 
     * @constructor Activates the setAuto function and gets access to the Geolocator class object
     */   
    constructor(geolocator: any) {
            this.geolocator = geolocator;
            this.setAuto();
    
        }

        /**
         * Contains the angular controller and all the functions associated with it
         * @function setList
         */
        setAuto() {
            const that = this.geolocator;
            const here = this;
            const myMap = (<any>window).RAMP.mapById('geolocator');
            myMap.layersObj.addLayer('pointLayer');
                
                this.geolocator.api.agControllerRegister('autoCtrl', function ($scope: any) {

                this.list = [];
    
                /**
                 * Queries using the HERE api to receive 5 suggested results and then calls the setList function 
                 * and passes the json as a param
                 * @function autoComplete
                 */
                this.autoComplete = () => {
                        const place: string = this.address;
                        // Parameters for api call using Here api
    
                        const params = `?query= ${place} &country=CAN 
                        &maxresults=5
                        &app_id= ${here._applicationID}
                        &app_code= ${here._applicationCODE}` ;
                        // The search text (place) which is the basis of the query
                    
                        new Promise(resolve => {
                        $.ajax({
                            method: 'GET',
                            url: `${that._RV.getConfig('plugins').geolocator.api.url[0].value}${params}`,
                            cache: false,
                            dataType: 'json',
                            success: (json) => {
                                resolve(this.setList(json, this.address)); 
                            },
                        });
                    })
                }
    
                /**
                 * Recieves the json from the api and creates a list to be displayed in the panel
                 * @function 
                 * @param {any} locat Contains the json of results from the api
                 * @param {string} address Contains the original query from the user
                 */
                this.setList = (locat: any, address: string) => { 
                    const myList = [];
                    for(let item of locat.suggestions) {
                        myList.push({ name: item.label, location: item.locationId });
                    }
                    this.list = (myList.length > 0 || address.length === 0) ? myList : this.list;
                    $scope.$apply(); // Makes sure the list is properly refreshed
                }
                
                 /**
                  * Receives the item selected by the user from the list and queries the api again
                  * to get the coordinates using its locationId
                  * Calls the poinZoom function to initiate the zoom to location and places a point 
                  * @function
                  * @param {any} place The name of the item that was selected
                  */
                this.getLoc = (place: any) => {
                       // Parameters for Here api call 
                        const params = `?locationid=  ${encodeURIComponent(place.item.location)}
                        &app_id=  ${here._applicationID}
                        &app_code= ${here._applicationCODE}`;
                                
                        new Promise(resolve => { 
                         $.ajax({
                             method: 'GET',
                            url: `${that._RV.getConfig('plugins').geolocator.api.url[1].value}${params}`, // Second api call to get the coordinates from the locationId
                             cache: false,
                             type: 'get',
                            dataType: 'json',
                             success: function(json){ resolve(json) },
                         });
                         }).then((json: any) => {           
                         //Getting coordinates from the returned json 
                         let _finalCoords = [];
                         _finalCoords[0] = json.Response.View[0].Result[0].Location.DisplayPosition.Longitude; //Final coords to be used to zoom to location
                         _finalCoords[1] = json.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
                               
                         let coordsLoc: Array<any> = _finalCoords;
                            
                         const myMap = (<any>window).RAMP.mapById('geolocator');
                         const ramp = (<any>window).RAMP;
                         const pointLayer = myMap.layers.getLayersById('pointLayer')[0]; // Creates the layer on the map the point will be added to 
                         pointLayer.removeGeometry(); // Removed the point added from a previous selection
                            const iconShape = that._RV.getConfig('plugins').geolocator.iconShape;
                    
                         // 'Geolocator' is the identifier for the map found in geo-index.html 27
                        Geolocator.pointZoom('geolocator', coordsLoc, myMap, ramp, pointLayer, iconShape);
                    
                        //Zooms to the coordinates on the map and adds an icon
                        });

                    }

                });//End of angular controller

        }// End of setList() function 

    }// End of class HERE
