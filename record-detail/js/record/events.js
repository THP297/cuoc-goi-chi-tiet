import { recordData, recordTimeline } from "./variables.js";

export function addMouseMoveListener(container, offsetX, callback) {
  container.addEventListener("mousemove", function (e) {
    const bounds = this.getBoundingClientRect();
    callback(e, bounds, offsetX, recordData.durationSeconds);
  });
}

export function addMouseLeaveListener(container) {
  container.addEventListener("mouseleave", function () {
    recordTimeline.straight.style.display = "none";
    recordTimeline.time.style.display = "none";
  });
}
