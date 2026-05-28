import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AsyncAutocompleteLabComponent } from './async-autocomplete-lab.component';

describe('AsyncAutocompleteLabComponent', () => {
  let component: AsyncAutocompleteLabComponent;
  let fixture: ComponentFixture<AsyncAutocompleteLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsyncAutocompleteLabComponent],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncAutocompleteLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});