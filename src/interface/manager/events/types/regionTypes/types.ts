import { StatChangeDel } from '@/interface/manager/containerClasses/statChangeEventArgs'
import { ObjectTypeEnum, ObjectType } from '../objectType'
import { SubObjectTypeEnum } from '../subObjectType'
import { Manager as ObjectTypeAbstract } from '../objectTypes/types'

export namespace Manager.Events.Type{

   export abstract class RegionAbstract {
     public ObjectTypes: { [index: number]: ObjectTypeAbstract.Events.Type.ObjectTypeAbstract } = {}
     public Subscribe (_objectType: ObjectTypeEnum, _subObjectType: SubObjectTypeEnum, _statChangeDel:StatChangeDel): void {
       this.ObjectTypes[_objectType].Subscribe(_subObjectType, _statChangeDel)
     }
   }

  export class Form extends RegionAbstract {
    public ObjectTypes: { [index: number]: ObjectTypeAbstract.Events.Type.ObjectTypeAbstract } =
    {
      [ObjectTypeEnum.Field]: new ObjectTypeAbstract.Events.Type.Field(),
      [ObjectTypeEnum.Button]: new ObjectTypeAbstract.Events.Type.Button(),
      [ObjectTypeEnum.Text]: new ObjectTypeAbstract.Events.Type.Text(),
      [ObjectTypeEnum.Alert]: new ObjectTypeAbstract.Events.Type.Alert(),
      [ObjectTypeEnum.CheckBox]: new ObjectTypeAbstract.Events.Type.CheckBox(),
      [ObjectTypeEnum.DataList]: new ObjectTypeAbstract.Events.Type.DataList(),
      [ObjectTypeEnum.SelectList]: new ObjectTypeAbstract.Events.Type.SelectList(),
      [ObjectTypeEnum.Radio]: new ObjectTypeAbstract.Events.Type.Radio()
    }
  }

  export class Table extends RegionAbstract {
    public ObjectTypes: { [index: number]: ObjectTypeAbstract.Events.Type.ObjectTypeAbstract } =
    {
      [ObjectTypeEnum.Row]: new ObjectTypeAbstract.Events.Type.Row()
    }
  }

  export class TableColumn extends RegionAbstract {
    public ObjectTypes: { [index: number]: ObjectTypeAbstract.Events.Type.ObjectTypeAbstract } =
    {
      [ObjectTypeEnum.Button]: new ObjectTypeAbstract.Events.Type.Button()
    }
  }

  export class Show extends RegionAbstract {
    public ObjectTypes: { [index: number]: ObjectTypeAbstract.Events.Type.ObjectTypeAbstract } =
    {
      [ObjectTypeEnum.ShowResolve]: new ObjectTypeAbstract.Events.Type.ShowResolve()
    }
  }

  export class ContentToolkit extends RegionAbstract {
    public ObjectTypes: { [index: number]: ObjectTypeAbstract.Events.Type.ObjectTypeAbstract } =
    {
      [ObjectTypeEnum.Button]: new ObjectTypeAbstract.Events.Type.Button()
    }
  }

  export class Footer extends RegionAbstract {
    public ObjectTypes: { [index: number]: ObjectTypeAbstract.Events.Type.ObjectTypeAbstract } =
      {
        [ObjectTypeEnum.Button]: new ObjectTypeAbstract.Events.Type.Button()
      }
  }
}
