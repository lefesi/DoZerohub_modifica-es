import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ""){
      Swal.fire({
        icon: 'info',
        text: 'Sua sessão expirou, faça login novamente.',
      })
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()
    this.findByIdTema()
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Postagem atualizada com sucesso!',
        showConfirmButton: false,
        timer: 3000
      })
      this.router.navigate(['/inicio'])
    })
  }

}
