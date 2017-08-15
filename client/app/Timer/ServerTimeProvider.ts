export interface IServerTimeProvider {
    getTime(): Promise<Date>;
}

export class ServerTimeProvider implements IServerTimeProvider {

    private readonly _xhr: XMLHttpRequest;

    constructor() {
        this._xhr = new XMLHttpRequest();
    }

    async getTime(): Promise<Date> {
        var result: Response = await fetch('/api/time');
        return result.json().then((r) => new Date(r.time));
    }
}