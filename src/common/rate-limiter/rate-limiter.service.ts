import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimiterService {
  private requests: Map<string, number[]> = new Map();

  allowRequest(phone: string): boolean {
    const now = Date.now();
    const window = 60 * 1000; // 1 minute window
    const maxRequests = 5;

    if (!this.requests.has(phone)) {
      this.requests.set(phone, []);
    }

    const timestamps = this.requests.get(phone)!.filter(timestamp => now - timestamp < window);
    timestamps.push(now);

    this.requests.set(phone, timestamps);

    return timestamps.length <= maxRequests;
  }
}
