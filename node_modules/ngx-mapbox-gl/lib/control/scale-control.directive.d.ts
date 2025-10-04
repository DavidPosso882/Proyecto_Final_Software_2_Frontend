import { AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ScaleControlDirective implements AfterContentInit, OnChanges {
    private mapService;
    private controlComponent;
    maxWidth: import("@angular/core").InputSignal<number | undefined>;
    unit: import("@angular/core").InputSignal<"imperial" | "metric" | "nautical" | undefined>;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScaleControlDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ScaleControlDirective, "[mglScale]", never, { "maxWidth": { "alias": "maxWidth"; "required": false; "isSignal": true; }; "unit": { "alias": "unit"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
