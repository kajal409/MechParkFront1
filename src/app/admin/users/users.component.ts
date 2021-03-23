/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class UsersComponent implements OnInit {
  users: User[];
  filteredUsers: User[];
  userSource: MatTableDataSource<User>;
  expandedElement: User | null;
  userColumnsToDisplay = [
    'name',
    'email',
    'role',
    'phone',
    'created',
    'actions'
  ];
  value = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userSource.filter = filterValue.trim().toLowerCase();

    if (this.userSource.paginator) {
      this.userSource.paginator.firstPage();
    }
  }

  delete(id: number): void {
    this.userService
      .delete(id)
      .pipe()
      .subscribe(
        () => {
          this.userService.getAll().subscribe((users: User[]) => {
            this.users = users;
            this.filteredUsers = this.users.filter((user) => {
              return user.role != 'Admin';
            });
            this.userSource = new MatTableDataSource<User>(this.filteredUsers);

            this.userSource.sort = this.sort;
            this.userSource.paginator = this.paginator;
          });
          this._snackBar.open('✓ Deleted', '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
        },
        (error) => {
          this._snackBar.open(`✗ Error ${error}`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
        }
      );
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe((users: User[]) => {
      this.users = users;
      this.filteredUsers = this.users.filter((user) => {
        return user.role != 'Admin';
      });
      this.userSource = new MatTableDataSource<User>(this.filteredUsers);
      this.userSource.paginator = this.paginator;
      this.userSource.sort = this.sort;
    });
  }

  /*ngAfterViewInit(): void {
    this.userSource.paginator = this.paginator;
    this.userSource.sort = this.sort;
  }*/
}
