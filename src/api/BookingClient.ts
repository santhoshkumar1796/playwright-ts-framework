import { APIRequestContext, expect } from '@playwright/test';

export type Booking = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds?: string;
};

/** Thin, typed wrapper around the Restful Booker API. */
export class BookingClient {
  private token?: string;

  constructor(private readonly request: APIRequestContext) {}

  async authenticate(username = 'admin', password = 'password123'): Promise<void> {
    const res = await this.request.post('/auth', { data: { username, password } });
    expect(res.ok()).toBeTruthy();
    this.token = (await res.json()).token;
  }

  private authHeaders(): Record<string, string> {
    if (!this.token) throw new Error('Call authenticate() first');
    return { Cookie: `token=${this.token}` };
  }

  async create(booking: Booking): Promise<{ bookingid: number; booking: Booking }> {
    const res = await this.request.post('/booking', { data: booking });
    expect(res.status()).toBe(200);
    return res.json();
  }

  async get(id: number) {
    return this.request.get(`/booking/${id}`);
  }

  async update(id: number, booking: Booking) {
    return this.request.put(`/booking/${id}`, { data: booking, headers: this.authHeaders() });
  }

  async patch(id: number, partial: Partial<Booking>) {
    return this.request.patch(`/booking/${id}`, { data: partial, headers: this.authHeaders() });
  }

  async delete(id: number) {
    return this.request.delete(`/booking/${id}`, { headers: this.authHeaders() });
  }
}
