import { DrawToolbar } from './toolbar';
export declare class PanelManager {
    private _mousemoveHandler;
    private _mouseclickHandler;
    constructor(mapApi: any, config: any);
    makeControls(): void;
    angularControls(): void;
    createIcon(control: any, icon?: string): void;
    setActive(controls: any, name: any): void;
    keyDownHandler(event: any): void;
    mouseHandler(event: any, drawToolbar: any): void;
    measure(measure: any, that: any): void;
    compileTemplate(template: string): JQuery<HTMLElement>;
}
export interface PanelManager {
    panel: any;
    mapApi: any;
    active: object;
    drawToolbar: DrawToolbar;
}
