import { AfterContentInit, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class GeolocateControlDirective implements AfterContentInit {
    private mapService;
    private controlComponent;
    positionOptions: import("@angular/core").InputSignal<PositionOptions | undefined>;
    fitBoundsOptions: import("@angular/core").InputSignal<import("mapbox-gl").EasingOptions | undefined>;
    trackUserLocation: import("@angular/core").InputSignal<boolean | undefined>;
    showUserLocation: import("@angular/core").InputSignal<boolean | undefined>;
    showUserHeading: import("@angular/core").InputSignal<boolean | undefined>;
    geolocate: EventEmitter<GeolocationPosition>;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GeolocateControlDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GeolocateControlDirective, "[mglGeolocate]", never, { "positionOptions": { "alias": "positionOptions"; "required": false; "isSignal": true; }; "fitBoundsOptions": { "alias": "fitBoundsOptions"; "required": false; "isSignal": true; }; "trackUserLocation": { "alias": "trackUserLocation"; "required": false; "isSignal": true; }; "showUserLocation": { "alias": "showUserLocation"; "required": false; "isSignal": true; }; "showUserHeading": { "alias": "showUserHeading"; "required": false; "isSignal": true; }; }, { "geolocate": "geolocate"; }, never, never, true, never>;
}
