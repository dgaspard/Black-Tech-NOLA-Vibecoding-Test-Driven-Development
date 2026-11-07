# Copy/paste prompts

Use any coding assistant that can read/edit this project and run terminal commands. If your tool is chat-only, paste the referenced files, apply its proposed edits yourself, then run the commands locally. Keep one conversation for the workshop. The human approves expectations at each gate.

## 1. Discover (slide 5)

> Act as a product discovery partner. We are building a limited-availability event-seat reservation app. Keep one actor type, one resource and one action. Ask about ambiguous behavior, including whether an oversized request is rejected entirely. Draft three concrete Given/When/Then examples, including success and rejection. Separate decisions from suggestions. Do not write code. Stop for our review.

After review, record the actual decisions in `docs/decisions.md`. If the audience chooses class spaces or rental items, substitute those nouns and confirm the same quantities and semantics.

## 2. Responsibilities (slide 6)

> Read docs/decisions.md and docs/interface.md. Using only the approved examples, identify at most two responsibilities and explain what each owns in everyday language. Keep them in one local application. Explain any conflict with the prepared interface. Do not build yet. Stop for review.

## 3. Service checks (slide 7)

> Read docs/decisions.md, docs/interface.md and the prepared Cucumber steps. Create @service feature files for the approved examples, checking Availability and Reservation. Reuse the executable steps where they match; add real step definitions only when necessary. Assertions must observe the actual app objects and state. Do not modify src/reservations.js or implement replacement behavior in test code. Run npm run test:services. Fix setup errors, then show the business failures. Do not skip or mark scenarios pending. Stop so we can inspect the assertions and expected outcomes.

## 4. Journey check (slide 8)

> Create an @workflow Cucumber scenario for Jordan reserving the last seat and Casey requesting a seat afterward. Reuse the prepared HTTP steps against createApp. Assert confirmation, rejection, and availability after each request. Use the same app instance for both people. Run npm run test:workflow before implementation. Do not change application code, weaken checks, or copy a checkpoint. Distinguish assertion failures from setup errors. Stop for review.

## 5. Implement (slide 9, only after human approval)

> The room has approved the current feature files and assertions. Implement the smallest behavior in src/reservations.js that satisfies them and docs/interface.md. Keep the prepared local UI and HTTP server. Preserve feature files and assertions exactly. Do not skip, delete, weaken or hard-code a check. Do not read or copy checkpoints/complete. Explain any ambiguity instead of guessing. Run npm test and npm run test:harness. Show what changed and the actual results. Then tell me how to demonstrate success and rejection in the browser. Stop if a change to an expected outcome is needed.

## 6. Optional new rule

> The class approved this new rule: [paste the rule]. Draft its concrete example and a real executable check first. Run it to show a meaningful failure and stop for our review. Do not implement yet.

After the class reviews and approves the new check:

> Implement the approved rule in the app. Preserve all approved checks. Run the full suite and show the new user outcome. If the new rule conflicts with an old expectation, explain the conflict before making changes.

## Recovery

If the assistant changes tests to obtain green results, inspect the diff, restore the approved expectations from your saved copy or checkpoint, and repeat prompt 5. If it creates more services, cloud resources, accounts or payments, remind it that this is one local app. If time runs short, use the openly labeled complete checkpoint and continue the learning exercise.
