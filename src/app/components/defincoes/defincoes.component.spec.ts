import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefincoesComponent } from './defincoes.component';

describe('DefincoesComponent', () => {
  let component: DefincoesComponent;
  let fixture: ComponentFixture<DefincoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefincoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefincoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
