import { AfterContentInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FullscreenControlDirective implements AfterContentInit {
    private mapService;
    private controlComponent;
    container: import("@angular/core").InputSignal<HTMLElement | undefined>;
    onFullscreen(): void;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FullscreenControlDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FullscreenControlDirective, "[mglFullscreen]", never, { "container": { "alias": "container"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
