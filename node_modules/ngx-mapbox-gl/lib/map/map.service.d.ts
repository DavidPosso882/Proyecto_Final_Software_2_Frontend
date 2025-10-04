import { EventEmitter, InjectionToken } from '@angular/core';
import { Map, Marker, Popup, type AnimationOptions, type CanvasSource, type EasingOptions, type FilterSpecification, type LayoutSpecification, type LngLatLike, type MapOptions, type MarkerOptions, type PaintSpecification, type PointLike, type PopupOptions, type Source, type SourceSpecification } from 'mapbox-gl';
import { Observable } from 'rxjs';
import { LayerEvents, NgxMapEvent } from './map.types';
import * as i0 from "@angular/core";
export declare const MAPBOX_API_KEY: InjectionToken<unknown>;
export interface SetupMap {
    accessToken?: string;
    mapOptions: Omit<MapOptions, 'bearing' | 'pitch' | 'zoom'> & {
        /**
         * NOTE: Thoses can be arrays in order to be able to imperatively change them if the map is moved manually
         */
        bearing?: [number] | number;
        pitch?: [number] | number;
        zoom?: [number] | number;
    };
    mapEvents: NgxMapEvent;
}
export interface SetupLayer {
    layerOptions: Parameters<Map['addLayer']>[0];
    layerEvents: LayerEvents;
}
export interface SetupPopup {
    popupOptions: PopupOptions;
    popupEvents: {
        popupOpen: EventEmitter<void>;
        popupClose: EventEmitter<void>;
    };
}
export interface SetupMarker {
    markersOptions: {
        pitchAlignment?: MarkerOptions['pitchAlignment'];
        rotationAlignment?: MarkerOptions['rotationAlignment'];
        offset?: MarkerOptions['offset'];
        anchor?: MarkerOptions['anchor'];
        draggable?: MarkerOptions['draggable'];
        element: HTMLElement;
        feature?: GeoJSON.Feature<GeoJSON.Point>;
        lngLat?: LngLatLike;
        clickTolerance?: MarkerOptions['clickTolerance'];
    };
    markersEvents: {
        markerDragStart: EventEmitter<Marker>;
        markerDrag: EventEmitter<Marker>;
        markerDragEnd: EventEmitter<Marker>;
    };
}
export type MovingOptions = Parameters<Map['jumpTo']>[0] | Parameters<Map['easeTo']>[0] | Parameters<Map['flyTo']>[0];
export declare class MapService {
    private readonly zone;
    private readonly MAPBOX_API_KEY;
    private readonly injector;
    mapInstance: Map;
    mapCreated$: Observable<void>;
    mapLoaded$: Observable<void>;
    mapEvents: NgxMapEvent;
    private mapCreated;
    private mapLoaded;
    private markersToRemove;
    private popupsToRemove;
    private imageIdsToRemove;
    private subscription;
    constructor();
    setup(options: SetupMap): void;
    destroyMap(): void;
    updateProjection(projection: MapOptions['projection']): void;
    updateMinZoom(minZoom: number): void;
    updateMaxZoom(maxZoom: number): void;
    updateMinPitch(minPitch: number): void;
    updateMaxPitch(maxPitch: number): void;
    updateRenderWorldCopies(status: boolean): void;
    updateScrollZoom(status: boolean): void;
    updateDragRotate(status: boolean): void;
    updateTouchPitch(status: boolean): void;
    updateTouchZoomRotate(status: boolean): void;
    updateDoubleClickZoom(status: boolean): void;
    updateKeyboard(status: boolean): void;
    updateDragPan(status: boolean): void;
    updateBoxZoom(status: boolean): void;
    updateStyle(style: Parameters<Map['setStyle']>[0]): void;
    updateMaxBounds(maxBounds: Parameters<Map['setMaxBounds']>[0]): void;
    changeCanvasCursor(cursor: string): void;
    queryRenderedFeatures(pointOrBox: PointLike | [PointLike, PointLike], parameters?: {
        layers?: string[];
        filter?: FilterSpecification;
        validate?: boolean;
    }): GeoJSON.Feature<GeoJSON.GeometryObject>[];
    panTo(center: LngLatLike, options?: AnimationOptions): void;
    move(movingMethod: 'jumpTo' | 'easeTo' | 'flyTo', movingOptions?: MovingOptions, zoom?: number, center?: LngLatLike, bearing?: number, pitch?: number): void;
    addLayer(layer: SetupLayer, bindEvents: boolean, before?: string): void;
    removeLayer(layerId: string): void;
    addMarker(marker: SetupMarker): Marker;
    removeMarker(marker: Marker): void;
    createPopup(popup: SetupPopup, element: Node): Popup;
    addPopupToMap(popup: Popup, lngLat: LngLatLike, skipOpenEvent?: boolean): void;
    addPopupToMarker(marker: Marker, popup: Popup): void;
    removePopupFromMap(popup: Popup, skipCloseEvent?: boolean): void;
    removePopupFromMarker(marker: Marker): void;
    addControl(control: Parameters<Map['addControl']>[0], position?: Parameters<Map['addControl']>[1]): void;
    removeControl(control: Parameters<Map['removeControl']>[0]): void;
    loadAndAddImage(imageId: string, url: string, options?: Parameters<Map['addImage']>[2]): Promise<void>;
    addImage(imageId: Parameters<Map['addImage']>[0], data: Parameters<Map['addImage']>[1], options?: Parameters<Map['addImage']>[2]): void;
    removeImage(imageId: string): void;
    addSource(sourceId: string, source: SourceSpecification | CanvasSource['options']): void;
    getSource<T extends Source>(sourceId: string): T | undefined;
    removeSource(sourceId: string): void;
    setLayerAllPaintProperty(layerId: string, paint: PaintSpecification): void;
    setLayerAllLayoutProperty(layerId: string, layout: LayoutSpecification): void;
    setLayerFilter(layerId: string, filter: FilterSpecification[]): void;
    setLayerBefore(layerId: string, beforeId: string): void;
    setLayerZoomRange(layerId: string, minZoom?: number, maxZoom?: number): void;
    fitBounds(bounds: Parameters<Map['fitBounds']>[0], options?: Parameters<Map['fitBounds']>[1]): void;
    fitScreenCoordinates(points: [PointLike, PointLike], bearing: number, options?: EasingOptions): void;
    applyChanges(): void;
    private createMap;
    private removeMarkers;
    private removePopups;
    private removeImages;
    private findLayersBySourceId;
    private hookEvents;
    static ɵfac: i0.ɵɵFactoryDeclaration<MapService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MapService>;
}
