import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "../lib/utils";

const DefaultCursorSVG = ({ size = 25, color = "currentColor", className }: { size?: number; color?: string; className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * 2}
      height={size * 2.16}
      viewBox="0 0 50 54"
      fill="none"
      className={cn("pointer-events-none drop-shadow-md", className)}
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill={color}
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </g>
    </svg>
  );
};

export interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
    restDelta?: number;
  };
  className?: string;
  size?: number;
  color?: string;
  hideOnLeave?: boolean;
  trailLength?: number;
  showTrail?: boolean;
  rotateOnMove?: boolean;
  scaleOnClick?: boolean;
  glowEffect?: boolean;
  magneticDistance?: number;
  magneticElements?: string;
  onCursorMove?: (pos: { x: number; y: number }) => void;
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
  disabled?: boolean;
}

export function SmoothCursor({
  cursor,
  springConfig = {
    damping: 35,
    stiffness: 350,
    mass: 0.8,
    restDelta: 0.001,
  },
  className,
  size = 22,
  color = "currentColor",
  hideOnLeave = true,
  trailLength = 5,
  showTrail = false,
  rotateOnMove = true,
  scaleOnClick = true,
  glowEffect = false,
  magneticDistance = 50,
  magneticElements = "a, button, [role='button'], input, textarea, select, .cursor-pointer, [data-magnetic]",
  onCursorMove,
  onCursorEnter,
  onCursorLeave,
  disabled = false,
}: SmoothCursorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 50,
    stiffness: 250,
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 450,
    damping: 30,
  });

  const defaultCursor = <DefaultCursorSVG size={size} color={color} />;
  const cursorElement = cursor || defaultCursor;

  useEffect(() => {
    if (disabled) return;

    // Only activate custom cursor on fine pointer devices (desktops)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const updateVelocity = (currentPos: { x: number; y: number }) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }
      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const updateTrail = (pos: { x: number; y: number }) => {
      if (!showTrail || isHoveringInteractive) return;
      setTrail((prev) => [pos, ...prev.slice(0, trailLength - 1)]);
    };

    const findMagneticElement = (x: number, y: number) => {
      const elements = document.querySelectorAll(magneticElements);
      for (const element of Array.from(elements)) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        if (distance < magneticDistance) {
          return { x: centerX, y: centerY, distance };
        }
      }
      return null;
    };

    const smoothMouseMove = (e: MouseEvent) => {
      let currentPos = { x: e.clientX, y: e.clientY };

      // Detect if hovering over clickable/pointer element
      const target = e.target as HTMLElement | null;
      const interactiveTarget = target?.closest(magneticElements);
      const isInteractive = Boolean(interactiveTarget);

      setIsHoveringInteractive(isInteractive);

      if (isInteractive) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "none";
      }

      const magneticTarget = findMagneticElement(currentPos.x, currentPos.y);

      if (magneticTarget) {
        const strength = 1 - magneticTarget.distance / magneticDistance;
        currentPos = {
          x: currentPos.x + (magneticTarget.x - currentPos.x) * strength * 0.35,
          y: currentPos.y + (magneticTarget.y - currentPos.y) * strength * 0.35,
        };
      }

      updateVelocity(currentPos);
      updateTrail(currentPos);

      const speed = Math.sqrt(Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2));
      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);
      onCursorMove?.(currentPos);

      if (speed > 0.1 && rotateOnMove) {
        const currentAngle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      onCursorEnter?.();
    };

    const handleMouseLeave = () => {
      if (hideOnLeave) {
        setIsVisible(false);
      }
      document.body.style.cursor = "auto";
      onCursorLeave?.();
    };

    const handleMouseDown = () => {
      if (scaleOnClick) {
        scale.set(0.75);
      }
    };

    const handleMouseUp = () => {
      if (scaleOnClick) {
        scale.set(1);
      }
    };

    let rafId: number;
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        smoothMouseMove(e);
        rafId = 0;
      });
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", throttledMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "auto";
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    cursorX,
    cursorY,
    rotation,
    scale,
    disabled,
    showTrail,
    trailLength,
    rotateOnMove,
    scaleOnClick,
    hideOnLeave,
    magneticDistance,
    magneticElements,
    onCursorMove,
    onCursorEnter,
    onCursorLeave,
    isHoveringInteractive,
  ]);

  if (disabled || !isVisible || isHoveringInteractive) return null;

  return (
    <>
      {showTrail &&
        !isHoveringInteractive &&
        trail.map((pos, index) => (
          <motion.div
            key={index}
            style={{
              position: "fixed",
              left: pos.x,
              top: pos.y,
              translateX: "-50%",
              translateY: "-50%",
              zIndex: 9998 - index,
              pointerEvents: "none",
              opacity: ((trailLength - index) / trailLength) * 0.4,
              scale: ((trailLength - index) / trailLength) * 0.7,
            }}
            className="w-2.5 h-2.5 bg-primary rounded-full pointer-events-none"
          />
        ))}

      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotateOnMove ? rotation : 0,
          scale: scale,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
          filter: glowEffect ? "drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))" : "none",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className={cn("select-none text-primary pointer-events-none hidden md:block", className)}
      >
        {cursorElement}
      </motion.div>
    </>
  );
}

export default SmoothCursor;
