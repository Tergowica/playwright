import { APIRequestContext, expect } from '@playwright/test';

export class BookingClient {
  constructor(private request: APIRequestContext) {}

  async createBooking(payload: any) {
    const response = await this.request.post('/booking', {
      data: payload,
    });

    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async getBooking(id: number) {
    const response = await this.request.get(`/booking/${id}`);

    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async createToken() {
    const response = await this.request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    return body.token;
  }

  async updateBooking(id: number, payload: any, token: string) {
    const response = await this.request.put(`/booking/${id}`, {
      data: payload,
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async deleteBooking(id: number, token: string) {
    const response = await this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    return response;
  }
}