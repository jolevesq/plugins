import { PanelManager } from './panel-manager';
export default class Draw {
    private _style;
    init(mapApi: any): void;
    onMenuItemClick(): () => void;
}
export default interface Draw {
    mapApi: any;
    _RV: any;
    config: any;
    translations: any;
    panelManager: PanelManager;
    button: any;
}
