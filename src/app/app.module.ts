import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IMqttServiceOptions, MqttModule} from 'ngx-mqtt';
import {KeysPipe} from './directive/keys';


export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: 'mqtt.ctlr.it',
    port: 8083,
    path: '/mqtt'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
