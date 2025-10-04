import { OnChanges, OnDestroy, OnInit, SimpleChanges, type InputSignal } from '@angular/core';
import type { CanvasSource } from 'mapbox-gl';
import * as i0 from "@angular/core";
type CanvasSourceSpecification = CanvasSource['options'];
type CanvasSourceInputs = {
    [K in keyof Omit<CanvasSourceSpecification, 'type'>]: InputSignal<Omit<CanvasSourceSpecification, 'type'>[K]>;
};
export declare class CanvasSourceComponent implements OnInit, OnDestroy, OnChanges, CanvasSourceInputs {
    private mapService;
    id: InputSignal<string>;
    coordinates: InputSignal<[[number, number], [number, number], [number, number], [number, number]]>;
    canvas: InputSignal<string | HTMLCanvasElement>;
    animate: InputSignal<boolean | undefined>;
    private sourceAdded;
    private sub;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CanvasSourceComponent, "mgl-canvas-source", never, { "id": { "alias": "id"; "required": true; "isSignal": true; }; "coordinates": { "alias": "coordinates"; "required": true; "isSignal": true; }; "canvas": { "alias": "canvas"; "required": true; "isSignal": true; }; "animate": { "alias": "animate"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export {};
