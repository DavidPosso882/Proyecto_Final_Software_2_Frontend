import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { LayerComponent } from '../layer/layer.component';
import * as i0 from "@angular/core";
export declare class DraggableDirective implements OnInit, OnDestroy {
    private mapService;
    private ngZone;
    private featureComponent;
    layer: import("@angular/core").InputSignal<LayerComponent | undefined>;
    featureDragStart: EventEmitter<MapMouseEvent>;
    featureDragEnd: EventEmitter<MapMouseEvent>;
    featureDrag: EventEmitter<MapMouseEvent>;
    private sub;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleDraggable;
    private filterFeature;
    static ɵfac: i0.ɵɵFactoryDeclaration<DraggableDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DraggableDirective, "[mglDraggable]", never, { "layer": { "alias": "mglDraggable"; "required": false; "isSignal": true; }; }, { "featureDragStart": "featureDragStart"; "featureDragEnd": "featureDragEnd"; "featureDrag": "featureDrag"; }, never, never, true, never>;
}
