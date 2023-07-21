export interface RoleWiseModules {
    
  IsSucsess: boolean
  Message: string
  StatusCode: number
  Response: RoleWiseResponse[]


}

export interface Response {
  ParentModules: ParentModule[]
}

export interface ParentModule {
  ChildModules?: ChildModule[]
  ID: number
  ModuleCode: string
  ModuleName: string
}

export interface ChildModule {
  ID: number
  ModuleCode: string
  ModuleName: string
}
  export interface RoleWiseResponse {
    ParentModules: ParentModule[]
  }

  export interface ReqRoleWiseModule {
    RoleCode: string
  }