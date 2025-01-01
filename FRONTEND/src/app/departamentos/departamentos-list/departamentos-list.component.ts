import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartamentosService } from '../departamentos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-departamentos-list',
  templateUrl: './departamentos-list.component.html',
  styleUrls: ['./departamentos-list.component.sass']
})
export class DepartamentosListComponent {
  departamentosList$!:Observable<any[]>;

  formGroup :FormGroup;
  data: any[] = [];

  UsuariosList: any;
  SelectedValue:any;
  changeUsuarios(e){
    //console.log(e.target.value); => VERIFICAR QUE ID SE SELECCIONÓ!
    this.SelectedValue=e.target.value;
  }

  constructor(private formbuilder:FormBuilder, private service:DepartamentosService){
    this.formGroup = this.formbuilder.group({
      codigo:[' ',[Validators.required]],
      nombre:[' ',[Validators.required]],
      activo:[' ',[Validators.required]]
    })
  }

  ngOnInit(): void{
    this.departamentosList$ = this.service.viewDepartamentos();
  }

  onSubmit(){
    console.log(this.formGroup.value);
    this.service.saveCargo(this.formGroup.value).subscribe(response => {
      console.log('Cargo added successfully!');
        this.departamentosList$ = this.service.viewDepartamentos();
    })
  }

  deleteCargo(id:number){
    if(confirm("Seguro desea eliminar este registro?")){
      this.service.destroyCargo(id)
      .subscribe(book=>{
        this.departamentosList$ = this.service.viewDepartamentos();
      })
    }  
  }
}
