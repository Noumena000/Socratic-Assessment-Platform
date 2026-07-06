const demos = {
  kant: {
    moduleTitle: 'HUM301 · Kantianism and the Trolley Problem',
    title: 'Kantian Trolley Dialogue',
    subtitle: 'A fictional learner clarifies duty, consequences, and persons as ends.',
    turns: [
      ['Socrates', 'What does it mean to act from duty in Kantian ethics?'],
      ['Learner', 'It means doing what is morally required, not just what creates the best outcome.'],
      ['Socrates', 'You contrast duty with outcome. What makes an action morally required if the outcome is not the deciding factor?'],
      ['Learner', 'The principle behind the action matters. If the maxim cannot be universalized, then it would not be morally right.'],
      ['Socrates', 'Give a hard case where universalizing a maxim would challenge what someone wants to do.'],
      ['Learner', 'Lying to a patient might make things easier in the moment, but if everyone lied when it was convenient, trust would break down.'],
      ['Socrates', 'Now revise your view. How should Kantian reasoning handle the trolley problem?'],
      ['Learner', 'I would revise it this way: saving more people matters, but Kant would ask whether pulling the lever treats the one person merely as a means. The right action cannot be justified only by counting outcomes.']
    ],
    evidence: [
      ['Definition', 'Developing', 'Learner distinguishes duty from outcomes.'],
      ['Reason', 'Strong', 'Learner gives a Kantian reason rather than only a conclusion.'],
      ['Counterexample', 'Developing', 'Learner uses a professional case to test the principle.'],
      ['Revision', 'Strong', 'Learner refines the original view after the dialogue.']
    ]
  },
  machine: {
    moduleTitle: 'HUM301 · Philosophy and the Good Life',
    title: 'Experience Machine Dialogue',
    subtitle: 'A fictional learner tests whether pleasure is enough for the good life.',
    turns: [
      ['Socrates', 'If the Experience Machine made you feel happy, would that be enough for a good life?'],
      ['Learner', 'At first I think yes, because happiness seems like the point of life.'],
      ['Socrates', 'What do you mean by happiness here: pleasure, satisfaction, achievement, or something else?'],
      ['Learner', 'I mean pleasure and satisfaction, but maybe not achievement.'],
      ['Socrates', 'Can you give a counterexample where someone feels pleasure but something important about the life is missing?'],
      ['Learner', 'If someone had fake memories of helping others, they might feel good, but they did not actually help anyone.'],
      ['Socrates', 'Revise your original answer in light of that counterexample.'],
      ['Learner', 'I would revise my answer: pleasure matters, but the good life also seems to require real relationships, real actions, and some contact with truth.']
    ],
    evidence: [
      ['Definition', 'Emerging', 'Learner begins with a hedonistic account.'],
      ['Explanation', 'Developing', 'Learner distinguishes different senses of happiness.'],
      ['Counterexample', 'Strong', 'Learner uses a counterexample to test pleasure-only accounts.'],
      ['Revision', 'Strong', 'Learner revises the original claim in response to the counterexample.']
    ]
  }
};

function renderDemo(key) {
  const demo = demos[key];
  document.querySelector('#moduleTitle').textContent = demo.moduleTitle;
  document.querySelector('#demoTitle').textContent = demo.title;
  document.querySelector('#demoSubtitle').textContent = demo.subtitle;
  document.querySelector('#transcript').innerHTML = demo.turns.map(([speaker, text]) => `
    <div class="turn ${speaker.toLowerCase()}">
      <strong>${speaker}</strong>
      <p>${text}</p>
    </div>
  `).join('');
  document.querySelector('#evidence').innerHTML = demo.evidence.map(([label, strength, note]) => `
    <div class="evidence-item">
      <div><strong>${label}</strong><span class="strength">${strength}</span></div>
      <p>${note}</p>
    </div>
  `).join('');
}

document.querySelectorAll('.tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    renderDemo(button.dataset.demo);
  });
});

renderDemo('kant');
