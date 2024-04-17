export function renderDecibelRect(segment, decibelContainer) {
  const maxDbHeight = 60;
  const dbScale = maxDbHeight / 100;
  const gapWidth = 1;

  Object.keys(segment.decibelLevels).forEach((second) => {
    const dbValue = parseFloat(segment.decibelLevels[second].split(" ")[0]);
    const height = dbValue * dbScale;
    const secondOffset = second - segment.startTimestamp;
    const leftPosition = secondOffset * 4.1 + segment.startTimestamp * 4.1;

    const rect = document.createElement("div");
    rect.className = "decibel-rect";
    rect.style.width = `${4.1 - gapWidth}px`;
    rect.style.height = `${height}px`;
    rect.style.left = `${leftPosition}px`;
    decibelContainer.appendChild(rect);
  });
}

export function renderSentimentBar(
  segment,
  sentimentContainer,
  minLeft,
  maxRight
) {
  const sentimentBar = document.createElement("div");
  sentimentBar.style.position = "absolute";
  sentimentBar.style.height = "8px";
  sentimentBar.style.left = `${minLeft}px`;
  sentimentBar.style.width = `${maxRight - minLeft}px`;
  sentimentBar.style.bottom = "0";
  sentimentBar.style.backgroundColor =
    segment.sentiment === "positive" ? "green" : "red";
  sentimentContainer.appendChild(sentimentBar);
}
