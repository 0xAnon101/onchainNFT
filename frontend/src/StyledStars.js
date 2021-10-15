import React from "react";

function draw(star, context, canvasW, canvasH) {
  const starContext = star;
  const canvasCtx = context;

  canvasCtx.rotate((Math.PI * 1) / 10);

  // Save the canvasCtx
  canvasCtx.save();

  // move into the middle of the canvas, just to make room
  canvasCtx.translate(star.x, star.y);

  // Change the opacity
  if (starContext.opacity > 1) {
    starContext.factor = -1;
  } else if (starContext.opacity <= 0) {
    starContext.factor = 1;

    starContext.x = Math.round(Math.random() * canvasW);
    starContext.y = Math.round(Math.random() * canvasH);
  }

  starContext.opacity += starContext.increment * starContext.factor;

  canvasCtx.beginPath();

  for (let i = 5; i--; ) {
    canvasCtx.lineTo(0, starContext.length);
    canvasCtx.translate(0, starContext.length);
    canvasCtx.rotate((Math.PI * 2) / 10);
    canvasCtx.lineTo(0, -starContext.length);
    canvasCtx.translate(0, -starContext.length);
    canvasCtx.rotate(-((Math.PI * 6) / 10));
  }
  canvasCtx.lineTo(0, starContext.length);
  canvasCtx.closePath();
  canvasCtx.fillStyle = `rgba(255, 255, 255, ${starContext.opacity})`;

  canvasCtx.shadowBlur = 5;
  canvasCtx.shadowColor = "#fffff3";
  canvasCtx.fill();

  canvasCtx.restore();
}

class StarsCanvas extends React.PureComponent {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.stars = [];
  }

  componentDidMount() {
    const canvas = this.canvas.current;
    this.context = canvas.getContext("2d");
    this.createStars();
  }

  componentDidUpdate() {
    const canvas = this.canvas.current;
    this.context = canvas.getContext("2d");
    this.createStars();
  }

  // Create all the stars
  createStars = () => {
    const numStars = this.props.width <= 768 ? 200 : 800;
    for (let i = 0; i < numStars; i++) {
      const x = Math.round(Math.random() * this.props.width);
      const y = Math.round(Math.random() * this.props.height);
      const length = 0.5 + Math.random() * 2;
      const opacity = Math.random();

      // Create a new star and draw
      const star = this.starEl(x, y, length, opacity);
      this.stars.push(star);
    }
    requestAnimationFrame(this.animate);
  };

  /**
   * Animate the canvas
   */
  animate = () => {
    if (this.context.clearRect) {
      this.context.clearRect(0, 0, this.props.width, this.props.height);
      this.stars.forEach((star) => {
        draw(star, this.context, this.props.width, this.props.height);
      });
      requestAnimationFrame(this.animate);
    }
  };

  starEl = (x, y, length, opacity) => ({
    x: parseInt(x),
    y: parseInt(y),
    length: parseInt(length),
    opacity,
    factor: 1,
    increment: Math.random() * 0.02,
  });

  render() {
    return (
      <div className="stars-wrapper">
        <div className="stars-container">
          <canvas
            ref={this.canvas}
            width={this.props.width}
            height={this.props.height}
          />
        </div>
      </div>
    );
  }
}

export default StarsCanvas;
