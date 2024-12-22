import React, { useState } from "react";
import rough from "roughjs/bin/rough";
import {
  createLeftBubble,
  createRightBubble,
  createBottomBubble,
  createTopBubble,
} from "./elements/createSvgPath";

const SketchTooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  size: {
    width = 100,
    height = 20,
    tailWidth = 20,
    tailHeight = 30,
    cornerCurve = 50,
    leftCanvasMargin = 5,
    topCanvasMargin = 5,
  },
  styleOptions = {},
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const initializeCanvas = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      const rc = rough.canvas(canvas);

      rc.path(
        createBubble(position),
        Object.assign(
          {
            fill: "white",
            fillStyle: "solid",
            roughness: 1,
          },
          styleOptions
        )
      );
    }
  };

  const createBubble = (position: "top" | "bottom" | "left" | "right") => {
    switch (position) {
      case "top":
        return createTopBubble({
          width,
          height,
          tailWidth,
          tailHeight,
          cornerCurve,
          leftCanvasMargin,
          topCanvasMargin,
        });
      case "bottom":
        return createBottomBubble({
          width,
          height,
          tailWidth,
          tailHeight,
          cornerCurve,
          leftCanvasMargin,
          topCanvasMargin,
        });
      case "left":
        return createLeftBubble({
          width,
          height,
          tailWidth,
          tailHeight,
          cornerCurve,
          leftCanvasMargin,
          topCanvasMargin,
        });
      case "right":
        return createRightBubble({
          width,
          height,
          tailWidth,
          tailHeight,
          cornerCurve,
          leftCanvasMargin,
          topCanvasMargin,
        });
    }
  };

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="element_wrap"
    >
      {children}
      {showTooltip && (
        <div className={`tooltip_wrap ${position}`}>
          <canvas
            ref={initializeCanvas}
            width={
              leftCanvasMargin * 2 +
              width +
              cornerCurve * 2 +
              (position === "left" || position === "right" ? tailHeight : 0)
            }
            height={
              topCanvasMargin * 2 +
              height +
              cornerCurve * 2 +
              (position === "top" || position === "bottom" ? tailHeight : 0)
            }
          />
          <div
            className="tooltip_content_wrap"
            style={{
              top: position === "bottom" ? tailHeight : 0,
              left: position === "right" ? tailHeight : 0,
              width: leftCanvasMargin * 2 + width + cornerCurve * 2,
              height: topCanvasMargin * 2 + height + cornerCurve * 2,
              padding: cornerCurve / 2,
            }}
          >
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default SketchTooltip;
