import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPublishConvocatoryComponent } from './pending-publish-convocatory.component';

describe('PendingPublishConvocatoryComponent', () => {
  let component: PendingPublishConvocatoryComponent;
  let fixture: ComponentFixture<PendingPublishConvocatoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPublishConvocatoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPublishConvocatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
