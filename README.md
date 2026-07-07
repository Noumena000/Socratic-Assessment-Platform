# Socratic Assessment Platform — Public Showcase

**Make understanding demonstrable through dialogue.**

This is a static, public-facing showcase for the Socratic Assessment Platform. The project explores whether conceptual understanding can be demonstrated through structured dialogue rather than inferred only from polished essays, quiz answers, or selected responses.

The key idea is not to “detect AI use.” Instead, the platform asks whether a learner can explain, defend, apply, challenge, and revise the ideas they submit. Even if a student used an AI chatbot while preparing written work, understanding still has to survive Socratic examination.

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

## What this public site includes

- A public-facing product vision
- Fictional sample dialogues
- A formative evidence report preview
- A high-level assessment workflow
- Privacy and governance language
- A roadmap for cautious institutional discussion


## Optional AI Connection Panel

The public showcase now includes a modular **Reasoning Provider** panel for private testing. It can point to:

- LM Studio or another local OpenAI-compatible server
- Ollama's OpenAI-compatible endpoint
- Mistral Cloud
- OpenAI-compatible cloud endpoints
- a custom chat-completions endpoint

No API key is included in the repository. Keys should never be committed. The panel can remember settings only in the current browser's local storage when the user explicitly checks the remember option.

For production, provider calls should move behind a secure, institutionally approved backend rather than being made directly from a public static page.

## What this public site intentionally omits

- private reasoning-engine source code
- prompt architecture
- LLM orchestration logic
- API keys or backend configuration
- learner records or institutional data
- production implementation details

## How to use

Open `index.html` in a browser.

## How to publish on GitHub Pages

1. Create a new public GitHub repository, for example `socratic-assessment-platform`.
2. Upload the contents of this folder, not the private reasoning engine or development project.
3. In GitHub, go to **Settings → Pages**.
4. Set the source to the `main` branch and `/root`.
5. Share the generated GitHub Pages URL.

## Suggested meeting framing

“I am not proposing deployment yet. I am exploring whether structured dialogue can help faculty gather better evidence of student understanding, especially in an era when polished written answers may not reliably show what a learner can explain, defend, or revise.”

## Status

Research prototype. Public showcase only.
