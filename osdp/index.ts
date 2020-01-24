import { indexOf } from 'benchmark';
import { runInThisContext } from 'vm';

// Add my commment...

export default class OSDP {
    // a store of the instances of OSDP, 1 per map
    static instances: { [id: string]: OSDP } = {};

    init(api: any): void {
        this.api = api;
        this.initUpdateExtentBox();

        // add the OSDP grapic layer
        const myInter = setInterval(() => {
            if (typeof (<any>window).RAMP.mapById(this.api.id) !== 'undefined') {
                (<any>window).RAMP.mapById(this.api.id).layersObj.addLayer('graphicsOSDP');

                // subscribe to add layer even to reorder the layers so graphicOSDP is always on top
                this.api.layersObj.layerAdded.subscribe(layer => {
                    const map = (<any>window).RAMP.mapById(this.api.id);
                    const pos = map.esriMap.graphicsLayerIds.length - 2;

                    // use a timeout because viewer always try to reoder graphic layers...
                    // if timeout is not an option, reoder layer when we add a new geometry
                    // pos is kind of optional, we can put 1000 and we know it will be always on top
                    setTimeout(() => {
                        map.esriMap.reorderLayer('graphicsOSDP', pos);
                    }, 5000);
                });

                // if config is empty-config, prevent zoom to append
                if (document.getElementById('mapOSDP').getAttribute('rv-config') === 'empty-config.json') {
                    this.preventZoom((<any>window).RAMP.mapById(this.api.id));
                }

                // need to call later because if called before map initilize, rest of function is skipped
                this.setZoomEndEvent((<any>window).RAMP.mapById(this.api.id));

                // dirty hack into viewer events not accessible from api plugin... should use with caution
                var unregisterListener = (<any>window).RAMP.mapInstances[0].$compile('<div>a</div>',false).$parent.$on('rvProjectiontChanged', (event) => console.log('Projection Changed: ' + event));

                // Try to solve the "Remove layer twice fast doesn't fired event twice"
                // *******************************
                this.api.layersObj.layerAdded.subscribe(() => {
                    // get all remove controls and add click event to trap when a layer is in the process of beeing removed
                    $('rv-legend-control [aria-label="Remove"], rv-legend-control [aria-label="Retirer"]').on('click', (event)  => {
                        // disable all remove button until the layer is removed. If we try to remove a layer when
                        // the toast message is present, the vent will fail even if the layer is removed.
                        $('rv-legend-control [aria-label="Remove"], rv-legend-control [aria-label="Retirer"]').attr('disabled', 'true');

                        // trap when the remove is undo
                        $('md-toast button').on('click', () => {
                            // remove the disable so layer can be remove again
                            $('rv-legend-control [aria-label="Remove"], rv-legend-control [aria-label="Retirer"]').removeAttr('disabled');
                        });
                    });
                });
                this.api.layersObj.layerRemoved.subscribe(() => {
                    // remove the disable so layer can be remove again
                    $('rv-legend-control [aria-label="Remove"], rv-legend-control [aria-label="Retirer"]').removeAttr('disabled');
                });

                // this.api.layersObj.layerAdded.subscribe(() => {
                //     $('rv-legend-control [aria-label="Remove"], rv-legend-control [aria-label="Retirer"]').on('click', (event)  => {
                //         (<any>window).RAMP.mapById(this.api.id).panels.legend.close();
                //     });
                // });
                // this.api.layersObj.layerRemoved.subscribe(() => {
                //     (<any>window).RAMP.mapById(this.api.id).panels.legend.open();
                // });
                // *******************************

                clearInterval(myInter);
            }
        }, 100);

        OSDP.instances[this.api.id] = this;

        // test url before trying to load
        this.testService({ 'url': 'https://geoportal.gc.ca/arcgis/rest/services/FGP/CSAS_CoralsSponges2010_EN/MapServer/18' });
        this.testService({ 'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_resource_potential_of_north_america_en/MapServer/0' });
    }

    setZoomEndEvent(mapi: any): void {
        mapi.esriMap.on('zoom-end', evt => {
            console.log(`zoom level:  ${evt.level}, new extent: ${JSON.stringify(evt.extent)}`);
        });

        // I think you have already the code the extent change but I added it in case
        mapi.extentChanged.subscribe(evt => {
            console.log(`new extent: ${JSON.stringify(evt)}`);
        });
    }

    preventZoom(mapi: any) {
        // disable mouse and touch navigation
        mapi.esriMap.disableMapNavigation();
        mapi.esriMap.disablePinchZoom();

        // set display none to +/- button to zoom in and out
        const elem: any = document.getElementsByClassName('rv-mapnav-content')[0];
        elem.style.display = 'none';
    }

    addLayerByUUID(uuid: string): void {
        // only works on legacy API for the moment
        // We can use add this.api.fgpMapObj.addConfigLayer(JSON) if we have the JSON object
        this._RV.loadRcsLayers([uuid]);
    }

    addLayerByConfig(mapId: string, config: any): void {
        const myMap = (<any>window).RAMP.mapById(mapId);
        // If you want to add a layer by configuration you can use this
        const layerJSON = {
            'id': 'examplelayer',
            'name': 'An exemplary Layer',
            'layerType': 'esriFeature',
            'controls': [
                'remove',
                'visibility'
            ],
            'state': {
                'visibility': true,
                'boundingBox': false
            },
            'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_resource_potential_of_north_america_en/MapServer/0'
        };
        const myConfigLayer = myMap.layers.addLayer(layerJSON);
    }

    removeLayers(mapId: string) {
        const myMap = (<any>window).RAMP.mapById(mapId);

        // remove all layers using the legend block
        // will also remove bad layers
        const legentItem = [...myMap.ui.configLegend.children];
        for (let item of legentItem) {
            myMap.layersObj.removeLayer(item._legendBlock._blockConfig._layerId);
        }

        // close legend
        myMap.panels.legend.close();
    }

    // function to fire on add layer and remove layer
    layersEvents(myFunction: any): void {
        const myInter = setInterval(() => {
            if (typeof this.api !== 'undefined') {
                this.api.layersObj.layerAdded.subscribe((layer: any) => myFunction(layer));
                this.api.layersObj.layerRemoved.subscribe((layer: any) => myFunction(layer));
                clearInterval(myInter);
            }
        }, 100);
    }

    testService(layer: any) {
        const request = new XMLHttpRequest();
        request.open('GET', `${layer.url}?f=json`, true);
        request.onreadystatechange = function(){
            if (request.readyState === 4){
                if (request.response.contains('"code":500')) {
                    console.log(`Error handling service request :Could not find a service with the name '${layer.url}'
                        in the configured clusters. Service may be stopped or ArcGIS Server may not be running.`);
                } else {
                    console.log(`Layer '${layer.url}' should load properly.`);
                }
            }
        };
        request.send();
    }

    setDefinitonQuery(mapId: string, layerId: string, query: string): void {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        const myMap = (<any>window).RAMP.mapById(mapId);
        const myLayer = myMap.layers.getLayersById(layerId)[0];
        myLayer.setFilterSql('OSDPFilter', query);
    }

    resetDefinitionQuery(mapId: string, layerId: string): void {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        const myMap = (<any>window).RAMP.mapById(mapId);
        const myLayer = myMap.layers.getLayersById(layerId)[0];
        myLayer.setFilterSql('OSDPFilter', '');
    }

    initUpdateExtentBox() {
        // set extent box change handler by extChangeHandler
        // also initialyse the value of extentbox variable holder
        const parent = this;
        parent.api.esriMap.on('extent-change', extChangeHandler);
        parent.extentbox = parent.api.boundsObj;

        function extChangeHandler() {
            parent.extentbox = parent.api.boundsObj;
        }
    }

    getExtentBox(): any {
        //returns the extentbox variable holder
        return this.extentbox;
    }

    inputParse(values:string, parseType: string): any{
        const arrayPoly = values.split(';');
        arrayPoly.forEach((element, index, arr) => {
            let elt = element;
            elt = elt.replace(parseType, '').replace(/\( */g, '[').replace(/ *\)/g, ']');
            elt = elt.trim();
            elt = elt.replace(/, */g, '],['); // specific for polygons
            elt = elt.replace(/ +/g,', ');
            arr[index] = elt;
        });
        return `[${arrayPoly}]`;
    }

    addPointsGeometry(mapId: string, values: string): void {
        const myMap = (<any>window).RAMP.mapById(mapId);
        const input = this.inputParse(values, 'POINT');
        const icon = 'M 50 0 100 100 50 200 0 100 Z';
        const ptcords = JSON.parse(input);

        const graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        for (let value of ptcords) {
            // create a point with unique id, we'll use an svg path for the icon
            let pt = new (<any>window).RAMP.GEO.Point(`location${Math.round(Math.random() * 100000)}`, [value[0], value[1]],
                { style: 'ICON', icon: icon, colour: [255, 0, 0, 0.75], width: 25 });

            // add the point to the graphic layer
            graphicsOSDP.addGeometry(pt);
        }

        // zoom to extent of point(s)
        if (ptcords.length === 1) {
            this.zoomPt(mapId, values);
        } else {
            this.zoomExtent(mapId, ptcords);
        }
    }

    addPolygonsGeometry(mapId: string, values: string): void {
        const myMap = (<any>window).RAMP.mapById(mapId);
        const input = this.inputParse(values, 'POLYGON');
        const poly1 = new (<any>window).RAMP.GEO.Polygon(0, JSON.parse(input));

        // create a multipolygon with unique id
        const polyAll = new (<any>window).RAMP.GEO.MultiPolygon(`location${Math.round(Math.random() * 100000)}`, [poly1],
            { outlineColor: [255, 0, 0], outlineWidth: 3 });

        // add the multipolygon to the graphic layer
        const graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        graphicsOSDP.addGeometry([polyAll]);

        // zoom to extent of polygon(s)
        this.zoomExtent(mapId, JSON.parse(input)[0], 1.25);
    }

    removeGeometries(mapId: string) {
        const myMap = (<any>window).RAMP.mapById(mapId);
        const graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        graphicsOSDP.removeGeometry();

        // remove hightlight marker and haze
        myMap.esriMap._layerDivs.rv_hilight.clear();
        if (typeof document.querySelectorAll('#mapOSDP .rv-map-highlight')[0] !== 'undefined') {
            document.querySelectorAll('#mapOSDP .rv-map-highlight')[0].classList.toggle('rv-map-highlight')
        }
    }

    zoomPt(mapId: string, value: string): void {
        const myMap = (<any>window).RAMP.mapById(mapId);
        const ramp = (<any>window).RAMP;
        const input = this.inputParse(value, 'POINT');
        const ptcoords = JSON.parse(input);
        const pt = new ramp.GEO.XY(parseFloat(ptcoords[0][0]), parseFloat(ptcoords[0][1]));

        myMap.zoom = 13;
        myMap.setCenter(pt);
    }

    zoomExtent (mapId: string, coords: [], expand: number = 1): void {
        const myMap = (<any>window).RAMP.mapById(mapId);
        const ramp = (<any>window).RAMP;

        let x = [];
        let y = [];
        coords.forEach(item => {
            x.push(item[0]);
            y.push(item[1]);
        })

        let ext = ramp.GAPI.proj.projectEsriExtent({
            'xmin': Math.min(...x), 'ymin': Math.min(...y), 'xmax': Math.max(...x), 'ymax': Math.max(...y),
            'spatialReference': { 'wkid': 4326 } }, myMap.esriMap.spatialReference);

        myMap.setExtent(ext.expand(expand));
    }

    zoomWkt(mapId: string, values: string, type: string) {
        const input = this.inputParse(values, type);

        // zoom to extent of wkt points or polygon(s)
        this.zoomExtent(mapId, JSON.parse(input)[0]);
    }

    saveState(mapid: string): void {
        // save bookmark in session storage so it is restored when user loads it
        sessionStorage.setItem(mapid, this._RV.getBookmark());
    }

    loadState(mapid: string): void {
        // load bookmark from session storage and apply it
        const storage = JSON.parse(JSON.stringify(sessionStorage.getItem(mapid)));

        // use a timeout to wait until code finish to run. If no timeout, RV is not define
        setTimeout(() => (<any>window).RV.getMap(mapid).initialBookmark(storage));
    }
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

(<any>window).osdp = new OSDP();