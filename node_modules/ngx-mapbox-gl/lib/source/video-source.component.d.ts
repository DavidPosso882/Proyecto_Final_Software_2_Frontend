import { OnChanges, OnDestroy, OnInit, SimpleChanges, type InputSignal } from '@angular/core';
import type { VideoSourceSpecification } from 'mapbox-gl';
import * as i0 from "@angular/core";
type VideoSourceInputs = {
    [K in keyof Omit<VideoSourceSpecification, 'type'>]: InputSignal<Omit<VideoSourceSpecification, 'type'>[K]>;
};
export declare class VideoSourceComponent implements OnInit, OnDestroy, OnChanges, VideoSourceInputs {
    private mapService;
    id: InputSignal<string>;
    urls: InputSignal<string[]>;
    coordinates: InputSignal<[[number, number], [number, number], [number, number], [number, number]]>;
    private sourceAdded;
    private sub;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    pause(): void;
    play(): void;
    getVideo(): HTMLVideoElement | undefined;
    private init;
    static ɵfac: i0.ɵɵFactoryDeclaration<VideoSourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VideoSourceComponent, "mgl-video-source", never, { "id": { "alias": "id"; "required": true; "isSignal": true; }; "urls": { "alias": "urls"; "required": true; "isSignal": true; }; "coordinates": { "alias": "coordinates"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
export {};
