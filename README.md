# Beyond vibe coding: Black Tech NOLA workshop

Build a small reservation app from examples the class agrees on. Start with a working development harness and missing business behavior, then write executable checks before asking AI to implement it.

## Start here

1. Install **Node.js 24 LTS**, which includes npm, from https://nodejs.org/en/download. Check `node --version` begins with `v24`.
2. Extract this whole folder. Open a terminal in the folder containing `package.json`.
3. Run:

```sh
npm ci
npm run test:harness
npm start
```

Open http://127.0.0.1:3000. The app starts with **5 available seats**. Enter a name and a positive whole number of seats. Valid requests receive a confirmation and reduce availability. Requests exceeding availability are rejected in full. Blank names and invalid quantities are rejected without taking seats.

All reservation state is held **in memory**. Restarting the server clears reservations and restores the configured starting capacity. Reloading the browser does not reset it.

```sh
npm test                 # all 24 Cucumber acceptance scenarios
npm run test:services    # business rules only
npm run test:workflow    # HTTP workflows, including the last seat
npm run test:harness     # page and availability smoke test
npm start               # default: 5 seats, port 3000
CAPACITY=12 PORT=3001 npm start
```

`CAPACITY` must be a nonnegative safe integer; `PORT` defaults to 3000. `RESOURCE` optionally changes the event title. Stop the app with Ctrl+C.

**Scenario values are test fixtures, not running-app configuration.** Each Given step creates isolated state or a temporary HTTP server with its stated capacity (such as one seat for the last-seat workflow). Tests never change the running app. The default-capacity scenario checks five seats; environment variables configure only the server launched by `npm start`.

## Test-first evidence

This checkout already contained reservation logic. The scenarios were expanded first, and a contradictory partial-fulfillment scenario was corrected to match all-or-nothing reservations. The original files were preserved under `.backups/test-first/`. Running the executable scenarios against explicit unfinished methods produced **23 failures and 1 pass**, with no undefined steps (see `.backups/test-first/red.log`). The default-capacity check already passed. Restoring the implementation makes all 24 scenarios pass, including blank names, invalid quantities, insufficient capacity, and Jordan taking the last seat before Casey is rejected over HTTP.

The workshop materials below describe the original exercise and historical checkpoints. Loading a checkpoint replaces the current implementation and root feature files.

## What to open

- [Student exercise](docs/student-exercise.md): repeat the session at home.
- [Presenter script](docs/presenter-script.md): every slide, time box, spoken cues, commands and expected results.
- [Copy/paste AI prompts](docs/prompts.md): tool-neutral prompts for each stage.
- [Interface and decisions](docs/interface.md): the prepared boundaries and sample rules.
- [Deck review](docs/deck-review.md): alignment and remaining delivery decisions.
- [Sharing guide](docs/sharing.md): distribute this starter to the class.
- `docs/black-tech-nola-workshop-draft.pptx`: the original presentation, unchanged.

## Checkpoints

Use these for rehearsal, recovery, or a guided exercise without an AI tool. These commands replace the workshop app module and root `.feature` files. They preserve previous versions in `.backups/`. They do not reset custom step definitions or nested feature files. Use a fresh extraction for a completely clean restart.

| Command | State | Expected result |
| --- | --- | --- |
| `npm run checkpoint -- starter` | Prepared app and steps, no examples | Harness passes; 0 Cucumber scenarios |
| `npm run checkpoint -- services` | Five approved example checks, missing behavior | 5 failed scenarios, no undefined steps |
| `npm run checkpoint -- workflow` | Adds last-seat journey over HTTP | 6 failed scenarios, no undefined steps |
| `npm run checkpoint -- complete` | Same six checks, reference implementation | 6 passed scenarios |

**Restart the server after loading a checkpoint or changing application code.** Tests start their own temporary server and do not require `npm start`.

The sample rules reject an entire request when it exceeds availability. If the class chooses partial reservations or another rule, review and revise the examples before building. The reference answer demonstrates only the documented sample rules.

## Tools and cost

The starter and reference solution need no AI account, API key, database, cloud account or paid service. The initial `npm ci` needs internet access. The installed app and checks run locally afterward. To practice AI-assisted implementation, use a coding assistant of your choice with whatever account/access its provider requires. Provider charges and usage limits vary. No particular paid plan is required by these materials. A manual exercise is also supported.

## Scope

One local Node application contains Availability and Reservation. The browser uses that same app through HTTP. Data lives in memory and resets when the server restarts. The automated journey checks the HTTP behavior; the presenter and students check the browser manually. This is a workshop implementation, not a hosted booking system.

## Troubleshooting

- `node` or `npm` not found: install Node 24 and reopen your terminal.
- `cucumber-js` not found: run `npm ci` from this folder. Cucumber is a local dependency, not a global command.
- Undefined steps: compare your Gherkin with `features/steps/reservations.steps.js`, then implement the missing binding. An undefined step is a setup issue.
- `Not implemented`: expected before the build stage. Afterward check that the app module was implemented and the server restarted.
- Port 3000 in use: stop your previous server or set `PORT=3001` using your shell's environment-variable syntax. Then open that port.
- Browser shows old state: restart the server and reload the page. Refreshing alone does not reset seats.
- Install blocked by your network: prepare dependencies on the presentation laptop beforehand. A copied source ZIP alone does not include installed dependencies.

Cucumber setup follows its [official installation guidance](https://github.com/cucumber/cucumber-js/blob/main/docs/installation.md). Learn the notation in the [Gherkin reference](https://cucumber.io/docs/gherkin/reference/).
