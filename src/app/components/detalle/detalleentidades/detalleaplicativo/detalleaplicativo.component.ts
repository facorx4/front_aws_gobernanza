import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AplicativoService } from 'src/app/services/aplicativos/aplicativo.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-detalleaplicativo',
  templateUrl: './detalleaplicativo.component.html',
 
})
export class DetalleaplicativoComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  idApl: string;
  nombre: string;

  constructor(public apliService: AplicativoService,
    private routerParams: ActivatedRoute, private router: Router,
    private estilosService: EstilosService) { 
    
    
      this.idApl = this.routerParams.snapshot.paramMap.get('id');
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
  
    this.apliService.getOne(this.idApl)
      .subscribe(
        datos => {
             
          this.nombre = datos.nombre
        }
      )
  }

}

