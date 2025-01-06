import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuarioAdd } from '../usuario.models';
import { UsuarioService } from '../usuario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss'],
})
export class EditUsuarioComponent implements OnInit {
  usuarioService = inject(UsuarioService);
  dialogRef = inject(MatDialogRef<EditUsuarioComponent>);

  private readonly _fbuilder = inject(FormBuilder);

  // Utiliza la data que llega desde el modal
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
    // Inicializa la ID con el valor que viene del modal
    this.id = data.id;
  }

  ngOnInit() {
    console.log('ID recibida en el modal:', this.id); // Verifica que la ID esté correcta
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.usuarioService.obtenerUsuarioPorId(this.id).subscribe((user) => {
      this.form.patchValue(user); // Rellena el formulario con los datos del usuario
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
      this.dialogRef.close(true); // Cierra el modal
    });
  }

  cancelar() {
    this.dialogRef.close(false); // Cierra el modal sin hacer nada
  }
}
