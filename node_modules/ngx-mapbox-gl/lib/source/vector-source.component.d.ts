import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class VectorSourceComponent implements OnInit, OnDestroy, OnChanges {
    private mapService;
    id: import("@angular/core").InputSignal<string>;
    url: import("@angular/core").InputSignal<string | undefined>;
    tiles: import("@angular/core").InputSignal<string[] | undefined>;
    bounds: import("@angular/core").InputSignal<[number, number, number, number] | undefined>;
    scheme: import("@angular/core").InputSignal<"xyz" | "tms" | undefined>;
    minzoom: import("@angular/core").InputSignal<number | undefined>;
    maxzoom: import("@angular/core").InputSignal<number | undefined>;
    attribution: import("@angular/core").InputSignal<string | undefined>;
    promoteId: import("@angular/core").InputSignal<import("mapbox-gl").PromoteIdSpecification | undefined>;
    volatile: import("@angular/core").InputSignal<boolean | undefined>;
    private sourceAdded;
    private sub;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    reload(): void;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<VectorSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VectorSourceComponent, "mgl-vector-source", never, { "id": { "alias": "id"; "required": true; "isSignal": true; }; "url": { "alias": "url"; "required": false; "isSignal": true; }; "tiles": { "alias": "tiles"; "required": false; "isSignal": true; }; "bounds": { "alias": "bounds"; "required": false; "isSignal": true; }; "scheme": { "alias": "scheme"; "required": false; "isSignal": true; }; "minzoom": { "alias": "minzoom"; "required": false; "isSignal": true; }; "maxzoom": { "alias": "maxzoom"; "required": false; "isSignal": true; }; "attribution": { "alias": "attribution"; "required": false; "isSignal": true; }; "promoteId": { "alias": "promoteId"; "required": false; "isSignal": true; }; "volatile": { "alias": "volatile"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
