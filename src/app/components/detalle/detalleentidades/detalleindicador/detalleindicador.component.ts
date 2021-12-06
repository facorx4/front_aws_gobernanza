import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadorService } from 'src/app/services/indicador/indicador.service';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { CompaniaAreaService } from 'src/app/services/companiaArea/companiaArea.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';


@Component({
  selector: 'app-detalleindicador',
  templateUrl: './detalleindicador.component.html',
  
})
export class DetalleindicadorComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  idIdent: string;
  nombre: string;
  constructor(public ideService: IndicadorService,
    private routerParams: ActivatedRoute, private router: Router,
    private estilosService: EstilosService) { 
   
   
    this.idIdent = this.routerParams.snapshot.paramMap.get('id');
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

   this.ideService.getOne(this.idIdent)
     .subscribe(
       datos => {
            
         this.nombre = datos.nombre
       }
     )
 }

}
