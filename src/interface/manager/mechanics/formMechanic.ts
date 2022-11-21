import { ObjectTemplate } from '../containerClasses/objectTemplate'
import { ObjectType, ObjectTypeEnum } from '../events/types/objectType'
import { SubObjectTypeEnum } from '../events/types/subObjectType'
import { MechanicAbstract } from './mechanicAbstract'
import { Manager as Stat } from '../events/types/statTypes/types'
import http from '@/http-common'
import { StatType, StatTypeEnum } from '../events/types/statType'
import router from '@/router'
import { RegionEnum, RegionType } from '../events/types/region'
import { EventHandlerType } from '../events/types/objectTypes/types'
import { ActionTypeEnum } from '../events/types'

export namespace Manager.Mechanic{

  export class FormMechanic extends MechanicAbstract {
    private id = '-1';
    private inEdit = false;

    public async InitGet (_id = '-1'): Promise<ObjectTemplate[]> {
      this.id = _id
      if (this.id === '-1') {
        this.id = (await http.get('http://blog.test/api/entity/' + this.id)).data
        console.log(this.id)
        const response = await http.get('http://blog.test/api/form')
        return (this.ObjectTemplates = response.data.map((_object: any) => {
          return new ObjectTemplate(_object.Region, _object.ObjectEnum,
            _object.SubObjectEnum, _object.ActionEnum, this.reStructure(_object.Stats,
              {
                [StatTypeEnum.Id]: StatType.StatTypes[StatTypeEnum.Id]().CreateStat()
                  .InitData(String(this.id))
              }))
        }))
      }
      const response = await http.get('http://blog.test/api/entity/' + this.id)
      this.inEdit = true
      return (this.ObjectTemplates = response.data.map((_object: any) => {
        return new ObjectTemplate(_object.Region, _object.ObjectEnum,
          _object.SubObjectEnum, _object.ActionEnum, this.reStructure(_object.Stats))
      }))
    }

    private forEachElement (data: any) : ObjectTemplate[] {
      let _temp: ObjectTemplate[] = []
      data.forEach((_list: any) => {
        _temp = _temp.concat(_list.map((_object: any) => {
          return new ObjectTemplate(_object.Region, _object.ObjectEnum, _object.SubObjectEnum, _object.ActionEnum, this.reStructure(_object.Stats))
        }))
      })
      return _temp
    }

    private reStructure (stats: any, append: any = null): any {
      let temp = {}
      // console.log(stats)
      // stats.forEach((_stat : any, _index: number) => { if (_stat !== undefined) temp = Object.assign(temp, { [_index]: StatType.StatTypes[_index]().CreateStat().InitData(_stat.Data != null ? _stat.Data : '') }) })
      for (let i = 0; i < Object.keys(StatType.StatTypes).length; i++) {
        if (stats[i] !== undefined) {
          temp = Object.assign(temp, { [i]: StatType.StatTypes[i]().CreateStat().InitData(stats[i].Data != null ? stats[i].Data : '') })
        }
      }
      if (append !== null) { temp = Object.assign(temp, append) }
      console.log(temp)
      return temp
    }

    public InitSet (_objectTemplates: ObjectTemplate[]): ObjectTemplate[] {
      this.ObjectTemplates = _objectTemplates
      return this.ObjectTemplates
    }

    protected SubscribeConditions (): void {
      RegionType.RegionTypes[RegionEnum.Form].ObjectTypes[ObjectTypeEnum.Button].SubscribeLogic(this.Button.bind(this))
    }

    public UnsubscribeConditions () {
      RegionType.RegionTypes[RegionEnum.Form].ObjectTypes[ObjectTypeEnum.Button].NullifyLogic()
    }

    protected async Button (eventHandler: EventHandlerType): Promise<void> {
      // const targetCopy = new ObjectTemplate(eventHandler.payload.Region, eventHandler.payload.ObjectEnum, eventHandler.payload.SubObjectEnum, eventHandler.payload.ActionEnum, this.reStructure(Object.values(JSON.parse(JSON.stringify(eventHandler.payload.Stats)))))

      switch (eventHandler.subObjectType) {
        case SubObjectTypeEnum.Middle:
          console.log(this.ObjectTemplates)
          if (this.inEdit) {
            await http.patch('http://blog.test/api/entity/' + this.id, this.ObjectTemplates)
              .then(response => router.push({ name: 'Show', params: { id: response.data.id } }))
          } else {
            await http.post('http://blog.test/api/entity', this.ObjectTemplates)
              .then(response => router.push({ name: 'Show', params: { id: response.data.id } }))
          }
          break
        case SubObjectTypeEnum.ParentObject:
          console.log(this.ObjectTemplates)
          if (this.compare(eventHandler.payload) === -1) { this.ObjectTemplates.splice(this.ObjectTemplates.length - 2, 0, eventHandler.payload) }
          console.log(this.ObjectTemplates)
          break
        case SubObjectTypeEnum.Left:
          console.log(this.ObjectTemplates)
          console.log(eventHandler.payload)
          if (eventHandler.payload.Stats[StatTypeEnum.Value].Data !== '') {
            this.ObjectTemplates.splice(this.compare(eventHandler.payload), 1)
          } else {
            if (this.ObjectTemplates.indexOf(eventHandler.payload) !== -1) {
              this.ObjectTemplates.splice(this.ObjectTemplates.indexOf(eventHandler.payload), 1)
            }
          }
          console.log(this.ObjectTemplates)
          break
        case SubObjectTypeEnum.Right:
          console.log(this.ObjectTemplates)
          console.log(this.ObjectTemplates)
          break
        default:
          break
      }
    }

    private compare (objectToCompare: ObjectTemplate): number {
      let answer = -1
      for (let i = 0; i < this.ObjectTemplates.length; i++) {
        if (this.ObjectTemplates[i].Stats[StatTypeEnum.Value].Data === objectToCompare.Stats[StatTypeEnum.Value].Data) {
          answer = i
          return answer
        }
      }
      return answer
    }
  }

}
