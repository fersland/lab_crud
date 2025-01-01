import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from './departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  readonly apiURL = 'http://127.0.0.1:8000/api/departamentos';
  readonly apiURLEdit = 'http://127.0.0.1:8000/api/departamentos-edit';
  constructor(private http:HttpClient) { }

  viewDepartamentos():Observable<any[]> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/departamentos`);
  }

  getDepartamentosId(id){
    return this.http.get(`http://127.0.0.1:8000/api/departamentos/show/`+ id);
  }

  saveCargo(model:Departamento):Observable<Departamento>{
    return this.http.post<Departamento>(`http://127.0.0.1:8000/api/departamentos/store`,model);
  }

  updateData(id:number, newData: any): Observable<any> {
    const url = `${this.apiURLEdit}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(url, newData, { headers });
  }

  destroyCargo (id:number):Observable<number>{
    return this.http.delete<number>(this.apiURL+"/"+id);
  }
}
