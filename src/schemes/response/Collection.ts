type CollectionFieldDataType = string; // "TEXT" ...
type CollectionFieldWidthType = string; // "full" ...
type CollectionFieldInterfaceType = string; // "wysiwyg-full"

interface ICollectionFieldDataSet {
  auto_increment: boolean;
  collection: string;
  datatype: CollectionFieldDataType;
  default_value: any;
  field: string;
  group: any;
  hidden_browse: boolean;
  hidden_detail: boolean;
  id: number;
  interface: CollectionFieldInterfaceType;
  length: string;
  locked: number;
  note?: string;
  options: null;
  primary_key: boolean;
  readonly: boolean;
  required: boolean;
  signed: boolean;
  sort: any;
  translation: null;
  type: string;
  unique: boolean;
  validation: null;
  width: CollectionFieldWidthType;
}

export interface ICollectionDataSet {
  collection: string;
  fields: {
    [field: string]: ICollectionFieldDataSet;
  };
  hidden: boolean;
  icon: string;
  managed: boolean;
  note?: string;
  single: boolean;
  translation: any;
}

export interface ICollectionResponse {
  data: ICollectionDataSet;
}

export interface ICollectionsResponse {
  data: ICollectionDataSet[];
}
