import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubdominioIdService } from 'src/app/services/repositorios/subdominioId.service';

@Component({
  selector: 'app-detalletiporeposubdominiorepo',
  templateUrl: './detalletiporeposubdominiorepo.component.html',

})
export class DetalletiporeposubdominiorepoComponent implements OnInit {

  nombre: string;
  idtr: string;

  constructor(public subService: SubdominioIdService,
    private routerParams: ActivatedRoute) {

      this.idtr = this.routerParams.snapshot.paramMap.get('id');

    }
  
    ngOnInit(): void {
      this.cargarData();
    }
  
    cargarData() {
      this.subService.getOne(this.idtr)
        .subscribe(
          datos => {
     
            this.nombre =  datos.nombre
           
          }
        )
    }
  
  }
  