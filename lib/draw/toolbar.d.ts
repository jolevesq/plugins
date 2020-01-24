/**
 * Creates and manages draw toolbar.
 */
export declare class DrawToolbar {
    private _mapApi;
    private _config;
    private _toolbar;
    private _bundle;
    private _geometryService;
    private _activeTool;
    private _activeColor;
    private _activeGraphic;
    private _identifyMode;
    private _mapPoint;
    private _geomLength;
    private _extentPoints;
    private _graphicKey;
    private _symbols;
    private _areaParams;
    private _lengthParams;
    private _distanceParams;
    constructor(mapApi: any, config: any);
    initToolbar(myBundle: any, config: any): void;
    activeTool: string;
    activeColor: number[];
    geometryLength: number;
    mapPoints: any[];
    graphicKey: string;
    readonly graphicsLayer: any;
    importGraphics(graphics: any): void;
    exportGraphics(): string;
    disableDetails(value: boolean): void;
    simulateClick(pt: any, mouse: any): void;
    setExtentPoints(value: number[], final: any): void;
    addToMap(evt: any, symbols: any): void;
    addGraphic(geometry: any, symbol: any): void;
    deleteGraphics(geometry: any): void;
    outputDistance(evt: any): void;
    outputAreaAndLength(evt: any, graphic: any): void;
    outputLength(evt: any, graphic: any): void;
    labelPoint(evt: any, graphic: any): void;
    createBackground(): void;
    densifyGeom(geom: any): void;
}
