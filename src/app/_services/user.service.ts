import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Environment
import { environment } from 'src/environments/environment';

// Models
import { User } from 'src/app/_models/user';
import { ParkingManager } from 'src/app/_models/parkingManager';
import { AllocationManager } from 'src/app/_models/allocationManager';

// Services
import { HttpProviderService } from 'src/app/_services/http-provider.service';
import { LocalService } from 'src/app/_services/local.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public parkingManager: Observable<ParkingManager>;
  public allocationManager: Observable<AllocationManager>;

  constructor(
    private http: HttpProviderService,
    private localService: LocalService
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(this.localService.getJsonValue('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  register(user: User): Observable<User> {
    return this.http.Post<User>(`${environment.apiUrl}/users/register`, user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .Post(`${environment.apiUrl}/users/authenticate`, {
        email,
        password
      })
      .pipe(
        map((user) => {
          this.localService.setJsonValue('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  forgotPassword(email: string): Observable<User> {
    return this.http
      .Post(`${environment.apiUrl}/users/authenticate`, {
        email
      })
      .pipe(
        map((user) => {
          this.localService.setJsonValue('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  update(user: User, id: number): Observable<User> {
    return this.http.Update<User>(`${environment.apiUrl}/users/${id}`, user);
  }

  delete(id: number): Observable<User> {
    return this.http.Delete<User>(`${environment.apiUrl}/users`, id);
  }

  logout(): void {
    this.localService.clear();
    this.userSubject.next(null);
  }

  getAll(): Observable<User[]> {
    return this.http.GetAll<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number): Observable<User> {
    return this.http.Get<User>(`${environment.apiUrl}/users`, id);
  }

  getParkingManager(id: number): Observable<ParkingManager> {
    return this.http.Get<ParkingManager>(
      `${environment.apiUrl}/users/parkingmanagers`,
      id
    );
  }

  getAllParkingManagers(): Observable<ParkingManager[]> {
    return this.http.GetAll<ParkingManager[]>(
      `${environment.apiUrl}/users/parkingmanagers`
    )
  }

  getAllocationManager(id: number): Observable<AllocationManager> {
    return this.http.Get<AllocationManager>(
      `${environment.apiUrl}/users/allocationmanagers`,
      id
    );
  }

  getAllAllocationManager(): Observable<AllocationManager[]> {
    return this.http.GetAll<AllocationManager[]>(
      `${environment.apiUrl}/users/allocationmanagers`
    )
  }
}
