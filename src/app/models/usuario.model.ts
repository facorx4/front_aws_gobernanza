export class UsuarioModel{
    _id: string
    userNombres: string
    userApellidos: string
    userSys:string
    userEmail: string
    userPassword: string
    userEstado: boolean
    userRolID: string
    userLastDate : string
    userDateAdd: string
    userAvatar: string
    permisos: Array<string>
    permisoCosultar: string
	permisoCrear: string
	permisoModificar: string
	permisoEliminar: string
	permisoImportar: string
	permisoImprimir: string
	permisoExportar: string
    userContacto?:string
    userSobreMi?:string
    estilo: string
}

