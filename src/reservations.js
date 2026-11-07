export class Availability {
  constructor(capacity) {
    if (!Number.isSafeInteger(capacity) || capacity < 0) throw new Error('Capacity must be a nonnegative integer');
    this.remaining = capacity;
  }
  available() { return this.remaining; }
  take(quantity) {
    if (!Number.isSafeInteger(quantity) || quantity <= 0 || quantity > this.remaining) return false;
    this.remaining -= quantity;
    return true;
  }
}
export class Reservation {
  constructor(availability) { this.availability = availability; }
  reserve(name, quantity) {
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 80 || !Number.isSafeInteger(quantity) || quantity <= 0) {
      return { status: 'rejected', reason: 'invalid_request', message: 'Enter a name and a positive whole number of seats.' };
    }
    if (!this.availability.take(quantity)) {
      return { status: 'rejected', reason: 'insufficient_availability', message: 'Not enough seats available. No seats were reserved.' };
    }
    return { status: 'confirmed', name: name.trim(), quantity, message: `Confirmed: ${name.trim()} reserved ${quantity} seat${quantity === 1 ? '' : 's'}.` };
  }
}
