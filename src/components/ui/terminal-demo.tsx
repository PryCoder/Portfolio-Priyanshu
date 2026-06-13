"use client";

import { cn } from "@/lib/utils";

import {
  TerminalAnimationBackgroundGradient,
  TerminalAnimationBlinkingCursor,
  TerminalAnimationCommandBar,
  TerminalAnimationContainer,
  TerminalAnimationContent,
  TerminalAnimationOutput,
  TerminalAnimationRoot,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationTrailingPrompt,
  TerminalAnimationWindow,
  type TabContent,
  type TerminalLine,
} from "../ui/terminal-animation";

export interface TerminalAnimationDemoProps {
  tabs?: TabContent[];
  backgroundImage?: string;
  alwaysDark?: boolean;
}

const backgroundImage = "/terminal-animation-bg-2.png";

const tabs: TabContent[] = [
  {
    label: "install",
    command: "pnpm add @repo/ui",
    lines: [
      { text: "", delay: 80 },
      {
        text: "Packages: +342 -12",
        color: "text-slate-500",
        delay: 200,
      },
      {
        text: "Progress: resolved 342, reused 298, downloaded 44, added 342, done",
        color: "text-emerald-400",
        delay: 400,
      },
      { text: "", delay: 80 },
      {
        text: "dependencies:",
        color: "text-slate-400",
        delay: 150,
      },
      {
        text: "+ @repo/ui 2.1.0",
        color: "text-cyan-400",
        delay: 100,
      },
      {
        text: "+ @radix-ui/react-dialog 1.1.2",
        color: "text-cyan-400",
        delay: 100,
      },
      {
        text: "+ @radix-ui/react-dropdown-menu 2.1.2",
        color: "text-cyan-400",
        delay: 100,
      },
      { text: "", delay: 80 },
      {
        text: "devDependencies:",
        color: "text-slate-400",
        delay: 150,
      },
      {
        text: "+ @types/node 20.11.24",
        color: "text-cyan-400",
        delay: 100,
      },
      {
        text: "+ typescript 5.4.2",
        color: "text-cyan-400",
        delay: 100,
      },
      { text: "", delay: 80 },
      {
        text: "Done in 2.8s",
        color: "text-green-400",
        delay: 200,
      },
    ],
  },
  {
    label: "build",
    command: "pnpm build",
    lines: [
      { text: "", delay: 80 },
      {
        text: "> build",
        color: "text-slate-500",
        delay: 150,
      },
      {
        text: "> tsc && next build",
        color: "text-slate-500",
        delay: 100,
      },
      { text: "", delay: 80 },
      {
        text: "▲ Next.js 15.1.0",
        color: "text-slate-300",
        delay: 200,
      },
      { text: "", delay: 80 },
      {
        text: "Creating an optimized production build ...",
        color: "text-slate-400",
        delay: 250,
      },
      {
        text: "✓ Compiled successfully",
        color: "text-emerald-400",
        delay: 200,
      },
      {
        text: "✓ Linting and checking validity of types",
        color: "text-emerald-400",
        delay: 180,
      },
      {
        text: "✓ Generating static pages (24/24)",
        color: "text-emerald-400",
        delay: 160,
      },
      { text: "", delay: 80 },
      {
        text: "├─ / (548ms)          2.8 kB        98.5 kB",
        color: "text-slate-300",
        delay: 100,
      },
      {
        text: "├─ /about (312ms)     1.6 kB        97.3 kB",
        color: "text-slate-300",
        delay: 100,
      },
      {
        text: "├─ /blog (423ms)      3.2 kB        99.1 kB",
        color: "text-slate-300",
        delay: 100,
      },
      {
        text: "└─ /dashboard (678ms) 5.4 kB       102 kB",
        color: "text-slate-300",
        delay: 100,
      },
      { text: "", delay: 80 },
      {
        text: "✓ Build completed in 4.2s",
        color: "text-green-400",
        delay: 200,
      },
    ],
  },
  {
    label: "deploy",
    command: "vercel deploy",
    lines: [
      { text: "", delay: 80 },
      {
        text: "Vercel CLI 39.2.0",
        color: "text-slate-400",
        delay: 150,
      },
      { text: "", delay: 80 },
      {
        text: "Deploying to production...",
        color: "text-purple-400",
        delay: 250,
      },
      { text: "", delay: 80 },
      {
        text: "Inspect: https://vercel.com/my-app/...",
        color: "text-cyan-400",
        delay: 200,
      },
      {
        text: "Preview: https://my-app-git-main.vercel.app",
        color: "text-cyan-400",
        delay: 200,
      },
      { text: "", delay: 80 },
      {
        text: "Building (22/22)",
        color: "text-slate-400",
        delay: 180,
      },
      {
        text: "✓ Build completed in 4.2s",
        color: "text-emerald-400",
        delay: 200,
      },
      { text: "", delay: 80 },
      {
        text: "Uploading (12 files)",
        color: "text-slate-400",
        delay: 150,
      },
      {
        text: "✓ Upload completed in 1.3s",
        color: "text-emerald-400",
        delay: 180,
      },
      { text: "", delay: 80 },
      {
        text: "Finalizing...",
        color: "text-slate-400",
        delay: 150,
      },
      {
        text: "✓ Deployment complete",
        color: "text-emerald-400",
        delay: 180,
      },
      { text: "", delay: 80 },
      {
        text: "Production: https://my-app.vercel.app",
        color: "text-cyan-400",
        delay: 250,
      },
    ],
  },
  {
    label: "test",
    command: "pnpm test",
    lines: [
      { text: "", delay: 80 },
      {
        text: "> test",
        color: "text-slate-500",
        delay: 150,
      },
      {
        text: "> vitest run",
        color: "text-slate-500",
        delay: 100,
      },
      { text: "", delay: 80 },
      {
        text: "RUN v2.1.0 /src",
        color: "text-slate-400",
        delay: 150,
      },
      { text: "", delay: 80 },
      {
        text: "✓ src/components/Button.test.tsx (12 tests) 8ms",
        color: "text-emerald-400",
        delay: 180,
      },
      {
        text: "✓ src/hooks/useAuth.test.ts (8 tests) 12ms",
        color: "text-emerald-400",
        delay: 160,
      },
      {
        text: "✓ src/utils/api.test.ts (15 tests) 15ms",
        color: "text-emerald-400",
        delay: 160,
      },
      {
        text: "✓ src/pages/dashboard.test.tsx (6 tests) 25ms",
        color: "text-emerald-400",
        delay: 160,
      },
      { text: "", delay: 80 },
      {
        text: "Test Files  4 passed (4)",
        color: "text-emerald-400",
        delay: 150,
      },
      {
        text: "Tests       41 passed (41)",
        color: "text-emerald-400",
        delay: 120,
      },
      {
        text: "Duration    1.24s",
        color: "text-slate-500",
        delay: 100,
      },
      { text: "", delay: 80 },
      {
        text: "Coverage:",
        color: "text-purple-400",
        delay: 150,
      },
      {
        text: "Statements  95.8%",
        color: "text-cyan-400",
        delay: 120,
      },
      {
        text: "Branches    92.3%",
        color: "text-cyan-400",
        delay: 120,
      },
      {
        text: "Functions   94.7%",
        color: "text-cyan-400",
        delay: 120,
      },
      {
        text: "Lines       96.2%",
        color: "text-cyan-400",
        delay: 120,
      },
      { text: "", delay: 80 },
      {
        text: "✓ All tests passed",
        color: "text-green-400",
        delay: 150,
      },
    ],
  },
];

export function TerminalAnimationDemo() {
  return (
    <TerminalAnimationRoot
      alwaysDark={true}
      backgroundImage={backgroundImage}
      className="relative flex w-full justify-center overflow-visible bg-background"
      defaultActiveTab={0}
      hideCursorOnComplete={false}
      tabs={tabs}
    >
      {!backgroundImage && <TerminalAnimationBackgroundGradient />}
      <TerminalAnimationContainer className="w-full max-w-[35rem]">
        <TerminalAnimationWindow className="outline-1 outline-white/20 outline-offset-[2px] h-[32rem]">
          <TerminalAnimationContent className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4">
            <div className="flex items-center gap-2 leading-relaxed">
              <span className="select-none font-mono text-emerald-400 text-sm">
                ➜
              </span>
              <TerminalAnimationCommandBar
                className="font-mono text-foreground text-sm"
                cursor={<TerminalAnimationBlinkingCursor />}
              />
            </div>

            <TerminalAnimationOutput
              className="mt-1"
              renderLine={(
                line: TerminalLine,
                _i: number,
                visible: boolean
              ) => {
                if (!visible) {
                  return null;
                }
                return (
                  <div className="leading-relaxed">
                    <span
                      className={cn(
                        "font-mono text-sm whitespace-pre-wrap break-words",
                        line.color ?? "text-muted-foreground"
                      )}
                    >
                      {line.text || "\u00A0"}
                    </span>
                  </div>
                );
              }}
            />
            <TerminalAnimationTrailingPrompt className="mt-1 flex items-center gap-2 leading-relaxed">
              <span className="select-none font-mono text-emerald-400 text-sm">
                ➜
              </span>
              <TerminalAnimationBlinkingCursor />
            </TerminalAnimationTrailingPrompt>
          </TerminalAnimationContent>

          <div className="flex justify-center pb-6">
            <TerminalAnimationTabList className="inline-flex items-center gap-0 rounded-lg border border-border bg-muted/50 px-1 py-1">
              {tabs.map((tab, i) => (
                <TerminalAnimationTabTrigger
                  className={cn(
                    "cursor-pointer rounded-md px-3.5 py-1 font-mono text-sm transition-all duration-150",
                    "data-[state=active]:bg-primary data-[state=active]:font-medium data-[state=active]:text-primary-foreground",
                    "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground"
                  )}
                  index={i}
                  key={tab.label}
                >
                  {tab.label}
                </TerminalAnimationTabTrigger>
              ))}
            </TerminalAnimationTabList>
          </div>
        </TerminalAnimationWindow>
      </TerminalAnimationContainer>
    </TerminalAnimationRoot>
  );
}