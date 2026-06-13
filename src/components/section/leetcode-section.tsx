"use client";

import { useEffect, useState } from "react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Progress } from "@/components/ui/progress";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Code2, Trophy, Target, Calendar, Flame, AlertCircle } from "lucide-react";
import Link from "next/link";
import { PointerHighlight } from "../ui/pointer-highlight";
import RocketBlast from "../ascii/rocket-blast";
import { TerminalAnimationDemo } from "../ui/terminal-demo";

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  contestRating: number;
  totalActiveDays: number;
  maxStreak: number;
}

// Your actual stats from LeetCode profile
const FALLBACK_STATS: LeetCodeStats = {
  totalSolved: 167,
  easySolved: 69,
  mediumSolved: 85,
  hardSolved: 13,
  acceptanceRate: 62.5,
  ranking: 319113,
  contestRating: 1527,
  totalActiveDays: 62,
  maxStreak: 7,
};

const LEETCODE_USERNAME = "Priyanshu05134";
const LEETCODE_CACHE_KEY = "leetcode:stats:v1";
const LEETCODE_CACHE_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

type StatsSource = "live" | "cache" | "fallback";

function isLeetCodeStats(value: unknown): value is LeetCodeStats {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const numberFields: Array<keyof LeetCodeStats> = [
    "totalSolved",
    "easySolved",
    "mediumSolved",
    "hardSolved",
    "acceptanceRate",
    "ranking",
    "contestRating",
    "totalActiveDays",
    "maxStreak",
  ];
  return numberFields.every((k) => typeof v[k] === "number" && Number.isFinite(v[k] as number));
}

function readCachedStats(): { stats: LeetCodeStats; fetchedAt: number } | null {
  try {
    const raw = localStorage.getItem(LEETCODE_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { stats?: unknown; fetchedAt?: unknown };
    if (!parsed || typeof parsed !== "object") return null;
    if (!isLeetCodeStats(parsed.stats)) return null;
    if (typeof parsed.fetchedAt !== "number" || !Number.isFinite(parsed.fetchedAt)) return null;
    return { stats: parsed.stats, fetchedAt: parsed.fetchedAt };
  } catch {
    return null;
  }
}

function writeCachedStats(stats: LeetCodeStats) {
  try {
    localStorage.setItem(
      LEETCODE_CACHE_KEY,
      JSON.stringify({ stats, fetchedAt: Date.now() })
    );
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
}

export default function LeetCodeSection() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [source, setSource] = useState<StatsSource>("live");

  useEffect(() => {
    let cancelled = false;

    const cached = readCachedStats();
    if (cached) {
      setStats(cached.stats);
      setSource("cache");
      setLoading(false);
    }

    const fetchLeetCodeStats = async () => {
      try {
        // Try multiple CORS proxies as fallbacks
        const apis = [
          `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`,
          `https://cors-anywhere.herokuapp.com/https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`,
          `https://api.allorigins.win/raw?url=https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`,
        ];
        
        let data = null;
        for (const api of apis) {
          try {
            const response = await fetch(api);
            if (response.ok) {
              data = await response.json();
              break;
            }
          } catch (e) {
            continue;
          }
        }
        
        if (data && data.status === "success") {
          const nextStats: LeetCodeStats = {
            totalSolved: data.totalSolved || FALLBACK_STATS.totalSolved,
            easySolved: data.easySolved || FALLBACK_STATS.easySolved,
            mediumSolved: data.mediumSolved || FALLBACK_STATS.mediumSolved,
            hardSolved: data.hardSolved || FALLBACK_STATS.hardSolved,
            acceptanceRate: data.acceptanceRate || FALLBACK_STATS.acceptanceRate,
            ranking: data.ranking || FALLBACK_STATS.ranking,
            contestRating: data.contestRating || FALLBACK_STATS.contestRating,
            totalActiveDays: data.totalActiveDays || FALLBACK_STATS.totalActiveDays,
            maxStreak: data.maxStreak || FALLBACK_STATS.maxStreak,
          };

          if (cancelled) return;
          setStats(nextStats);
          setSource("live");
          writeCachedStats(nextStats);
          setError(false);
        } else {
          if (cancelled) return;
          // If we already rendered cached stats, keep them; otherwise fall back.
          if (!cached) {
            setStats(FALLBACK_STATS);
            setSource("fallback");
          }
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
        if (cancelled) return;
        if (!cached) {
          setStats(FALLBACK_STATS);
          setSource("fallback");
        }
        setError(true);
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    };

    const cacheIsFresh = cached ? Date.now() - cached.fetchedAt < LEETCODE_CACHE_TTL_MS : false;
    if (!cacheIsFresh) {
      fetchLeetCodeStats();
    } else {
      // Fresh cache: no network call, no loading spinner.
      setError(false);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[240px] sm:min-h-[400px] flex-col gap-y-8 w-full">
        <div className="text-center py-12">
          <div className="animate-pulse">Loading LeetCode stats...</div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const easyProgress = (stats.easySolved / 940) * 100;
  const mediumProgress = (stats.mediumSolved / 2048) * 100;
  const hardProgress = (stats.hardSolved / 927) * 100;
  const totalProgress = (stats.totalSolved / 3915) * 100;

  return (
    <>
      <div
        className="flex min-h-0 flex-col gap-y-8 w-full relative group overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <BorderBeam size={300} duration={10} />
        </div>
        
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-primary/50 via-95% to-transparent" />
            <div className="border bg-primary/10 backdrop-blur-sm z-10 rounded-xl px-4 py-1 flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              <span className="text-primary text-sm font-medium">DSA Journey</span>
              <span className="text-primary/60 text-xs">(LeetCode)</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-primary/50 via-95% to-transparent" />
          </div>

          {/* Error Warning (if API failed) */}
         

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-3">
              Problem Solver
            </h2>
            
            <div className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Passionate about Data Structures &amp; Algorithms.{" "}
              <PointerHighlight
                rectangleClassName="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 leading-loose rounded-md px-1"
                pointerClassName="text-green-500 h-4 w-4"
                containerClassName="inline-block mx-0.5"
              >
                <span className="relative z-10">
                  Solved{" "}
                  <span className="font-bold text-primary">
                    <NumberTicker value={stats.totalSolved} />
                  </span>{" "}
                  problems
                </span>
              </PointerHighlight>{" "}
              on LeetCode and counting...
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl border bg-card/50 backdrop-blur-sm text-center hover:bg-card/60 transition-all duration-300">
            <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold">
              <NumberTicker value={stats.contestRating} />
            </div>
            <p className="text-xs text-muted-foreground">Contest Rating</p>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl border bg-card/50 backdrop-blur-sm text-center hover:bg-card/60 transition-all duration-300">
            <Target className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold">
              <NumberTicker value={Math.round(stats.acceptanceRate)} />%
            </div>
            <p className="text-xs text-muted-foreground">Acceptance Rate</p>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl border bg-card/50 backdrop-blur-sm text-center hover:bg-card/60 transition-all duration-300">
            <Calendar className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold">
              <NumberTicker value={stats.totalActiveDays} />
            </div>
            <p className="text-xs text-muted-foreground">Active Days</p>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl border bg-card/50 backdrop-blur-sm text-center hover:bg-card/60 transition-all duration-300">
            <Flame className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold">
              <NumberTicker value={stats.maxStreak} />
            </div>
            <p className="text-xs text-muted-foreground">Max Streak</p>
          </div>
        </div>

        {/* Problem Progress */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Progress</span>
              <span>{stats.totalSolved} / 3915</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </div>
          
          <div className="grid gap-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-green-600 dark:text-green-400">Easy</span>
                <span>{stats.easySolved} / 940</span>
              </div>
              <Progress value={easyProgress} className="h-1.5 bg-green-200 dark:bg-green-900" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-yellow-600 dark:text-yellow-400">Medium</span>
                <span>{stats.mediumSolved} / 2048</span>
              </div>
              <Progress value={mediumProgress} className="h-1.5 bg-yellow-200 dark:bg-yellow-900" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-red-600 dark:text-red-400">Hard</span>
                <span>{stats.hardSolved} / 927</span>
              </div>
              <Progress value={hardProgress} className="h-1.5 bg-red-200 dark:bg-red-900" />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-4">
          <Link href="https://leetcode.com/u/Priyanshu05134/" target="_blank">
            <ShimmerButton className="mx-auto gap-2 w-full sm:w-auto justify-center">
              <Code2 className="h-4 w-4" />
              View LeetCode Profile
              <span>→</span>
            </ShimmerButton>
          </Link>
        </div>
      </div>
      
      {/* Terminal Animation Demo Component */}
      <TerminalAnimationDemo />
    </>
  );
}