import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from '../usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.sass']
})
export class UsuariosListComponent implements OnInit {
  usuariosList$!:Observable<any[]>;
  CargosList: any;
  DepartamentosList: any;
  SelectedValue:any;
  SelectedValue2:any;

  datosEntrada: FormGroup;

  changeCargos(e){
    console.log(e.target.value);
    this.SelectedValue=e.target.value;
  }

  changeDepartamentos(e){
    console.log(e.target.value);
    this.SelectedValue2=e.target.value;
  }

  constructor(private _builder:FormBuilder, private service:UsuariosService){
    this.datosEntrada = this._builder.group({
      usuario:[' ',[Validators.required]],
      primerNombre:[' ',[Validators.required]],
      segundoNombre:[' ',[Validators.required]],
      primerApellido:[' ',[Validators.required]],
      segundoApellido:[' ',[Validators.required]],
      idCargo:[' ',[Validators.required]],
    })
  }

  ngOnInit(): void{
    this.usuariosList$ = this.service.viewUsuarios();

    this.service.getDataCargos().subscribe((data: any) => {
      this.CargosList = data;
    })

    this.service.getDataDepartamentos().subscribe((datas: any) => {
      this.DepartamentosList = datas;
    })
  }

  onSubmit(){
    console.log(this.datosEntrada.value);
    this.service.saveUsuario(this.datosEntrada.value).subscribe(response => {
      console.log('Usuario added successfully!');
      this.usuariosList$ = this.service.viewUsuarios();
      this.datosEntrada.reset();
    });
  }

  deleteUsuario(id:number){
    if(confirm("Seguro desea eliminar este registro?")){
      this.service.destroyUsuario(id)
      .subscribe(book=>{
        this.usuariosList$ = this.service.viewUsuarios();
      })
    }  
  }

}
