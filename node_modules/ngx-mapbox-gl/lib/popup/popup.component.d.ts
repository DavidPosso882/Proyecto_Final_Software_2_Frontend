import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { LngLatLike, PointLike, Popup } from 'mapbox-gl';
import { MarkerComponent } from '../marker/marker.component';
import * as i0 from "@angular/core";
export declare class PopupComponent implements OnChanges, OnDestroy, AfterViewInit, OnInit {
    private mapService;
    closeButton: import("@angular/core").InputSignal<boolean | undefined>;
    closeOnClick: import("@angular/core").InputSignal<boolean | undefined>;
    closeOnMove: import("@angular/core").InputSignal<boolean | undefined>;
    focusAfterOpen: import("@angular/core").InputSignal<boolean | undefined>;
    anchor: import("@angular/core").InputSignal<import("mapbox-gl").Anchor | undefined>;
    className: import("@angular/core").InputSignal<string | undefined>;
    maxWidth: import("@angular/core").InputSignal<string | undefined>;
    feature: import("@angular/core").InputSignal<import("geojson").Feature<import("geojson").Point, import("geojson").GeoJsonProperties> | undefined>;
    lngLat: import("@angular/core").InputSignal<LngLatLike | undefined>;
    marker: import("@angular/core").InputSignal<MarkerComponent | undefined>;
    offset: import("@angular/core").InputSignal<number | PointLike | {
        [anchor: string]: [number, number];
    } | undefined>;
    popupClose: EventEmitter<void>;
    popupOpen: EventEmitter<void>;
    content: ElementRef;
    popupInstance?: Popup;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private createPopup;
    private addPopup;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopupComponent, "mgl-popup", never, { "closeButton": { "alias": "closeButton"; "required": false; "isSignal": true; }; "closeOnClick": { "alias": "closeOnClick"; "required": false; "isSignal": true; }; "closeOnMove": { "alias": "closeOnMove"; "required": false; "isSignal": true; }; "focusAfterOpen": { "alias": "focusAfterOpen"; "required": false; "isSignal": true; }; "anchor": { "alias": "anchor"; "required": false; "isSignal": true; }; "className": { "alias": "className"; "required": false; "isSignal": true; }; "maxWidth": { "alias": "maxWidth"; "required": false; "isSignal": true; }; "feature": { "alias": "feature"; "required": false; "isSignal": true; }; "lngLat": { "alias": "lngLat"; "required": false; "isSignal": true; }; "marker": { "alias": "marker"; "required": false; "isSignal": true; }; "offset": { "alias": "offset"; "required": false; "isSignal": true; }; }, { "popupClose": "popupClose"; "popupOpen": "popupOpen"; }, never, ["*"], true, never>;
}
