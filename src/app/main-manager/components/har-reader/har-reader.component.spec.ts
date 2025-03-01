/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HarReaderComponent } from './har-reader.component';

describe('HarReaderComponent', () => {
  let component: HarReaderComponent;
  let fixture: ComponentFixture<HarReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
