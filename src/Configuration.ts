import { invariant } from "./utils/invariant";
import { isString } from "./utils/is";

const STORAGE_KEY = "directus-sdk-js";

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
  delete();
  hydrate(config: IConfigurationValues);
  partialUpdate(config: Partial<IConfigurationValues>): void;
  reset(): void;
  update(config: IConfigurationValues);
}

export interface IConfigurationOptions {
  url: string;
  token?: string;
  project?: string;
  localExp?: number;
}

export class Configuration implements IConfiguration {
  private internalConfiguration: IConfigurationValues;

  constructor(initialConfig: IConfigurationOptions, private storage?: IStorageAPI) {
    if (storage) {
      this.dehydrate();
      // TODO: maybe just dehydrate and skip re-setting the configuration?
      // return this;
    }

    this.internalConfiguration = {
      ...initialConfig,
      project: initialConfig.project || "_",
    };
  }

  // ACCESSORS =================================================================

  public get token(): string | undefined {
    return this.internalConfiguration.token;
  }

  public get url(): string {
    return this.internalConfiguration.url;
  }

  public get project(): string {
    return this.internalConfiguration.project;
  }

  public get localExp(): number | undefined {
    return this.internalConfiguration.localExp;
  }

  // HELPER METHODS ============================================================

  public validate() {
    invariant(isString(this.url), "configuration - url must be defined");
    invariant(isString(this.project), "configuration - project must be defined");
    invariant(isString(this.token), "configuration - project must be defined");
  }

  public update(config: IConfigurationValues): void {
    this.internalConfiguration = config;

    this.hydrate(config);
  }

  public partialUpdate(config: Partial<IConfigurationValues>): void {
    this.internalConfiguration = {
      ...config,
      ...this.internalConfiguration,
    };

    this.hydrate(this.internalConfiguration);
  }

  public reset(): void {
    delete this.internalConfiguration.token;
    delete this.internalConfiguration.url;
    delete this.internalConfiguration.project;
    delete this.internalConfiguration.localExp;

    this.delete();
  }

  // STORAGE METHODS ===========================================================

  public dehydrate(): IConfigurationValues | undefined {
    if (!this.storage) {
      return;
    }

    const nativeValue = this.storage.getItem(STORAGE_KEY);

    if (!nativeValue) {
      return;
    }

    const parsedConfig = JSON.parse(nativeValue);
    this.internalConfiguration = parsedConfig;

    return parsedConfig;
  }

  public hydrate(props: IConfigurationValues) {
    if (!this.storage) {
      return;
    }

    this.storage.setItem(STORAGE_KEY, JSON.stringify(props));
  }

  public delete(): void {
    if (!this.storage) {
      return;
    }

    this.storage.removeItem(STORAGE_KEY);
  }
}
