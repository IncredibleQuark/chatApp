import { TestBed } from '@angular/core/testing';

import { LeaveRoomGuard } from './leave-room.guard';

describe('LeaveRoomGuard', () => {
  let guard: LeaveRoomGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeaveRoomGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
