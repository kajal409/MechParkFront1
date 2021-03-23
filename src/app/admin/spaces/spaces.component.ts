import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Space } from 'src/app/_models/space';
import { SpaceService } from 'src/app/_services/space.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css'],
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
export class SpacesComponent implements OnInit {
  spaces: Space[];
  filteredSpace: Space[];
  spaceSource: MatTableDataSource<Space>;
  expandedElement: Space | null;
  spaceColumnsToDisplay = [
    'code',
    'occupiedCapacity',
    'totalCapacity',
    'actions'
  ];
  value = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private spaceService: SpaceService,
    private _snackBar: MatSnackBar
  ) {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.spaceSource.filter = filterValue.trim().toLowerCase();

    if (this.spaceSource.paginator) {
      this.spaceSource.paginator.firstPage();
    }
  }

  delete(id: number): void {
    this.spaceService
      .delete(id)
      .pipe()
      .subscribe(
        () => {
          this.spaceService.getAll().subscribe((spaces: Space[]) => {
            this.spaces = spaces;
            this.filteredSpace = this.spaces.filter((space) => {
              //check
              return space != 'Admin';
            });
            this.spaceSource = new MatTableDataSource<Space>(
              this.filteredSpace
            );

            this.spaceSource.paginator = this.paginator;
            this.spaceSource.sort = this.sort;
          });
          this._snackBar.open('✓ Deleted', '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
        },
        (error) => {
          this._snackBar.open(`✗ Error ${error.error.message}`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
        }
      );
  }

  ngOnInit(): void {
    this.spaceService.getAll().subscribe((spaces: Space[]) => {
      this.spaces = spaces;
      this.filteredSpace = this.spaces.filter((space) => {
        //check
        return space != 'Admin';
      });
      this.spaceSource = new MatTableDataSource<Space>(this.filteredSpace);

      this.spaceSource.paginator = this.paginator;
      this.spaceSource.sort = this.sort;
    });
  }

  /*ngAfterViewInit(): void {
    this.spaceSource.paginator = this.paginator;
    this.spaceSource.sort = this.sort;
  }*/
}
