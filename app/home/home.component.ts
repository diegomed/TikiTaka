import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as http from "http";

import { Accuracy } from "ui/enums";
import * as geolocation from "nativescript-geolocation";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    currentLat: number;
    currentLng: number;

    items: Array<Item>;

    @ViewChild("map") public mapbox: ElementRef;

    constructor(private itemService: ItemService) {
    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();

        console.log('checking if geolocation is enabled');
        geolocation.isEnabled().then(enabled => {
            console.log('isEnabled =', enabled);
            if (enabled) {
               this.watch();
            } else {
               this.request();
            }
        }, e => {
            console.log('isEnabled error', e);
            this.request();
        });
    }

    request() {
        console.log('enableLocationRequest()');
        geolocation.enableLocationRequest().then(() => {
            console.log('location enabled!');
            this.watch();
        }, e => {
            console.log('Failed to enable', e);
        });
    }

    watch() {
        console.log('watchLocation()');
        geolocation.watchLocation(position => {
            this.currentLat = position.latitude;
            this.currentLng = position.longitude;
        }, e => {
            console.log('failed to get location');
        }, {
            desiredAccuracy: Accuracy.high,
            minimumUpdateTime: 500
        });
    }

    onMapReady(args: any) {
        args.map.setCenter(
            {
                lat: this.currentLat, // mandatory
                lng: this.currentLng, // mandatory
                animated: true, // default true
                zoomLevel: 14
            }
        )
    }

    // onButtonTap(): void {
    //     http.getString("http://localhost:3000/").then(result => {
    //         console.log(result);
    //     }, error => {
    //         console.log(error);
    //     });
    // }
}
