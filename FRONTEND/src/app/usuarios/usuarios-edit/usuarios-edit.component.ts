import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.sass']
})
export class UsuariosEditComponent implements OnInit {
  datosEntrada !:FormGroup;

  alert:boolean = false;

  constructor(private _route:ActivatedRoute, private _builder:FormBuilder, private _service:UsuariosService){}

  id:any;
  CargosList: any;
  DepartamentosList: any;
  SelectedValueCargos: any;
  SelectedValueDepartamentos: any;

  changeCargos(e){
    this.SelectedValueCargos = e.target.value;
  }

  changeDepartamentos(e){
    this.SelectedValueDepartamentos = e.target.value;
  }

  ngOnInit(): void {
    this.datosEntrada = this._builder.group({
      id:[' '],
      usuario:[' ', [Validators.required]],
      primerNombre:[' ', [Validators.required]],
      segundoNombre:[' ', [Validators.required]],
      primerApellido:[' ', [Validators.required]],
      segundoApellido:[' ', [Validators.required]],
      idCargo:[' ', [Validators.required]]
    })

    console.log(this._route.snapshot.params['id']);

    this._service.getUsuariosId(this._route.snapshot.params['id']).subscribe((response) => {
      this.datosEntrada = new FormGroup({
        usuario: new FormControl(response['usuario']),
        primerNombre: new FormControl(response['primerNombre']),
        segundoNombre: new FormControl(response['segundoNombre']),
        primerApellido: new FormControl(response['primerApellido']),
        segundoApellido: new FormControl(response['segundoApellido']),
        idCargo: new FormControl(response['idCargo'])
      })
    })

    this._service.getDataCargos().subscribe((response: any) => {
      this.CargosList = response;
    })

    this._service.getDataDepartamentos().subscribe((responses: any) => {
      this.DepartamentosList = responses;
    })
  }

  updateData(){
    this._service.updateData(this._route.snapshot.params['id'], this.datosEntrada.value).subscribe((results) => {
      console.log('Data Upated Successfully');
      this.alert = true;
    })
  }

  closeAlert(){
    this.alert = false;
  }
}
