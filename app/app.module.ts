import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { registerElement } from "nativescript-angular/element-registry";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
