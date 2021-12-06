import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-detalleusuario',
  templateUrl: './detalleusuario.component.html',

})
export class DetalleusuarioComponent implements OnInit {
  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario']; 
  listUsuarios = [];
  idUsuario: string;
  nombreUsuario: string;
  apellidosUsuario: string;
  sysUsuario: string;
  emailUsuario: string;
  passwordUsuario: string;
  estadoUsuario: string;
  rolUsuarios: string;
  dateUsuario: string;
  dateAddUsuario: string;
 avatarUsuario: any;
  contactoUsuario: string;
  sobremiUsuario: string;
  estiloDetalle: String;
  

  
  constructor(public usuarioService: UsuariosService,
    private estilosService: EstilosService,
    private routerParams: ActivatedRoute, private router: Router) { 


      this.idUsuario = this.routerParams.snapshot.paramMap.get('id');
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
    this.usuarioService.getOne(this.idUsuario)
      .subscribe(
        datos => {
          this.listUsuarios = datos.usuario
          this.nombreUsuario =  datos.userNombres
          this.apellidosUsuario = datos.userApellidos        
          this.sysUsuario = datos.userSys
          this.emailUsuario = datos.userEmail
          this.passwordUsuario = datos.userPassword
          this.estadoUsuario = datos.userEstado
          this.rolUsuarios = datos.userRolID
          this.dateUsuario = datos.userLastDate
          this.dateAddUsuario = datos.userDateAdd
          this.avatarUsuario = datos.userAvatar
          this.contactoUsuario = datos.userContacto
          this.sobremiUsuario = datos.userSobreMi
          
          
        }
      )
  }

}
