import { ObjectTemplate } from '../containerClasses/objectTemplate'
import { ObjectType, ObjectTypeEnum } from '../events/types/objectType'
import { SubObjectTypeEnum } from '../events/types/subObjectType'
import { MechanicAbstract } from './mechanicAbstract'
import http from '@/http-common'
import { StatType, StatTypeEnum } from '../events/types/statType'
import { RegionEnum, ActionTypeEnum, RegionType } from '@/interface/manager/events/types/index'
import { EventHandlerType } from '../events/types/objectTypes/types'

export namespace Manager.Mechanic{

  export class ListMechanic extends MechanicAbstract {
    public async InitGet (_id = '-1', _route: string): Promise<ObjectTemplate[]> {
      this.ObjectTemplates = []
      const response = await http.get('http://blog.test/api/' + _route)
      if (Object.keys(response.data).length !== 0) {
        this.ObjectTemplates = this.forEachElement(response.data)
        return this.ObjectTemplates
      } else {
        return []
      }
    }

    private forEachElement (data: any) : ObjectTemplate[] {
      let _temp: ObjectTemplate[] = []
      data.forEach((_list: any) => {
        _temp = _temp.concat(_list.filter((_object : ObjectTemplate) => { return _object.Stats[StatTypeEnum.Tag].Data === 'name' }).map((_object: any) => {
          return new ObjectTemplate(RegionEnum.List, ObjectTypeEnum.ListRow, SubObjectTypeEnum.ParentObject, ActionTypeEnum.None, this.reStructure(_object.Stats))
        }))
      })
      return _temp
    }

    private reStructure (stats: any): any {
      let temp = {}
      stats.forEach((_stat : any, _index: number) => { temp = Object.assign(temp, { [_index]: StatType.StatTypes[_index]().CreateStat().InitData(_stat.Data != null ? _stat.Data : '') }) })
      return temp
    }

    public InitSet (_objectTemplates: ObjectTemplate[]): ObjectTemplate[] {
      this.ObjectTemplates = _objectTemplates
      return this.ObjectTemplates
    }

    protected SubscribeConditions (): void {
      // RegionType.RegionTypes[RegionEnum.Table].ObjectTypes[ObjectTypeEnum.Button].SubscribeLogic(this.Button.bind(this))
    }

    public UnsubscribeConditions () {
      // RegionType.RegionTypes[RegionEnum.Table].ObjectTypes[ObjectTypeEnum.Button].NullifyLogic()
    }

    protected Button (_eventHandler: EventHandlerType): void {
      throw new Error('Method not implemented.')
    }
  }

}
