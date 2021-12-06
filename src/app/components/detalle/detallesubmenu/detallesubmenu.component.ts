import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmenusService } from 'src/app/services/submenus/submenus.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-detallesubmenu',
  templateUrl: './detallesubmenu.component.html',

})
export class DetallesubmenuComponent implements OnInit {
  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];
  listSubmenus = [];
  nombreSubmenu: string;
  rutaSubmenu: string;
  idSubmenu: string;
  estiloDetalle: String;



  constructor(public submenuService: SubmenusService,
    private estilosService: EstilosService,
    private routerParams: ActivatedRoute, private router: Router) {

      this.idSubmenu = this.routerParams.snapshot.paramMap.get('id');


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
    this.submenuService.getOne(this.idSubmenu)
      .subscribe(
        datos => {
          this.listSubmenus = datos.submenu
          this.nombreSubmenu =  datos.titulo
          this.rutaSubmenu = datos.ruta
        }
      )
  }

}
