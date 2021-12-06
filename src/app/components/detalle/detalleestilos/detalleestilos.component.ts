
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

import jwt_decode from 'jwt-decode';




@Component({
  selector: 'app-detalleestilos',
  templateUrl: './detalleestilos.component.html',
  styleUrls: ['./detalleestilos.component.css']
})
export class DetalleestilosComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalles = '';

  listEstilos= [];
  idEstilo: string;
  nombre: string;
  navbar: string;
  sidebar: string;
  header: string;
  botonCrear: string;
  botonGuardar: string;
  botonAcciones: string;
  botonAgregar: string;
  tituloDetalle: string;
  paginador: string;
  dasboard: string;
  logoCompania: string;



  constructor(
    private routerParams: ActivatedRoute, 
    
    private estilosService: EstilosService
    ) {

    this.idEstilo = this.routerParams.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.cargarData();
    this.cargarEstilos()
   

  }

  cargarEstilos() {
    this.estilosService.getOne(this.usuario.estilo).subscribe(
      datos => {
        this.tituloDetalles = datos.tituloDetalle
      })
  }


  cargarData() {
    this.estilosService.getOne(this.idEstilo)
      .subscribe(
        datos => {
          this.nombre = datos.nombre;
          this.navbar = datos.navbar;
          this.sidebar = datos.sidebar;
          this.header = datos.header;
          this.botonCrear = datos.botonCrear;
          this.botonGuardar = datos.botonGuardar;
          this.botonAcciones = datos.botonAcciones;
          this.botonAgregar = datos.botonAgregar;
          this.tituloDetalle = datos.tituloDetalle;
          this.paginador = datos.paginador;
          this.dasboard = datos.dasboard;
          this.logoCompania = datos.logoCompania;
          
         

        }
      )
  }

}
