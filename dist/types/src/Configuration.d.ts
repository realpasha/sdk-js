export interface IStorageAPI {
    getItem<T extends any = any>(key: string): T;
    setItem(key: string, value: any): void;
    removeItem(key: string): void;
}
export interface IConfigurationValues {
    url: string;
    project: string;
    token?: string;
    localExp?: number;
    tokenExpirationTime?: number;
    persist: boolean;
}
export interface IConfiguration {
    token: string;
    url: string;
    project: string;
    localExp?: number;
    tokenExpirationTime: number;
    persist: boolean;
    dehydrate(): IConfigurationValues;
    deleteHydratedConfig(): any;
    hydrate(config: IConfigurationValues): any;
    partialUpdate(config: Partial<IConfigurationValues>): void;
    reset(): void;
    update(config: IConfigurationValues): any;
}
export interface IConfigurationDefaults {
    tokenExpirationTime: number;
    project: string;
}
export interface IConfigurationOptions {
    /**
     * The URL of the direcuts CMS
     */
    url: string;
    /**
     * The token to authenticate if preferred
     */
    token?: string;
    /**
     * Project namespace
     */
    project?: string;
    /**
     * Default login expiration as number in ms
     */
    localExp?: number;
    /**
     * If the token should be persitated or rehydrated
     */
    persist?: boolean;
    /**
     * Auto token expiration time
     */
    tokenExpirationTime?: number;
}
export declare class Configuration implements IConfiguration {
    private storage?;
    /**
     * Defaults for all directus sdk instances, can be modified if preferred
     * @type {IConfigurationDefaults}
     */
    static defaults: IConfigurationDefaults;
    /**
     * Saves the internal configuration values, **DO NOT modify** from the outside
     * @internal
     */
    private internalConfiguration;
    /**
     * Creates a new configuration instance, will be used once for each directus instance (passing refs).
     * @constructor
     * @param {IConfigurationOptions} initialConfig   Initial configuration values
     * @param {IStorageAPI?} storage                  Storage adapter for persistence
     */
    constructor(initialConfig?: IConfigurationOptions, storage?: IStorageAPI);
    token: string | undefined;
    tokenExpirationTime: number | undefined;
    url: string;
    project: string;
    localExp: number | undefined;
    persist: boolean;
    /**
     * Validates if the configuration is valid
     * @throws {Error}
     */
    validate(): void;
    /**
     * Update the configuration values, will also hydrate them if persistance activated
     * @param {IConfigurationValues} config
     */
    update(config: IConfigurationValues): void;
    /**
     * Update partials of the configuration, behaves like the [update] method
     * @param {Partial<IConfigurationValues>} config
     */
    partialUpdate(config: Partial<IConfigurationValues>): void;
    /**
     * Reset the whole confiugration and remove hydrated values from storage as well
     */
    reset(): void;
    dehydrate(): IConfigurationValues | undefined;
    hydrate(props: IConfigurationValues): void;
    deleteHydratedConfig(): void;
    private dehydratedInitialConfiguration;
}
//# sourceMappingURL=Configuration.d.ts.map