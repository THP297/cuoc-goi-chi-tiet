import { data } from "../data.js";

export const recordData = data.record;
export const recordTimeline = {
  container: document.querySelector(".record-timeline"),
  dataContainer: document.querySelector(".record-timeline .data"),
  nonDataContainer: document.querySelector(".record-timeline .non-data"),
  customerDecibel: document.querySelector(
    ".record-timeline .data .customer-decibel"
  ),
  agentDecibel: document.querySelector(".record-timeline .data .agent-decibel"),
  customerSentiment: document.querySelector(
    ".record-timeline .data .customer-sentiment"
  ),
  agentSentiment: document.querySelector(
    ".record-timeline .data .agent-sentiment"
  ),
  timeline: document.querySelector(
    ".section4 .second-row .record .record-timeline .timeline"
  ),
  straight: document.querySelector(".record-straight"),
  time: document.querySelector(".record-time"),
  straightIssue: document.querySelector(".straight-issue"),
  straightCurrent: document.querySelector(".straight-current"),
};
recordTimeline.container.style.overflowX = "auto";
