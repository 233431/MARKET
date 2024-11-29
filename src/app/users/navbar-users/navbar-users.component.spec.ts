import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUsersComponent } from './navbar-users.component';

describe('NavbarUsersComponent', () => {
  let component: NavbarUsersComponent;
  let fixture: ComponentFixture<NavbarUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
