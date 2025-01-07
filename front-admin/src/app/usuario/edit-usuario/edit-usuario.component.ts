import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuarioAdd } from '../usuario.models';
import { UsuarioService } from '../usuario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, CommonModule],
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss'],
})
export class EditUsuarioComponent implements OnInit {
  usuarioService = inject(UsuarioService);
  dialogRef = inject(MatDialogRef<EditUsuarioComponent>);

  private readonly _fbuilder = inject(FormBuilder);
  cargos: any[] = [];
  departamentos: any[] = [];
  id: number;

  form = this._fbuilder.group({
    usuario: [''],
    primerNombre: [''],
    segundoNombre: [''],
    primerApellido: [''],
    segundoApellido: [''],
    idDepartamento: [''],
    idCargo: [''],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.id = data.id;
  }

  ngOnInit() {
    console.log('ID recibida en el modal:', this.id);
    this.cargarDatos();
  }
  
  cargarDatos() {
    // Cargar departamentos y cargos en paralelo
    const departamentos$ = this.usuarioService.obtenerDepartamentos();
    const cargos$ = this.usuarioService.obtenerCargos();
  
    Promise.all([departamentos$.toPromise(), cargos$.toPromise()]).then(
      ([departamentos, cargos]) => {
        this.cargos = cargos!;
        this.departamentos = departamentos!;

  
        // Una vez cargadas las listas, carga los datos del usuario
        this.cargarUsuario();
      }
    );
  }
  
  cargarUsuario() {
    this.usuarioService.obtenerUsuarioPorId(this.id).subscribe((user) => {
      if (user) {
        this.form.patchValue({
          usuario: user.usuario,
          primerNombre: user.primerNombre,
          segundoNombre: user.segundoNombre,
          primerApellido: user.primerApellido,
          segundoApellido: user.segundoApellido,
          idDepartamento: user.idDepartamento, // Valor preseleccionado
          idCargo: user.idCargo, // Valor preseleccionado
        });
      }
    });
  }
  

  actualizarUsuario() {
    const formValue = this.form.value;
    const user: UsuarioAdd = {
      usuario: formValue.usuario!,
      primerNombre: formValue.primerNombre!,
      segundoNombre: formValue.segundoNombre!,
      primerApellido: formValue.primerApellido!,
      segundoApellido: formValue.segundoApellido!,
      idDepartamento: formValue.idDepartamento!,
      idCargo: formValue.idCargo!,
    };

    this.usuarioService.actualizarUsuario(this.id, user).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
