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
        initial: "Initial claim blended equality and equity together.",
        updated: "Learner now distinguishes equal treatment from equitable support."
      },
      {
        label: "Revision quality",
        strength: "Strong",
        initial: "No revision present yet.",
        updated: "Learner revised the original position after targeted questioning."
      },
      {
        label: "Application evidence",
        strength: "Developing",
        initial: "Needs a concrete case or policy example.",
        updated: "Still needs a classroom or policy example to demonstrate transfer."
      }
    ],
    summary: "Summary for instructor review: the learner improved the conceptual distinction after questioning and showed willingness to revise, but faculty may want one follow-up prompt on practical application."
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
        text: "Evidence record updated: learner moved from an absolute claim to a more qualified principle and introduced a relevant distinction."
      },
      {
        role: "Instructor summary",
        speakerClass: "summary",
        text: "Instructor receives a snapshot noting stronger nuance, emerging policy reasoning, and a possible misconception about withholding versus deception."
      }
    ],
    evidence: [
      {
        label: "Claim precision",
        strength: "Improving",
        initial: "Initial claim is clear but overly absolute.",
        updated: "Learner qualified the claim and added a meaningful exception condition."
      },
      {
        label: "Justification",
        strength: "Strong",
        initial: "Learner names trust as the reason but not yet its limits.",
        updated: "Learner explains how duty and harm can come into tension."
      },
      {
        label: "Misconception risk",
        strength: "Watch",
        initial: "Possible confusion between concealment and deception.",
        updated: "Instructor may want a follow-up case to test the distinction further."
      }
    ],
    summary: "Summary for instructor review: the learner showed stronger nuance after questioning, but the instructor should test whether the distinction between temporary withholding and deception is conceptually stable."
  }
};

const timeline = document.querySelector("#timeline");
const evidenceList = document.querySelector("#evidenceList");
const moduleTitle = document.querySelector("#moduleTitle");
const demoTitle = document.querySelector("#demoTitle");
const demoSubtitle = document.querySelector("#demoSubtitle");
const summaryStatus = document.querySelector("#summaryStatus");
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
    <article class="evidence-entry" data-evidence="${index}">
      <div class="evidence-topline">
        <strong>${item.label}</strong>
        <span class="strength">${item.strength}</span>
      </div>
      <p>${item.initial}</p>
    </article>
  `).join("");

  summaryStatus.textContent = "Waiting for sequence";
  summaryStatus.classList.remove("ready");
  instructorSummary.textContent = "The instructor summary appears after the learner revises the answer and the evidence record is updated.";
  revealInitialState();
}

function revealInitialState() {
  clearAnimationTimers();
  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    item.classList.toggle("visible", index === 0);
    item.classList.remove("active");
  });
  const firstItem = document.querySelector('.timeline-item[data-step="0"]');
  if (firstItem) firstItem.classList.add("active");

  document.querySelectorAll(".evidence-entry").forEach(entry => {
    entry.classList.add("visible");
    entry.classList.remove("highlight");
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
    entry.classList.remove("highlight");
    entry.querySelector("p").textContent = demo.evidence[index].initial;
  });
  summaryStatus.textContent = "Sequence in progress";
  summaryStatus.classList.remove("ready");
  instructorSummary.textContent = "The instructor summary is assembling from the dialogue and evidence updates.";

  timelineItems.forEach((item, index) => {
    const timer = window.setTimeout(() => {
      timelineItems.forEach(node => node.classList.remove("active"));
      item.classList.add("visible", "active");

      if (index === 2) {
        evidenceItems.forEach((entry, evidenceIndex) => {
          entry.querySelector("p").textContent = demo.evidence[evidenceIndex].updated;
          entry.classList.add("highlight");
        });
      }

      if (index === 3) {
        summaryStatus.textContent = "Evidence updated";
      }

      if (index === 4) {
        summaryStatus.textContent = "Ready for instructor review";
        summaryStatus.classList.add("ready");
        instructorSummary.textContent = demo.summary;
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
