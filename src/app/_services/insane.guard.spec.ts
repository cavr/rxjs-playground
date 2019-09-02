import { TestBed, async, inject } from '@angular/core/testing';

import { InsaneGuard } from './insane.guard';

describe('InsaneGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsaneGuard]
    });
  });

  it('should ...', inject([InsaneGuard], (guard: InsaneGuard) => {
    expect(guard).toBeTruthy();
  }));
});
