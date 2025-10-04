import { AfterContentInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class AttributionControlDirective implements AfterContentInit {
    private mapService;
    private controlComponent;
    compact: import("@angular/core").InputSignal<boolean | undefined>;
    customAttribution: import("@angular/core").InputSignal<string | string[] | undefined>;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AttributionControlDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AttributionControlDirective, "[mglAttribution]", never, { "compact": { "alias": "compact"; "required": false; "isSignal": true; }; "customAttribution": { "alias": "customAttribution"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
