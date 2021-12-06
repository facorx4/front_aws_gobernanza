import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositorioService } from 'src/app/services/repositorios/repositorios.service';
import { SubdominioIdService } from 'src/app/services/repositorios/subdominioId.service';
import { TipoRepositorioService } from 'src/app/services/repositorios/tipoRepositorio.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-detallrepositorio',
  templateUrl: './detallrepositorio.component.html',
  styleUrls: ['./detallrepositorio.component.css']
})
export class DetallrepositorioComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  listRepo = [];
  nombre: string;
  ruta: string;
  idRepo: string;
  descripcion: string;
  repositorioTipoId: string;
  subdominioId: string;

  

  constructor(public repoService: RepositorioService,
    private routerParams: ActivatedRoute,
    private subserv: SubdominioIdService,
    private tiposerv: TipoRepositorioService,
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
      this.repoService.getOne(this.idRepo)
        .subscribe(
          datos => {
      
            this.nombre =  datos.nombre
            this.descripcion =  datos.descripcion
         

            this.subserv.getOne(datos.subdominioId)
            .subscribe(
              datos => {
                this.subdominioId = datos.nombre
              }
            )
            this.tiposerv.getOne(datos.repositorioTipoId)
            .subscribe(
              datos => {
                this.repositorioTipoId = datos.nombre
              }
            )
           
          }
        )
    }
  
  }
  