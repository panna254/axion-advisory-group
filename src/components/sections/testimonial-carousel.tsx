"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/testimonial";

import { TestimonialQuote, isRenderableTestimonial } from "./testimonial-quote";

/**
 * TestimonialCarousel — the quote half of `ProofSection`.
 *
 * WHY THE SLIDES ARE STACKED IN ONE GRID CELL
 * Every slide is rendered, all of them in `col-start-1 row-start-1`, so the
 * track is always as tall as the LONGEST quote and the section never changes
 * height when the slide changes. The alternative (render only the active
 * slide) reflows the whole page on every advance, which is the single most
 * noticeable defect a carousel can ship, and it gets worse the more the quote
 * lengths differ. The cost is that all six quotes are in the DOM at once,
 * which for six short strings is nothing.
 *
 * Inactive slides are `opacity-0 pointer-events-none` and `aria-hidden`, so
 * they are invisible, unclickable and unreadable to assistive tech while
 * still holding the box open. They contain nothing focusable, so no slide can
 * trap the keyboard.
 *
 * MOTION
 * A cross-fade and nothing else. No horizontal translate, no scale, no 3D.
 * `globals.css` collapses the transition to near-zero under
 * `prefers-reduced-motion`, and `useReducedMotion` separately stops autoplay,
 * since a timer that keeps swapping content is a motion problem whether or
 * not the swap itself is animated.
 */

/** Slower than the usual 5s carousel: these quotes are two sentences of serif. */
const AUTOPLAY_INTERVAL_MS = 7000;

/** Below this, a horizontal drag is a scroll or a tap, not a swipe. */
const SWIPE_THRESHOLD_PX = 48;

type TestimonialCarouselProps = {
  testimonials: readonly Testimonial[];
  /** Milliseconds between automatic advances. */
  autoplayIntervalMs?: number;
};

export function TestimonialCarousel({
  testimonials,
  autoplayIntervalMs = AUTOPLAY_INTERVAL_MS,
}: TestimonialCarouselProps) {
  // Gated records are dropped rather than rendered as blank slides, so the
  // dot count and the "n of m" labels always describe what is actually there.
  const slides = useMemo(
    () => testimonials.filter(isRenderableTestimonial),
    [testimonials]
  );

  const [storedIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const slideCount = slides.length;
  const hasMultiple = slideCount > 1;

  // Clamped during render rather than corrected in an effect. If the array
  // shrinks under a stored index, the next render simply shows the first
  // slide; an effect would store the correction and cost an extra render to
  // do it. `goTo` wraps with a modulo, so nothing else can put the index out
  // of range in the first place.
  const activeIndex = storedIndex < slideCount ? storedIndex : 0;

  const goTo = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount]
  );

  const goNext = useCallback(
    () => goTo(activeIndex + 1),
    [goTo, activeIndex]
  );
  const goPrevious = useCallback(
    () => goTo(activeIndex - 1),
    [goTo, activeIndex]
  );

  const isAutoplaying = hasMultiple && !isPaused && !prefersReducedMotion;

  // `activeIndex` is a dependency on purpose: any change, manual or
  // automatic, restarts the clock. Without it a click on Next would be
  // followed by an automatic advance a fraction of a second later.
  useEffect(() => {
    if (!isAutoplaying) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, autoplayIntervalMs);

    return () => window.clearInterval(timer);
  }, [isAutoplaying, slideCount, autoplayIntervalMs, activeIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultiple) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || !hasMultiple) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    // A mostly-vertical drag is the page scrolling, so leave it alone.
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

    if (deltaX < 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  if (slideCount === 0) {
    return null;
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      {/* Live region. Silent while rotating on its own (announcing an
          unrequested change every few seconds is noise); polite once the
          reader has paused or taken control, when the change IS the answer
          to something they did. */}
      <div
        className="grid"
        aria-live={isAutoplaying ? "off" : "polite"}
        aria-atomic="true"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
        style={{ touchAction: "pan-y" }}
      >
        {slides.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={testimonial.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${index + 1} of ${slideCount}`}
              aria-hidden={!isActive}
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-500 ease-out",
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <TestimonialQuote testimonial={testimonial} />
            </div>
          );
        })}
      </div>

      {hasMultiple ? (
        <div className="mt-2xl flex flex-wrap items-center justify-between gap-lg">
          {/* Pagination. The active dot is a wider BAR, not just a different
              colour, so the current slide is legible without colour vision
              and at a glance. `aria-current` carries the same fact. */}
          <div className="flex items-center gap-xs">
            {slides.map((testimonial, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Show testimonial ${index + 1} of ${slideCount}`}
                  /* 44px tall hit area around a 2px rule: the control stays
                     restrained without becoming a sub-target-size tap. */
                  className="group/dot flex h-11 items-center px-2xs focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span
                    className={cn(
                      "block h-[2px] rounded-full transition-[width,background-color] duration-300 ease-out",
                      isActive
                        ? "w-8 bg-primary"
                        : "w-3 bg-muted-foreground/50 group-hover/dot:bg-muted-foreground"
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-xs">
            <CarouselButton label="Previous testimonial" onClick={goPrevious}>
              <IconArrowLeft size="sm" />
            </CarouselButton>
            <CarouselButton label="Next testimonial" onClick={goNext}>
              <IconArrowRight size="sm" />
            </CarouselButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Previous/Next. Cyan outline rather than a crimson fill: BRAND.md reserves
 * crimson for the action a visitor came to take, and stepping through quotes
 * is navigation chrome, not that action. Cyan is the systems colour and this
 * is structure.
 */
function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-lg border border-stroke-systems text-foreground transition-[background-color,color] duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px"
    >
      {children}
    </button>
  );
}
