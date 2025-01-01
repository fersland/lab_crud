import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CargosComponent } from './cargos/cargos.component';
import { HttpClientModule} from '@angular/common/http';
import { CargosEditComponent } from './cargos/cargos-edit/cargos-edit.component';
import { CargosAddComponent } from './cargos/cargos-add/cargos-add.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuariosAddComponent } from './usuarios/usuarios-add/usuarios-add.component';
import { DepartamentosListComponent } from './departamentos/departamentos-list/departamentos-list.component';
import { DepartamentosAddComponent } from './departamentos/departamentos-add/departamentos-add.component';
import { DepartamentoEditComponent } from './departamentos/departamento-edit/departamento-edit.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit/usuarios-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    CargosComponent,
    CargosEditComponent,
    CargosAddComponent,
    UsuariosListComponent,
    UsuariosAddComponent,
    DepartamentosListComponent,
    DepartamentosAddComponent,
    DepartamentoEditComponent,
    UsuariosEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, RouterModule, ReactiveFormsModule, FormsModule,
    HttpClientModule, CommonModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
