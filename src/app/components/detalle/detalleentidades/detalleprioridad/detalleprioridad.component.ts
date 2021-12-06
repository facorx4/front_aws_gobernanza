import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrioridadService } from 'src/app/services/prioridad/prioridad.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-detalleprioridad',
  templateUrl: './detalleprioridad.component.html',

})
export class DetalleprioridadComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  idPrio: string;
  nombre: string;

  constructor(public prioridadService: PrioridadService,
    private routerParams: ActivatedRoute, private router: Router,
    private estilosService: EstilosService) {

      this.idPrio = this.routerParams.snapshot.paramMap.get('id');
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
  
      this.prioridadService.getOne(this.idPrio)
        .subscribe(
          datos => {
               
            this.nombre = datos.nombre
          }
        )
    }
  
  }
  