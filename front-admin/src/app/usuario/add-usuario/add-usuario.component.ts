import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UsuarioAdd } from '../usuario.models';
import { UsuarioService } from '../usuario.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDialogModule,
    MatSelectModule,
    CommonModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.scss'
})
export class AddUsuarioComponent {
  usuarioService = inject(UsuarioService);
  dialogRef = inject(MatDialogRef<AddUsuarioComponent>);
  router = inject(Router);

  private readonly _fbuilder = inject(FormBuilder);

  form = this._fbuilder.group({
    usuario: [''],
    primerNombre: [''],
    segundoNombre: [''],
    primerApellido: [''],
    segundoApellido: [''],
    idDepartamento: [''],
    idCargo: ['']
  })

  cargos: any[] = [];
  departamentos: any[] = [];

  ngOnInit() {
    this.usuarioService.obtenerCargos().subscribe((data) => {
      this.cargos = data;
    });

    this.usuarioService.obtenerDepartamentos().subscribe((data) => {
      this.departamentos = data;
    })
  }

  addUsuario() {
    if (this.form.valid) {
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
  
      this.usuarioService.addUsuarios(user).subscribe(() => {
        this.dialogRef.close(true); // Indica éxito y cierra el modal
        this.form.reset(); // Limpia el formulario tras un registro exitoso
      });
    }
  }
  
  cancelar() {
    this.dialogRef.close(false); // Cierra el modal sin realizar ninguna acción
  }
}
