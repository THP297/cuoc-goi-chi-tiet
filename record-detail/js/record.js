import { data } from "./data.js";

const recordData = data.record;

const timelineContainer = document.querySelector(".record-timeline");
const dataContainer = document.querySelector(".record-timeline .data");
const nonDataContainer = document.querySelector(".record-timeline .non-data");
const customerDecibel = document.querySelector(
  ".record-timeline .data .customer-decibel"
);
const agentDecibel = document.querySelector(
  ".record-timeline .data .agent-decibel"
);
const customerSentiment = document.querySelector(
  ".record-timeline .data .customer-sentiment"
);
const agentSentiment = document.querySelector(
  ".record-timeline .data .agent-sentiment"
);
const recordTimeLine = document.querySelector(
  ".section4 .second-row .record .record-timeline .timeline"
);

setTimeout(() => {
  const width = 4.1 * recordData.durationSeconds;
  dataContainer.style.width = `${width}px`;

  recordTimeLine.style.width = `${
    parseInt(dataContainer.style.width) + parseInt(nonDataContainer.clientWidth)
  }px`;

  const maxDbHeight = 60;
  const dbScale = maxDbHeight / 100;
  const gapWidth = 1;

  recordData.spoken.forEach((segment) => {
    const decibelContainer =
      segment.speaker === "agent"
        ? document.querySelector(".record-timeline .data .agent-decibel")
        : document.querySelector(".record-timeline .data .customer-decibel");

    const sentimentContainer =
      segment.speaker === "agent"
        ? document.querySelector(".record-timeline .data .agent-sentiment")
        : document.querySelector(".record-timeline .data .customer-sentiment");

    let minLeft = 0;
    let maxRight = 0;

    Object.keys(segment.decibelLevels).forEach((second, index) => {
      // tính chiều cao cho decibel
      const dbValue = parseFloat(segment.decibelLevels[second].split(" ")[0]);
      const height = dbValue * dbScale;

      // tính chiều rộng
      const secondOffset = second - segment.startTimestamp;
      const rectWidth = 4.1 - gapWidth;

      // tính điểm bắt đầu
      const leftPosition = secondOffset * 4.1 + segment.startTimestamp * 4.1;

      const rect = document.createElement("div");
      rect.className = "decibel-rect";
      rect.style.width = `${rectWidth}px`;
      rect.style.height = `${height}px`;
      rect.style.left = `${leftPosition}px`;
      decibelContainer.appendChild(rect);

      if (index === 0) {
        minLeft = leftPosition;
      }
      maxRight = Math.max(maxRight, leftPosition + rectWidth);
    });

    const sentimentBar = document.createElement("div");
    sentimentBar.style.position = "absolute";
    sentimentBar.style.height = "8px";
    sentimentBar.style.left = `${minLeft}px`;
    sentimentBar.style.width = `${maxRight - minLeft}px`;
    sentimentBar.style.bottom = "0";
    sentimentBar.style.backgroundColor =
      segment.sentiment === "positive" ? "green" : "red";
    sentimentContainer.appendChild(sentimentBar);
  });

  timelineContainer.style.overflowX = "auto"; // Enable horizontal scrolling
  customerDecibel.style.width = `${width}px`;
  agentDecibel.style.width = `${width}px`;
  customerSentiment.style.width = `${width}px`;
  agentSentiment.style.width = `${width}px`;

  document
    .querySelector(".record-timeline .data")
    .addEventListener("mousemove", function (e) {
      const straight = document.querySelector(".record-straight");
      const second = document.querySelector(".record-time");
      const bounds = this.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      straight.style.left = `${x}px`;
      straight.style.display = "block";

      second.style.left = `${x}px`; // Offset by 5px
      second.style.display = "block";

      const totalSeconds = Math.floor(
        (x / bounds.width) * recordData.durationSeconds
      );

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formattedSecond = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
      second.textContent = formattedSecond;
    });

  document
    .querySelector(".record-timeline .data")
    .addEventListener("mouseleave", function () {
      document.querySelector(".record-straight").style.display = "none";
      document.querySelector(".record-time").style.display = "none";
    });

  document
    .querySelector(".record-timeline .non-data")
    .addEventListener("mousemove", function (e) {
      const straight = document.querySelector(".record-straight");
      const second = document.querySelector(".record-time");
      const bounds = this.getBoundingClientRect();
      const x = e.clientX - bounds.left;

      straight.style.left = `${
        x + dataContainer.getBoundingClientRect().width
      }px`;

      straight.style.display = "block";

      second.style.left = `${
        x + dataContainer.getBoundingClientRect().width - 50
      }px`;
      second.style.display = "block";

      const totalSeconds = Math.floor(
        (x / bounds.width) * (this.getBoundingClientRect().width / 4.1) +
          recordData.durationSeconds
      );

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formattedSecond = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
      second.textContent = formattedSecond;
    });

  document
    .querySelector(".record-timeline .non-data")
    .addEventListener("mouseleave", function () {
      document.querySelector(".record-straight").style.display = "none";
      document.querySelector(".record-time").style.display = "none";
    });
}, 1000);
