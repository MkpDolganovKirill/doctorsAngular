import { TestBed } from '@angular/core/testing';

import { AuthGuardsGuard } from './auth-guards.guard';

describe('AuthGuardsGuard', () => {
  let guard: AuthGuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
