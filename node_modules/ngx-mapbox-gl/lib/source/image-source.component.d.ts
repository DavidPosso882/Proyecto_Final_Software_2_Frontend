import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import type { ImageSourceSpecification } from 'mapbox-gl';
import type { InputSignal } from '@angular/core';
import * as i0 from "@angular/core";
type ImageSourceInputs = {
    [K in keyof Omit<ImageSourceSpecification, 'type'>]: InputSignal<Omit<ImageSourceSpecification, 'type'>[K]>;
};
export declare class ImageSourceComponent implements OnInit, OnDestroy, OnChanges, ImageSourceInputs {
    private mapService;
    id: InputSignal<string>;
    url: InputSignal<string | undefined>;
    coordinates: InputSignal<[[number, number], [number, number], [number, number], [number, number]]>;
    private sub;
    private sourceId?;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImageSourceComponent, "mgl-image-source", never, { "id": { "alias": "id"; "required": true; "isSignal": true; }; "url": { "alias": "url"; "required": false; "isSignal": true; }; "coordinates": { "alias": "coordinates"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
export {};
