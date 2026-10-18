(() => {
  const $ = (selector) => document.querySelector(selector);
  const form = $("#generator-form");
  const topicField = $("#topic");
  const emptyState = $("#empty-state");
  const resultContent = $("#result-content");
  const toast = $("#toast");
  const styleRadios = [...document.querySelectorAll('input[name="style"]')];
  let currentBrief = null;
  let toastTimeout;

  $("#year").textContent = new Date().getFullYear();

  // Small mobile navigation.
  const menuButton = $(".mobile-menu");
  const nav = $(".main-nav");
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  }));

  styleRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      document.querySelectorAll(".style-option").forEach((item) => item.classList.remove("selected"));
      radio.closest(".style-option").classList.add("selected");
    });
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 3200);
  }

  function makeScenes(topic, duration) {
    const seconds = Number.parseInt(duration, 10) || 45;
    const count = seconds <= 30 ? 3 : seconds <= 60 ? 4 : 5;
    const labels = [
      ["Hook the viewer", "Open with a surprising question or bold visual."],
      ["Set the context", "Introduce the topic and why it matters."],
      ["Deliver the main idea", "Share the first key point with clear supporting visuals."],
      ["Build the payoff", "Add a memorable detail, example, or quick reveal."],
      ["Close with a takeaway", "Finish with a concise conclusion and a natural call to action."]
    ];
    const names = [
      "Start with a hook",
      "Set up the story",
      "Reveal the key detail",
      "Add a visual payoff",
      "Wrap it up"
    ];
    const sceneLength = Math.max(4, Math.floor(seconds / count));
    return Array.from({ length: count }, (_, i) => {
      const start = i * sceneLength;
      const end = i === count - 1 ? seconds : Math.min(seconds, (i + 1) * sceneLength);
      return {
        number: String(i + 1).padStart(2, "0"),
        title: names[i] || "Scene " + (i + 1),
        description: i === 0
          ? `Open on "${topic.slice(0, 72)}${topic.length > 72 ? "…" : ""}" with a clear visual hook.`
          : labels[i]?.[1] || "Support the story with concise visuals and narration.",
        time: `${start}s–${end}s`
      };
    });
  }

  function renderBrief(brief) {
    $("#result-title").textContent = "Sample video plan";
    $("#result-platform").textContent = brief.platform.toUpperCase();
    $("#result-topic").textContent = brief.topic;
    $("#result-details").textContent = `${brief.duration} · ${brief.style} · ${brief.voice}`;
    const scenes = makeScenes(brief.topic, brief.duration);
    $("#scene-count").textContent = `${scenes.length} SCENES`;
    const sceneList = $("#scene-list");
    sceneList.replaceChildren();

    scenes.forEach((scene) => {
      const row = document.createElement("div");
      row.className = "scene-item";
      const number = document.createElement("div");
      number.className = "scene-number";
      number.textContent = scene.number;
      const copy = document.createElement("div");
      copy.className = "scene-copy";
      const title = document.createElement("strong");
      title.textContent = scene.title;
      const description = document.createElement("p");
      description.textContent = scene.description;
      copy.append(title, description);
      const time = document.createElement("span");
      time.className = "scene-time";
      time.textContent = scene.time;
      row.append(number, copy, time);
      sceneList.append(row);
    });

    emptyState.hidden = true;
    resultContent.hidden = false;
    currentBrief = { ...brief, scenes };
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const topic = topicField.value.trim();
    if (!topic) {
      topicField.focus();
      showToast("Enter a topic to preview your sample plan.");
      return;
    }
    const data = new FormData(form);
    const brief = {
      topic,
      platform: data.get("platform"),
      duration: data.get("duration"),
      style: data.get("style"),
      voice: data.get("voice")
    };
    renderBrief(brief);
    showToast("Sample plan created in your browser. No video was generated.");
    if (window.matchMedia("(max-width: 900px)").matches) {
      $(".result-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  $("#download-brief").addEventListener("click", () => {
    if (!currentBrief) {
      showToast("Create a sample plan first.");
      return;
    }
    const lines = [
      "CLIPFORGE — SAMPLE VIDEO BRIEF",
      "DEMO ONLY — THIS FILE IS NOT A GENERATED VIDEO",
      "",
      `Topic: ${currentBrief.topic}`,
      `Platform: ${currentBrief.platform}`,
      `Duration: ${currentBrief.duration}`,
      `Visual direction: ${currentBrief.style}`,
      `Narration style: ${currentBrief.voice}`,
      "",
      "STORYBOARD OUTLINE",
      ...currentBrief.scenes.flatMap((scene) => [
        `${scene.number}. ${scene.title} (${scene.time})`,
        `   ${scene.description}`,
        ""
      ]),
      "NEXT STEPS FOR A REAL PRODUCTION",
      "- Connect a secure backend to a running MoneyPrinterTurbo service.",
      "- Generate the script, footage, voiceover, and subtitles on the server.",
      "- Store output safely and return a time-limited download URL.",
      "",
      "This static demo does not upload data or generate video files."
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "clipforge-sample-video-brief.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    showToast("Sample brief downloaded.");
  });
})();
