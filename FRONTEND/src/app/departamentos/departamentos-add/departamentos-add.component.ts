import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DepartamentosService } from '../departamentos.service';

@Component({
  selector: 'app-departamentos-add',
  templateUrl: './departamentos-add.component.html',
  styleUrls: ['./departamentos-add.component.sass']
})
export class DepartamentosAddComponent {
  cargosList$!:Observable<any[]>;
  data: any[] = [];

  formGroup :FormGroup;

  UsuariosList: any;
  SelectedValue:any;
  changeUsuarios(e){
    console.log(e.target.value);
    this.SelectedValue=e.target.value;
  }

  constructor(private formbuilder:FormBuilder, private service:DepartamentosService) { 
    this.formGroup = this.formbuilder.group({
      codigo:[' ',[Validators.required]],
      nombre:[' ',[Validators.required]],
      activo:[' ',[Validators.required]],
      idUsuario:[' ',[Validators.required]]
    })
  }

  ngOnInit(){

    this.cargosList$ = this.service.viewDepartamentos();
  }

  
  onFormSubmit(){
    let book=this.formGroup.value;
    this.formGroup.reset();
  }

  onSubmit(){
    console.log(this.formGroup.value);
    this.service.saveCargo(this.formGroup.value).subscribe(response => {
      console.log('Cargo added successfully!');
        //this.cargosList$ = this.service.viewCargos();
    })
  }
}
