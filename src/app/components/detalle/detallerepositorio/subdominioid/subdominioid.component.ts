import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubdominioIdService } from 'src/app/services/repositorios/subdominioId.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';


@Component({
  selector: 'app-subdominioid',
  templateUrl: './subdominioid.component.html'
})
export class SubdominioidDetalleComponent implements OnInit {


  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = ''; 

  nombre: string;
  idRepo: string;
  

  

  constructor(
    private routerParams: ActivatedRoute,
    private subserv: SubdominioIdService,
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
      this.subserv.getOne(this.idRepo)
        .subscribe(
          datos => {
      
            this.nombre =  datos.nombre
           
          }
        )
    }
}
