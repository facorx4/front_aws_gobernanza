//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
//import servicios//
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
//librerias//
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

	perfilUsuario:FormGroup;
	cambioPassword:FormGroup;  
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token); //decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	
	afuConfig = {
		multiple: false,
		formatsAllowed: ".jpg,.png",
		maxSize: "50",
		uploadAPI: {
			url: environment.url+'usuarios/upload-image'
		},
			theme: "attachPin",
			hideProgressBar: true,
			hideResetBtn: true,
			hideSelectBtn: false,
			replaceTexts:{
				attachPinBtn: 'selecciona una foto de perfil'
			}
	};

	constructor(  	private fb:FormBuilder,
					private userService:UsuariosService,
					private router:Router   
			    ){

		this.createFormPerfil();
		this.dataFormPerfil();

		this.createFormPassword();
	}
  
  	ngOnInit(): void {}



	/******************************************************************************************** 
	metodo para crear la instancia local de formulario perfil de usuario
	********************************************************************************************/
	createFormPerfil(){
		this.perfilUsuario = this.fb.group({
			userId:[],
			userNombres:['',[Validators.required, Validators.minLength(4)]],
			userApellidos:['',[Validators.required, Validators.minLength(4)]],
			userEmail:['',[Validators.required, ]],
			userContacto: ['',[Validators.required, ]],
			userAvatar:[],
			userSobreMi:[]
		})
	}
	/******************************************************************************************** 
	metodo para crear la instancia local de formulario cambio de contraseña
	********************************************************************************************/
	createFormPassword(){
		this.cambioPassword = this.fb.group({
			userId:[this.datosUsuario._id],
			userPassword:['',[Validators.required]],
			userConfirPassword:['',[Validators.required]],
			userActualPass:['',[Validators.required]]
		})
	}

  	dataFormPerfil(){
		this.perfilUsuario.reset({
			userId:this.datosUsuario._id,
			userNombres:this.datosUsuario.userNombres,
			userApellidos: this.datosUsuario.userApellidos,
			userEmail:this.datosUsuario.userEmail,
			userContacto: this.datosUsuario.userContacto,
			userSobreMi: this.datosUsuario.userSobreMi,
			userAvatar: this.datosUsuario.userAvatar
		})

  	}

	/********************************************************************************************
	Metodo para actualizar los datos del perfil de usuario
	********************************************************************************************/
	actualizaPerfil(){
		Swal.fire({
		allowOutsideClick:false,
		icon:'info',
		text: 'Espere por un momento favor..'
		});
		Swal.showLoading();

		this.userService.perfilUsuario(this.perfilUsuario.value).subscribe( res => {
			Swal.close();
			Swal.fire({
				title: 'Actualización de Datos',
				text: `Se han actualizado los datos satisfactoriamente!`,
				icon: 'success',
				showConfirmButton:true,
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'OK!'
			  }).then( (result) => {
		  
				if (result.isConfirmed) {		  
				  window.location.reload();		  
				}
		  
			})
			
			
			},err =>{
				Swal.fire({
					icon:'error',
					title:'Actualizacion',
					text: err.error.error.mensaje
				});
			})
	}



	savePassword(){

		this.userService.passwordUser(this.cambioPassword.value).subscribe( 
			resp => {
				Swal.fire({
					icon:'success',
					title:'Actualizacion',
					text: 'Se ha actualizado correctamente la contraseña'
				});
				this.router.navigateByUrl('/inicio');
			}, err => {
				Swal.fire({
					icon:'error',
					title:'Error de Actualizacion',
					text: err.error.error.mensaje
				});
			}	
		)
	}


	imageUpload(e){
		var url = environment.url + 'usuarios/get-image/' + e.body.image;
		const estado = this.perfilUsuario.value.userEstado == "activo" ? "activo" : "inactivo";
		this.perfilUsuario.reset({
			userId: this.perfilUsuario.value.userId,
			userNombres: this.perfilUsuario.value.userNombres,
			userApellidos: this.perfilUsuario.value.userApellidos,
			userEmail: this.perfilUsuario.value.userEmail,
			userContacto: this.perfilUsuario.value.userContacto,
			userSobreMi: this.perfilUsuario.value.userSobreMi,
			userAvatar: url})
	}
}
