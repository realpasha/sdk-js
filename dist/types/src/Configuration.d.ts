interface IStorageAPI {
    getItem<T extends any = any>(key: string): T;
    setItem(key: string, value: any): void;
    removeItem(key: string): void;
}
export interface IConfigurationValues {
    url: string;
    project: string;
    token?: string;
    localExp?: number;
}
export interface IConfiguration {
    token: string;
    url: string;
    project: string;
    localExp?: number;
    dehydrate(): IConfigurationValues;
    delete(): any;
    hydrate(config: IConfigurationValues): any;
    partialUpdate(config: Partial<IConfigurationValues>): void;
    reset(): void;
    update(config: IConfigurationValues): any;
}
export interface IConfigurationOptions {
    url: string;
    token?: string;
    project?: string;
    localExp?: number;
}
export declare class Configuration implements IConfiguration {
    private storage?;
    private internalConfiguration;
    constructor(initialConfig: IConfigurationOptions, storage?: IStorageAPI);
    readonly token: string | undefined;
    readonly url: string;
    readonly project: string;
    readonly localExp: number | undefined;
    validate(): void;
    update(config: IConfigurationValues): void;
    partialUpdate(config: Partial<IConfigurationValues>): void;
    reset(): void;
    dehydrate(): IConfigurationValues | undefined;
    hydrate(props: IConfigurationValues): void;
    delete(): void;
}
export {};
//# sourceMappingURL=Configuration.d.ts.map