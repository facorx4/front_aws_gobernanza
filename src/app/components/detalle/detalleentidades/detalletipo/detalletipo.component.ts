import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEntDatoService } from 'src/app/services/tipoentidadDato/tipoentdato.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';



@Component({
  selector: 'app-detalletipo',
  templateUrl: './detalletipo.component.html',

})
export class DetalletipoComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  idTipo: string;
  nombre: string;


  constructor(public tipoService: TipoEntDatoService,
    private routerParams: ActivatedRoute, private router: Router,
    private estilosService: EstilosService
  ) { 

    this.idTipo = this.routerParams.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarData();
    this.cargarEstilos();
    
  }

  cargarEstilos() {
    this.estilosService.getOne(this.usuario.estilo).subscribe(
      datos => {
        this.tituloDetalle = datos.tituloDetalle
      })
  }
  cargarData() {

    this.tipoService.getOne(this.idTipo)
      .subscribe(
        datos => {
             
          this.nombre = datos.nombre
        }
      )
  }

}
