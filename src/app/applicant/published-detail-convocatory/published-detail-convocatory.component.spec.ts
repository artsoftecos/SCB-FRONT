import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedDetailConvocatoryComponent } from './published-detail-convocatory.component';

describe('PublishedDetailConvocatoryComponent', () => {
  let component: PublishedDetailConvocatoryComponent;
  let fixture: ComponentFixture<PublishedDetailConvocatoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedDetailConvocatoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedDetailConvocatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
