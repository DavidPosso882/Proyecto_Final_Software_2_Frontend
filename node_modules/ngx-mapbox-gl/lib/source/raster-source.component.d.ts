import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class RasterSourceComponent implements OnInit, OnDestroy, OnChanges {
    private mapService;
    id: import("@angular/core").InputSignal<string>;
    url: import("@angular/core").InputSignal<string | undefined>;
    tiles: import("@angular/core").InputSignal<string[] | undefined>;
    bounds: import("@angular/core").InputSignal<[number, number, number, number] | undefined>;
    minzoom: import("@angular/core").InputSignal<number | undefined>;
    maxzoom: import("@angular/core").InputSignal<number | undefined>;
    tileSize: import("@angular/core").InputSignal<number | undefined>;
    scheme: import("@angular/core").InputSignal<"xyz" | "tms" | undefined>;
    attribution: import("@angular/core").InputSignal<string | undefined>;
    volatile: import("@angular/core").InputSignal<boolean | undefined>;
    private sourceAdded;
    private sub;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<RasterSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RasterSourceComponent, "mgl-raster-source", never, { "id": { "alias": "id"; "required": true; "isSignal": true; }; "url": { "alias": "url"; "required": false; "isSignal": true; }; "tiles": { "alias": "tiles"; "required": false; "isSignal": true; }; "bounds": { "alias": "bounds"; "required": false; "isSignal": true; }; "minzoom": { "alias": "minzoom"; "required": false; "isSignal": true; }; "maxzoom": { "alias": "maxzoom"; "required": false; "isSignal": true; }; "tileSize": { "alias": "tileSize"; "required": false; "isSignal": true; }; "scheme": { "alias": "scheme"; "required": false; "isSignal": true; }; "attribution": { "alias": "attribution"; "required": false; "isSignal": true; }; "volatile": { "alias": "volatile"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
