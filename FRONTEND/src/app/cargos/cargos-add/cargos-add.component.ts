import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cargo } from '../cargo';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-cargos-add',
  templateUrl: './cargos-add.component.html',
  styleUrls: ['./cargos-add.component.sass']
})
export class CargosAddComponent implements OnInit {
  cargosList$!:Observable<any[]>;

  formGroup :FormGroup;

  UsuariosList: any;
  SelectedValue:any;
  changeUsuarios(e){
    console.log(e.target.value);
    this.SelectedValue=e.target.value;
  }

  constructor(private formbuilder:FormBuilder, private service:ServiceService) { 
    this.formGroup = this.formbuilder.group({
      codigo:[' ',[Validators.required]],
      nombre:[' ',[Validators.required]],
      activo:[' ',[Validators.required]],
      idDepartamento:[' ',[Validators.required]],
    })
  }
  ngOnInit(){

    this.cargosList$ = this.service.viewCargos();

    this.service.getDepartamentos().subscribe((data: any) => {
      this.UsuariosList = data;
    })
  }

  onSubmit(){
    console.log(this.formGroup.value);
    this.service.saveCargo(this.formGroup.value).subscribe(response => {
      this.cargosList$ = this.service.viewCargos();
      this.formGroup.reset();
      console.log('Usuario added successfully!');
    });
  }

}
