import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoRepositorioService } from 'src/app/services/repositorios/tipoRepositorio.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';


@Component({
  selector: 'app-tiporepositorio',
  templateUrl: './tiporepositorio.component.html'
})
export class DetalleTiporepositorioComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  nombre: string;
  idRepo: string;

  constructor(
    private routerParams: ActivatedRoute,
    private tiposerv: TipoRepositorioService,
    private estilosService: EstilosService
  ) {

    this.idRepo = this.routerParams.snapshot.paramMap.get('id');

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
    this.tiposerv.getOne(this.idRepo)
      .subscribe(
        datos => {
          this.nombre = datos.nombre
        }
      )
  }

}
