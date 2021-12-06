//angular imports//
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/userLogin/login.service';
//import servicios//
import { EstilosService } from '../../services/estilos/estilos.service';
//librerias//
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
  estiloHeader: String;
  estiloNavbar: String;
  logoUrl: String;


  constructor(private loginService:LoginService,
    private estilosService: EstilosService,
    private router: Router) { }

  ngOnInit(): void {
    this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
        this.estiloHeader = datos.header;
        this.estiloNavbar = datos.navbar;
        this.logoUrl = datos.logoCompania;
			})
  }

  cerrarSesion(){
    this.loginService.logout();
    
  }

  

}
