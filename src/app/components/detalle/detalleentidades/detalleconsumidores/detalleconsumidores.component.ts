import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OtrosConsumidoresService } from 'src/app/services/otrosconsumidores/otrosconsumidores.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
@Component({
  selector: 'app-detalleconsumidores',
  templateUrl: './detalleconsumidores.component.html',

})
export class DetalleconsumidoresComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  idcon: string;
  nombre: string;
  constructor(public conService: OtrosConsumidoresService,
    private routerParams: ActivatedRoute, private router: Router,
    private estilosService: EstilosService) { 
   
   
    this.idcon = this.routerParams.snapshot.paramMap.get('id');
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

   this.conService.getOne(this.idcon)
     .subscribe(
       datos => {
            
         this.nombre = datos.nombre
       }
     )
 }

}
