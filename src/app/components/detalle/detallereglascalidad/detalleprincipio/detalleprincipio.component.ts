import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrincipiosService} from 'src/app/services/principios/principios.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-detalleprincipio',
  templateUrl: './detalleprincipio.component.html',
 
})
export class DetalleprincipioComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';
  
  listConceptonegocio = [];
  nombre: string;
  descrip: string;
  idPri: string;
 

  constructor(public prinService: PrincipiosService,
    private routerParams: ActivatedRoute, private router: Router,
    private estilosService: EstilosService) { 
      this.idPri = this.routerParams.snapshot.paramMap.get('id');
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
    this.prinService.getOne(this.idPri)
      .subscribe(
        datos => {
          this.listConceptonegocio = datos.conceptonegocio
          this.nombre =  datos.nombre
          this.descrip = datos.descripcion
         
        }
      )
  }

}
