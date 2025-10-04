import { OnChanges, OnDestroy, OnInit, SimpleChanges, type InputSignal } from '@angular/core';
import type { GeoJSONSourceSpecification } from 'mapbox-gl';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
type GeoJSONSourceInputs = {
    [K in keyof Omit<GeoJSONSourceSpecification, 'type'>]: InputSignal<Omit<GeoJSONSourceSpecification, 'type'>[K]>;
};
export declare class GeoJSONSourceComponent implements OnInit, OnDestroy, OnChanges, GeoJSONSourceInputs {
    private mapService;
    private zone;
    id: InputSignal<string>;
    data: import("@angular/core").ModelSignal<string | import("geojson").GeoJSON | undefined>;
    minzoom: InputSignal<number | undefined>;
    maxzoom: InputSignal<number | undefined>;
    attribution: InputSignal<string | undefined>;
    buffer: InputSignal<number | undefined>;
    tolerance: InputSignal<number | undefined>;
    cluster: InputSignal<boolean | undefined>;
    clusterRadius: InputSignal<number | undefined>;
    clusterMaxZoom: InputSignal<number | undefined>;
    clusterMinPoints: InputSignal<number | undefined>;
    clusterProperties: InputSignal<unknown>;
    lineMetrics: InputSignal<boolean | undefined>;
    generateId: InputSignal<boolean | undefined>;
    promoteId: InputSignal<import("mapbox-gl").PromoteIdSpecification | undefined>;
    filter: InputSignal<unknown>;
    dynamic: InputSignal<boolean | undefined>;
    updateFeatureData: Subject<unknown>;
    private sub;
    private sourceAdded;
    private featureIdCounter;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /**
     * For clustered sources, fetches the zoom at which the given cluster expands.
     *
     * @param clusterId The value of the cluster's cluster_id property.
     */
    getClusterExpansionZoom(clusterId: number): Promise<number | null | undefined>;
    /**
     * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
     *
     * @param clusterId The value of the cluster's cluster_id property.
     */
    getClusterChildren(clusterId: number): Promise<import("geojson").Feature<import("geojson").Geometry, import("geojson").GeoJsonProperties>[] | null | undefined>;
    /**
     * For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
     *
     * @param clusterId The value of the cluster's cluster_id property.
     * @param limit The maximum number of features to return.
     * @param offset The number of features to skip (e.g. for pagination).
     */
    getClusterLeaves(clusterId: number, limit: number, offset: number): Promise<import("geojson").Feature<import("geojson").Geometry, import("geojson").GeoJsonProperties>[]>;
    _addFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>): void;
    _removeFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>): void;
    _getNewFeatureId(): number;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<GeoJSONSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GeoJSONSourceComponent, "mgl-geojson-source", never, { "id": { "alias": "id"; "required": true; "isSignal": true; }; "data": { "alias": "data"; "required": false; "isSignal": true; }; "minzoom": { "alias": "minzoom"; "required": false; "isSignal": true; }; "maxzoom": { "alias": "maxzoom"; "required": false; "isSignal": true; }; "attribution": { "alias": "attribution"; "required": false; "isSignal": true; }; "buffer": { "alias": "buffer"; "required": false; "isSignal": true; }; "tolerance": { "alias": "tolerance"; "required": false; "isSignal": true; }; "cluster": { "alias": "cluster"; "required": false; "isSignal": true; }; "clusterRadius": { "alias": "clusterRadius"; "required": false; "isSignal": true; }; "clusterMaxZoom": { "alias": "clusterMaxZoom"; "required": false; "isSignal": true; }; "clusterMinPoints": { "alias": "clusterMinPoints"; "required": false; "isSignal": true; }; "clusterProperties": { "alias": "clusterProperties"; "required": false; "isSignal": true; }; "lineMetrics": { "alias": "lineMetrics"; "required": false; "isSignal": true; }; "generateId": { "alias": "generateId"; "required": false; "isSignal": true; }; "promoteId": { "alias": "promoteId"; "required": false; "isSignal": true; }; "filter": { "alias": "filter"; "required": false; "isSignal": true; }; "dynamic": { "alias": "dynamic"; "required": false; "isSignal": true; }; }, { "data": "dataChange"; }, never, never, true, never>;
}
export {};
