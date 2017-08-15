import { IServerTimeProvider } from '.';

export class Timer {
    private readonly _interval = 1000;
    private _timerId: number;

    constructor(private _htmlNode: HTMLElement, private _serverTimeProvider: IServerTimeProvider) {
    }

    public run(): void {
        this._timerId = window.setInterval(this.updateTime, this._interval);
    }

    private updateTime = async (): Promise<any> => {
        const time = await this._serverTimeProvider.getTime();
        this.render(time);
    }

    private render(time: Date): void {
        this._htmlNode.innerHTML = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    }
}