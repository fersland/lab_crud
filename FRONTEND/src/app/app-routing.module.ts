import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargosComponent } from './cargos/cargos.component';
import { CargosEditComponent } from './cargos/cargos-edit/cargos-edit.component';
import { CargosAddComponent } from './cargos/cargos-add/cargos-add.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuariosAddComponent } from './usuarios/usuarios-add/usuarios-add.component';
import { DepartamentosListComponent } from './departamentos/departamentos-list/departamentos-list.component';
import { DepartamentosAddComponent } from './departamentos/departamentos-add/departamentos-add.component';
import { DepartamentoEditComponent } from './departamentos/departamento-edit/departamento-edit.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit/usuarios-edit.component';

const routes: Routes = [
  { path: '', component: UsuariosListComponent},
  { path: 'cargos', component: CargosComponent},
  { path: 'cargos/edit/:id', component: CargosEditComponent},
  { path: 'cargos/cargos-add', component: CargosAddComponent },

  { path: 'usuarios', component: UsuariosListComponent },
  { path: 'usuarios/usuarios-add', component: UsuariosAddComponent},
  { path: 'usuarios/edit/:id', component: UsuariosEditComponent},

  { path: 'departamentos', component: DepartamentosListComponent},
  { path: 'departamentos/edit/:id', component: DepartamentoEditComponent},
  { path: 'departamentos/departamentos-add', component: DepartamentosAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
