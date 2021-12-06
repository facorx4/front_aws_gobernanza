//angular imports//
import { Component, OnInit } from '@angular/core';
//import servicios//
import { LoginService } from 'src/app/services/userLogin/login.service';
import { ModulosService } from '../../services/userModulos/modulos.service';
import { EstilosService } from '../../services/estilos/estilos.service';
//librerias//
import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public menuId: any[];
  public estilo: String;

  mostrar = true;

  token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
  

  constructor(
      private modulosServ: ModulosService,
      private serviceUser:LoginService,
      private estilosService: EstilosService
    ){ 
        
  }
  
  

  ngOnInit(): void {
    this.listaModulos();
    this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
        this.estilo = datos.sidebar
			})
  }
  listaModulos() {
    var menuItems = [];
		this.modulosServ.getMenu(this.datosUsuario.userRolID).subscribe(modulo => {
      modulo['data'].map(menuId => {
        this.modulosServ.getOne(menuId).subscribe(modulo=>{
          menuItems.push(modulo);
          this.menuItems = menuItems;
          this.menuItems.sort(this.compare);
        })
      });
    })
  }

  compare( a, b ) {
    if ( a.posicion < b.posicion ){
      return -1;
    }
    if ( a.posicion > b.posicion ){
      return 1;
    }
    return 0;
  }

}
