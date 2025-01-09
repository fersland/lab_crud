import { Routes } from '@angular/router';
import { IndexComponent } from './usuario/index/index.component';
import { AppComponent } from './app.component';
import { AddUsuarioComponent } from './usuario/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './usuario/edit-usuario/edit-usuario.component';

export const routes: Routes = [
    
    {path: '', component: IndexComponent}
];
