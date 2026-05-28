import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteComplexComponent } from './autocomplete-complex.component';

describe('AutoCompleteComplexComponent', () => {
  let component: AutoCompleteComplexComponent;
  let fixture: ComponentFixture<AutoCompleteComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoCompleteComplexComponent],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AutoCompleteComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
