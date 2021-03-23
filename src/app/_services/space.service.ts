import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Models
import { Space } from 'src/app/_models/space';

// Services
import { HttpProviderService } from 'src/app/_services/http-provider.service';

@Injectable({ providedIn: 'root' })
export class SpaceService {
  private spaceSubject: BehaviorSubject<Space>;
  public space: Observable<Space>;

  constructor(private http: HttpProviderService) {
    this.spaceSubject = new BehaviorSubject<Space>(
      JSON.parse(localStorage.getItem('{}'))
    );
    this.space = this.spaceSubject.asObservable();
  }

  getAll(): Observable<Space[]> {
    return this.http.GetAll<Space[]>(`${environment.apiUrl}/spaces`);
  }

  getByGarageId(id: number): Observable<Space[]> {
    return this.http.GetAll<Space[]>(
      `${environment.apiUrl}/spaces/bygarage/${id}`
    );
  }

  getByAllocationManager(id: number): Observable<Space[]> {
    return this.http.GetAll<Space[]>(
      `${environment.apiUrl}/spaces/byallocationmanager/${id}`
    );
  }

  getById(id: number): Observable<Space> {
    return this.http.Get<Space>(`${environment.apiUrl}/spaces`, id);
  }

  create(space: Space): Observable<Space> {
    return this.http.Post<Space>(`${environment.apiUrl}/spaces/create`, space);
  }

  update(space: Space, id: number): Observable<Space> {
    return this.http.Update<Space>(`${environment.apiUrl}/spaces/${id}`, space);
  }

  delete(id: number): Observable<Space> {
    return this.http.Delete<Space>(`${environment.apiUrl}/spaces`, id);
  }
}
