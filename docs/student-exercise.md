# Repeat the workshop

Allow 30–60 minutes. You need Node 24, a terminal, a browser and this extracted folder. An AI coding assistant is optional. The included reference implementation lets you finish without an AI account.

## 1. Establish your starting point

Run `npm ci`, then `npm run test:harness`. Expect one passing harness check. Run `npm start` and open http://127.0.0.1:3000. Try reserving one seat. Observe the deliberate missing-behavior message. Stop the server with Ctrl+C.

If you previously changed this copy, extract a fresh ZIP in a new folder to preserve your work.

## 2. Decide what working means

Follow slides 3–5. Fill in `docs/decisions.md`. Use prompt 1 in `docs/prompts.md` if you want AI's help. Resolve whether the app rejects an oversized request completely. State the unchanged seat count after rejection. The prepared reference answer assumes all-or-nothing reservations.

## 3. Identify responsibilities

Read `docs/interface.md` and use prompt 2. Explain in your own words how Availability and Reservation interact.

## 4. Write and run service examples

Use prompt 3, or choose the sample rules and run:

```sh
npm run checkpoint -- services
npm run test:services
```

Expect **five failed scenarios**, with `Not implemented` errors and no undefined steps. Find the assertion that checks remaining availability and the one that checks rejection. Explain why a missing step would be a different problem.

## 5. Check the complete journey

Use prompt 4, or load the sample journey:

```sh
npm run checkpoint -- workflow
npm run test:workflow
npm test
```

Expect one failed workflow scenario and six failed scenarios in the full suite. Open `features/journey.feature`: why is checking availability after Casey's rejection useful?

Checkpoint commands restore sample rules and the unimplemented app. Do not load them after writing your own rules unless you intend to switch to the sample exercise; your replaced root feature files and app module will be saved in `.backups/`.

## 6. Implement the approved behavior

Use prompt 5 or implement the two classes yourself. Run `npm test` and `npm run test:harness`. For the default example expect six Cucumber scenarios and one harness check passing.

If you are stuck or working without AI, inspect the reference answer after attempting the exercise:

```sh
npm run checkpoint -- complete
npm test
npm run test:harness
```

Explain how `reserve()` calls `take()` and why a failed `take()` preserves capacity. Reading the answer is useful, but it does not substitute for making your own examples.

## 7. Inspect the app

Run `npm start`. In a fresh app with two seats, reserve one as Jordan. Expect confirmation and one remaining seat. Change the name to Casey and request two. Expect rejection and still one remaining seat. Browser validation may block malformed quantities before they reach the server; the API must enforce its own rules too.

The automated workflow starts its own event with one seat, so it does not alter your browser's event. Restart your browser server to reset its state.

## 8. Make one deliberate change

Choose a new rule, such as “each reservation can request at most two seats.” Use a resource starting with five seats so the new rule differs from insufficient availability. Write a scenario where Jordan requests three, the app rejects for the new reason, and five seats remain. Implement its steps, run it red, review the expected outcome, then implement and run the whole suite green. Do not change an existing expectation just to make a check pass.

For your own project, first write one concrete success and one rejection example. Decide what state must remain unchanged. Keep scope small enough to inspect the result yourself.

## Completion checklist

- I saw a meaningful failure before implementing business behavior.
- I can explain at least one real assertion.
- The approved examples pass without being weakened.
- I demonstrated success and rejection in the browser.
- I can name behavior that my current examples do not establish.
