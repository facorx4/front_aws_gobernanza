import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntidadService } from 'src/app/services/entidad/entidad.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-detalleconcepenti',
  templateUrl: './detalleconcepenti.component.html',

})
export class DetalleconcepentiComponent implements OnInit {
  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];
  //Permisos Usuario//

  permisoConsultar = this.datosUsuario.permisos[2];

  //objetos estilos// 
  colorPaginador: string = "";
  estiloBotonoAccion: String;


  listEntidad = [];
  cargando: boolean = false;
  pageActual: number = 1;
  idConceptoN: string;


  constructor(private EntServ: EntidadService, private routerParams: ActivatedRoute, private estilosService: EstilosService,) {


    this.idConceptoN = this.routerParams.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.listaEntidades()
    this.cargarEstilos();
	}

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
				this.estiloBotonoAccion = datos.botonAcciones
		
				this.colorPaginador = datos.paginador
			})
	}


  listaEntidades() {
    this.cargando = true;
    this.EntServ.getBusqueda(this.idConceptoN)
      .subscribe(resp => {
        this.cargando = false;
        this.listEntidad = resp


      })
  }
}
