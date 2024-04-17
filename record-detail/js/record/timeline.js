import { recordTimeline, recordData } from "./variables.js";

export function renderTimeLine() {
  const timeline = recordTimeline.timeline;

  for (let i = 0; i <= recordData.durationSeconds; i++) {
    if (i != 0 && i % 30 === 0) {
      const wrapper = document.createElement("div");
      const dash = document.createElement("div");
      dash.classList.add("dash");
      const time = document.createElement("span");

      const minutes = Math.floor(i / 60);
      const seconds = i % 60;
      time.textContent = `${minutes.toString().padStart(1, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
      wrapper.appendChild(dash);
      wrapper.appendChild(time);
      wrapper.style.left = `${i * 4.1}px`;
      timeline.appendChild(wrapper);
    }
  }
}
