/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpProviderService {
  constructor(private http: HttpClient) {}

  GetAll<T>(uri: string): Observable<T> {
    return this.http.get<T>(`${uri}`);
  }

  GetAllById<T>(uri: string, param?: any): Observable<T[]> {
    return this.http.get<T[]>(`${uri}/${param}`);
  }

  OnlyGet<T>(uri: string): Observable<T> {
    return this.http.get<T>(`${uri}`);
  }

  Get<T>(uri: string, param?: any): Observable<T> {
    return this.http.get<T>(`${uri}/${param}`);
  }

  Post<T>(uri: string, params?: any): Observable<T> {
    return this.http.post<T>(`${uri}`, params);
  }

  Update<T>(uri: string, params?: any): Observable<T> {
    return this.http.put<T>(`${uri}`, params);
  }
  Delete<T>(uri: string, param?: any): Observable<T> {
    return this.http.delete<T>(`${uri}/${param}`);
  }
}
