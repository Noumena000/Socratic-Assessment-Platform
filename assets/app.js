const demos = {
  equity: {
    moduleTitle: "EDU 410 · Equity and Schooling",
    title: "Claim to revision",
    subtitle: "A learner moves from a broad claim toward a more defensible explanation.",
    sequence: [
      {
        role: "Learner claim",
        speakerClass: "learner",
        text: "Educational equity means giving every student the same resources, because equal treatment is the fairest approach."
      },
      {
        role: "Socratic follow-up",
        speakerClass: "system",
        text: "If students begin with different barriers or needs, does equal distribution always produce equitable opportunity? Clarify the difference between equality and equity."
      },
      {
        role: "Learner revision",
        speakerClass: "learner",
        text: "I need to revise that. Equality gives the same support to everyone, but equity may require different support so students can reach comparable opportunities and outcomes."
      },
      {
        role: "Evidence update",
        speakerClass: "summary",
        text: "Evidence record updated: learner distinguishes equality from equity and revises the original claim under questioning."
      },
      {
        role: "Instructor summary",
        speakerClass: "summary",
        text: "Instructor receives a snapshot noting stronger conceptual distinction, successful revision, and a remaining need for a concrete classroom example."
      }
    ],
    evidence: [
      {
        label: "Concept distinction",
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
        label: "Revision quality",
        strength: "Strong",
        status: "strong",
        initialLevel: 8,
        updatedLevel: 86,
        revealAt: 2,
        initial: "No revision has been offered yet.",
        updated: "Learner revises the original position after targeted questioning."
      },
      {
        label: "Application / transfer",
        strength: "Needs evidence",
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
    title: "Reasoning under pressure",
    subtitle: "A learner clarifies a moral claim, answers a challenge, and refines the position.",
    sequence: [
      {
        role: "Learner claim",
        speakerClass: "learner",
        text: "Public officials should always tell the truth, because lying is what destroys trust."
      },
      {
        role: "Socratic follow-up",
        speakerClass: "system",
        text: "What about a case where full disclosure would create immediate harm? Explain whether your principle allows exceptions or whether the duty remains absolute."
      },
      {
        role: "Learner revision",
        speakerClass: "learner",
        text: "I would revise the claim. Truthfulness should be the default duty, but an official may need to withhold some information temporarily when disclosure would directly endanger people. That is different from deceptive manipulation."
      },
      {
        role: "Evidence update",
        speakerClass: "summary",
        text: "Evidence record updated: learner moved from an absolute claim to a qualified principle and introduced a relevant distinction."
      },
      {
        role: "Instructor summary",
        speakerClass: "summary",
        text: "Instructor receives a snapshot noting stronger nuance, emerging policy reasoning, and a remaining follow-up about withholding versus deception."
      }
    ],
    evidence: [
      {
        label: "Concept distinction",
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
        label: "Revision quality",
        strength: "Strong",
        status: "strong",
        initialLevel: 10,
        updatedLevel: 80,
        revealAt: 2,
        initial: "No revised position has been offered yet.",
        updated: "Learner moves from an absolute claim to a qualified principle."
      },
      {
        label: "Application / transfer",
        strength: "Needs evidence",
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

  summaryStatus.textContent = "Waiting";
  summaryStatus.classList.remove("ready");
  evidenceStatus.textContent = "Ready";
  instructorSummary.textContent = "The instructor summary appears after the learner revises the answer and the evidence record is updated.";
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

      if (index === 4) {
        summaryStatus.textContent = "Ready for instructor review";
        summaryStatus.classList.add("ready");
        evidenceStatus.textContent = "Reviewable";
        instructorSummary.textContent = demo.summary;
        playDemoBtn.disabled = false;
      }
    }, index * 900);
    animationTimers.push(timer);
  });
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(node => node.classList.remove("active"));
    tab.classList.add("active");
    renderDemo(tab.dataset.demo);
  });
});

playDemoBtn.addEventListener("click", runDemoSequence);
resetDemoBtn.addEventListener("click", () => renderDemo(activeDemoKey));

renderDemo(activeDemoKey);
