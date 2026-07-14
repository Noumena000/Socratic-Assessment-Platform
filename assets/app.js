// ============================================
// Socratic Assessment Platform - Main JavaScript
// Public demo with original sequences + live dialogue
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
// Initialize Everything
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initOriginalDemo();
  initLiveDialogue();
});
