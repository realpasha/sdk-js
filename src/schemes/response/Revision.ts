import { IField } from './Field';
interface IRevisionDataSet<T> {
  activity: number;
  collection: string;
  data: IField<T>;
  delta: Partial<T>;
  id: number;
  item: string;
  parent_changed: boolean;
  parent_collection: any | null;
  parent_item: any | null;
}

export interface IRevisionResponse<T extends any = any> {
  data: Array<IRevisionDataSet<T>>;
}
