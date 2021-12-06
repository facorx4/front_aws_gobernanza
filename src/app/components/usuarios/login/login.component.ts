//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import servicios//
import { UsuarioModel } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/userLogin/login.service';
//librerias//
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  	login:FormGroup;//creamos instancia local del formulario
  	usuario:UsuarioModel;
  	recordarUser = false;



  	constructor(  	private fb:FormBuilder,
                	private router: Router,
                	private loginSevice:LoginService
              	) {
    	this.crearFormulario();
  	}



	ngOnInit(): void {

		this.usuario = new UsuarioModel(); 

		if( localStorage.getItem('email') ){

			this.login.reset({
			userEmail:localStorage.getItem('email')
			})
			//this.recordarUser = true;
		}
	}


  	/***********************************************************************************
	Metodo para crear el formulario
	***********************************************************************************/
  	crearFormulario(){

		this.login = this.fb.group({
			userEmail: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
			userPassword: ['', [Validators.required]],
			userRecordar: [null]
		})
  	}

  	/***********************************************************************************
	Metodo para realizar el login 
	***********************************************************************************/
	validarLogin(){
		/***********************************************************************************
		Validamos si el formulario es valido de no ser asi retornamos el posteo 
		***********************************************************************************/
		if( this.login.invalid ){
			return Object.values(this.login.controls).forEach( control => {
				control.markAllAsTouched();
			});
		}
		/***********************************************************************************
		Realizamos el alert para mostar al usuario 
		***********************************************************************************/
		Swal.fire({
		allowOutsideClick:false,
		icon:'info',
		text: 'Espere por un momento favor..'
		});
		Swal.showLoading();


		this.usuario = this.login.value;
		this.loginSevice.signInUser(this.usuario).subscribe( res =>{
			Swal.close();
			if(this.recordarUser){
				localStorage.setItem('email', this.login.get('userEmail').value )
			}
			this.router.navigateByUrl('/inicio');
			
		},err=>{

			Swal.fire({
				icon:'error',
				title:'Error al autenticar usuario',
				text: err.error.error.mensaje
			});
			
		})
  	}

	
	/***********************************************************************************
	Ceamos los getters que validan si los input son validos
	***********************************************************************************/
	get emailNovalido(){
		return this.login.get('userEmail').invalid && this.login.get('userEmail').touched;
	}
	get PassworsNoValido(){
		return this.login.get('userPassword').invalid && this.login.get('userPassword').touched;
	}

	get emailValido(){
		return this.login.get('userEmail').valid && this.login.get('userEmail').touched;
	}
	get PassworsValido(){
		return this.login.get('userPassword').valid && this.login.get('userPassword').touched;
	}

	
}
