"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type LogoItem =
  | {
      node: React.ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
    };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number; // pixels per second
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number; // 0 = pause, >0 = slower/faster speed
  fadeOut?: boolean;
  fadeOutColor?: string; // optional custom fade color
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === "number" ? `${value}px` : value ?? undefined;

const useResizeObserver = (
  callback: () => void,
  elements: Array<React.RefObject<Element | null>>,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, dependencies);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach((img) => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener("load", handleImageLoad, { once: true });
        htmlImg.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, dependencies);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      const transformValue = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.transform = transformValue;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        const transformValue = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
        track.style.transform = transformValue;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical]);
};

export const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = "Partner logos",
    className = "",
    style,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState<number>(0);
    const [seqHeight, setSeqHeight] = useState<number>(0);
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === "up" || direction === "down";

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      let directionMultiplier: number;
      if (isVertical) {
        directionMultiplier = direction === "up" ? 1 : -1;
      } else {
        directionMultiplier = direction === "left" ? 1 : -1;
      }
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;
      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`;
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight));
          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
          const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
      } else if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, [isVertical]);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);

    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);

    useAnimationLoop(
      trackRef,
      targetVelocity,
      seqWidth,
      seqHeight,
      isHovered,
      effectiveHoverSpeed,
      isVertical
    );

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);

    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    const renderLogoItem = useCallback(
      (item: LogoItem, key: React.Key) => {
        if (renderItem) {
          return (
            <li className="flex-shrink-0" key={key} role="listitem">
              {renderItem(item, key)}
            </li>
          );
        }
        const isNodeItem = "node" in item;
        const content = isNodeItem ? (
          <span className="inline-flex items-center" aria-hidden={!!item.href && !item.ariaLabel}>
            {(item as any).node}
          </span>
        ) : (
          <img
            src={(item as any).src}
            srcSet={(item as any).srcSet}
            sizes={(item as any).sizes}
            width={(item as any).width}
            height={(item as any).height}
            alt={(item as any).alt ?? ""}
            title={(item as any).title}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="block object-contain pointer-events-none transition-transform duration-300"
            style={{ height: logoHeight, width: "auto" }}
          />
        );
        const itemAriaLabel = isNodeItem
          ? (item as any).ariaLabel ?? (item as any).title
          : (item as any).alt ?? (item as any).title;
        const itemContent = (item as any).href ? (
          <a
            className="inline-flex items-center no-underline rounded-md transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2"
            href={(item as any).href}
            aria-label={itemAriaLabel || "logo link"}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );
        return (
          <li
            className="flex-shrink-0 transition-transform duration-300"
            style={{ marginRight: !isVertical ? gap : undefined, marginBottom: isVertical ? gap : undefined }}
            key={key}
            role="listitem"
          >
            {itemContent}
          </li>
        );
      },
      [renderItem, logoHeight, gap, isVertical]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="flex items-center [&:not(:first-child)]:sr-only md:[&:not(:first-child)]:not-sr-only"
            style={isVertical ? { flexDirection: "column" } : undefined}
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem, isVertical]
    );

    const containerStyle = useMemo(
      (): React.CSSProperties => ({
        width: isVertical ? (toCssLength(width) === "100%" ? undefined : toCssLength(width)) : toCssLength(width) ?? "100%",
        ...style,
      }),
      [width, style, isVertical]
    );

    return (
      <div
        ref={containerRef}
        className={`relative ${isVertical ? "h-full inline-block" : "overflow-x-hidden"} ${
          fadeOut ? "before:content-[''] after:content-[''] before:absolute after:absolute before:top-0 after:top-0 before:bottom-0 after:bottom-0 before:pointer-events-none after:pointer-events-none before:z-10 after:z-10 before:w-[clamp(24px,8%,120px)] after:w-[clamp(24px,8%,120px)]" : ""
        } ${
          scaleOnHover
            ? "py-[calc(var(--logoloop-logoHeight,28px)*0.1)] [&_.logoloop__item]:overflow-visible [&_.logoloop__item:hover_img]:scale-110 [&_.logoloop__item:hover_.logoloop__node]:scale-110 [&_.logoloop__item:hover_img]:origin-center [&_.logoloop__item:hover_.logoloop__node]:origin-center"
            : ""
        } ${className}`}
        style={
          {
            ...containerStyle,
            "--logoloop-gap": `${gap}px`,
            "--logoloop-logoHeight": `${logoHeight}px`,
            ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
          } as React.CSSProperties
        }
        role="region"
        aria-label={ariaLabel}
      >
        <style jsx>{`
          .logoloop-fade-horizontal::before {
            left: 0;
            background: linear-gradient(
              to right,
              var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto, #ffffff)) 0%,
              transparent 100%
            );
          }
          .logoloop-fade-horizontal::after {
            right: 0;
            background: linear-gradient(
              to left,
              var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto, #ffffff)) 0%,
              transparent 100%
            );
          }
          .logoloop-fade-vertical::before,
          .logoloop-fade-vertical::after {
            width: 100%;
            height: clamp(24px, 8%, 120px);
          }
          .logoloop-fade-vertical::before {
            top: 0;
            bottom: auto;
            background: linear-gradient(
              to bottom,
              var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto, #ffffff)) 0%,
              transparent 100%
            );
          }
          .logoloop-fade-vertical::after {
            bottom: 0;
            top: auto;
            background: linear-gradient(
              to top,
              var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto, #ffffff)) 0%,
              transparent 100%
            );
          }
        `}</style>
        <div
          className="flex w-max will-change-transform select-none relative z-0"
          style={isVertical ? { flexDirection: "column", height: "max-content", width: "100%" } : undefined}
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;