import { recordTimeline } from "./variables.js";

export function updateStraightAndTimeForData(
  e,
  bounds,
  offsetX,
  durationSeconds
) {
  const x = e.clientX - bounds.left;
  recordTimeline.straight.style.left = `${x}px`;
  recordTimeline.straight.style.display = "block";
  recordTimeline.time.style.left = `${x}px`;
  recordTimeline.time.style.display = "block";

  const totalSeconds = Math.floor((x / bounds.width) * durationSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  recordTimeline.time.textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function updateStraightAndTimeForNonData(
  e,
  bounds,
  offsetX,
  durationSeconds
) {
  const x = e.clientX - bounds.left;
  recordTimeline.straight.style.left = `${x + offsetX}px`;
  recordTimeline.straight.style.display = "block";
  recordTimeline.time.style.left = `${x + offsetX - 50}px`;
  recordTimeline.time.style.display = "block";

  const totalSeconds = Math.floor(
    (x / bounds.width) * (bounds.width / 4.1) + durationSeconds
  );
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  recordTimeline.time.textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
