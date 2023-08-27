import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrderedComponent } from './cart-ordered.component';

describe('CartOrderedComponent', () => {
  let component: CartOrderedComponent;
  let fixture: ComponentFixture<CartOrderedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartOrderedComponent]
    });
    fixture = TestBed.createComponent(CartOrderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
