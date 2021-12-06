import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoTablaService} from 'src/app/services/repoconsultas/repotablas.service';
import { RepoEsquemaService} from 'src/app/services/repoconsultas/repoesquemas.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';



@Component({
  selector: 'app-detallertabla',
  templateUrl: './detallertabla.component.html',
 
})
export class DetallertablaComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  listRepoTabla = [];
  nombre: string;
  identificador: string;
  idRtabla: string;
  repositorioEsquema: string;


  constructor(public rtablaService: RepoTablaService,
    private routerParams: ActivatedRoute,
    public tablaserv: RepoEsquemaService,
    private estilosService: EstilosService
    ) { 
      this.idRtabla = this.routerParams.snapshot.paramMap.get('id');
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
    this.rtablaService.getOne(this.idRtabla)
      .subscribe(
        datos => {
    
          this.nombre =  datos.nombre
          this.identificador = datos.identificador;
          this.tablaserv.getOne(datos.repositorioEsquema)
          .subscribe(
            datos => {
              this.repositorioEsquema = datos.nombre
            }
          )
         
        }
      )
  }

}
