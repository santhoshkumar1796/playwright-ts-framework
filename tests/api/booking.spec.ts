import { test, expect } from '../../src/fixtures/test-fixtures';
import type { Booking } from '../../src/api/BookingClient';

const booking: Booking = {
  firstname: 'Santhosh',
  lastname: 'QA',
  totalprice: 250,
  depositpaid: true,
  bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
  additionalneeds: 'Breakfast',
};

test.describe.serial('Booking API CRUD @regression', () => {
  let bookingId: number;

  test('create booking @smoke', async ({ bookingClient }) => {
    const created = await bookingClient.create(booking);
    bookingId = created.bookingid;
    expect(bookingId).toBeGreaterThan(0);
    expect(created.booking).toMatchObject(booking);
  });

  test('get booking by id', async ({ bookingClient }) => {
    const res = await bookingClient.get(bookingId);
    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject({ firstname: 'Santhosh', totalprice: 250 });
  });

  test('update booking', async ({ bookingClient }) => {
    const res = await bookingClient.update(bookingId, { ...booking, totalprice: 300 });
    expect(res.status()).toBe(200);
    expect((await res.json()).totalprice).toBe(300);
  });

  test('partially update booking', async ({ bookingClient }) => {
    const res = await bookingClient.patch(bookingId, { additionalneeds: 'Late checkout' });
    expect(res.status()).toBe(200);
    expect((await res.json()).additionalneeds).toBe('Late checkout');
  });

  test('delete booking', async ({ bookingClient }) => {
    const res = await bookingClient.delete(bookingId);
    expect(res.status()).toBe(201);
    expect((await bookingClient.get(bookingId)).status()).toBe(404);
  });
});

test('unauthenticated update is rejected', async ({ request }) => {
  const res = await request.put('/booking/1', { data: booking });
  expect(res.status()).toBe(403);
});
