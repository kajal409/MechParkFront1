import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Models
import { Garage } from 'src/app/_models/garage';

// Services
import { HttpProviderService } from 'src/app/_services/http-provider.service';

@Injectable({ providedIn: 'root' })
export class GarageService {
  public garage: Observable<Garage>;

  constructor(private http: HttpProviderService) {}

  create(garage: Garage): Observable<Garage> {
    return this.http.Post<Garage>(
      `${environment.apiUrl}/garages/create`,
      garage
    );
  }

  update(garage: Garage, id: number): Observable<Garage> {
    return this.http.Update<Garage>(
      `${environment.apiUrl}/garages/${id}`,
      garage
    );
  }

  delete(id: number): Observable<Garage> {
    return this.http.Delete<Garage>(`${environment.apiUrl}/garages`, id);
  }

  getAll(): Observable<Garage[]> {
    return this.http.GetAll<Garage[]>(`${environment.apiUrl}/garages`);
  }

  getById(id: number): Observable<Garage> {
    return this.http.Get<Garage>(`${environment.apiUrl}/garages`, id);
  }
}
