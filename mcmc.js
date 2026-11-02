"use strict";

(() => {
  const ITERATIONS = 10000;
  const DURATION_MS = 4000;
  // EDIT Y-AXIS RANGE HERE: 2 gives both plots a fixed range of -2 to +2.
  const Y_LIMIT = 2;
  // EDIT MAXIMUM STEP SIZE HERE: the slider runs from 0 to this value.
  const MAX_STEP_SIZE = 10;
  const slider = document.getElementById("mcmc-step");
  // Keep step size = x^2 / 10, so the raw slider maximum is sqrt(10 * max).
  slider.max = String(Math.sqrt(10 * MAX_STEP_SIZE));
  // Position the fixed colour bands at step sizes 0.25 and 5 on that scale.
  const yellowStop = 100 * Math.sqrt(Math.min(0.25, MAX_STEP_SIZE) / MAX_STEP_SIZE);
  const greenStop = 100 * Math.sqrt(Math.min(5, MAX_STEP_SIZE) / MAX_STEP_SIZE);
  slider.style.setProperty("--track-colours", `linear-gradient(to right,
    #e6b800 0% ${yellowStop}%,
    #228b22 ${yellowStop}% ${greenStop}%,
    #d32727 ${greenStop}% 100%)`);
  const stepGuide = document.getElementById("mcmc-step-guide");
  stepGuide.style.gridTemplateColumns = `${yellowStop}% ${greenStop - yellowStop}% ${100 - greenStop}%`;
  const braceSegments = Array.from(stepGuide.children);

  function renderStepBraces() {
    if (!window.katex) return;
    braceSegments.forEach((element) => {
      const width = element.getBoundingClientRect().width;
      if (width <= 0) {
        element.textContent = "";
        delete element.dataset.renderWidth;
        return;
      }
      const widthKey = width.toFixed(2);
      if (element.dataset.renderWidth === widthKey) return;
      const fontSize = Math.min(14, width / 2);
      element.style.fontSize = `${fontSize}px`;
      const widthEm = Math.max(0, (width - 2) / fontSize).toFixed(4);
      const [first, second] = element.dataset.label.split(" ");
      const label = width < 48
        ? String.raw`\substack{\text{${first}}\\\text{${second}}}`
        : String.raw`\text{${element.dataset.label}}`;
      // Standard LaTeX underbrace, stretched by KaTeX to match its colour band.
      window.katex.render(String.raw`\underbrace{\hspace{${widthEm}em}}_{${label}}`, element, {
        output: "html",
        throwOnError: false,
      });
      element.dataset.renderWidth = widthKey;
    });
  }

  const valueLabel = document.getElementById("mcmc-step-value");
  const canvases = [
    document.getElementById("mcmc-reversible"),
    document.getElementById("mcmc-nonreversible"),
  ];
  const contexts = canvases.map((canvas) => canvas.getContext("2d"));

  // Box-Muller transform: the logarithm receives a number in (0, 1].
  function standardNormal() {
    const radius = Math.sqrt(-2 * Math.log(1 - Math.random()));
    return radius * Math.cos(2 * Math.PI * Math.random());
  }

  function makeNoise() {
    const normals = new Float64Array(ITERATIONS);
    const logUniforms = new Float64Array(ITERATIONS);
    for (let i = 0; i < ITERATIONS; i += 1) {
      normals[i] = standardNormal();
      // If random() returns zero, log(0) = -Infinity gives acceptance.
      logUniforms[i] = Math.log(Math.random());
    }
    return { normals, logUniforms };
  }

  // Each chain has its own random draws. Reusing them across slider changes
  // makes the effect of changing scale easier to compare.
  const reversibleNoise = makeNoise();
  const liftedNoise = makeNoise();
  const initialDirection = Math.random() < 0.5 ? -1 : 1;
  const reversible = new Float64Array(ITERATIONS + 1);
  const nonreversible = new Float64Array(ITERATIONS + 1);
  const traces = [reversible, nonreversible];

  let visibleIteration = 0;
  let elapsed = 0;
  let lastTimestamp = null;
  let animationFrame = null;

  function accepted(x, proposal, logUniform) {
    // log(pi(proposal) / pi(x)) for the standard normal target.
    const targetVariance = 0.35;
    const logAlpha = Math.min(0, 0.5 * (x - proposal) * (x + proposal) / targetVariance);
    return logUniform < logAlpha;
  }

  function simulate(sigma) {
    let x = 0;
    let liftedX = 0;
    let direction = initialDirection;
    reversible[0] = 0;
    nonreversible[0] = 0;

    for (let i = 0; i < ITERATIONS; i += 1) {
      // Ordinary RWM: Y = X + sigma * Z.
      const proposal = x + sigma * reversibleNoise.normals[i];
      if (accepted(x, proposal, reversibleNoise.logUniforms[i])) x = proposal;
      reversible[i + 1] = x;

      // Lifted RWM: Y = X + sigma * V * |Z|.
      // Acceptance preserves V; rejection holds X fixed and reverses V.
      const liftedProposal = liftedX + sigma * direction * Math.abs(liftedNoise.normals[i]);
      if (accepted(liftedX, liftedProposal, liftedNoise.logUniforms[i])) {
        liftedX = liftedProposal;
      } else {
        direction = -direction;
      }
      nonreversible[i + 1] = liftedX;
    }
  }

  function drawTrace(canvas, context, positions) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height || !context) return;

    const pixelRatio = window.devicePixelRatio || 1;
    const pixelWidth = Math.round(width * pixelRatio);
    const pixelHeight = Math.round(height * pixelRatio);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#000";
    context.lineWidth = 1;

    const padding = 6;
    const plotWidth = Math.max(1, width - 2 * padding);
    const plotHeight = Math.max(1, height - 2 * padding);
    context.beginPath();
    for (let i = 0; i <= visibleIteration; i += 1) {
      const px = padding + (i / ITERATIONS) * plotWidth;
      const py = height / 2 - (positions[i] / Y_LIMIT) * plotHeight / 2;
      if (i === 0) context.moveTo(px, py);
      else context.lineTo(px, py);
    }
    context.stroke();
    if (visibleIteration === 0) {
      context.fillStyle = "#000";
      context.fillRect(padding, height / 2, 1, 1);
    }
  }

  function draw() {
    canvases.forEach((canvas, i) => drawTrace(canvas, contexts[i], traces[i]));
  }

  function animate(timestamp) {
    if (lastTimestamp !== null) {
      // Avoid a large jump when returning from a background browser tab.
      elapsed += Math.min(timestamp - lastTimestamp, 100);
    }
    lastTimestamp = timestamp;
    const nextIteration = Math.min(
      ITERATIONS,
      Math.floor((elapsed / DURATION_MS) * ITERATIONS),
    );
    if (nextIteration !== visibleIteration) {
      visibleIteration = nextIteration;
      draw();
    }
    animationFrame = visibleIteration < ITERATIONS
      ? window.requestAnimationFrame(animate)
      : null;
  }

  function stepSize() {
    // The inverse of f(x) = sqrt(10x): the proposal scale is y = x^2 / 10.
    const x = Number(slider.value);
    return Math.min(MAX_STEP_SIZE, x * x / 10);
  }

  function restart() {
    if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    const sigma = stepSize();
    valueLabel.textContent = sigma.toFixed(4);
    slider.setAttribute("aria-valuetext", sigma.toFixed(4));
    const colour = sigma <= 0.25 + 1e-12 ? "#e6b800" : sigma <= 5 + 1e-12 ? "#228b22" : "#d32727";
    slider.style.setProperty("--step-color", colour);
    simulate(sigma);
    visibleIteration = 0;
    elapsed = 0;
    lastTimestamp = null;
    draw();
    animationFrame = window.requestAnimationFrame(animate);
  }

  slider.addEventListener("input", restart);
  const sliderArea = slider.closest(".mcmc-slider");
  let activePointer = null;
  let pointerStartValue = null;

  function updateSliderFromPointer(event) {
    const bounds = slider.getBoundingClientRect();
    // The 16px thumb's centre travels from 8px to width - 8px.
    const fraction = Math.max(0, Math.min(1,
      (event.clientX - bounds.left - 8) / Math.max(1, bounds.width - 16)
    ));
    const minimum = Number(slider.min);
    const rawValue = minimum + fraction * (Number(slider.max) - minimum);
    if (Number(slider.value) === rawValue) return;
    slider.value = String(rawValue);
    // Keep the existing x^2 / 10 mapping and animation restart behaviour.
    slider.dispatchEvent(new Event("input", { bubbles: true }));
  }

  sliderArea.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || activePointer !== null) return;
    event.preventDefault();
    slider.focus({ preventScroll: true });
    activePointer = event.pointerId;
    pointerStartValue = slider.value;
    sliderArea.setPointerCapture(event.pointerId);
    updateSliderFromPointer(event);
  });
  sliderArea.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointer) return;
    event.preventDefault();
    updateSliderFromPointer(event);
  });
  sliderArea.addEventListener("pointerup", (event) => {
    if (event.pointerId !== activePointer) return;
    event.preventDefault();
    updateSliderFromPointer(event);
    const changed = slider.value !== pointerStartValue;
    activePointer = null;
    if (sliderArea.hasPointerCapture(event.pointerId)) {
      sliderArea.releasePointerCapture(event.pointerId);
    }
    if (changed) slider.dispatchEvent(new Event("change", { bubbles: true }));
  });
  function cancelSliderPointer(event) {
    if (event.pointerId === activePointer) activePointer = null;
  }
  sliderArea.addEventListener("pointercancel", cancelSliderPointer);
  sliderArea.addEventListener("lostpointercapture", cancelSliderPointer);
  // Prevent native text/image dragging anywhere within the slider control.
  const controls = slider.closest(".mcmc-controls");
  controls.addEventListener("selectstart", (event) => event.preventDefault());
  controls.addEventListener("dragstart", (event) => event.preventDefault());

  slider.addEventListener("keydown", (event) => {
    // Keyboard controls adjust the displayed scale, rather than the raw x value.
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const current = stepSize();
    const values = {
      ArrowRight: current + 0.0001,
      ArrowUp: current + 0.0001,
      ArrowLeft: current - 0.0001,
      ArrowDown: current - 0.0001,
      PageUp: current + 1,
      PageDown: current - 1,
      Home: 0,
      End: MAX_STEP_SIZE,
    };
    if (!Object.prototype.hasOwnProperty.call(values, event.key)) return;
    event.preventDefault();
    const next = Math.max(0, Math.min(MAX_STEP_SIZE, Math.round(values[event.key] * 10000) / 10000));
    slider.value = String(Math.sqrt(10 * next));
    restart();
  });
  window.addEventListener("resize", draw);
  window.addEventListener("resize", renderStepBraces);
  document.addEventListener("visibilitychange", () => {
    lastTimestamp = null;
  });
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(draw);
    canvases.forEach((canvas) => observer.observe(canvas));
    const braceObserver = new ResizeObserver(renderStepBraces);
    braceSegments.forEach((element) => braceObserver.observe(element));
  }
  renderStepBraces();
  restart();
})();
