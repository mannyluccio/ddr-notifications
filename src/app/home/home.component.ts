import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {MqttMessage} from '../model/ScotiaFile';
import * as _ from 'lodash';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

    public live_data: any;
    public listCmd: any;
    public country_list = [{id: 'pa', value: 'Panama'},{id: 'cr', value: 'Costa Rica'}];
    public env_list = ['prod', 'preprod', 'migration'];
    public selectedCountry = 'pa';
    public selectedEnv = 'prod';
    public objectKeys = Object.keys;
    private subscription: Subscription;

    constructor(private _mqttService: MqttService) {
        this.subscription = this._mqttService.observe('pippo/#' ).subscribe((message: IMqttMessage) => {
            let env = message.topic.split('/')[1];
            this.parseMqttMessage(JSON.parse(message.payload.toString()),env.split('-')[0], env.split('-')[1]);
        });

        this.createInitialObject(this.country_list, this.env_list);
    }

    public unsafePublish(topic: string, message: string): void {
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }


    parseMqttMessage(message: MqttMessage, env: string, country: string) {
        console.log(env)
        switch (message.type) {
            case 'cmd':
                this.listCmd[country][env].unshift({env: env, country: country, message: message.data.message, detail: message.data.detail, time: message.time});
                break;
            case 'import':
                this.live_data[country][env][message.data.name] = {
                    current: message.data.progress,
                    total: message.data.total,
                    time: message.time,
                    percentage: parseFloat(((message.data.progress * 100) / message.data.total).toFixed(2))
                };
                console.log(this.live_data);
                break;
        }
    }

    changeEnv(env: string){
        this.selectedEnv = env;
    }

    createInitialObject(country_list: any[],env_list: any[]){
        let initialLiveData = {};
        let initialCmdData = {};
        _.forEach(country_list, (item)=>{
            initialLiveData[item.id] = {};
            initialCmdData[item.id] = {};
            _.forEach(env_list, (env)=>{
                initialLiveData[item.id][env] = {
                    ReceiveScotiaProDailyDemographicFileJob: {},
                    ReceiveScotiaProDailyProductFileJob: {},
                    ReceiveScotiaProDailyTransactionFileJob: {},
                    ReceiveTsysDailyProductFileJob :{},
                    ReceiveTsysDailyTransactionFileJob: {},
                }
                initialCmdData[item.id][env] = [];
            })
        })
        this.live_data = initialLiveData;
        this.listCmd = initialCmdData;
        console.log(this.live_data,this.listCmd);
    }
}
