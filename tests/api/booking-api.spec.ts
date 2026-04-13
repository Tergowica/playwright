import { test, expect } from '@playwright/test';
import { BookingClient } from '../../utils/booking-client';
import { createBookingData } from '../../utils/booking-data';

test('pełny flow booking', async ({ request }) => {
  const client = new BookingClient(request);

  const payload = createBookingData();

  // create
  const create = await client.createBooking(payload);
  const id = create.bookingid;

  expect(id).toBeTruthy();

  // get
  const booking = await client.getBooking(id);
  expect(booking.firstname).toBe(payload.firstname);

  // auth
  const token = await client.createToken();

  // update
  const updatedPayload = {
    ...payload,
    firstname: 'Jan',
  };

  const updated = await client.updateBooking(id, updatedPayload, token);
  expect(updated.firstname).toBe('Jan');
});