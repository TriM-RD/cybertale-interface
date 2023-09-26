import { Definitions } from '@/definitions/appDefinitions'

import { ResolverAbstract } from '@/resolvers/resolverAbstract'
import * as Device from '@/resolvers/device/'
import * as Group from '@/resolvers/group/'
import * as Attribute from '@/resolvers/attribute/'
import * as Division from '@/resolvers/division/'
import * as Administration from '@/resolvers/administration/'
export class ResolverType {
  public static ResolverTypes: { [index: string]: ResolverAbstract } = {
    [Definitions.Other.Any]: new Device.Def.DefHandler(),
    // Device
    [Definitions.Device.Def]: new Device.Def.DefHandler(),
    [Definitions.Device.Add]: new Device.Add.AddHandler(),
    [Definitions.Device.Edit]: new Device.Edit.EditHandler(),
    [Definitions.Device.Replace]: new Device.Replace.ReplaceHandler(),
    [Definitions.Device.Modal]: new Device.Modal.ModalHandler(),
    // Group
    [Definitions.Group.Def]: new Group.Def.DefHandler(),
    [Definitions.Group.Add]: new Group.Add.AddHandler(),
    [Definitions.Group.Edit]: new Group.Edit.EditHandler(),
    // Attribute
    [Definitions.Attribute.Def]: new Attribute.Def.DefHandler(),
    [Definitions.Attribute.Add]: new Attribute.Add.AddHandler(),
    [Definitions.Attribute.Edit]: new Attribute.Edit.EditHandler(),
    // Division
    [Definitions.Division.Def]: new Division.Def.DefHandler(),
    [Definitions.Division.Add]: new Division.Add.AddHandler(),
    [Definitions.Division.Edit]: new Division.Edit.EditHandler(),
    // Division
    [Definitions.Administration.Def]: new Administration.Def.DefHandler(),
    [Definitions.Administration.Add]: new Administration.Add.AddHandler(),
    [Definitions.Administration.Edit]: new Administration.Edit.EditHandler()
  }
}
