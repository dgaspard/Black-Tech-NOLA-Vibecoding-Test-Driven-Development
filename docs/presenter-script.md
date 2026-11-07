# Presenter script: Beyond vibe coding

45 minutes, aligned to the deck's 12:15–1:00 schedule. All times below can shift together. The audience participates verbally; only the presenter needs a laptop during the talk. The take-home version assumes students install Node afterward.

## Before the room opens

- Extract a fresh copy of the starter for the live exercise. Keep the distribution ZIP untouched.
- Run `npm ci`, `npm run test:harness`, and `npm start`. Check http://127.0.0.1:3000. The page loads with two seats; reservation is deliberately unfinished. Stop the server.
- Rehearse all four checkpoints in a separate copy. Start with `services`, run its failing checks, then `workflow`, run its failing checks, then `complete`, run the passing checks and demonstrate the browser. Return the live copy to `starter`.
- Open the deck, this script, the project in your editor, and a terminal. Increase editor and terminal font sizes so the back row can read.
- Open your chosen AI tool and verify access before the session. The prompts are in `docs/prompts.md`. The app does not call that tool at runtime.
- Have the prepared complete checkpoint available locally. Dependencies must already be installed for an offline fallback. A recording is optional and has not been supplied; make one during rehearsal if you want the extra fallback mentioned in the deck.
- Put the class ZIP in the event's existing download location. Verify the actual download from a second browser before announcing it. If using GitHub, use the verified repository URL. Add that URL and a QR code to slide 11 once known. Do not display a placeholder as a working link.

## Slide 1 — Beyond vibe coding (12:15–12:16, 1 minute)

**Say:** “Today we’ll build the behavior of one small app together on my laptop. You don’t need to install anything now. Your job is to decide what the app should do and how we’ll know it works. We’ll give AI examples we can check. Afterward, you’ll get this starter and the steps to repeat the exercise.”

**Clarify:** “We are using AI to help build the application. The reservation app itself does not need an AI model.”

**Show:** Title slide only.

## Slide 2 — We decide what working means (12:16–12:18, 2 minutes)

**Say:** “A screen can look convincing while the app breaks a rule. We’ll agree on observable results before asking AI to implement them. BDD is that conversation about behavior. Gherkin is a way to write the examples. Cucumber connects them to executable code.”

**Ask:** “Has an app technically worked but done the wrong thing for you?” Take one brief response.

**Transition:** “Let’s choose the thing people will reserve.”

## Slide 3 — One reservation app (12:18–12:22, 4 minutes)

Take at most three suggestions: event seats, class spaces, or rental items. Vote quickly. Default to event seats if no clear choice emerges.

**Say:** “We have one kind of user, one resource, and one reservation action. We’ll park accounts, payments and notifications.”

Capture the chosen resource in `docs/decisions.md`. If the context changes, use the same small whole-number inventory model. Keep the sample checkpoint visibly labeled as event seats if you use it later.

## Slide 4 — Success and rejection (12:22–12:25, 3 minutes)

Give pairs 90 seconds for one success and one rejection example.

**Ask:** “Two seats are available. Jordan requests one. What happens? Only one is available and Jordan requests two. Do we reject the whole request or reserve part of it? What remains afterward?”

Record the human decision. The prepared sample uses complete rejection with no capacity change. If the room chooses something else, do not pretend the prepared answer implements that choice.

## Slide 5 — Our first executable example (12:25–12:28, 3 minutes)

Read the on-slide example aloud. Explain starting condition, action, and observable outcome.

Paste prompt 1 from `docs/prompts.md`, adapting the business context. Review three examples with the class. Use the exact-capacity case as the default third example. Record approved expectations in `docs/decisions.md`.

**Say:** “The expected result belongs to us. AI can suggest an example, but we decide whether it describes the app we want.”

## Slide 6 — Who owns each part? (12:28–12:31, 3 minutes)

Paste prompt 2. Confirm at most two responsibilities: Availability tracks what remains; Reservation decides the outcome of a request using that availability.

**Say:** “These are two parts inside one local application. The starter already has the screen, HTTP wiring and test runner so we can spend our time on behavior.”

Open `src/reservations.js` briefly to show the two small unfinished classes. Do not tour all the framework code.

## Slide 7 — Checks for each part (12:31–12:37, 6 minutes)

Switch to the editor. Run `npm run test:harness` first. Expect one passing setup check.

Paste prompt 3. Read the generated feature files and the assertions with the class. If the assistant is slow, use the prepared sample only after confirming it matches the approved decisions:

```sh
npm run checkpoint -- services
npm run test:services
```

Expect **5 failed scenarios** and no undefined or ambiguous steps. The failure should identify missing `Availability.take` or `Reservation.reserve` behavior.

**Point to:** the check of the rejection reason and the assertion that the available count is unchanged. The Given phrase says “starts with” to distinguish setup from the Then assertion; Cucumber does not use Given/Then keywords to disambiguate identical step text.

**Say:** “The harness is working. The behavior is missing. That is the failure we wanted to see before building.”

If you see undefined steps, ambiguous steps, module errors or a missing command, fix setup first. Do not present those as evidence about product behavior.

## Slide 8 — The complete journey (12:37–12:41, 4 minutes)

Paste prompt 4. Keep the app unimplemented. If necessary, load the matching sample:

```sh
npm run checkpoint -- workflow
npm run test:workflow
```

Expect **1 failed scenario**. The prepared starter returns HTTP 500 for missing behavior, while the check expects 201 for Jordan's confirmation. The full `npm test` has six failures at this stage.

**Read:** Jordan requests the last seat; Jordan is confirmed; zero seats remain; Casey requests one; Casey is rejected; zero seats still remain.

**Ask:** “What could be wrong even if each part worked alone?” Listen for failure to update availability or rejection consuming seats.

**Say:** “This check crosses the real HTTP boundary and reads the resulting state. We will also inspect the browser.”

## Slide 9 — AI builds to our checks (12:41–12:51, 10 minutes maximum)

**Before prompting:** Read back the success and rejection outcomes. Ask for explicit agreement from the room. Resolve ambiguity before proceeding.

Paste prompt 5. While code generates, ask pairs to invent one edge case. Review changes to `src/reservations.js` and confirm that feature files and assertions did not change. Run:

```sh
npm test
npm run test:harness
npm start
```

For the default sample, expect **6 passing scenarios** and **1 passing harness check**.

Open http://127.0.0.1:3000. From two seats, Jordan requests one. Show confirmation and one remaining seat. Casey then requests two. Show rejection and still one seat. Explain that automated tests use their own fresh app, not this browser's inventory.

**At 12:49, if unfinished:** Stop the live server with Ctrl+C. Say: “I prepared a working checkpoint so we can protect your exercise time. This is that version, built earlier against these sample checks.” Run:

```sh
npm run checkpoint -- complete
npm test
npm start
```

Demonstrate the same browser sequence. If the room chose different rules, state the difference. Do not claim the reference solution satisfies altered rules.

**Say:** “Passing establishes the examples we checked. We can still discover missing rules.” Only if ahead of schedule, use prompt 6 for one new rule, with its failing check first. Stop this segment at 12:51.

## Slide 10 — Your own idea (12:51–12:54, 3 minutes)

**Say:** “Write one success example and one rejection example for your own idea. Include actual starting values and an outcome someone could observe.”

Give two minutes to pairs, then invite one example and ask another pair whether the outcome is unambiguous. If someone says “it works,” ask what the user would see or what state would change.

Protect this segment even if the demonstration ran long.

## Slide 11 — The take-home exercise (12:54–12:56, 2 minutes)

Share the verified download location or distribute the supplied ZIP using the event's channel.

**Say:** “Extract the folder, install Node 24, run `npm ci`, then follow `docs/student-exercise.md`. The README explains the intentionally unfinished starting state. The script and prompts follow this PowerPoint. Start with the workshop rules, then substitute your own.”

**Explain cost accurately:** “The app and checks run locally without an API key. AI assistance is optional. If you use it, access and charges depend on the tool you choose.”

Tell learners that checkpoints contain reference answers and that `complete` is a fallback. The ZIP includes the original draft presentation and is source-only; it does not include dependencies. Do not promise an online repository until it exists.

## Slide 12 — Questions (12:56–1:00, 4 minutes)

Use the on-slide questions. Suggested answers:

- **Does green mean production-ready?** “It means these examples pass. We still need more work for persistence, multi-user deployment and other production needs.”
- **Does Gherkin execute itself?** “The step definitions connect the words to application code.”
- **Can AI write checks?** “Yes. We review the expected outcomes and verify that the assertions observe real behavior.”
- **What if AI changes a test to make it pass?** “We restore the approved expectation and ask it to fix the app. A changed expectation needs a human decision.”

**Close:** “Before your next AI build, write one success example and one rejection example. Decide what working means.”

## Slide 13 — Prompt sequence (appendix)

Do not allocate another live segment. Point students to `docs/prompts.md` for full copy/paste text and `docs/student-exercise.md` for commands.
