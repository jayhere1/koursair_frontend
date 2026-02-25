import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useKenyaBooking } from '@/hooks/useKenyaBooking';

describe('useKenyaBooking', () => {
  it('initial state: 1 adult, 0 children, 1 traveler', () => {
    const { result } = renderHook(() => useKenyaBooking());
    expect(result.current.adultCount).toBe(1);
    expect(result.current.childCount).toBe(0);
    expect(result.current.travelers).toHaveLength(1);
    expect(result.current.totalTravelers).toBe(1);
  });

  it('handleAddTraveler — adds when below capacity, noop at capacity', () => {
    const { result } = renderHook(() => useKenyaBooking());

    // Increase adult count to allow adding
    act(() => result.current.setAdultCount(3));

    act(() => result.current.handleAddTraveler());
    expect(result.current.travelers).toHaveLength(2);

    act(() => result.current.handleAddTraveler());
    expect(result.current.travelers).toHaveLength(3);

    // Should be at capacity now (3 adults, 0 children = 3 total)
    act(() => result.current.handleAddTraveler());
    expect(result.current.travelers).toHaveLength(3); // no change
  });

  it('handleRemoveTraveler — removes by id, clears expandedTravelerId if match', () => {
    const { result } = renderHook(() => useKenyaBooking());

    act(() => result.current.setAdultCount(3));
    act(() => result.current.handleAddTraveler());
    const secondId = result.current.travelers[1].id;

    // The newly added traveler should be expanded
    expect(result.current.expandedTravelerId).toBe(secondId);

    act(() => result.current.handleRemoveTraveler(secondId));
    expect(result.current.travelers).toHaveLength(1);
    expect(result.current.expandedTravelerId).toBeNull();
  });

  it('handleTravelerChange — updates field on correct traveler', () => {
    const { result } = renderHook(() => useKenyaBooking());
    const id = result.current.travelers[0].id;

    act(() => result.current.handleTravelerChange(id, 'firstName', 'Alice'));
    expect(result.current.travelers[0].firstName).toBe('Alice');
  });

  it('toggleTraveler — toggles expanded id', () => {
    const { result } = renderHook(() => useKenyaBooking());
    const id = result.current.travelers[0].id;

    // Initially expanded
    expect(result.current.expandedTravelerId).toBe(id);

    // Toggle off
    act(() => result.current.toggleTraveler(id));
    expect(result.current.expandedTravelerId).toBeNull();

    // Toggle on
    act(() => result.current.toggleTraveler(id));
    expect(result.current.expandedTravelerId).toBe(id);
  });

  it('isFamilyBooking — true when total >= 4', () => {
    const { result } = renderHook(() => useKenyaBooking());
    expect(result.current.isFamilyBooking).toBe(false);

    act(() => result.current.setAdultCount(4));
    expect(result.current.isFamilyBooking).toBe(true);

    act(() => {
      result.current.setAdultCount(2);
      result.current.setChildCount(2);
    });
    expect(result.current.isFamilyBooking).toBe(true);
  });

  it('travelers trimmed when count decreases', async () => {
    const { result, rerender } = renderHook(() => useKenyaBooking());

    // Add travelers
    act(() => result.current.setAdultCount(3));
    act(() => result.current.handleAddTraveler());
    act(() => result.current.handleAddTraveler());
    expect(result.current.travelers).toHaveLength(3);

    // Decrease count — useEffect should trim
    act(() => result.current.setAdultCount(1));
    rerender();

    // Wait for effect to fire
    expect(result.current.travelers.length).toBeLessThanOrEqual(1);
  });
});
