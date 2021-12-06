//angular imports//
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//import servicios//
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
//jwt//
import jwt_decode from 'jwt-decode';
//expor xlsx//
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];
  //Permisos Usuario//
  permisoEditar = this.datosUsuario.permisos[1];
  permisoEliminar = this.datosUsuario.permisos[3];
  permisoConsultar = this.datosUsuario.permisos[2];
  permisoCrear = this.datosUsuario.permisos[0];
  //objetos locales//  
  usuarios = [];
  usuariosTemp = [];
  totalUsuarios: number = 0;
  pageActual: number = 1;
  //objetos estilos//
  estiloBotonoAccion: String;
  estiloBotonNuevo: String;
  colorPaginador: string = "";
  //export e import data//
  uploadedFiles: Array < File > 
  fileName= 'Usuarios.xlsx';
	fileNametxt= 'Usuarios.txt';

	idUser: string;
	mostrar = false;


  cargando: boolean = false;
  constructor(private usuariosService: UsuariosService,
    private router: Router,
    private estilosService: EstilosService,
    private busquedasService: BusquedasService) { }

  filterGeneral = '';

  ngOnInit(): void {
    this.cargarEstilos();
    this.listaUsuarios()
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
    this.usuariosService.uploadFile(archivo).subscribe((res)=> {
		
		Swal.close();
		Swal.fire({
			icon: 'success',
			title: 'Archivo Cargado',
			text: 'Se ha cargado correctamente el archivo'
		});

		this.router.navigateByUrl('/usuario/lista');

    });
	
    }

	crearImport() {
		
		this.usuariosService.createImport(this.idUser)
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
    exportexcel(): void
    {
      /* pass here the table id */
      let element = document.getElementById('excel-table');
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

  /**********************************************************************************************
Metodo para listar los usuarios
**********************************************************************************************/
  listaUsuarios() {
    this.cargando = true;

    this.usuariosService.getAll()
      .subscribe(
        ({ total, data }) => {
          this.totalUsuarios = total;
          this.usuarios = data;
          this.usuariosTemp = data;
          this.cargando = false;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login']);
            }
          }
        }
      )

  }

  /**********************************************************************************************
  Metodo para eliminar un usuario
  **********************************************************************************************/
  eliminarUser(idUsuario: string, indice: number) {



    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta seguro que desea eliminar a `,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.usuarios.splice(indice, 1);//renderizamos el componente de la lista de usuarios
        this.usuariosService.eliminar(idUsuario).subscribe()
        Swal.fire({
          title: 'Eliminado',
          text: 'Se ha eliminado correctamente el usuario!',
          icon: 'success'
        });

      }


    })

  }




  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;

    }

    this.busquedasService.buscar('usuarios', termino)
      .subscribe(resultados => {
        this.usuarios = resultados;

      });


  }


}
