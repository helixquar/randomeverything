import * as vscode from 'vscode';
import workspace = vscode.workspace;

abstract class BaseSettings {
    protected readSetting<T>(name: string, defaultValue:T): T {
        let configuration = workspace.getConfiguration();
        let value = configuration.get<T>(name, undefined);

        // If user specified a value, use it
        if (value !== undefined && value !== null) {
            return value;
        }
        return defaultValue;
    }
}

export class Settings extends BaseSettings {
    private _enabled: boolean;
    private _custom: { [key: string]: string | string[] }

    constructor() {
        super();

        this._enabled = this.readSetting<boolean>("randomeverything.enabled", true);
        this._custom = this.readSetting<{ [key: string]: string | string[] }>("randomeverything.custom", {})
    }

    public get Enabled(): boolean {
        return this._enabled;
    }

    public get Custom(): { [key: string]: string | string[] } {
        return this._custom;
    }
}