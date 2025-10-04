import { AfterContentInit, ElementRef, OnDestroy } from '@angular/core';
import { IControl, type ControlPosition } from 'mapbox-gl';
import * as i0 from "@angular/core";
export declare class CustomControl implements IControl {
    private container;
    constructor(container: HTMLElement);
    onAdd(): HTMLElement;
    onRemove(): HTMLElement;
    getDefaultPosition(): ControlPosition;
}
export declare class ControlComponent<T extends IControl> implements OnDestroy, AfterContentInit {
    private mapService;
    position: import("@angular/core").InputSignal<"top-left" | "top-right" | "bottom-left" | "bottom-right" | undefined>;
    content: ElementRef;
    control: T | CustomControl;
    private controlAdded;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlComponent<any>, "mgl-control", never, { "position": { "alias": "position"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
