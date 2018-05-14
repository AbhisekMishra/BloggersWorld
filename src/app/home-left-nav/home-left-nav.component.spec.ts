import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLeftNavComponent } from './home-left-nav.component';

describe('HomeLeftNavComponent', () => {
  let component: HomeLeftNavComponent;
  let fixture: ComponentFixture<HomeLeftNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLeftNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
