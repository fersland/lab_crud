import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceService } from './service.service';
import { Cargo } from './cargo';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.sass']
})
export class CargosComponent implements OnInit {
  cargosList$!:Observable<any[]>;
  cargos:any;

  getCargosdata(){
    this.service.viewCargos().subscribe(response => {
      this.cargos = response;
    })
  }

  DepartamentosList: any;
  SelectedValue:any;
  changeUsuarios(e){
    console.log(e.target.value); // => VERIFICAR QUE ID SE SELECCIONÓ
    this.SelectedValue=e.target.value;
  }

  formGroup :FormGroup;
  constructor(private formbuilder:FormBuilder, private service:ServiceService){ }

  ngOnInit(): void{    
    this.cargosList$ = this.service.viewCargos();
    this.loadDataUsuarios();

    this.formGroup = this.formbuilder.group({
      //id:[''],
      codigo:[' ',[Validators.required,Validators.pattern('a-zA-ZñÑá-úÁ-Ú')]],
      nombre:[' ',[Validators.required,Validators.pattern('a-zA-ZñÑá-úÁ-Ú')]],
      activo:[' ',[Validators.required]],
      idDepartamento:[' ',[Validators.required]],
    })

    this.service.getDepartamentos().subscribe((listDepartments: any) => {
      this.DepartamentosList = listDepartments;
      });
  }

  insertData(){
    console.log(this.formGroup.value);
    this.service.saveCargo(this.formGroup.value).subscribe(response => {
      console.log('Cargo added successfully!');
      this.cargosList$ = this.service.viewCargos();
      this.formGroup.reset();
    })
  }

  cargarDataUsuarios: any[] = [];
  loadDataUsuarios() {
    this.service.getDepartamentos().subscribe((result) => {
      this.cargarDataUsuarios = result;
    });
  }

  deleteCargo(id:number){
    if(confirm("Seguro desea eliminar este registro?")){
      this.service.destroyCargo(id)
      .subscribe(book=>{
        this.cargosList$ = this.service.viewCargos();
      })
    }
  }

  // ACTUALIZAR ++++++++++++++++++++++++

  
}
