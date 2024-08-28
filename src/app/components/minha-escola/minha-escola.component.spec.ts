import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaEscolaComponent } from './minha-escola.component';

describe('MinhaEscolaComponent', () => {
  let component: MinhaEscolaComponent;
  let fixture: ComponentFixture<MinhaEscolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhaEscolaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhaEscolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
