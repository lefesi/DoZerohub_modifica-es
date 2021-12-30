import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit(){
    if(environment.token == ""){
      Swal.fire({
        icon: 'info',
        text: 'Sua sessão expirou, faça login novamente.',
      })
      this.router.navigate(['/entrar'])
    }
    if(environment.tipo != 'admin'){
      Swal.fire({
        icon: 'info',
        text: 'Você precisa ser Administrador para ter acesso a essa função!',
      })
      this.router.navigate(['/inicio'])
    }
    this.findAllTemas()
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Tema cadastrado com sucesso',
        showConfirmButton: false,
        timer: 3000
      })
      this.findAllTemas()
      this.tema = new Tema()
    })
  }
}
