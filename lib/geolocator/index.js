"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("./templates");
var templates_2 = require("./templates");
var rxjs_1 = require("rxjs");
var Geolocator = /** @class */ (function () {
    function Geolocator() {
        this._applicationID = ''; // HERE api verification is not credentials must be provided separately
        this._applicationCODE = '';
        this._cssPanel = { top: '60px',
            left: '0px',
            bottom: '400px',
            width: '800px' };
    }
    Geolocator.prototype.getDescription = function () {
        return this._complete.asObservable();
    };
    Geolocator.prototype.setDescription = function (newInfo) {
        this._complete.next(newInfo);
    };
    Geolocator.prototype.init = function (api, config) {
        var _this = this;
        this.api = api;
        this._complete = new rxjs_1.BehaviorSubject('     ');
        this.button = this.api.mapI.addPluginButton(Geolocator.prototype.translations[this._RV.getCurrentLang()].title, this.onMenuItemClick());
        RAMP.mapAdded.subscribe(function () {
            _this.make_panel();
        });
    };
    // Creates original instance of the panel when plugin is loaded
    Geolocator.prototype.make_panel = function () {
        this.setAngular();
        this.setAuto();
        this.panel = this.api.panels.create('geolocatorPanel');
        ;
        // Size and location of original panel
        this.panel.element.css(this._cssPanel);
        // Adds a close panel button and collapse panel button
        var closeBtn = this.panel.header.closeButton;
        var toggleBtn = this.panel.header.toggleButton;
        // Adds title for panel which will change languages if that option is changed in the menu
        this.panel.header.title = Geolocator.prototype.translations[this._RV.getCurrentLang()].title;
        // Adds the input and select boxes to the panel 
        this.panel.body = templates_1.INPUT_BOX + templates_2.AUTO_LIST;
        this.panel.open();
        this.button.isActive = !this.button.isActive;
    }; // End of make_panel()  
    // 
    // Slight bug, when the header X (close) button is hit it doesn't make this.button.isActive set to false 
    // 
    Geolocator.prototype.onMenuItemClick = function () {
        var _this = this;
        return function () {
            _this.button.isActive = !_this.button.isActive;
            if (_this.button.isActive) {
                _this.panel.open();
                _this._RV.toggleSideNav('close');
            }
            else {
                _this.panel.close();
            }
        };
    };
    // Creates a blank list upon the creation of a new panel and creates an autocomplete list when an address is entered into the input box
    Geolocator.prototype.setAuto = function () {
        var that = this;
        var myMap = window.RAMP.mapById('geolocator');
        myMap.layersObj.addLayer('pointLayer');
        // Start of controller
        this.api.agControllerRegister('autoCtrl', function () {
            // Called everytime the input text is changed an there are new query results
            var _this = this;
            that.getDescription().subscribe(function (value) {
                _this.list = [
                    { name: "", location: [] },
                    { name: "", location: [] },
                    { name: "", location: [] },
                    { name: "", location: [] },
                    { name: "", location: [] }
                ];
                for (var i in _this.list) {
                    _this.list[i].name = value[i].title;
                    _this.list[i].location = value[i].coords;
                }
            });
            // Called when an autoselect option is chosen and then initiates the zoom to location using zoom() function
            this.getLoc = function (place) {
                console.log(place.item);
                var coordsLoc = place.item.location;
                var myMap = window.RAMP.mapById('geolocator');
                var ramp = window.RAMP;
                var pointLayer = myMap.layers.getLayersById('pointLayer')[0];
                pointLayer.removeGeometry();
                var iconShape = that._RV.getConfig('plugins').iconShape;
                // Geolocator is the identifier for the map found in geo-index.html 27
                pointZoom('geolocator', coordsLoc, myMap, ramp, pointLayer, iconShape);
                //Zooms to the coordinates on the map and adds an icon
            };
        }); // End of getLoc
    }; // End of set Auto
    // Used to query when the results of the input field are changed and initiates update of autocomplete box
    Geolocator.prototype.setAngular = function () {
        var that = this;
        this.api.agControllerRegister('findCtrl', function () {
            var _this = this;
            this.autoComplete = function () {
                var place = _this.address;
                console.log(place);
                new Promise(function (resolve) {
                    $.ajax({
                        method: 'GET',
                        url: that._RV.getConfig('plugins').geolocator.locate,
                        cache: false,
                        dataType: 'json',
                        data: "q=" + place,
                        success: function (json) {
                            console.log("json", json);
                            resolve(json);
                        }
                    });
                }).then(function (json) {
                    var locat = that._RV.getConfig('plugins').locationInfo;
                    // Gets first 5 results from the json and sends the title and coordinates to the setAuto() function
                    for (var i in locat) {
                        locat[i].title = json[i].title;
                        locat[i].coords[0] = json[i].geometry.coordinates[0];
                        locat[i].coords[1] = json[i].geometry.coordinates[1];
                    }
                    that.setDescription(locat);
                });
            };
        });
        this.api.agControllerRegister('hereCtrl', function () {
            // Separate function meant for use with the Here api but will reference the same function to make the list and zoom to the selected location
            var _this = this;
            this.hereAuto = function () {
                var place = _this.address;
                console.log(place);
                // Parameters for api call using Here api
                var params = "?query= " + place + " &country=CAN \n                    &maxresults=5\n                    &app_id= " + that._applicationID + "\n                    &app_code= " + that._applicationCODE;
                // The search text (place) which is the basis of the query
                new Promise(function (resolve) {
                    $.ajax({
                        method: 'GET',
                        url: "" + that._RV.getConfig('plugins').geolocator.suggest + params,
                        cache: false,
                        dataType: 'json',
                        success: function (json) {
                            console.log("json", json);
                            resolve(json);
                        }
                    });
                }).then(function (json) {
                    console.log(json);
                    var locat = that._RV.getConfig('plugins').locationInfo;
                    // Gets first 5 results from the json and sends the title and coordinates to the setAuto() function
                    for (var i in locat) {
                        locat[i].title = json.suggestions[i].label;
                        locat[i].locationID = json.suggestions[i].locationId;
                    }
                    that.setDescription(locat);
                });
            }; // End of hereAuto
        });
    }; // End of setAngular
    return Geolocator;
}()); // End of Class Geolocator
exports.Geolocator = Geolocator;
// Receives a set of xy coordinates and uses them to move the map to that location and zoom in
// Places a point on the map at the coordinate location
function pointZoom(mapId, addressCoords, myMap, ramp, pointLayer, iconShape) {
    var pt = new ramp.GEO.XY(addressCoords[0], addressCoords[1]);
    myMap.zoom = 13;
    myMap.setCenter(pt);
    var marker = new ramp.GEO.Point('locGeo', [addressCoords[0], addressCoords[1]], {
        style: 'ICON',
        icon: iconShape,
        colour: [45, 45, 200, 100],
        width: 25
    });
    pointLayer.addGeometry(marker);
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
window.geolocator = Geolocator;
