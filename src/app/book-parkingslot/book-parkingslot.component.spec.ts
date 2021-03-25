import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookParkingslotComponent } from './book-parkingslot.component';

describe('BookParkingslotComponent', () => {
  let component: BookParkingslotComponent;
  let fixture: ComponentFixture<BookParkingslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookParkingslotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookParkingslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
