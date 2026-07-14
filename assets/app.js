// ============================================
// Socratic Assessment Platform - Main JavaScript
// Public demo with original sequences + live dialogue + paper assessment
// ============================================

// Original Demo Data
const demos = {
  equity: {
    moduleTitle: "EDU 410 · Equity and Schooling",
    title: "Claim to Revision",
    subtitle: "A learner moves from a broad claim toward a more defensible explanation.",
    sequence: [
      {
        role: "Learner Claim",
        speakerClass: "learner",
        text: "Educational equity means giving every student the same resources, because equal treatment is the fairest approach."
      },
      {
        role: "Socratic Follow-Up",
        speakerClass: "system",
        text: "If students begin with different barriers or needs, does equal distribution always produce equitable opportunity? Clarify the difference between equality and equity."
      },
      {
        role: "Learner Revision",
        speakerClass: "learner",
        text: "I need to revise that. Equality gives the same support to everyone, but equity may require different support so students can reach comparable opportunities and outcomes."
      },
      {
        role: "Evidence Update",
        speakerClass: "summary",
        text: "Evidence record updated: learner distinguishes equality from equity and revises the original claim under questioning."
      },
      {
        role: "Instructor Summary",
        speakerClass: "summary",
        text: "Instructor receives a snapshot noting stronger conceptual distinction, successful revision, and a remaining need for a concrete classroom example."
      }
    ],
    evidence: [
      {
        label: "Concept Distinction",
        strength: "Improving",
        status: "improving",
        initialLevel: 25,
        updatedLevel: 78,
        revealAt: 2,
        initial: "Initial claim blends equality and equity.",
        updated: "Learner distinguishes equal treatment from equitable support."
      },
      {
        label: "Justification",
        strength: "Developing",
        status: "developing",
        initialLevel: 18,
        updatedLevel: 62,
        revealAt: 2,
        initial: "Fairness is named, but the reason is thin.",
        updated: "Learner connects differentiated support to comparable opportunity."
      },
      {
        label: "Revision Quality",
        strength: "Strong",
        status: "strong",
        initialLevel: 8,
        updatedLevel: 86,
        revealAt: 2,
        initial: "No revision has been offered yet.",
        updated: "Learner revises the original position after targeted questioning."
      },
      {
        label: "Application / Transfer",
        strength: "Needs Evidence",
        status: "watch",
        initialLevel: 12,
        updatedLevel: 42,
        revealAt: 3,
        initial: "Needs a concrete classroom or policy example.",
        updated: "Instructor should ask for a case to confirm transfer."
      }
    ],
    summary: "Summary for instructor review: the learner improved the equality/equity distinction and revised the claim under questioning. The next faculty move is to request a concrete classroom or policy example before making a final judgment."
  },
  ethics: {
    moduleTitle: "PHI 220 · Ethics and Public Life",
    title: "Reasoning Under Pressure",
    subtitle: "A learner clarifies a moral claim, answers a challenge, and refines the position.",
    sequence: [
      {
        role: "Learner Claim",
        speakerClass: "learner",
        text: "Public officials should always tell the truth, because lying is what destroys trust."
      },
      {
        role: "Socratic Follow-Up",
        speakerClass: "system",
        text: "What about a case where full disclosure would create immediate harm? Explain whether your principle allows exceptions or whether the duty remains absolute."
      },
      {
        role: "Learner Revision",
        speakerClass: "learner",
        text: "I would revise the claim. Truthfulness should be the default duty, but an official may need to withhold some information temporarily when disclosure would directly endanger people. That is different from deceptive manipulation."
      },
      {
        role: "Evidence Update",
        speakerClass: "summary",
        text: "Evidence record updated: learner moved from an absolute claim to a qualified principle and introduced a relevant distinction."
      },
      {
        role: "Instructor Summary",
        speakerClass: "summary",
        text: "Instructor receives a snapshot noting stronger nuance, emerging policy reasoning, and a remaining follow-up about withholding versus deception."
      }
    ],
    evidence: [
      {
        label: "Concept Distinction",
        strength: "Improving",
        status: "improving",
        initialLevel: 30,
        updatedLevel: 70,
        revealAt: 2,
        initial: "Truthfulness is clear, but exceptions are not distinguished.",
        updated: "Learner distinguishes temporary withholding from manipulation."
      },
      {
        label: "Justification",
        strength: "Strong",
        status: "strong",
        initialLevel: 34,
        updatedLevel: 82,
        revealAt: 2,
        initial: "Learner names trust as the reason but not its limits.",
        updated: "Learner explains how duty and harm can come into tension."
      },
      {
        label: "Revision Quality",
        strength: "Strong",
        status: "strong",
        initialLevel: 10,
        updatedLevel: 80,
        revealAt: 2,
        initial: "No revised position has been offered yet.",
        updated: "Learner moves from an absolute claim to a qualified principle."
      },
      {
        label: "Application / Transfer",
        strength: "Needs Evidence",
        status: "watch",
        initialLevel: 16,
        updatedLevel: 44,
        revealAt: 3,
        initial: "Needs another case to test the distinction.",
        updated: "Instructor should test whether the distinction holds in a new case."
      }
    ],
    summary: "Summary for instructor review: the learner showed stronger nuance after questioning, but the instructor should test whether the distinction between temporary withholding and deception is stable across cases."
  }
};

// Live Dialogue Data
const liveDialogueConcepts = {
  fairness: {
    name: "Fairness",
    description: "The principle of treating similar cases similarly, unless there is a morally relevant difference.",
    prompts: [
      { kind: "Define", text: "Define 'fairness' in your own words." },
      { kind: "Apply", text: "A hospital has 10 ventilators but 20 patients who need them to survive. Is it fair to give the ventilators to the first 10 patients who arrived? Why or why not?" },
      { kind: "Challenge", text: "What if the first 10 patients are all elderly, and the last 10 are children? Does your answer change?" }
    ],
    followUp: "Ask: 'Can you think of a real-world policy where fairness requires treating people differently?'"
  },
  autonomy: {
    name: "Autonomy",
    description: "The capacity of a person to make their own decisions and act on their own values and interests.",
    prompts: [
      { kind: "Define", text: "Define 'autonomy' in your own words." },
      { kind: "Apply", text: "A patient refuses a life-saving blood transfusion due to their religious beliefs. Should the doctor respect their autonomy and refuse the treatment, even if it means the patient will die?" },
      { kind: "Challenge", text: "What if the patient is a child whose parents refuse the treatment on their behalf? Does your answer change?" }
    ],
    followUp: "Ask: 'How might autonomy conflict with other ethical principles, like beneficence or justice?'"
  },
  utilitarianism: {
    name: "Utilitarianism",
    description: "The ethical theory that actions are right if they promote happiness and wrong if they produce unhappiness.",
    prompts: [
      { kind: "Define", text: "What is the 'greatest happiness principle' in utilitarianism?" },
      { kind: "Apply", text: "A doctor can save five patients by harvesting the organs of one healthy person. Should the doctor do it? Why or why not?" },
      { kind: "Challenge", text: "What is one serious objection to deciding only by consequences?" }
    ],
    followUp: "Ask: 'How would a utilitarian justify a policy that harms a minority for the greater good?'"
  },
  kantianism: {
    name: "Kantian Ethics",
    description: "The ethical theory that actions are right if they are done from duty and respect for moral law.",
    prompts: [
      { kind: "Define", text: "What does it mean to act from duty in Kantian ethics?" },
      { kind: "Apply", text: "A person lies to protect a friend from harm. Is this action morally permissible according to Kant? Why or why not?" },
      { kind: "Challenge", text: "Can it be wrong to save more lives if doing so treats one person merely as a means?" }
    ],
    followUp: "Ask: 'How does Kant's idea of treating persons as ends in themselves apply to informed consent in healthcare?'"
  },
  justice: {
    name: "Justice",
    description: "The quality of being fair and reasonable, often involving the distribution of resources, rights, and duties.",
    prompts: [
      { kind: "Define", text: "Define 'justice' in your own words." },
      { kind: "Apply", text: "A judge is deciding the punishment for a person who stole food to feed their starving family. Should the judge show mercy and give a lighter sentence, or uphold the law strictly for the sake of justice?" },
      { kind: "Challenge", text: "If the person stole from someone who was also struggling, should the punishment be the same? Why or why not?" }
    ],
    followUp: "Ask: 'How would you design a just system for distributing limited medical resources?'"
  }
};

// Paper Assessment Concepts
const paperConcepts = {
  ethics: {
    keywords: ["ethics", "moral", "right", "wrong", "good", "bad", "justice", "fairness"],
    questions: [
      { kind: "Define", text: "Define the term '{concept}' as used in your paper." },
      { kind: "Apply", text: "Give an example from your paper where {concept} is applied." },
      { kind: "Challenge", text: "What is one objection to your use of {concept} in your paper?" }
    ]
  },
  autonomy: {
    keywords: ["autonomy", "self-determination", "freedom", "choice", "consent"],
    questions: [
      { kind: "Define", text: "Define 'autonomy' as used in your paper." },
      { kind: "Apply", text: "How does your paper apply the concept of autonomy?" },
      { kind: "Challenge", text: "Can autonomy ever be limited? Explain using an example from your paper." }
    ]
  },
  utilitarianism: {
    keywords: ["utilitarianism", "greatest happiness", "consequences", "outcomes", "utility"],
    questions: [
      { kind: "Define", text: "Define 'utilitarianism' as used in your paper." },
      { kind: "Apply", text: "How does your paper apply utilitarian reasoning?" },
      { kind: "Challenge", text: "What is one objection to utilitarianism mentioned in your paper?" }
    ]
  },
  kantianism: {
    keywords: ["kantian", "kant", "duty", "categorical imperative", "moral law"],
    questions: [
      { kind: "Define", text: "Define 'Kantian ethics' as used in your paper." },
      { kind: "Apply", text: "How does your paper apply Kantian reasoning?" },
      { kind: "Challenge", text: "Can Kantian ethics justify lying? Explain using your paper's arguments." }
    ]
  },
  justice: {
    keywords: ["justice", "fairness", "equality", "equity", "rights"],
    questions: [
      { kind: "Define", text: "Define 'justice' as used in your paper." },
      { kind: "Apply", text: "How does your paper apply the concept of justice?" },
      { kind: "Challenge", text: "What is one case where justice might conflict with another value in your paper?" }
    ]
  },
  'informed consent': {
    keywords: ["informed consent", "consent", "patient rights", "autonomy"],
    questions: [
      { kind: "Define", text: "Define 'informed consent' as used in your paper." },
      { kind: "Apply", text: "How does your paper apply the concept of informed consent?" },
      { kind: "Challenge", text: "What is one challenge to obtaining informed consent mentioned in your paper?" }
    ]
  },
  beneficence: {
    keywords: ["beneficence", "do no harm", "well-being", "patient benefit"],
    questions: [
      { kind: "Define", text: "Define 'beneficence' as used in your paper." },
      { kind: "Apply", text: "How does your paper apply the principle of beneficence?" },
      { kind: "Challenge", text: "Can beneficence ever conflict with autonomy? Explain using your paper's arguments." }
    ]
  },
  nonmaleficence: {
    keywords: ["nonmaleficence", "do no harm", "avoid harm", "primum non nocere"],
    questions: [
      { kind: "Define", text: "Define 'nonmaleficence' as used in your paper." },
      { kind: "Apply", text: "How does your paper apply the principle of nonmaleficence?" },
      { kind: "Challenge", text: "What is one case where nonmaleficence might conflict with beneficence in your paper?" }
    ]
  }
};

// ============================================
// Original Demo Logic
// ============================================
const timeline = document.querySelector("#timeline");
const evidenceList = document.querySelector("#evidenceList");
const moduleTitle = document.querySelector("#moduleTitle");
const demoTitle = document.querySelector("#demoTitle");
const demoSubtitle = document.querySelector("#demoSubtitle");
const summaryStatus = document.querySelector("#summaryStatus");
const evidenceStatus = document.querySelector("#evidenceStatus");
const instructorSummary = document.querySelector("#instructorSummary");
const playDemoBtn = document.querySelector("#playDemoBtn");
const resetDemoBtn = document.querySelector("#resetDemoBtn");
const tabs = document.querySelectorAll(".tab");

let activeDemoKey = "equity";
let currentStep = 0;
let isPlaying = false;
let animationTimers = [];

function clearAnimationTimers() {
  animationTimers.forEach(timer => window.clearTimeout(timer));
  animationTimers = [];
}

function renderDemo(key) {
  const demo = demos[key];
  activeDemoKey = key;
  moduleTitle.textContent = demo.moduleTitle;
  demoTitle.textContent = demo.title;
  demoSubtitle.textContent = demo.subtitle;
  
  timeline.innerHTML = demo.sequence.map((step, index) => `
    <article class="timeline-item ${step.speakerClass}" data-step="${index}">
      <div class="timeline-role">${step.role}</div>
      <p>${step.text}</p>
    </article>
  `).join("");

  evidenceList.innerHTML = demo.evidence.map((item, index) => `
    <article class="evidence-entry" data-evidence="${index}" data-status="${item.status}" style="--level: ${item.initialLevel}%">
      <div class="evidence-topline">
        <strong>${item.label}</strong>
        <span class="strength">${item.strength}</span>
      </div>
      <div class="evidence-meter" aria-hidden="true"><span class="evidence-fill"></span></div>
      <p>${item.initial}</p>
    </article>
  `).join("");

  instructorSummary.textContent = demo.summary;
  currentStep = 0;
  isPlaying = false;
  summaryStatus.textContent = "Waiting";
  summaryStatus.classList.remove("ready");
  evidenceStatus.textContent = "Ready";
  revealInitialState();
}

function revealInitialState() {
  clearAnimationTimers();
  playDemoBtn.disabled = false;
  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    item.classList.toggle("visible", index === 0);
    item.classList.remove("active");
  });
  const firstItem = document.querySelector('.timeline-item[data-step="0"]');
  if (firstItem) firstItem.classList.add("active");

  document.querySelectorAll(".evidence-entry").forEach(entry => {
    entry.classList.add("visible");
    entry.classList.remove("highlight", "active-build");
  });
}

function setEvidenceForStep(stepIndex) {
  const demo = demos[activeDemoKey];
  document.querySelectorAll(".evidence-entry").forEach((entry, evidenceIndex) => {
    const item = demo.evidence[evidenceIndex];
    const isUpdated = stepIndex >= item.revealAt;
    entry.style.setProperty("--level", `${isUpdated ? item.updatedLevel : item.initialLevel}%`);
    entry.querySelector("p").textContent = isUpdated ? item.updated : item.initial;
    entry.classList.toggle("highlight", isUpdated);
    entry.classList.toggle("active-build", stepIndex === item.revealAt);
  });
}

function runDemoSequence() {
  clearAnimationTimers();
  const demo = demos[activeDemoKey];
  const timelineItems = Array.from(document.querySelectorAll(".timeline-item"));
  const evidenceItems = Array.from(document.querySelectorAll(".evidence-entry"));

  timelineItems.forEach(item => item.classList.remove("visible", "active"));
  evidenceItems.forEach((entry, index) => {
    entry.classList.add("visible");
    entry.classList.remove("highlight", "active-build");
    entry.style.setProperty("--level", `${demo.evidence[index].initialLevel}%`);
    entry.querySelector("p").textContent = demo.evidence[index].initial;
  });
  summaryStatus.textContent = "Sequence in progress";
  summaryStatus.classList.remove("ready");
  evidenceStatus.textContent = "Collecting";
  instructorSummary.textContent = "The instructor summary is assembling from the dialogue and evidence updates.";
  playDemoBtn.disabled = true;

  timelineItems.forEach((item, index) => {
    const timer = window.setTimeout(() => {
      timelineItems.forEach(node => node.classList.remove("active"));
      item.classList.add("visible", "active");
      setEvidenceForStep(index);

      if (index === 3) {
        summaryStatus.textContent = "Evidence updated";
        evidenceStatus.textContent = "Updated";
      }

      if (index === demo.sequence.length - 1) {
        summaryStatus.textContent = "Ready for instructor review";
        summaryStatus.classList.add("ready");
        evidenceStatus.textContent = "Reviewable";
        instructorSummary.textContent = demo.summary;
        playDemoBtn.disabled = false;
      }
    }, index * 1000);
    animationTimers.push(timer);
  });
}

function resetDemo() {
  renderDemo(activeDemoKey);
}

function initOriginalDemo() {
  if (!timeline) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(node => node.classList.remove("active"));
      tab.classList.add("active");
      activeDemoKey = tab.dataset.demo;
      renderDemo(activeDemoKey);
    });
  });

  playDemoBtn.addEventListener("click", runDemoSequence);
  resetDemoBtn.addEventListener("click", resetDemo);
  renderDemo(activeDemoKey);
}

// ============================================
// Live Dialogue Logic
// ============================================
const liveConceptSelect = document.getElementById("liveConceptSelect");
const startLiveDialogueBtn = document.getElementById("startLiveDialogueBtn");
const resetLiveDialogueBtn = document.getElementById("resetLiveDialogueBtn");
const liveChatMessages = document.getElementById("liveChatMessages");
const liveStudentInput = document.getElementById("liveStudentInput");
const liveSubmitBtn = document.getElementById("liveSubmitBtn");
const liveScorecardDimensions = document.getElementById("liveScorecardDimensions");
const liveFollowUpText = document.getElementById("liveFollowUpText");

let currentLiveConcept = null;
let currentLivePromptIndex = 0;

function initLiveDialogue() {
  if (!liveConceptSelect) return;

  startLiveDialogueBtn.addEventListener("click", startLiveDialogue);
  resetLiveDialogueBtn.addEventListener("click", resetLiveDialogue);
  liveSubmitBtn.addEventListener("click", handleLiveStudentResponse);
  liveStudentInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleLiveStudentResponse();
  });
}

function startLiveDialogue() {
  const conceptKey = liveConceptSelect.value;
  currentLiveConcept = liveDialogueConcepts[conceptKey];
  currentLivePromptIndex = 0;

  liveStudentInput.disabled = false;
  liveSubmitBtn.disabled = false;
  resetLiveDialogueBtn.disabled = false;
  startLiveDialogueBtn.disabled = true;

  liveChatMessages.innerHTML = '';
  addLiveMessage("system", currentLiveConcept.prompts[0].text);

  resetLiveScorecard();
  liveFollowUpText.textContent = "Complete the dialogue to see suggested follow-up questions.";
}

function resetLiveDialogue() {
  liveChatMessages.innerHTML = '';
  liveStudentInput.value = '';
  liveStudentInput.disabled = true;
  liveSubmitBtn.disabled = true;
  resetLiveDialogueBtn.disabled = true;
  startLiveDialogueBtn.disabled = false;
  currentLiveConcept = null;
  currentLivePromptIndex = 0;
  resetLiveScorecard();
  liveFollowUpText.textContent = "Start the dialogue to see suggested follow-up questions.";
}

function handleLiveStudentResponse() {
  const response = liveStudentInput.value.trim();
  if (!response) return;

  addLiveMessage("student", response);
  liveStudentInput.value = '';

  const scores = mockLiveScoreResponse(response, currentLiveConcept.prompts[currentLivePromptIndex]);
  updateLiveScorecard(scores);

  currentLivePromptIndex++;

  if (currentLivePromptIndex >= currentLiveConcept.prompts.length) {
    addLiveMessage("system", "Dialogue complete. Review the scorecard and suggested follow-up.");
    liveStudentInput.disabled = true;
    liveSubmitBtn.disabled = true;
    startLiveDialogueBtn.disabled = false;
    liveFollowUpText.textContent = currentLiveConcept.followUp;
    return;
  }

  const nextPrompt = currentLiveConcept.prompts[currentLivePromptIndex];
  addLiveMessage("system", nextPrompt.text);
}

function addLiveMessage(role, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `live-chat-message ${role}`;
  messageDiv.innerHTML = `
    <div class="live-message-role">${role === "student" ? "Learner" : "Socratic Follow-Up"}</div>
    <p>${text}</p>
  `;
  liveChatMessages.appendChild(messageDiv);
  liveChatMessages.scrollTop = liveChatMessages.scrollHeight;
}

function mockLiveScoreResponse(response, prompt) {
  const scores = {
    definition: 0,
    application: 0,
    counterexample: 0
  };

  const lowerResponse = response.toLowerCase();

  if (prompt.kind === "Define" || lowerResponse.includes("define") || lowerResponse.includes("means")) {
    scores.definition = 0.75 + (Math.random() * 0.2 - 0.1);
  }
  if (prompt.kind === "Apply" || lowerResponse.includes("example") || lowerResponse.includes("case") || lowerResponse.includes("situation")) {
    scores.application = 0.75 + (Math.random() * 0.2 - 0.1);
  }
  if (prompt.kind === "Challenge" || lowerResponse.includes("but") || lowerResponse.includes("however") || lowerResponse.includes("unless")) {
    scores.counterexample = 0.75 + (Math.random() * 0.2 - 0.1);
  }

  return scores;
}

function resetLiveScorecard() {
  liveScorecardDimensions.innerHTML = `
    <div class="live-scorecard-dimension">
      <div class="live-scorecard-dimension-header">
        <span class="live-scorecard-dimension-label">Definition</span>
        <span class="live-scorecard-status">
          <span class="live-status-icon needs-work">❌</span>
          <span>Not started</span>
        </span>
      </div>
      <div class="live-scorecard-dimension-notes">Waiting for student response.</div>
    </div>
    <div class="live-scorecard-dimension">
      <div class="live-scorecard-dimension-header">
        <span class="live-scorecard-dimension-label">Application</span>
        <span class="live-scorecard-status">
          <span class="live-status-icon needs-work">❌</span>
          <span>Not started</span>
        </span>
      </div>
      <div class="live-scorecard-dimension-notes">Waiting for student response.</div>
    </div>
    <div class="live-scorecard-dimension">
      <div class="live-scorecard-dimension-header">
        <span class="live-scorecard-dimension-label">Counterexample</span>
        <span class="live-scorecard-status">
          <span class="live-status-icon needs-work">❌</span>
          <span>Not started</span>
        </span>
      </div>
      <div class="live-scorecard-dimension-notes">Waiting for student response.</div>
    </div>
  `;
}

function updateLiveScorecard(scores) {
  const dimensions = [
    { id: "definition", label: "Definition", score: scores.definition },
    { id: "application", label: "Application", score: scores.application },
    { id: "counterexample", label: "Counterexample", score: scores.counterexample }
  ];

  let html = '';
  dimensions.forEach(dim => {
    let status, icon, note;
    if (dim.score >= 0.75) {
      status = "Strong";
      icon = "strong";
      note = `Learner demonstrated understanding of ${dim.label.toLowerCase()}.`;
    } else if (dim.score >= 0.45) {
      status = "Developing";
      icon = "developing";
      note = `Learner showed partial understanding of ${dim.label.toLowerCase()}.`;
    } else if (dim.score > 0) {
      status = "Emerging";
      icon = "developing";
      note = `Learner began to engage with ${dim.label.toLowerCase()}.`;
    } else {
      status = "Not started";
      icon = "needs-work";
      note = "Waiting for student response.";
    }

    html += `
      <div class="live-scorecard-dimension">
        <div class="live-scorecard-dimension-header">
          <span class="live-scorecard-dimension-label">${dim.label}</span>
          <span class="live-scorecard-status">
            <span class="live-status-icon ${icon}">${icon === "strong" ? "✅" : icon === "developing" ? "🟡" : "❌"}</span>
            <span>${status}</span>
          </span>
        </div>
        <div class="live-scorecard-dimension-notes">${note}</div>
      </div>
    `;
  });

  liveScorecardDimensions.innerHTML = html;
}

// ============================================
// Paper Assessment Logic
// ============================================
const paperText = document.getElementById("paperText");
const clearPaperBtn = document.getElementById("clearPaperBtn");
const analyzePaperBtn = document.getElementById("analyzePaperBtn");
const conceptsList = document.getElementById("conceptsList");
const paperChatMessages = document.getElementById("paperChatMessages");
const paperStudentInput = document.getElementById("paperStudentInput");
const paperSubmitBtn = document.getElementById("paperSubmitBtn");
const paperScorecardDimensions = document.getElementById("paperScorecardDimensions");
const paperFollowUpText = document.getElementById("paperFollowUpText");
const paperTextPreview = document.getElementById("paperTextPreview");
const dialogueTranscript = document.getElementById("dialogueTranscript");
const redFlagsList = document.getElementById("redFlagsList");
const reviewGrid = document.getElementById("reviewGrid");

let currentPaperConcepts = [];
let currentPaperDialogue = [];
let currentPaperPromptIndex = 0;
let paperRedFlags = [];

function initPaperAssessment() {
  if (!paperText) return;

  clearPaperBtn.addEventListener("click", clearPaper);
  analyzePaperBtn.addEventListener("click", analyzePaper);
  paperSubmitBtn.addEventListener("click", handlePaperStudentResponse);
  paperStudentInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handlePaperStudentResponse();
  });
}

function clearPaper() {
  paperText.value = "";
  conceptsList.innerHTML = "<p style='color: var(--muted);'>Submit a paper to see detected concepts.</p>";
  paperChatMessages.innerHTML = '<div class="live-chat-message system"><div class="live-message-role">System</div><p>Submit a paper to start the dialogue.</p></div>';
  paperStudentInput.disabled = true;
  paperSubmitBtn.disabled = true;
  resetPaperScorecard();
  paperFollowUpText.textContent = "Submit a paper to see faculty review notes.";
  paperTextPreview.innerHTML = "<p style='color: var(--muted);'>No paper submitted yet.</p>";
  dialogueTranscript.innerHTML = "<p style='color: var(--muted);'>No dialogue yet.</p>";
  redFlagsList.innerHTML = "<p style='color: var(--muted);'>No red flags detected.</p>";
  currentPaperConcepts = [];
  currentPaperDialogue = [];
  currentPaperPromptIndex = 0;
  paperRedFlags = [];
}

function analyzePaper() {
  const text = paperText.value.trim();
  if (!text) {
    alert("Please paste your paper text.");
    return;
  }

  currentPaperConcepts = extractConceptsFromPaper(text);
  displayDetectedConcepts();

  if (currentPaperConcepts.length > 0) {
    currentPaperPromptIndex = 0;
    currentPaperDialogue = [];
    const firstConcept = currentPaperConcepts[0];
    const firstQuestion = firstConcept.questions[0].text.replace("{concept}", firstConcept.name);
    paperChatMessages.innerHTML = '';
    addPaperMessage("system", firstQuestion);
    currentPaperDialogue.push({ role: "system", text: firstQuestion });
    resetPaperScorecard();
    paperFollowUpText.textContent = "Complete the dialogue to see faculty review notes.";
    paperStudentInput.disabled = false;
    paperSubmitBtn.disabled = false;
  } else {
    paperChatMessages.innerHTML = '<div class="live-chat-message system"><div class="live-message-role">System</div><p>No key concepts detected in your paper. Try including terms like \'ethics,\' \'autonomy,\' or \'justice.\'</p></div>';
    paperStudentInput.disabled = true;
    paperSubmitBtn.disabled = true;
  }

  updateFacultyReviewDashboard();
}

function extractConceptsFromPaper(text) {
  const detectedConcepts = [];
  const lowerText = text.toLowerCase();

  for (const concept in paperConcepts) {
    const keywords = paperConcepts[concept].keywords;
    const matches = keywords.filter(keyword => lowerText.includes(keyword));
    if (matches.length > 0) {
      detectedConcepts.push({
        name: concept,
        keywords: matches,
        questions: paperConcepts[concept].questions
      });
    }
  }

  return detectedConcepts;
}

function displayDetectedConcepts() {
  if (currentPaperConcepts.length === 0) {
    conceptsList.innerHTML = "<p style='color: var(--muted);'>No key concepts detected.</p>";
    return;
  }

  let html = "";
  currentPaperConcepts.forEach(concept => {
    html += `<span class="concept-tag">${concept.name}</span>`;
  });
  conceptsList.innerHTML = html;
}

function handlePaperStudentResponse() {
  const response = paperStudentInput.value.trim();
  if (!response || currentPaperConcepts.length === 0) return;

  addPaperMessage("student", response);
  currentPaperDialogue.push({ role: "student", text: response });
  paperStudentInput.value = "";

  const currentConcept = currentPaperConcepts[Math.floor(currentPaperPromptIndex / 3)];
  const currentQuestion = currentConcept.questions[currentPaperPromptIndex % 3];
  const scores = mockPaperScoreResponse(response, currentQuestion);
  updatePaperScorecard(scores);

  checkForRedFlags(response, currentConcept.name);

  currentPaperPromptIndex++;

  if (currentPaperPromptIndex >= currentPaperConcepts.length * 3) {
    addPaperMessage("system", "Dialogue complete. Review the scorecard and faculty notes.");
    currentPaperDialogue.push({ role: "system", text: "Dialogue complete. Review the scorecard and faculty notes." });
    paperStudentInput.disabled = true;
    paperSubmitBtn.disabled = true;
    paperFollowUpText.textContent = "Faculty will review your dialogue and paper for understanding.";
    updateFacultyReviewDashboard();
    return;
  }

  const nextConceptIndex = Math.floor(currentPaperPromptIndex / 3);
  const nextQuestionIndex = currentPaperPromptIndex % 3;
  const nextConcept = currentPaperConcepts[nextConceptIndex];
  const nextQuestion = nextConcept.questions[nextQuestionIndex].text.replace("{concept}", nextConcept.name);
  addPaperMessage("system", nextQuestion);
  currentPaperDialogue.push({ role: "system", text: nextQuestion });
  updateFacultyReviewDashboard();
}

function addPaperMessage(role, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `live-chat-message ${role}`;
  messageDiv.innerHTML = `
    <div class="live-message-role">${role === "student" ? "Student" : "System"}</div>
    <p>${text}</p>
  `;
  paperChatMessages.appendChild(messageDiv);
  paperChatMessages.scrollTop = paperChatMessages.scrollHeight;
}

function mockPaperScoreResponse(response, prompt) {
  const scores = {
    definition: 0,
    application: 0,
    counterexample: 0
  };

  const lowerResponse = response.toLowerCase();

  if (prompt.kind === "Define" || lowerResponse.includes("define") || lowerResponse.includes("means")) {
    scores.definition = 0.75 + (Math.random() * 0.2 - 0.1);
  }
  if (prompt.kind === "Apply" || lowerResponse.includes("example") || lowerResponse.includes("case") || lowerResponse.includes("situation")) {
    scores.application = 0.75 + (Math.random() * 0.2 - 0.1);
  }
  if (prompt.kind === "Challenge" || lowerResponse.includes("but") || lowerResponse.includes("however") || lowerResponse.includes("unless")) {
    scores.counterexample = 0.75 + (Math.random() * 0.2 - 0.1);
  }

  return scores;
}

function resetPaperScorecard() {
  paperScorecardDimensions.innerHTML = `
    <div class="live-scorecard-dimension">
      <div class="live-scorecard-dimension-header">
        <span class="live-scorecard-dimension-label">Definition</span>
        <span class="live-scorecard-status">
          <span class="live-status-icon needs-work">❌</span>
          <span>Not started</span>
        </span>
      </div>
      <div class="live-scorecard-dimension-notes">Waiting for student response.</div>
    </div>
    <div class="live-scorecard-dimension">
      <div class="live-scorecard-dimension-header">
        <span class="live-scorecard-dimension-label">Application</span>
        <span class="live-scorecard-status">
          <span class="live-status-icon needs-work">❌</span>
          <span>Not started</span>
        </span>
      </div>
      <div class="live-scorecard-dimension-notes">Waiting for student response.</div>
    </div>
    <div class="live-scorecard-dimension">
      <div class="live-scorecard-dimension-header">
        <span class="live-scorecard-dimension-label">Counterexample</span>
        <span class="live-scorecard-status">
          <span class="live-status-icon needs-work">❌</span>
          <span>Not started</span>
        </span>
      </div>
      <div class="live-scorecard-dimension-notes">Waiting for student response.</div>
    </div>
  `;
}

function updatePaperScorecard(scores) {
  const dimensions = [
    { id: "definition", label: "Definition", score: scores.definition },
    { id: "application", label: "Application", score: scores.application },
    { id: "counterexample", label: "Counterexample", score: scores.counterexample }
  ];

  let html = '';
  dimensions.forEach(dim => {
    let status, icon, note;
    if (dim.score >= 0.75) {
      status = "Strong";
      icon = "strong";
      note = `Student demonstrated understanding of ${dim.label.toLowerCase()}.`;
    } else if (dim.score >= 0.45) {
      status = "Developing";
      icon = "developing";
      note = `Student showed partial understanding of ${dim.label.toLowerCase()}.`;
    } else if (dim.score > 0) {
      status = "Emerging";
      icon = "developing";
      note = `Student began to engage with ${dim.label.toLowerCase()}.`;
    } else {
      status = "Not started";
      icon = "needs-work";
      note = "Waiting for student response.";
    }

    html += `
      <div class="live-scorecard-dimension">
        <div class="live-scorecard-dimension-header">
          <span class="live-scorecard-dimension-label">${dim.label}</span>
          <span class="live-scorecard-status">
            <span class="live-status-icon ${icon}">${icon === "strong" ? "✅" : icon === "developing" ? "🟡" : "❌"}</span>
            <span>${status}</span>
          </span>
        </div>
        <div class="live-scorecard-dimension-notes">${note}</div>
      </div>
    `;
  });

  paperScorecardDimensions.innerHTML = html;
}

function checkForRedFlags(response, concept) {
  const lowerResponse = response.toLowerCase();
  const lowerConcept = concept.toLowerCase();
  const newRedFlags = [...paperRedFlags];

  if (paperText.value.toLowerCase().includes(lowerConcept) && !lowerResponse.includes("define") && !lowerResponse.includes("means")) {
    const flag = `Student used '${concept}' in their paper but could not define it.`;
    if (!newRedFlags.includes(flag)) newRedFlags.push(flag);
  }

  if (response.split(" ").length < 10) {
    const flag = `Student gave a shallow response to a question about '${concept}'.`;
    if (!newRedFlags.includes(flag)) newRedFlags.push(flag);
  }

  if (currentPaperPromptIndex > 0 && (lowerResponse.includes("no") || lowerResponse.includes("i don't know"))) {
    const flag = `Student refused to engage with a question about '${concept}'.`;
    if (!newRedFlags.includes(flag)) newRedFlags.push(flag);
  }

  paperRedFlags = newRedFlags;
  updateRedFlagsList();
}

function updateRedFlagsList() {
  if (paperRedFlags.length === 0) {
    redFlagsList.innerHTML = "<p style='color: var(--muted);'>No red flags detected.</p>";
    return;
  }

  let html = "";
  paperRedFlags.forEach(flag => {
    html += `<div class="red-flag-item">${flag}</div>`;
  });
  redFlagsList.innerHTML = html;
}

function updateFacultyReviewDashboard() {
  paperTextPreview.innerHTML = paperText.value.trim() ? `<pre style="margin: 0;">${paperText.value.trim()}</pre>` : "<p style='color: var(--muted);'>No paper submitted yet.</p>";

  if (currentPaperDialogue.length === 0) {
    dialogueTranscript.innerHTML = "<p style='color: var(--muted);'>No dialogue yet.</p>";
  } else {
    let html = "";
    currentPaperDialogue.forEach(message => {
      html += `<div class="transcript-message ${message.role}"><strong>${message.role === "student" ? "Student" : "System"}:</strong> ${message.text}</div>`;
    });
    dialogueTranscript.innerHTML = html;
  }

  updateRedFlagsList();
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initOriginalDemo();
  initLiveDialogue();
  initPaperAssessment();
});
