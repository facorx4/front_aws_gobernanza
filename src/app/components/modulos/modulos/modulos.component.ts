//angular imports//
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import servicios//
import { ModulosService } from 'src/app/services/userModulos/modulos.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
//jwt//
import jwt_decode from 'jwt-decode';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-modulos',
	templateUrl: './modulos.component.html',

})
export class ModulosComponent implements OnInit {

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
	estiloBotonoAccion: String;
	estiloBotonNuevo: String;
	colorPaginador: string = "";
	//objetos locales//
	listaModulosUser = [];
	cargando: boolean = false;
	pageActual: number = 1;
	//import y export//
	uploadedFiles: Array < File > 
    fileName= 'Modulos.xlsx';
	fileNametxt= 'Modulos.txt';
	idComponet: string;
	mostrar = false;


	constructor(private moduloService: ModulosService,
		private estilosService: EstilosService,
		private router: Router) { }

	filterTituloM = '';
	filterGeneralM = '';

	ngOnInit(): void {
		this.listaModulos();
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
		this.moduloService.uploadFile(archivo).subscribe((res)=> {
			
			Swal.close();
			Swal.fire({
				icon: 'success',
				title: 'Archivo Cargado',
				text: 'Se ha cargado correctamente el archivo'
			});
	
			this.router.navigateByUrl('/modulo/lista');
	
		});
		
		}
	
		crearImport() {
			
			this.moduloService.createImport(this.idComponet)
			  .subscribe(
				res => {
				  Swal.fire({
					icon: 'success',
					title: 'Archivo Guardado',
					text: 'Se ha guardado correctamente el rol!',
					
				  });
				  this.router.navigateByUrl('/modulo/lista')
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
	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
				this.estiloBotonoAccion = datos.botonAcciones
				this.estiloBotonNuevo = datos.botonCrear
				this.colorPaginador = datos.paginador
			})
	}

	listaModulos() {
		this.cargando = true;
		this.moduloService.getAll().subscribe(
			resp => {
				this.cargando = false;
				this.listaModulosUser = resp['data'];
			},
			err => {

				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						this.router.navigate(['/login']);
					}
				}

			})
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

				this.listaModulosUser.splice(i, 1);//renderizamos el componente de la lista de usuarios
				this.moduloService.eliminar(id).subscribe()
				Swal.fire({
					title: 'Eliminado',
					text: 'Se ha eliminado correctamente!',
					icon: 'success'
				});

			}


		})
	}
}