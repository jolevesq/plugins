import { Geolocator } from './index';

export class NRCan {   
    private geolocator: any

    /**
     * 
     * @param geolocator 
     * @constructor Activates the setAuto function and gets access to the Geolocator class object
     */
    constructor(geolocator: any) {
            this.geolocator = geolocator;
            this.setAuto();
    
        }

        /**
         * Contains the angular controller and all the functions associated with it
         * @function
         */
        setAuto() {
            const that = this.geolocator;
            const myMap = (<any>window).RAMP.mapById('geolocator');
            myMap.layersObj.addLayer('pointLayer');
    
            this.geolocator.api.agControllerRegister('autoCtrl', function ($scope: any) {
            this.list = [];
    
            /**
             * Queries using the NRCan api to receive suggested results and then calls the setList function 
             * and passes the json containing the results as a param
             * @function autoComplete
             */
            this.autoComplete = () => {
                let place: string = this.address;
               
               
                new Promise( resolve => {
                    $.ajax({
                        method: 'GET',
                        url: that._RV.getConfig('plugins').geolocator.api.url[0].value,
                        cache: false,
                        dataType: 'json',
                        data: `q=${place}`,
                        success: (json) => {resolve(this.setList(json, this.address)); }
                    });
                })
            }
            
            /**
             * Recieves the json from the api and creates a list to be displayed in the panel
             * @function 
             * @param {any} locat Contains the json of results from the api
             * @param {string} address Contains the original query from the user
             */
            this.setList = (locat: any, address: any) => {
                const myList = [];
                for(let i in locat) {
                    myList.push({ name: locat[i].title, location: locat[i].geometry.coordinates });
                }
                
                this.list = (myList.length > 0 || address.length === 0) ? myList : this.list;
                $scope.$apply(); // Makes sure the list is properly refreshed
            }
            
            /**
             * Called when an autoselect option is chosen and then initiates the zoom to location using pointZoom() function
             * @function
             * @param {any} place The name of the item that was selected by the user
             */
            this.getLoc = (place: any) => {
               
                let coordsLoc: Array<any> = place.item.location;
            
                const myMap = (<any>window).RAMP.mapById('geolocator');
                const ramp = (<any>window).RAMP;
                const pointLayer = myMap.layers.getLayersById('pointLayer')[0]; 
                pointLayer.removeGeometry();
                const iconShape = that._RV.getConfig('plugins').geolocator.iconShape;
    
                // 'Geolocator' is the identifier for the map found in geo-index.html 27
                Geolocator.pointZoom('geolocator', coordsLoc, myMap, ramp, pointLayer, iconShape);
    
                //Zooms to the coordinates on the map and adds an icon
             }

        });

    }// End of set Auto

}// End of NRCan class

