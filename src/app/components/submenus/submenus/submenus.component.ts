//angular imports//
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import servicios//
import { SubmenusService } from 'src/app/services/submenus/submenus.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
//jwt//
import jwt_decode from 'jwt-decode';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-submenus',
	templateUrl: './submenus.component.html',

})
export class SubmenusComponent implements OnInit {

	//Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	//Permisos Usuario//
	permisoEditar = this.datosUsuario.permisos[1];
	permisoEliminar = this.datosUsuario.permisos[3];
	permisoConsultar = this.datosUsuario.permisos[2];
	permisoCrear = this.datosUsuario.permisos[0];
	//objetos estilo//
	estiloBotonoAccion: String;
	estiloBotonNuevo: String;
	colorPaginador: string = "";
	//objetos locales//
	pageActual: number = 1;
	listaSubmenus = [];
	cargando: boolean = false;

	//import y export//
	uploadedFiles: Array < File > 
	fileName= 'Submenu.xlsx';
	fileNametxt= 'Submenu.txt';
	idComponet: string;
	mostrar = false;


	constructor(private sumbenuServ: SubmenusService,
		private estilosService: EstilosService,
		private router: Router
	) { }

	//pipes filter//
	filterTitulo = '';
	filterRuta = '';
	filterGeneral = '';

	ngOnInit(): void {
		this.listSubmenus();
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
		this.sumbenuServ.uploadFile(archivo).subscribe((res)=> {
			
			Swal.close();
			Swal.fire({
				icon: 'success',
				title: 'Archivo Cargado',
				text: 'Se ha cargado correctamente el archivo'
			});
	
			this.router.navigateByUrl('/submenu/lista');
	
		});
		
		}
	
		crearImport() {
			
			this.sumbenuServ.createImport(this.idComponet)
			  .subscribe(
				res => {
				  Swal.fire({
					icon: 'success',
					title: 'Archivo Guardado',
					text: 'Se ha guardado correctamente el rol!',
					
				  });
				  this.router.navigateByUrl('/submenu/lista')
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
	Imprimimos la lista de submenus
	**********************************************************************************************/
	listSubmenus() {
		this.cargando = true;
		this.sumbenuServ.getAll().subscribe(
			resp => {
				this.cargando = false;
				this.listaSubmenus = resp['data'];
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
			text: `Esta seguro que desea eliminar `,
			icon: 'question',
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'SI, eliminar!'
		}).then((result) => {

			if (result.isConfirmed) {

				this.listaSubmenus.splice(i, 1);//renderizamos el componente de la lista de usuarios
				this.sumbenuServ.eliminar(id).subscribe()
				Swal.fire({
					title: 'Eliminado',
					text: 'Se ha eliminado correctamente!',
					icon: 'success'
				});

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


}
