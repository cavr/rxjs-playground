import { TestBed } from '@angular/core/testing';

import { HolandoService } from './holando.service';

describe('HolandoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HolandoService = TestBed.get(HolandoService);
    expect(service).toBeTruthy();
  });
});
