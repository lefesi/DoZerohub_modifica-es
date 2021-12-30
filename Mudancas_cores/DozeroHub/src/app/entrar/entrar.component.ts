import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  UserLogin: UserLogin = new UserLogin()

  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(){
    window.scroll(0,0)

  }
  entrar(){
    this.authService.entrar(this.UserLogin).subscribe((resp: UserLogin)=>{
      this.UserLogin = resp

      /* Variáveis globais */
      environment.token = this.UserLogin.token
      environment.nome = this.UserLogin.nome
      environment.foto = this.UserLogin.foto
      environment.id = this.UserLogin.id
      environment.tipo = this.UserLogin.tipo

      /* Ver as informações no console
      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.id)*/

      this.router.navigate(['/inicio'])
    }, erro =>{
      if(erro.status == 401){
        Swal.fire({
          icon: 'error',
          text: 'Usuário ou senha estão incorretos.',
        })
      }
      if(erro.status == 500){
        Swal.fire({
          icon: 'error',
          text: 'Insira sua senha!',
        })
      }
    })
  }

}
