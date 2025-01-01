import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpCliente: HttpClient) { }
  apiURL = 'http://127.0.0.1:8000/api/usuarios';
  readonly apiURLEdit = 'http://127.0.0.1:8000/api/usuarios-edit';

  viewUsuarios():Observable<any[]>{
    return this.httpCliente.get<any>(`http://127.0.0.1:8000/api/usuarios`);
  }

  getUsuariosId(id){
    return this.httpCliente.get(`http://127.0.0.1:8000/api/usuarios/show/`+ id);
  }

  getDataCargos(): Observable<any[]> {
    return this.httpCliente.get<any[]>(`http://127.0.0.1:8000/api/cargos`);
  }

  getDataDepartamentos(): Observable<any[]> {
    return this.httpCliente.get<any[]>(`http://127.0.0.1:8000/api/departamentos`);
  }

  saveUsuario(model:Usuario):Observable<Usuario>{
    return this.httpCliente.post<Usuario>(this.apiURL + `/store`,model);
  }

  updateData(id:number, newData: any): Observable<any> {
    const url = `${this.apiURLEdit}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpCliente.put(url, newData, { headers });
  }

  destroyUsuario (id:number):Observable<number>{
    return this.httpCliente.delete<number>(this.apiURL+"/"+id);
  }


}
