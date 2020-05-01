export declare class Geolocator {
    private _cssPanel;
    _finalCoords: Array<any>;
    /**
    * Plugin init
    * @function init
    * @param {Any} api the viewer api
    */
    init(api: any): void;
    /**
    * Creates original instance of the panel when plugin is loaded
    * @function makePanel
    * @class Decides which class to activate based on the config file chosen
    */
    makePanel(): void;
    /**
   * Event to fire on side menu item click. Open/Close the panel
   * @function onMenuItemClick
   * @return {function} The function to run, open/close
   */
    onMenuItemClick(): () => void;
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
    static pointZoom(mapId: string, addressCoords: Array<Number>, myMap: any, ramp: any, pointLayer: any, iconShape: string): void;
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
