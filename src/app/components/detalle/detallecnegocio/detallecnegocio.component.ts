import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptonegociosService } from 'src/app/services/conceptonegocio/conceptonegocios.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-detallecnegocio',
  templateUrl: './detallecnegocio.component.html',
})
export class DetallecnegocioComponent implements OnInit {
  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];
  listConceptonegocio = [];
  nombreConceptonegocio: string;
  definiCN: string;
  idConceptonegocio: string;
  uso: string;
  calculo: string;
  estiloDetalle: String;

  constructor(public cnService: ConceptonegociosService,
    private estilosService: EstilosService,
    private routerParams: ActivatedRoute,
    private router: Router) {
    this.idConceptonegocio = this.routerParams.snapshot.paramMap.get('id');
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
    this.cnService.getOne(this.idConceptonegocio)
      .subscribe(
        datos => {
          this.listConceptonegocio = datos.conceptonegocio
          this.nombreConceptonegocio = datos.nombre
          this.definiCN = datos.definicion
          this.uso = datos.concepto.nombre
          this.calculo = datos.calculo
        }
      )
  }

}
