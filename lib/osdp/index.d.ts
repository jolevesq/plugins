export default class OSDP {
    static instances: {
        [id: string]: OSDP;
    };
    init(api: any): void;
    setVisibility(mapId: string, layerId: string, index?: number): void;
    getVisibilityControl(entries: any, layerId: string, ctrlVis: any[]): any[];
    setZoomEndEvent(mapi: any): void;
    preventZoom(mapi: any): void;
    addLayerByUUID(uuid: string): void;
    addLayerByConfig(mapId: string, config: any): void;
    removeLayers(mapId: string): void;
    layersEvents(myFunction: any): void;
    testService(layer: any): void;
    setDefinitonQuery(mapId: string, layerId: string, query: string): void;
    resetDefinitionQuery(mapId: string, layerId: string): void;
    initUpdateExtentBox(): void;
    getExtentBox(): any;
    inputParse(values: string, parseType: string): any;
    addPointsGeometry(mapId: string, values: string): void;
    addPolygonsGeometry(mapId: string, values: string): void;
    removeGeometries(mapId: string): void;
    zoomPt(mapId: string, value: string): void;
    zoomExtent(mapId: string, coords: [], expand?: number): void;
    zoomCanadaExtent(mapId: string): void;
    zoomWkt(mapId: string, values: string, type: string): void;
    saveState(mapid: string): void;
    loadState(mapid: string): void;
}
export default interface OSDP {
    api: any;
    translations: any;
    _RV: any;
    handler: any;
    panel: any;
    button: any;
    extentbox: any;
}
