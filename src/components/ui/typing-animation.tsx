"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useReducer,
  type ComponentType,
  type RefAttributes,
  type RefObject,
} from "react"
import {
  motion,
  useInView,
  type DOMMotionComponents,
  type HTMLMotionProps,
  type MotionProps,
} from "motion/react"

import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const

type MotionElementType = Extract<
  keyof DOMMotionComponents,
  keyof typeof motionElements
>
type TypingAnimationMotionComponent = ComponentType<
  Omit<HTMLMotionProps<"span">, "ref"> & RefAttributes<HTMLElement>
>

interface TypingAnimationProps extends Omit<MotionProps, "children"> {
  children?: string
  words?: string[]
  className?: string
  duration?: number
  typeSpeed?: number
  deleteSpeed?: number
  delay?: number
  pauseDelay?: number
  loop?: boolean
  as?: MotionElementType
  startOnView?: boolean
  showCursor?: boolean
  blinkCursor?: boolean
  cursorStyle?: "line" | "block" | "underscore"
}

export function TypingAnimation({
  children,
  words,
  className,
  duration = 100,
  typeSpeed,
  deleteSpeed,
  delay = 0,
  pauseDelay = 1000,
  loop = false,
  as: Component = "span",
  startOnView = true,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = "line",
  ...props
}: TypingAnimationProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const MotionComponent = motionElements[
    Component
  ] as TypingAnimationMotionComponent

  type Phase = "typing" | "pause" | "deleting"
  type TypingState = {
    displayedText: string
    currentWordIndex: number
    currentCharIndex: number
    phase: Phase
  }

  type Action =
    | { type: "reset" }
    | { type: "setDisplayedText"; value: string }
    | { type: "setCurrentWordIndex"; value: number }
    | { type: "setCurrentCharIndex"; value: number }
    | { type: "setPhase"; value: Phase }

  const [state, dispatch] = useReducer(
    (s: TypingState, a: Action): TypingState => {
      switch (a.type) {
        case "reset":
          return {
            displayedText: "",
            currentWordIndex: 0,
            currentCharIndex: 0,
            phase: "typing",
          }
        case "setDisplayedText":
          return { ...s, displayedText: a.value }
        case "setCurrentWordIndex":
          return { ...s, currentWordIndex: a.value }
        case "setCurrentCharIndex":
          return { ...s, currentCharIndex: a.value }
        case "setPhase":
          return { ...s, phase: a.value }
      }
    },
    {
      displayedText: "",
      currentWordIndex: 0,
      currentCharIndex: 0,
      phase: "typing",
    }
  )
  const elementRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(elementRef as RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  const wordsToAnimate = useMemo(
    () => words ?? (children ? [children] : []),
    [words, children]
  )
  const hasMultipleWords = wordsToAnimate.length > 1

  const typingSpeed = typeSpeed ?? duration
  const deletingSpeed = deleteSpeed ?? typingSpeed / 2

  const shouldStart = startOnView ? isInView : true
  const animationSourceKey = useMemo(
    () => (words ? words.join("\u0000") : (children ?? "")),
    [words, children]
  )

  useEffect(() => {
    if (prefersReducedMotion) return
    dispatch({ type: "reset" })
  }, [animationSourceKey, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return
    let timeout: ReturnType<typeof setTimeout> | null = null

    if (shouldStart && wordsToAnimate.length > 0) {
      const timeoutDelay =
        delay > 0 && state.displayedText === ""
          ? delay
          : state.phase === "typing"
            ? typingSpeed
            : state.phase === "deleting"
              ? deletingSpeed
              : pauseDelay

      timeout = setTimeout(() => {
        const currentWord = wordsToAnimate[state.currentWordIndex] || ""
        const graphemes = Array.from(currentWord)

        switch (state.phase) {
          case "typing":
            if (state.currentCharIndex < graphemes.length) {
              dispatch({
                type: "setDisplayedText",
                value: graphemes.slice(0, state.currentCharIndex + 1).join(""),
              })
              dispatch({
                type: "setCurrentCharIndex",
                value: state.currentCharIndex + 1,
              })
            } else {
              if (hasMultipleWords || loop) {
                const isLastWord =
                  state.currentWordIndex === wordsToAnimate.length - 1
                if (!isLastWord || loop) {
                  dispatch({ type: "setPhase", value: "pause" })
                }
              }
            }
            break

          case "pause":
            dispatch({ type: "setPhase", value: "deleting" })
            break

          case "deleting":
            if (state.currentCharIndex > 0) {
              dispatch({
                type: "setDisplayedText",
                value: graphemes.slice(0, state.currentCharIndex - 1).join(""),
              })
              dispatch({
                type: "setCurrentCharIndex",
                value: state.currentCharIndex - 1,
              })
            } else {
              const nextIndex =
                (state.currentWordIndex + 1) % wordsToAnimate.length
              dispatch({ type: "setCurrentWordIndex", value: nextIndex })
              dispatch({ type: "setPhase", value: "typing" })
            }
            break
        }
      }, timeoutDelay)
    }

    return () => {
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [
    shouldStart,
    state.phase,
    state.currentCharIndex,
    state.currentWordIndex,
    state.displayedText,
    wordsToAnimate,
    hasMultipleWords,
    loop,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    delay,
    prefersReducedMotion,
  ])

  const currentWordGraphemes = Array.from(
    wordsToAnimate[state.currentWordIndex] || ""
  )
  const isComplete =
    !loop &&
    state.currentWordIndex === wordsToAnimate.length - 1 &&
    state.currentCharIndex >= currentWordGraphemes.length &&
    state.phase !== "deleting"

  const shouldShowCursor =
    showCursor &&
    !prefersReducedMotion &&
    !isComplete &&
    (hasMultipleWords || loop || state.currentCharIndex < currentWordGraphemes.length)

  const getCursorChar = () => {
    switch (cursorStyle) {
      case "block":
        return "▌"
      case "underscore":
        return "_"
      case "line":
      default:
        return "|"
    }
  }

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        "leading-20 tracking-[-0.02em]",
        Component === "span" && "inline-block",
        className
      )}
      {...props}
    >
      {prefersReducedMotion ? wordsToAnimate[0] ?? "" : state.displayedText}
      {shouldShowCursor && (
        <span
          className={cn("inline-block", blinkCursor && "animate-blink-cursor")}
        >
          {getCursorChar()}
        </span>
      )}
    </MotionComponent>
  )
}
