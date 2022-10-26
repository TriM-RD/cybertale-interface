import { Manager } from './actionTypes/types'

export enum ActionTypeEnum {
  None,
  Click,
  Insert,
  InsertUrl,
  AppendEntity,
  InsertNumber,
  Check
}

export class ActionType {
 public static ActionTypes: { [index: number]: Manager.Events.Type.MethodTypeAbstract } = {
   [ActionTypeEnum.None]: new Manager.Events.Type.None(),
   [ActionTypeEnum.Click]: new Manager.Events.Type.Click(),
   [ActionTypeEnum.Insert]: new Manager.Events.Type.Insert(),
   [ActionTypeEnum.InsertUrl]: new Manager.Events.Type.InsertUrl(),
   [ActionTypeEnum.AppendEntity]: new Manager.Events.Type.AppendEntity(),
   [ActionTypeEnum.InsertNumber]: new Manager.Events.Type.InsertNumber(),
   [ActionTypeEnum.Check]: new Manager.Events.Type.Check()
 }
}
