import { Routes } from '@angular/router';
import { IndexComponent } from './usuario/index/index.component';
import { AppComponent } from './app.component';
import { AddUsuarioComponent } from './usuario/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './usuario/edit-usuario/edit-usuario.component';

export const routes: Routes = [
    
    {path: 'usuario', component: IndexComponent},
    {path: 'usuario/add-usuario', component: AddUsuarioComponent},
    {path: 'usuario/edit-usuario/:id', component: EditUsuarioComponent}
];
