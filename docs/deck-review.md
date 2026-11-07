# Review of the supplied Black Tech NOLA draft

Reviewed all 13 slides and their speaker notes for workshop content and execution requirements. This was a content review, not a PowerPoint layout or rendering review. The supplied PowerPoint is included unchanged.

The timing adds up to 45 minutes, from 12:15 to 1:00. The progression is consistent: human decisions, examples, responsibilities, service checks, workflow check, implementation, personal exercise, then take-home practice.

## Gaps addressed by this package

| Deck location | Required preparation | Supplied material |
| --- | --- | --- |
| Slides 3–5 | Small reservation domain and concrete decisions | Event-seat defaults, decisions worksheet and sample Gherkin |
| Slide 7 | Working Cucumber harness before app behavior | Installed-through-lockfile runner, real steps, setup check, missing domain behavior |
| Slide 8 | Complete journey across responsibilities | HTTP scenario confirming Jordan, rejecting Casey and checking remaining capacity |
| Slide 9 | Working checkpoint by 12:49 | `complete` checkpoint and explicit fallback narration |
| Slide 11 | Repeatable student package | README, prerequisites, prompts, exercise, slide script and unchanged source deck |

## Recommended deck adjustments before delivery

1. **Slide 1:** “Build an AI app” can imply the finished app contains AI. This project demonstrates building an app with AI assistance. Consider “Build an app with AI and examples you can test.” The script makes this distinction explicit.
2. **Slide 7:** Prepared step definitions reduce setup risk. The class creates and reviews feature files, then reuses or extends those steps. Explain that adaptation instead of implying every harness line is generated live.
3. **Slide 9:** Ten minutes is tight for implementation plus review and browser demonstration. The prepared UI and transport keep the build focused on the business behavior. Rehearse the 12:49 fallback and protect slide 10.
4. **Slide 11:** The draft correctly avoids an invented repository link. A real distribution location and optional QR code still need to be added once chosen. The supplied ZIP can be shared directly in the meantime.
5. **Slide 11:** Keep cost language tool-neutral while no AI product is required. Local execution needs no AI account; AI-assisted practice depends on the attendee's tool access.
6. **Slide 9 notes:** A recording is suggested but not present in this package. Record your own rehearsal if desired. The working checkpoint is included.

## Claims to avoid

- A setup pass or zero Cucumber scenarios does not establish reservation behavior.
- The HTTP workflow is not an automated browser test. Manually inspect the browser as directed.
- The reference checkpoint implements the sample rules, not any possible audience-selected behavior.
- The complete checkpoint passes the six core examples, not every possible boundary or production requirement.

The deck's intended audience participation remains intact: people choose expectations and review outcomes, while the presenter operates the tools.
