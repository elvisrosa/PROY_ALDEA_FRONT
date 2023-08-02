import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinosCrearComponent } from './ninos-crear.component';

describe('NinosCrearComponent', () => {
  let component: NinosCrearComponent;
  let fixture: ComponentFixture<NinosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinosCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
