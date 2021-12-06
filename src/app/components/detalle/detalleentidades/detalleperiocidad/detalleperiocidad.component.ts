import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-detalleperiocidad',
  templateUrl: './detalleperiocidad.component.html',
 
})
export class DetalleperiocidadComponent implements OnInit {


  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';
  idPer: string;
  nombre: string;

  constructor(public perService: PeriodicidadService,
    private routerParams: ActivatedRoute, private router: Router,
    private estilosService: EstilosService) {

      this.idPer = this.routerParams.snapshot.paramMap.get('id');
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
  
      this.perService.getOne(this.idPer)
        .subscribe(
          datos => {
               
            this.nombre = datos.nombre
          }
        )
    }
  
  }
  