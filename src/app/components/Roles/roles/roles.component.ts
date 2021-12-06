//angular imports//
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import servicios//
import { RolesService } from 'src/app/services/userRoles/roles.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import * as XLSX from 'xlsx';


//librerias//
import Swal from 'sweetalert2';
//jwt//
import jwt_decode from 'jwt-decode';

@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {


	

	//Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	//Permisos Usuario//
	permisoEditar = this.datosUsuario.permisos[1];
	permisoEliminar = this.datosUsuario.permisos[3];
	permisoConsultar = this.datosUsuario.permisos[2];
	permisoCrear = this.datosUsuario.permisos[0];
	//objetos estilos// 
	colorPaginador: string = "";
	estiloBotonoAccion: String;
	estiloBotonNuevo: String;
	//objetos locales//
	listaRolesUser = [];
	listaRolesUserTemp = [];
	cargando: boolean = false;
	pageActual: number = 1;
	//import y export//
	uploadedFiles: Array < File > 
    fileName= 'Roles.xlsx';
	fileNametxt= 'Roles.txt';
	idComponet: string;
	mostrar = false;

	constructor(private rolesServ: RolesService,
		private router: Router,
		private estilosService: EstilosService,
		private busquedasService: BusquedasService, 
		//private excelServices: ExporterService
	) { }
	//pipe filter//
	filterPost = '';
	filterNomRol = '';
	filterGlobal = '';


	ngOnInit(): void {
		this.listaRoles();
		this.cargarEstilos();
		
	}

fileChange(element) {
    this.uploadedFiles = element.target.files;
  }
  
  upload() {
	this.mostrar = true;
    let archivo = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
		archivo.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name)
	  
    }
    this.rolesServ.uploadFile(archivo).subscribe((res)=> {
		
		Swal.close();
		Swal.fire({
			icon: 'success',
			title: 'Archivo Cargado',
			text: 'Se ha cargado correctamente el archivo'
		});

		this.router.navigateByUrl('/rol/lista');

    });
	
    }

	crearImport() {
		
		this.rolesServ.createImport(this.idComponet)
		  .subscribe(
			res => {
			  Swal.fire({
				icon: 'success',
				title: 'Archivo Guardado',
				text: 'Se ha guardado correctamente el rol!',
				
			  });
			  this.router.navigateByUrl('/rol/lista')
			  window.location.reload();
			},
			err => {
  
			  Swal.fire({
				title: 'Error al guardar rol',
				text: err.error.message,
				icon: 'error'
			  });
			}
		  )
	  }
	




	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
				this.estiloBotonoAccion = datos.botonAcciones
				this.estiloBotonNuevo = datos.botonCrear
				this.colorPaginador = datos.paginador
			})
	}

	/**********************************************************************************************
	Imprimimos la lista de roles 
	**********************************************************************************************/
	listaRoles() {
		this.cargando = true;
		this.rolesServ.getAll().subscribe(
			resp => {
				this.cargando = false;
				this.listaRolesUser = resp['data'];
				this.listaRolesUserTemp = resp['data'];
			},
			err => {

				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						this.router.navigate(['/login']);
					}
				}

			})
	}

	exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
	console.log(element)
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);


  }

  exporttxt(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileNametxt);


  }

	buscar(termino: string) {

		if (termino.length === 0) {
			return this.listaRolesUser = this.listaRolesUserTemp;

		}

		this.busquedasService.buscar('roles', termino)
			.subscribe(resultados => {

				this.listaRolesUser = resultados;

			});

	}
	eliminar(i, id) {
		Swal.fire({
			title: 'Estas seguro?',
			text: `Esta seguro que desea eliminar`,
			icon: 'question',
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'SI, eliminar!'
		}).then((result) => {

			if (result.isConfirmed) {

				this.listaRolesUser.splice(i, 1);//renderizamos el componente de la lista de usuarios
				this.rolesServ.eliminar(id).subscribe()
				Swal.fire({
					title: 'Eliminado',
					text: 'Se ha eliminado correctamente!',
					icon: 'success'
				});

			}


		})
	}

}

