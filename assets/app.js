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
      ['Objection', 'Developing', 'Learner uses a professional case to test the principle.'],
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
      ['Distinction', 'Developing', 'Learner distinguishes different senses of happiness.'],
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


const providerPresets = {
  lmstudio: {
    endpoint: 'http://127.0.0.1:1234/v1/chat/completions',
    model: 'local-model',
    note: 'LM Studio local server selected. Start the server in LM Studio, then test the connection.'
  },
  ollama: {
    endpoint: 'http://127.0.0.1:11434/v1/chat/completions',
    model: 'llama3.1',
    note: 'Ollama local OpenAI-compatible endpoint selected. Make sure Ollama is running.'
  },
  mistral: {
    endpoint: 'https://api.mistral.ai/v1/chat/completions',
    model: 'mistral-small-latest',
    note: 'Mistral Cloud selected. Enter your API key for testing.'
  },
  openai: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    note: 'OpenAI-compatible cloud endpoint selected. Enter your API key for testing.'
  },
  custom: {
    endpoint: '',
    model: '',
    note: 'Custom endpoint selected. Enter an OpenAI-compatible chat completions URL.'
  }
};

function setupConnectionPanel() {
  const provider = document.querySelector('#providerSelect');
  const endpoint = document.querySelector('#endpointInput');
  const model = document.querySelector('#modelInput');
  const apiKey = document.querySelector('#apiKeyInput');
  const remember = document.querySelector('#rememberConnection');
  const testButton = document.querySelector('#testConnectionBtn');
  const clearButton = document.querySelector('#clearConnectionBtn');
  const status = document.querySelector('#connectionStatus');
  if (!provider || !endpoint || !model || !apiKey || !remember || !testButton || !clearButton || !status) return;

  const saved = JSON.parse(localStorage.getItem('sap_connection_settings') || '{}');
  if (saved.provider) provider.value = saved.provider;
  if (saved.endpoint) endpoint.value = saved.endpoint;
  if (saved.model) model.value = saved.model;
  if (saved.apiKey) apiKey.value = saved.apiKey;
  remember.checked = Boolean(saved.remember);

  provider.addEventListener('change', () => {
    const preset = providerPresets[provider.value];
    if (!preset) return;
    endpoint.value = preset.endpoint;
    model.value = preset.model;
    status.textContent = preset.note;
    status.className = 'connection-status';
    saveConnectionSettings(false);
  });

  [endpoint, model, apiKey, remember].forEach(input => {
    input.addEventListener('input', () => saveConnectionSettings(false));
    input.addEventListener('change', () => saveConnectionSettings(false));
  });

  clearButton.addEventListener('click', () => {
    localStorage.removeItem('sap_connection_settings');
    provider.value = 'lmstudio';
    endpoint.value = providerPresets.lmstudio.endpoint;
    model.value = providerPresets.lmstudio.model;
    apiKey.value = '';
    remember.checked = false;
    status.textContent = 'Connection settings cleared from this browser.';
    status.className = 'connection-status';
  });

  testButton.addEventListener('click', async () => {
    saveConnectionSettings(true);
    status.textContent = 'Testing connection...';
    status.className = 'connection-status warn';
    testButton.disabled = true;

    try {
      const headers = { 'Content-Type': 'application/json' };
      const key = apiKey.value.trim();
      if (key) headers.Authorization = `Bearer ${key}`;
      const response = await fetch(endpoint.value.trim(), {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: model.value.trim() || 'local-model',
          messages: [
            { role: 'system', content: 'You ask brief Socratic questions for a formative assessment prototype.' },
            { role: 'user', content: 'Reply with one short Socratic question about understanding the concept of justice.' }
          ],
          temperature: 0.2,
          max_tokens: 80
        })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content?.trim();
      status.textContent = text ? `Connected. Sample question: ${text}` : 'Connected, but the response format was not recognized.';
      status.className = 'connection-status ok';
    } catch (error) {
      status.textContent = `Connection failed: ${error.message}. For LM Studio, confirm the local server is running and CORS/browser access is allowed.`;
      status.className = 'connection-status bad';
    } finally {
      testButton.disabled = false;
    }
  });

  function saveConnectionSettings(forceStatus) {
    if (!remember.checked) {
      localStorage.removeItem('sap_connection_settings');
      if (forceStatus) status.textContent = 'Settings are active for this page session only.';
      return;
    }
    localStorage.setItem('sap_connection_settings', JSON.stringify({
      provider: provider.value,
      endpoint: endpoint.value.trim(),
      model: model.value.trim(),
      apiKey: apiKey.value.trim(),
      remember: true
    }));
  }
}

setupConnectionPanel();
