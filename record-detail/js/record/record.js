import { recordData, recordTimeline } from "./variables.js";
import { addMouseLeaveListener, addMouseMoveListener } from "./events.js";
import { renderDecibelRect, renderSentimentBar } from "./decibel-sentiment.js";
import {
  updateStraightAndTimeForData,
  updateStraightAndTimeForNonData,
} from "./straight-time.js";

const width = 4.1 * recordData.durationSeconds;

function setWidth() {
  if (
    recordTimeline.dataContainer.clientWidth <
    recordTimeline.container.clientWidth
  ) {
    recordTimeline.nonDataContainer.style.width = `${
      recordTimeline.container.getBoundingClientRect().width -
      recordTimeline.dataContainer.getBoundingClientRect().width
    }px`;
  }

  recordTimeline.dataContainer.style.width = `${width}px`;
  recordTimeline.customerDecibel.style.width = `${width}px`;
  recordTimeline.agentDecibel.style.width = `${width}px`;
  recordTimeline.customerSentiment.style.width = `${width}px`;
  recordTimeline.agentSentiment.style.width = `${width}px`;
  recordTimeline.timeline.style.width = `${
    width + recordTimeline.nonDataContainer.getBoundingClientRect().width
  }px`;
}

function addDecibelAndSentiment() {
  recordData.spoken.forEach((segment) => {
    const decibelContainer =
      segment.speaker === "agent"
        ? recordTimeline.agentDecibel
        : recordTimeline.customerDecibel;
    const sentimentContainer =
      segment.speaker === "agent"
        ? recordTimeline.agentSentiment
        : recordTimeline.customerSentiment;
    let minLeft = Infinity;
    let maxRight = 0;

    renderDecibelRect(segment, decibelContainer);

    Object.keys(segment.decibelLevels).forEach((second, index) => {
      const secondOffset = second - segment.startTimestamp;
      const leftPosition = secondOffset * 4.1 + segment.startTimestamp * 4.1;
      minLeft = Math.min(minLeft, leftPosition);
      maxRight = Math.max(maxRight, leftPosition + 4.1);
    });

    renderSentimentBar(segment, sentimentContainer, minLeft, maxRight);
  });
}

function setupEvent() {
  addMouseMoveListener(
    recordTimeline.dataContainer,
    0,
    updateStraightAndTimeForData
  );
  addMouseMoveListener(
    recordTimeline.nonDataContainer,
    width,
    updateStraightAndTimeForNonData
  );
  addMouseLeaveListener(recordTimeline.dataContainer);
  addMouseLeaveListener(recordTimeline.nonDataContainer);
}

function renderTimeLine() {
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

function addStraightIssue() {
  const issueDetected = recordData.issueDetected;
  const leftPosition = issueDetected.startTimestamp * 4.1;
  const straightIssue = recordTimeline.straightIssue;
  console.log(straightIssue);
  straightIssue.style.left = `${leftPosition}px`;
}

setWidth();
addDecibelAndSentiment();
setupEvent();
renderTimeLine();
addStraightIssue();
