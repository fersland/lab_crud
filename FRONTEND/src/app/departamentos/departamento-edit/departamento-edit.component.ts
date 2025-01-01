import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DepartamentosService } from '../departamentos.service';
import { Departamento } from '../departamento';

@Component({
  selector: 'app-departamento-edit',
  templateUrl: './departamento-edit.component.html',
  styleUrls: ['./departamento-edit.component.sass']
})
export class DepartamentoEditComponent implements OnInit {
  formGroup !:FormGroup;
  alert:boolean = false;

  constructor(private _route: ActivatedRoute, private _builder:FormBuilder, private _service:DepartamentosService){}

  id:any;

  UsuariosList: any;
  SelectedValue:any;
  changeUsuarios(e){
    this.SelectedValue=e.target.value;
  }

  ngOnInit(): void{
    this.formGroup = this._builder.group({
      id:[' '],
      codigo:[' ', [Validators.required]],
      nombre:[' ', [Validators.required]],
      activo:[' ', [Validators.required]],
      idDepartamento:[' ', [Validators.required]]
    })

    console.log(this._route.snapshot.params['id']);
    this._service.getDepartamentosId(this._route.snapshot.params['id']).subscribe((results) => {
      this.formGroup = new FormGroup({
        codigo: new FormControl(results['codigo']),
        nombre: new FormControl(results['nombre']),
        activo: new FormControl(results['activo']),
        idUsuario: new FormControl(results['idUsuario'])
      })
    })
  }

  updateData(){
    this._service.updateData(this._route.snapshot.params['id'], this.formGroup.value).subscribe((results) => {
      console.log('Data Upated Successfully');
      this.alert = true;
    })
  }

  closeAlert(){
    this.alert = false;
  }

}
