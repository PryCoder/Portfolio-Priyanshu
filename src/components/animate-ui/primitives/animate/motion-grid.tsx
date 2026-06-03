'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils';
import { getStrictContext } from '@/lib/get-strict-context';

type FrameDot = [number, number];
type Frame = FrameDot[];
type Frames = Frame[];

type MotionGridContextType = {
  index: number;
  cols: number;
  rows: number;
  frames: Frames;
  duration: number;
  animate: boolean;
};

const [MotionGridProvider, useMotionGrid] =
  getStrictContext<MotionGridContextType>('MotionGridContext');

interface MotionGridProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'ref'> {
  gridSize: [number, number];
  frames: Frames;
  duration?: number;
  animate?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
}

const MotionGrid = ({
  gridSize,
  frames,
  duration = 200,
  animate = true,
  asChild = false,
  style,
  children,
  ...props
}: MotionGridProps) => {
  const [index, setIndex] = React.useState(0);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!animate || frames.length === 0) return;
    intervalRef.current = setInterval(
      () => setIndex((i) => (i + 1) % frames.length),
      duration,
    );
    return () => clearInterval(intervalRef.current!);
  }, [frames.length, duration, animate]);

  const [cols, rows] = gridSize;

  const commonProps = {
    'data-animate': animate,
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gridAutoRows: '1fr',
      ...style,
    } as React.CSSProperties,
    ...props,
  };

  const contextValue = { animate, index, cols, rows, frames, duration };

  if (asChild) {
    return (
      <MotionGridProvider value={contextValue}>
        {React.isValidElement(children) 
          ? React.cloneElement(children as React.ReactElement, commonProps)
          : children}
      </MotionGridProvider>
    );
  }

  return (
    <MotionGridProvider value={contextValue}>
      <motion.div {...commonProps}>
        {children}
      </motion.div>
    </MotionGridProvider>
  );
};

interface MotionGridCellsProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'ref'> {
  activeProps?: Omit<HTMLMotionProps<'div'>, 'children' | 'ref'>;
  inactiveProps?: Omit<HTMLMotionProps<'div'>, 'children' | 'ref'>;
  className?: string;
  style?: React.CSSProperties;
}

function MotionGridCells({
  activeProps,
  inactiveProps,
  className,
  style,
  ...props
}: MotionGridCellsProps) {
  const { animate, index, cols, rows, frames, duration } = useMotionGrid();

  const active = new Set<number>(
    frames[index]?.map(([x, y]) => y * cols + x) ?? [],
  );

  return (
    <>
      {Array.from({ length: cols * rows }).map((_, i) => {
        const isActive = active.has(i);
        const activeStyle = isActive ? activeProps?.style : inactiveProps?.style;
        const activeClassName = isActive ? activeProps?.className : inactiveProps?.className;
        
        return (
          <motion.div
            key={i}
            data-active={isActive}
            data-animate={animate}
            transition={{ duration, ease: 'easeInOut' }}
            className={cn(className, activeClassName)}
            style={{ ...style, ...activeStyle }}
            {...props}
            {...(isActive ? activeProps : inactiveProps)}
          />
        );
      })}
    </>
  );
}

export {
  MotionGrid,
  MotionGridCells,
  type MotionGridProps,
  type MotionGridCellsProps,
  type FrameDot,
  type Frame,
  type Frames,
};