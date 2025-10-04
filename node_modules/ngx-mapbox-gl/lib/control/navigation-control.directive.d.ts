import { AfterContentInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NavigationControlDirective implements AfterContentInit {
    private mapService;
    private controlComponent;
    showCompass: import("@angular/core").InputSignal<boolean | undefined>;
    showZoom: import("@angular/core").InputSignal<boolean | undefined>;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationControlDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NavigationControlDirective, "[mglNavigation]", never, { "showCompass": { "alias": "showCompass"; "required": false; "isSignal": true; }; "showZoom": { "alias": "showZoom"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
