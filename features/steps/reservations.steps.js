import assert from 'node:assert/strict';
import { Given, When, Then, After } from '@cucumber/cucumber';
import { Availability, Reservation } from '../../src/reservations.js';
import { createApp } from '../../src/server.js';

Given('the event starts with {int} available seat(s)', function (capacity) {
  this.availability = new Availability(capacity);
  this.reservations = new Reservation(this.availability);
});
When('{word} reserves {int} seat(s)', function (name, quantity) {
  this.results ??= {};
  this.results[name] = this.reservations.reserve(name, quantity);
});
Then('{word} has a confirmed reservation', function (name) {
  assert.equal(this.results[name].status, 'confirmed');
  assert.equal(this.results[name].name, name);
});
Then('{word} receives an insufficient availability rejection', function (name) {
  assert.equal(this.results[name].status, 'rejected');
  assert.equal(this.results[name].reason, 'insufficient_availability');
});
Then('the event has {int} available seat(s)', function (expected) {
  assert.equal(this.availability.available(), expected);
});
When('availability allocates {int} seat(s)', function (quantity) {
  this.allocated = this.availability.take(quantity);
});
Then('the allocation succeeds', function () { assert.equal(this.allocated, true); });
Then('the allocation is rejected', function () { assert.equal(this.allocated, false); });
Given('the local app starts with {int} available seat(s)', async function (capacity) {
  this.server = createApp({ capacity });
  await new Promise(resolve => this.server.listen(0, '127.0.0.1', resolve));
  this.url = `http://127.0.0.1:${this.server.address().port}`;
  this.responses = {};
});
When('{word} requests {int} seat(s) through the app', async function (name, quantity) {
  const response = await fetch(`${this.url}/api/reservations`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, quantity })
  });
  this.responses[name] = { code: response.status, body: await response.json() };
});
Given('the local app starts with its default capacity', async function () {
  this.server = createApp();
  await new Promise(resolve => this.server.listen(0, '127.0.0.1', resolve));
  this.url = `http://127.0.0.1:${this.server.address().port}`;
  this.responses = {};
});
Then('the app rejects {word} because {int} seat(s) remain', function (name, remaining) {
  assert.equal(this.responses[name].code, 400);
  assert.equal(this.responses[name].body.status, 'rejected');
  assert.equal(this.responses[name].body.reason, 'insufficient_availability');
  assert.equal(this.responses[name].body.available, remaining);
});
Then('the app confirms {word}', function (name) {
  assert.equal(this.responses[name].code, 201);
  assert.equal(this.responses[name].body.status, 'confirmed');
  assert.equal(this.responses[name].body.name, name);
});
Then('the app rejects {word} because no seats remain', function (name) {
  assert.equal(this.responses[name].code, 400);
  assert.equal(this.responses[name].body.status, 'rejected');
  assert.equal(this.responses[name].body.reason, 'insufficient_availability');
});
Then('the app shows {int} available seat(s)', async function (expected) {
  const response = await fetch(`${this.url}/api/availability`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).available, expected);
});
After(async function () {
  if (this.server?.listening) await new Promise((resolve, reject) => this.server.close(error => error ? reject(error) : resolve()));
});

When(/^a reservation is submitted with name (.+) and quantity (.+)$/, function (name, quantity) {
  this.result = this.reservations.reserve(JSON.parse(name), JSON.parse(quantity));
});
Then('the reservation is rejected as invalid', function () {
  assert.equal(this.result.status, 'rejected');
  assert.equal(this.result.reason, 'invalid_request');
});
When(/^an HTTP reservation is submitted with name (.+) and quantity (.+)$/, async function (name, quantity) {
  const response = await fetch(`${this.url}/api/reservations`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: JSON.parse(name), quantity: JSON.parse(quantity) })
  });
  this.invalidResponse = { code: response.status, body: await response.json() };
});
Then('the HTTP reservation is rejected as invalid', function () {
  assert.equal(this.invalidResponse.code, 400);
  assert.equal(this.invalidResponse.body.status, 'rejected');
  assert.equal(this.invalidResponse.body.reason, 'invalid_request');
});
