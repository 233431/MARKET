import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateUsersComponent } from './form-create-users.component';

describe('FormCreateUsersComponent', () => {
  let component: FormCreateUsersComponent;
  let fixture: ComponentFixture<FormCreateUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCreateUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
