import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoTablaCampoService } from 'src/app/services/repoconsultas/repotablacampo.service';
import { RepoTablaService } from 'src/app/services/repoconsultas/repotablas.service';

import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';



@Component({
  selector: 'app-detallertcampo',
  templateUrl: './detallertcampo.component.html',

})
export class DetallertcampoComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';


  listRepoEsquema = [];
  nombre: string;
  identificador: string;
  Descripcion: string;
  Manual: string
  Profundidad: string;
  Longitud: string;
  Decimales: string;
  LlavePrimaria: string;
  PermiteNulos: string;
  repositorioTabla: string;
  idrcampo: string;

  constructor(public rcampoService: RepoTablaCampoService,
    private routerParams: ActivatedRoute,
    public tablaserv: RepoTablaService,
    private estilosService: EstilosService
    
    ) {
    this.idrcampo = this.routerParams.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarData();
    this.cargarEstilos()
   

  }

  cargarEstilos() {
    this.estilosService.getOne(this.usuario.estilo).subscribe(
      datos => {
        this.tituloDetalle = datos.tituloDetalle
      })
  }


  cargarData() {
    this.rcampoService.getOne(this.idrcampo)
      .subscribe(
        datos => {
          this.listRepoEsquema = datos.conceptonegocio
          this.nombre = datos.Nombre
          this.identificador = datos.identificador
          this.Descripcion = datos.Descripcion
          this.Manual = datos.Manual
          this.Profundidad = datos.Profundidad
          this.Longitud = datos.Longitud
          this.Decimales = datos.Decimales
          this.LlavePrimaria = datos.LlavePrimaria
          this.PermiteNulos = datos.PermiteNulos;
          this.tablaserv.getOne(datos.repositorioTabla)
          .subscribe(
            datos => {
              this.repositorioTabla = datos.nombre
            }
          )

        }
      )
  }
}