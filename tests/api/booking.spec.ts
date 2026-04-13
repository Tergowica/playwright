import { test, expect } from '@playwright/test';

test.describe('Restful Booker API', () => {
  test('GET /ping - API odpowiada', async ({ request }) => {
    const response = await request.get('/ping');

    expect(response.ok()).toBeTruthy();
  });

  test('GET /booking - zwraca listę bookingów', async ({ request }) => {
    const response = await request.get('/booking');

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
  });
});