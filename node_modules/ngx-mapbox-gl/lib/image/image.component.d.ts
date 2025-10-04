import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ImageComponent implements OnInit, OnDestroy, OnChanges {
    private mapService;
    private zone;
    id: import("@angular/core").InputSignal<string>;
    data: import("@angular/core").InputSignal<HTMLImageElement | ImageBitmap | ImageData | import("mapbox-gl").StyleImageInterface | {
        width: number;
        height: number;
        data: Uint8Array | Uint8ClampedArray;
    } | undefined>;
    options: import("@angular/core").InputSignal<Partial<{
        pixelRatio: number;
        sdf: boolean;
        usvg: boolean;
        width?: number;
        height?: number;
        stretchX?: Array<[number, number]>;
        stretchY?: Array<[number, number]>;
        content?: [number, number, number, number];
    }> | undefined>;
    url: import("@angular/core").InputSignal<string | undefined>;
    imageError: EventEmitter<Error>;
    imageLoaded: EventEmitter<void>;
    private isAdded;
    private isAdding;
    private sub;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImageComponent, "mgl-image", never, { "id": { "alias": "id"; "required": true; "isSignal": true; }; "data": { "alias": "data"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "url": { "alias": "url"; "required": false; "isSignal": true; }; }, { "imageError": "imageError"; "imageLoaded": "imageLoaded"; }, never, never, true, never>;
}
