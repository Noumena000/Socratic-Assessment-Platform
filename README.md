# Socratic Assessment Platform — Public Showcase

**Make understanding demonstrable through dialogue.**

This repository contains the static, public-facing showcase for the Socratic Assessment Platform. The project explores whether conceptual understanding can be demonstrated through structured dialogue rather than inferred only from polished essays, quiz answers, or selected responses.

The central question is not whether a system can detect AI authorship. It is whether a learner can explain, defend, apply, challenge, and revise the ideas they submit.

## Educational thesis

A prepared answer is not the end of assessment. It is the beginning of inquiry.

The platform is designed to gather formative evidence of whether a learner can:

- define course concepts accurately
- distinguish related concepts
- justify claims with reasons
- apply ideas to new cases
- respond to objections and counterexamples
- revise a view after questioning

The instructor remains the final evaluator. The platform produces evidence for review, not authoritative grades.

## What the public showcase includes

- a public-facing product vision
- fictional sample dialogues
- a formative evidence preview
- a high-level paper-to-dialogue workflow
- privacy, accessibility, and governance language
- a roadmap for cautious institutional discussion

## What the public showcase does not do

The public site does not connect to an AI provider, accept API keys, submit learner data, or expose a production reasoning service. Any future production reasoning capability would operate separately behind an institutionally approved backend with appropriate security, privacy, accessibility, and governance controls.

The repository intentionally omits:

- private reasoning-engine source code
- prompt architecture
- LLM orchestration logic
- API keys or backend configuration
- learner records or institutional data
- production implementation details

## Accessibility

The showcase includes keyboard-visible focus states, a skip-navigation link, reduced-motion support, semantic regions, accessible dialogue tabs, and live-region announcements for the simulated assessment sequence. Accessibility should continue to be tested as the prototype evolves.

## Local preview

No build process or package installation is required.

1. Download or clone the repository.
2. Open `index.html` in a modern browser.

## GitHub Pages deployment

1. Open the repository **Settings**.
2. Select **Pages**.
3. Set the source to the `main` branch and `/root`.
4. Save the configuration.

The public site is deployed at:

`https://noumena000.github.io/Socratic-Assessment-Platform/`

## Suggested meeting framing

> I am not proposing deployment yet. I am exploring whether structured dialogue can help faculty gather better evidence of student understanding, especially in an era when polished written answers may not reliably show what a learner can explain, defend, or revise.

## Status

Research prototype. Public showcase only. Not a production assessment system.

## Rights and permitted use

© 2026 Benjamin Moss. All rights reserved.

This repository is made available solely for viewing and evaluating the public research demonstration. No license is granted to reproduce, distribute, modify, publish, sublicense, commercialize, or create derivative works from the platform, interface, assessment model, written materials, or associated assets without prior written permission. See `NOTICE.md` for the complete notice.
