import { data } from "./data.js";

const recordData = data.record;

const timelineContainer = document.querySelector(".record-timeline");
const originalTimelineContainerWidth =
  timelineContainer.getBoundingClientRect().width;

setTimeout(() => {
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

  const baseDuration = 330; // Standard full width corresponds to 330 seconds
  const widthPercentage = (recordData.durationSeconds / baseDuration) * 100;

  dataContainer.style.width = `${widthPercentage}%`;
  nonDataContainer.style.width = `${100 - widthPercentage}%`;

  if (recordData.durationSeconds >= baseDuration) {
    nonDataContainer.style.display = "none"; // Hide non-data if duration exceeds 330 seconds
    timelineContainer.style.overflowX = "auto"; // Enable horizontal scrolling
    const timelineContainerWidth =
      (timelineContainer.getBoundingClientRect().width * widthPercentage) / 100;
    const dataContainerWidth = (widthPercentage * timelineContainerWidth) / 100;

    dataContainer.style.width = `${dataContainerWidth}px`;
    customerDecibel.style.width = `${dataContainerWidth}px`;
    agentDecibel.style.width = `${dataContainerWidth}px`;
    customerSentiment.style.width = `${dataContainerWidth}px`;
    agentSentiment.style.width = `${dataContainerWidth}px`;

    var totalWidth = timelineContainerWidth;
  } else {
    var totalWidth = timelineContainer.getBoundingClientRect().width;
  }

  const maxDbHeight = 60;
  const dbScale = maxDbHeight / 100;
  const perSecondWidth = totalWidth / 330;
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

    let minLeft = totalWidth,
      maxRight = 0;

    Object.keys(segment.decibelLevels).forEach((second, index) => {
      const dbValue = parseFloat(segment.decibelLevels[second].split(" ")[0]);
      const height = dbValue * dbScale;
      const secondOffset = second - segment.startTimestamp;
      console.log(originalTimelineContainerWidth);
      const rectWidth = originalTimelineContainerWidth / 330 - gapWidth;

      const leftPosition =
        secondOffset * perSecondWidth + segment.startTimestamp * perSecondWidth;

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
    sentimentBar.style.height = "10px";
    sentimentBar.style.left = `${minLeft}px`;
    sentimentBar.style.width = `${maxRight - minLeft}px`;
    sentimentBar.style.bottom = "0";
    sentimentBar.style.backgroundColor =
      segment.sentiment === "positive" ? "green" : "red";
    sentimentContainer.appendChild(sentimentBar);
  });

  if (recordData.durationSeconds >= baseDuration) {
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
        const formattedSecond = `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        second.textContent = formattedSecond;
      });

    document
      .querySelector(".record-timeline .data")
      .addEventListener("mouseleave", function () {
        document.querySelector(".record-straight").style.display = "none";
        document.querySelector(".record-time").style.display = "none";
      });
  } else {
    document
      .querySelector(".record-timeline")
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
        const formattedSecond = `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        second.textContent = formattedSecond;
      });

    document
      .querySelector(".record-timeline .data")
      .addEventListener("mouseleave", function () {
        document.querySelector(".record-straight").style.display = "none";
        document.querySelector(".record-time").style.display = "none";
      });
  }
}, 2000);
