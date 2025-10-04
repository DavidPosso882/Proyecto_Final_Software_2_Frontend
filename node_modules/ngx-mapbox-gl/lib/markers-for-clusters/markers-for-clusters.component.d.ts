import { AfterContentInit, OnDestroy, TemplateRef } from '@angular/core';
import type { GeoJSONFeature } from 'mapbox-gl';
import * as i0 from "@angular/core";
export declare class PointDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<PointDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PointDirective, "ng-template[mglPoint]", never, {}, {}, never, never, true, never>;
}
export declare class ClusterPointDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<ClusterPointDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClusterPointDirective, "ng-template[mglClusterPoint]", never, {}, {}, never, never, true, never>;
}
export declare class MarkersForClustersComponent implements OnDestroy, AfterContentInit {
    private mapService;
    private zone;
    source: import("@angular/core").InputSignal<string>;
    customPointIdKey: import("@angular/core").InputSignal<string | undefined>;
    pointTpl?: TemplateRef<unknown>;
    clusterPointTpl: TemplateRef<unknown>;
    clusterPoints: import("@angular/core").WritableSignal<GeoJSONFeature[]>;
    layerId: string;
    private sub;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    trackByFeature(feature: GeoJSONFeature): any;
    private updateCluster;
    static ɵfac: i0.ɵɵFactoryDeclaration<MarkersForClustersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MarkersForClustersComponent, "mgl-markers-for-clusters", never, { "source": { "alias": "source"; "required": true; "isSignal": true; }; "customPointIdKey": { "alias": "customPointIdKey"; "required": false; "isSignal": true; }; }, {}, ["pointTpl", "clusterPointTpl"], never, true, never>;
}
