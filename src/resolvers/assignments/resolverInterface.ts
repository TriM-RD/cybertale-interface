import { ObjectTemplate } from '@cybertale/interface'

export interface ResolverInterface<T> {
  FormSelectList (wrapper: T): Promise<ObjectTemplate[]>
  FormDataList (wrapper: T): Promise<ObjectTemplate[]>
  FormButton (wrapper: T): Promise<ObjectTemplate[]>
  RowButton (wrapper: T): Promise<ObjectTemplate[]>
  TableButton (wrapper: T): Promise<ObjectTemplate[]>
}
