export interface ScotiaFile {
    message: string,
    detail: string,
    name?: string,
    progress?: number,
    total?: number
}

export interface MqttMessage {
    type: string,
    time: string,
    data: ScotiaFile
}

export interface LiveData {
    pa?: Environment,
    cr?: Environment,
}

export interface Environment {
    prod?: Progress[],
    preprod?: Progress[],
}

export interface Progress {
    time: string,
    name: string,
    current: number,
    total: number,
    percentage:number,
}

enum FileType {
    ReceiveScotiaProDailyDemographicFileJob = 0,
    ReceiveScotiaProDailyProductFileJob = 1,
    ReceiveScotiaProDailyTransactionFileJob = 2,
    ReceiveTsysDailyProductFileJob = 3,
    ReceiveTsysDailyTransactionFileJob = 4,
}
