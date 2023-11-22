import { TestBed } from '@angular/core/testing';

import { TravellingcarService } from './travellingcar.service';

describe('TravellingcarService', () => {
  let service: TravellingcarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravellingcarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
