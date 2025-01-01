import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
import { Cargo } from '../cargo';

@Component({
  selector: 'app-cargos-edit',
  templateUrl: './cargos-edit.component.html',
  styleUrls: ['./cargos-edit.component.sass']
})
export class CargosEditComponent implements OnInit {
  formGroup !:FormGroup;
  alert:boolean = false;

  constructor(private _route: ActivatedRoute, private formbuilder:FormBuilder, private service:ServiceService) { }

  id:any;

  UsuariosList: any;
  SelectedValue:any;
  changeUsuarios(e){
    // console.log(e.target.value); => VERIFICAR QUE ID SE SELECCIONÓ!
    this.SelectedValue=e.target.value;
  }

ngOnInit(): void{
  this.formGroup = this.formbuilder.group({
    id:[' '],
    codigo:[' ',[Validators.required]],
    nombre:[' ',[Validators.required]],
    activo:[' ',[Validators.required]],
    idDepartamento:[' ',[Validators.required]]
  })
  
  //this.id = this._route.snapshot.params['id'];
  console.log(this._route.snapshot.params['id']);
  this.service.getCargosId(this._route.snapshot.params['id']).subscribe((results) => {
    this.formGroup = new FormGroup({
      codigo: new FormControl(results['codigo']),
      nombre: new FormControl(results['nombre']),
      activo: new FormControl(results['activo']),
      idDepartamento: new FormControl(results['idDepartamento'])
    })
  })
  this.service.getDepartamentos().subscribe((data: any) => {
    this.UsuariosList = data;    
  })
}

updateData(){
  this.service.updateData(this._route.snapshot.params['id'], this.formGroup.value).subscribe((results) => {
    console.log('Data Upated Successfully');
    this.alert = true;
  })
}

closeAlert(){
  this.alert = false;
}




}
