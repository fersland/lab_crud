import { Component, inject } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../usuario.models';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarDialog } from '../confirmar-dialog/confirmar-dialog.component';
import { AddUsuarioComponent } from '../add-usuario/add-usuario.component';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatButtonModule, 
    MatToolbarModule, 
    MatTableModule
    
    ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  usuarioService = inject(UsuarioService);
  dialog = inject(MatDialog);
  usuarios?: Usuario[];
  columnasAMostrar = ["usuario", "primerNombre", "segundoNombre", "primerApellido", "segundoApellido", "idDepartamento", "idCargo", "acciones"]

  constructor() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  confirmarEliminacion(id: number) {
    const dialogRef = this.dialog.open(ConfirmarDialog, {
      data: { mensaje: '¿Está seguro de que desea eliminar este usuario?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.eliminarUsuario(id).subscribe(() => {
          this.cargarUsuarios();
        });
      }
    });
  }

  abrirModalCrearUsuario() {
    const dialogRef = this.dialog.open(AddUsuarioComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarUsuarios();
      }
    });
  }

  abrirModalEditarUsuario(id: number) {
    console.log('ID que se pasa al modal:', id); // Verifica que la ID esté correcta
  
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      width: '600px',
      data: { id: id },
      panelClass: 'custom-dialog', // Aquí le damos una clase personalizada
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarUsuarios(); // Actualiza la lista de usuarios después de la edición
      }
    });
  }
  
  
}
