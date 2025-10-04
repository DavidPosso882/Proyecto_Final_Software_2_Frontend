import { OnDestroy, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FeatureComponent implements OnInit, OnDestroy {
    private GeoJSONSourceComponent;
    id: import("@angular/core").ModelSignal<number | undefined>;
    geometry: import("@angular/core").InputSignal<import("geojson").Geometry>;
    properties: import("@angular/core").InputSignal<import("geojson").GeoJsonProperties | undefined>;
    type: "Feature";
    private feature;
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateCoordinates(coordinates: number[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FeatureComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FeatureComponent, "mgl-feature", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "geometry": { "alias": "geometry"; "required": true; "isSignal": true; }; "properties": { "alias": "properties"; "required": false; "isSignal": true; }; }, { "id": "idChange"; }, never, never, true, never>;
}
