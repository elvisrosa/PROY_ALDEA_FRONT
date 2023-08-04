import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraCasaComponent } from './bitacora-casa.component';

describe('BitacoraCasaComponent', () => {
  let component: BitacoraCasaComponent;
  let fixture: ComponentFixture<BitacoraCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitacoraCasaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BitacoraCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
