# Prepared interface and sample decisions

## Rules to read back to the room

The sample checkpoints assume these choices. Confirm them before adopting the examples:

1. Two seats available, Jordan requests one: confirm one and leave one.
2. One seat available, Jordan requests two: reject the whole request and leave one. No partial reservations.
3. Two seats available, Jordan requests two: confirm two and leave zero.
4. One seat available, Jordan requests one, then Casey requests one: Jordan succeeds, Casey is rejected, and zero remain.

Prepared input boundaries: capacity is a nonnegative integer, a name is nonblank and at most 80 characters after trimming, and requested quantity is a positive whole number. These prevent malformed requests. The six core workshop scenarios do not establish all those boundaries; adding executable boundary examples is an optional extension. Agree on any changed boundary before modifying it.

## Availability

`new Availability(capacity)` starts one resource with that many seats.

- `available()` returns the current remaining integer.
- `take(quantity)` returns `true` and subtracts the quantity when possible.
- It returns `false` and preserves capacity when the quantity is invalid or exceeds remaining capacity.

## Reservation

`new Reservation(availability)` shares that real Availability instance.

- `reserve(name, quantity)` returns `{ status: 'confirmed', name, quantity, message }` when successful.
- It returns `{ status: 'rejected', reason: 'insufficient_availability', message }` when there are too few seats.
- It returns `{ status: 'rejected', reason: 'invalid_request', message }` for invalid inputs.
- Every rejection leaves capacity unchanged.

## HTTP and browser

`createApp({ capacity, resource })` creates a server with fresh in-memory state.

- `GET /api/availability`: 200, `{ resource, available }`.
- `POST /api/reservations`: JSON `{ name, quantity }`. A confirmation returns 201; business rejection returns 400. Both include the result and current `available` count.
- `GET /`: the prepared browser form. It submits to the same reservation route used by the HTTP journey check.

The UI and transport exist before the talk so the ten-minute build window can focus on the two business responsibilities. AI implements `src/reservations.js`. The exercise builds the missing behavior of an existing application rather than generating all scaffolding live.

## Test map

- `test:harness`: page loads and initial capacity can be read. This says nothing about successful reservations.
- `@service`: two Availability scenarios and three Reservation scenarios use real objects and real state.
- `@workflow`: real HTTP requests exercise both responsibilities and re-read availability after each request.
- Browser smoke test: two initial seats, Jordan requests one and succeeds, Casey requests two and is rejected, one seat remains. Restart afterward.

Each Cucumber scenario gets fresh objects or a fresh HTTP server. No external server, shared fixture state, mocks, or fake pass steps are required.
