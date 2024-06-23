"use client";

const DisableInputZoom = () => {
  document.addEventListener("gesturestart", function(e) {
    e.preventDefault();
    (document.body.style as any).zoom = 0.99;
  });

  document.addEventListener("gesturechange", function(e) {
    e.preventDefault();

    (document.body.style as any).zoom = 0.99;
  });
  document.addEventListener("gestureend", function(e) {
    e.preventDefault();
    (document.body.style as any).zoom = 1;
  });

  return <span className="w-0 h-0 hidden"></span>;
};

export default DisableInputZoom;
