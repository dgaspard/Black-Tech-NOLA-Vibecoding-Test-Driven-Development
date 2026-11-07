// STARTER: the interface is wired, but the business behavior is deliberately missing.
export class Availability {
  constructor(capacity) { this.remaining = capacity; }
  available() { return this.remaining; }
  take(quantity) { throw new Error('Not implemented: Availability.take'); }
}
export class Reservation {
  constructor(availability) { this.availability = availability; }
  reserve(name, quantity) { throw new Error('Not implemented: Reservation.reserve'); }
}
