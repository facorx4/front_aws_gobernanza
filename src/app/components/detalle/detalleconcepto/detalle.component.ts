import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConceptosService } from 'src/app/services/conceptos/conceptos.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',

})
export class DetalleComponent implements OnInit {
  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];
  listConceptos = [];
  nombreConcepto: string;
  idConcepto: string;
  estiloDetalle: String;
  

  constructor(public conceptoService: ConceptosService,
    private estilosService: EstilosService,
    private routerParams: ActivatedRoute) {

      this.idConcepto = this.routerParams.snapshot.paramMap.get('id');

    }
  
    ngOnInit(): void {
      this.cargarData();
      this.cargarEstilos();
    }
    
    cargarEstilos() {
      this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
        datos => {
        this.estiloDetalle = datos.tituloDetalle;
        })
      }

    cargarData() {
      this.conceptoService.getOne(this.idConcepto)
        .subscribe(
          datos => {
            this.listConceptos = datos.conceptos
            this.nombreConcepto =  datos.nombre
          }
        )
    }
  
  }
  