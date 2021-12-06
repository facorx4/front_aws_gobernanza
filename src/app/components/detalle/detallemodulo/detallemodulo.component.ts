import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModulosService } from 'src/app/services/userModulos/modulos.service';
import { SubmenusService } from 'src/app/services/submenus/submenus.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-detallemodulo',
  templateUrl: './detallemodulo.component.html',
 
})
export class DetallemoduloComponent implements OnInit {
  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];

  listaSubmenus = [];
  cargando: boolean = false;
  nombreModulo: string;
  idModulo: string;
  iconoModulo: string;
  pageActual: number = 1;
  estiloDetalle: String;
  public colorPaginador: string = "";

  constructor(public moduloService: ModulosService,
    private routerParams: ActivatedRoute, 
    private estilosService: EstilosService,
    private router: Router,
    public submenusServ:SubmenusService,) {

      this.idModulo = this.routerParams.snapshot.paramMap.get('id');
     }

  ngOnInit(): void {
    this.cargarData();
    this.cargarEstilos();
  }
  cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
		  datos => {
			this.estiloDetalle = datos.tituloDetalle;
      this.colorPaginador = datos.paginador
		  })
	  }
  cargarData() {
    this.cargando = true;
    this.moduloService.getOne(this.idModulo)
      .subscribe(
        datos => {
          this.cargando = false;
     
          this.listaSubmenus = datos.submenu
          this.nombreModulo =  datos.titulo
          this.iconoModulo = datos.icono
        }
      )
  }

}
