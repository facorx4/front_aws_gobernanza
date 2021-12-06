//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import { ValidadoresService } from 'src/app/services/usuarios/validadores.service';
import { EstiloModel } from 'src/app/models/estilo.model';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-estilo',
  templateUrl: './estilo.component.html',

})
export class EstiloComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];
  //objetos estilos//
  botonGuardar: string = ""
  botonAgregar: string = ""
  //objetos locales//
  nuevoEstilo: FormGroup;//referencia local del formulario
  estilo: EstiloModel;
  tituloPage: string;
  idEstilo: string;

  public coloresBotones = [
    { value: 'btn btn-success', nombre: 'verde' },
    { value: 'btn btn-primary', nombre: 'azul' },
    { value: 'btn btn-secundary', nombre: 'gris' },
    { value: 'btn btn-danger', nombre: 'rojo' },
    { value: 'btn btn-warning', nombre: 'amarillo' },
    { value: 'btn btn-info', nombre: 'azul claro' },
    { value: 'btn btn-blank', nombre: 'blanco' },
    { value: 'btn btn-dark', nombre: 'negro' },
    { value: 'btn btn-link', nombre: 'subrayado' }
  ]

  public coloresAccion = [
    { value: 'btn btn-success dropdown-toggle', nombre: 'verde' },
    { value: 'btn btn-primary dropdown-toggle', nombre: 'azul' },
    { value: 'btn btn-secundary dropdown-toggle', nombre: 'gris' },
    { value: 'btn btn-danger dropdown-toggle', nombre: 'rojo' },
    { value: 'btn btn-warning dropdown-toggle', nombre: 'amarillo' },
    { value: 'btn btn-info dropdown-toggle', nombre: 'azul claro' },
    { value: 'btn btn-blank dropdown-toggle', nombre: 'blanco' },
    { value: 'btn btn-dark dropdown-toggle', nombre: 'negro' },
    { value: 'btn btn-link dropdown-toggle', nombre: 'subrayado' }
  ]

  public coloresGuardar = [
    { value: 'btn btn-next btn-success', nombre: 'verde' },
    { value: 'btn btn-next btn-primary', nombre: 'azul' },
    { value: 'btn btn-next btn-secundary', nombre: 'gris' },
    { value: 'btn btn-next btn-danger', nombre: 'rojo' },
    { value: 'btn btn-next btn-warning', nombre: 'amarillo' },
    { value: 'btn btn-next btn-info', nombre: 'azul claro' },
    { value: 'btn btn-next btn-blank', nombre: 'blanco' },
    { value: 'btn btn-next btn-dark', nombre: 'negro' },
    { value: 'btn btn-next btn-link', nombre: 'subrayado' }
  ]
  public coloresDetalle = [
    { value: 'list-group-item active list-group-item-action list-group-item-success', nombre: 'verde oscuro' },
    { value: 'list-group-item list-group-item-action list-group-item-success', nombre: 'verde claro' },
    { value: 'list-group-item active', nombre: 'azul oscuro' },
    { value: 'list-group-item list-group-item-action list-group-item-primary', nombre: 'azul claro' },
    { value: 'list-group-item list-group-item-action list-group-item-secondary', nombre: 'gris' },
    { value: 'list-group-item active list-group-item-action list-group-item-danger', nombre: 'rojo oscuro' },
    { value: 'list-group-item list-group-item-action list-group-item-danger', nombre: 'rojo claro' },
    { value: 'list-group-item list-group-item-action list-group-item-warning', nombre: 'amarillo claro' },
    { value: 'list-group-item active list-group-item-action list-group-item-warning', nombre: 'amarillo oscuro' },
    { value: 'list-group-item list-group-item-action list-group-item-blank', nombre: 'blanco' },
    { value: 'list-group-item active list-group-item-action list-group-item-dark', nombre: 'negro' },
  ]

  public coloresPaginador = [
    { value: 'custom-pagination-verde', nombre: 'verde' },
    { value: 'custom-pagination-verde-claro', nombre: 'verde claro' },
    { value: 'custom-pagination-rojo-oscuro', nombre: 'rojo oscuro' },
    { value: 'custom-pagination-rojo-claro', nombre: 'rojo claro' },
    { value: 'custom-pagination-azul-oscuro', nombre: 'azul oscuro' },
    { value: 'custom-pagination-azul-claro', nombre: 'azul claro' },
    { value: 'custom-pagination-amarillo-claro', nombre: 'amarillo claro' },
    { value: 'custom-pagination-amarillo', nombre: 'amarillo' },
    { value: 'custom-pagination-blanco', nombre: 'blanco' },
    { value: 'custom-pagination-negro', nombre: 'negro' },

  ]


  public coloresDashboard = [
    { value: 'panel-header bg-success-gradient', nombre: 'verde' },
    { value: 'panel-header bg-primary-gradient', nombre: 'azul' },
    { value: 'panel-header bg-secundary-gradient', nombre: 'gris' },
    { value: 'panel-header bg-danger-gradient', nombre: 'rojo' },
    { value: 'panel-header bg-warning-gradient', nombre: 'amarillo' },
    { value: 'panel-header bg-info-gradient', nombre: 'azul claro' },
    { value: 'panel-header bg-blank-gradient', nombre: 'blanco' },
    { value: 'panel-header bg-dark-gradient', nombre: 'negro' },
    { value: 'panel-header bg-link-gradient', nombre: 'subrayado' }
  ]

  listaColores = [
    { value: 'verde', nombre: 'verde' },
    { value: 'azul', nombre: 'azul' },
    { value: 'gris', nombre: 'gris' },
    { value: 'rojo', nombre: 'rojo' },
    { value: 'amarillo', nombre: 'amarillo' },
    { value: 'azul-claro', nombre: 'azul claro' },
    { value: 'blanco', nombre: 'blanco' },
    { value: 'dark', nombre: 'negro' },
  ]

  constructor(public estiloService: EstilosService,
    private router: Router,
    private fb: FormBuilder,
    private validadores: ValidadoresService,
    private routerParams: ActivatedRoute,
  ) {




    this.idEstilo = this.routerParams.snapshot.paramMap.get('id');
    if (!this.idEstilo) {
      this.tituloPage = "Nuevo Estilo"
    } else {
      this.tituloPage = "Editar Estilo"
      this.cargarDataFormulario();
    }
    this.crearFormularioNewuser();
  }

  ngOnInit(): void {

    this.cargarEstilos();


  }

  cargarEstilos() {
    this.estiloService.getOne(this.datosUsuario.estilo).subscribe(
      datos => {

        this.botonGuardar = datos.botonGuardar

        this.botonAgregar = datos.botonAgregar
      })
  }



  crearFormularioNewuser() {

    this.nuevoEstilo = this.fb.group({

      nombre: ['', [Validators.required]],
      navbar: [''],
      sidebar: [''],
      header: [''],
      botonCrear: [''],
      botonGuardar: [''],
      botonAcciones: [''],
      botonAgregar: [''],
      tituloDetalle: [''],
      paginador: [''],
      dasboard: [''],
      logoCompania: ['http://placehold.it/100x100'],



    }, {
      //validaciones a nivel del formulario 
      //validators: this.validadores.passwordIguales('userPassword', 'userConfirPassword')
    })

  }



  cargarDataFormulario() {
    this.estiloService.getOne(this.idEstilo)
      .subscribe(
        datos => {
          this.nuevoEstilo.reset({
            nombre: datos.nombre,
            navbar: datos.navbar,
            sidebar: datos.sidebar,
            header: datos.header,
            botonCrear: datos.botonCrear,
            botonGuardar: datos.botonGuardar,
            botonAcciones: datos.botonAcciones,
            botonAgregar: datos.botonAgregar,
            tituloDetalle: datos.tituloDetalle,
            paginador: datos.paginador,
            dasboard: datos.dasboard,
            logoCompania: datos.logoCompania,


          })
        }
      )
  }

  handleFileInput(files: FileList) {
    var image = { file: files.item(0), upload_preset: 'hsgcl027' }
    let formData: FormData = new FormData();
    formData.append('upload_preset', 'hsgcl027');
    formData.append('file', files.item(0));
    this.estiloService.uploadImage(formData)
      .subscribe(
        datos => {
          this.imageUpload(datos.secure_url)
        })
  }

  imageUpload(url) {
    this.nuevoEstilo.reset({
      nombre: this.nuevoEstilo.value.nombre,
      navbar: this.nuevoEstilo.value.navbar,
      sidebar: this.nuevoEstilo.value.sidebar,
      header: this.nuevoEstilo.value.header,
      botonCrear: this.nuevoEstilo.value.botonCrear,
      botonGuardar: this.nuevoEstilo.value.botonGuardar,
      botonAcciones: this.nuevoEstilo.value.botonAcciones,
      botonAgregar: this.nuevoEstilo.value.botonAgregar,
      tituloDetalle: this.nuevoEstilo.value.tituloDetalle,
      paginador: this.nuevoEstilo.value.paginador,
      dasboard: this.nuevoEstilo.value.dasboard,
      logoCompania: url

    })
  }


  crearEstilo() {
    if (this.idEstilo) {
      /***********************************************************************************
      Funcion para editar modulo
      ***********************************************************************************/
      Swal.fire({
        title: 'Espere un momento',
        text: "Estamos actualizando la informacion",
        icon: 'info',
        allowOutsideClick: false
      })
      Swal.showLoading();

      this.estiloService.edit(this.idEstilo, this.nuevoEstilo.value)
        .subscribe(
          res => {
            Swal.fire({
              title: this.nuevoEstilo.get('nombre').value,
              text: 'Se actualizo correctamente el estilo!',
              icon: 'success'
            });
            this.router.navigateByUrl('/estilo/lista')
          },
          err => {
            Swal.fire({
              title: 'Error al actualizar el estilo',
              text: err.error.message,
              icon: 'error'
            });
          }

        )

    } else {

      /***********************************************************************************
      Validamos si el formulario es valido de no ser asi retornamos el posteo 
      ***********************************************************************************/
      if (this.nuevoEstilo.invalid) {
        return Object.values(this.nuevoEstilo.controls).forEach(control => {
          control.markAllAsTouched();
        });
      }

      Swal.fire({
        title: 'Espere un momento',
        text: "Estamos Guardando la informacion",
        icon: 'info',
        allowOutsideClick: false
      })
      Swal.showLoading();


      this.estiloService.create(this.nuevoEstilo.value)
        .subscribe(
          res => {
            Swal.fire({
              title: this.nuevoEstilo.get('nombre').value,
              text: 'Se ha creado correctamente el estilo!',
              icon: 'success'
            });
            this.router.navigateByUrl('/estilo/lista')
          },
          err => {

            Swal.fire({
              title: 'Error al guardar estilo',
              text: err.error.message,
              icon: 'error'
            });
          }
        )
    }
  }



  /**************************************************************************************
  agregamos get's para las validaciones de los input
  **************************************************************************************/

  get nombreNoValid() {
    return this.nuevoEstilo.get('nombre').invalid && this.nuevoEstilo.get('nombre').touched;
  }
  get nombreValid() {
    return this.nuevoEstilo.get('nombre').valid && this.nuevoEstilo.get('nombre').touched;
  }


}

