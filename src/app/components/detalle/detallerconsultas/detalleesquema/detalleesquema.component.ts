import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RepoEsquemaService} from 'src/app/services/repoconsultas/repoesquemas.service';
import { RepositorioService} from 'src/app/services/repositorios/repositorios.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';



@Component({
  selector: 'app-detalleesquema',
  templateUrl: './detalleesquema.component.html',

  
})
export class DetalleesquemaComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  listRepoEsquema = [];
  nombre: string;
  identificador: string;
  idEsque: string;
  repositorio: string;

  constructor(public resquemaService: RepoEsquemaService,
    private routerParams: ActivatedRoute,
    public reposerv: RepositorioService,
    private estilosService: EstilosService
    
    ) { 
      this.idEsque = this.routerParams.snapshot.paramMap.get('id');
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
    this.resquemaService.getOne(this.idEsque)
      .subscribe(
        datos => {
        
          this.nombre =  datos.nombre
          this.identificador = datos.identificador;
          this.reposerv.getOne(datos.repositorio)
          .subscribe(
            datos => {
              this.repositorio = datos.nombre
            }
          )
         
        }
      )
  }
}
