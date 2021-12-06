import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { TiposdereglasService} from 'src/app/services/tiposdereglas/tiposdereglas.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-detalletiposdereglas',
  templateUrl: './detalletiposdereglas.component.html',
 
})
export class DetalletiposdereglasComponent implements OnInit {

  
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  listTr = [];
  nombre: string;
  idTr: string;
 

  constructor(public trservice: TiposdereglasService,
    private routerParams: ActivatedRoute,
    private estilosService: EstilosService) { 
      this.idTr = this.routerParams.snapshot.paramMap.get('id');
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
    this.trservice.getOne(this.idTr)
      .subscribe(
        datos => {
          this.listTr = datos.tiposdereglas
          this.nombre =  datos.nombre
       
         
        }
      )
  }

}
