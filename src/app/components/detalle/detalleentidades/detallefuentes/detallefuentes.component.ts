import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuenteOficialService } from 'src/app/services/fuentesoficiales/fuenteoficial.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-detallefuentes',
  templateUrl: './detallefuentes.component.html',
 
})
export class DetallefuentesComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';
  
  idFuent: string;
  nombre: string;
  constructor(public fuentService: FuenteOficialService,
    private routerParams: ActivatedRoute, private router: Router,
    private estilosService: EstilosService) { 
   
   
    this.idFuent = this.routerParams.snapshot.paramMap.get('id');
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

   this.fuentService.getOne(this.idFuent)
     .subscribe(
       datos => {
            
         this.nombre = datos.nombre
       }
     )
 }

}
