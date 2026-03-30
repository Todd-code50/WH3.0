"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FRAMES,
  GROUPSETS,
  WHEELS,
  TYRES,
  FINISHING_KITS,
  CONFIG_STEPS,
  formatPrice,
  calcTotal,
  type BuildState,
  type BikeFrame,
  type ColorOption,
  type ComponentOption,
} from "./bikeData";
import FrameStep from "./steps/FrameStep";
import ColorStep from "./steps/ColorStep";
import GroupsetStep from "./steps/GroupsetStep";
import WheelsStep from "./steps/WheelsStep";
import TyresStep from "./steps/TyresStep";
import FinishingStep from "./steps/FinishingStep";
import SummaryStep from "./steps/SummaryStep";

const EMPTY_BUILD: BuildState = {
  frame: null,
  color: null,
  groupset: null,
  wheels: null,
  tyres: null,
  finishing: null,
};

export default function BikeConfigurator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [build, setBuild] = useState<BuildState>(EMPTY_BUILD);
  const [direction, setDirection] = useState<1 | -1>(1);

  const stepId = CONFIG_STEPS[currentStep].id;
  const total = calcTotal(build);

  // Determine which steps are "complete"
  const isStepComplete = (idx: number): boolean => {
    const id = CONFIG_STEPS[idx].id;
    if (id === "frame") return !!build.frame;
    if (id === "color") return !!build.color;
    if (id === "groupset") return !!build.groupset;
    if (id === "wheels") return !!build.wheels;
    if (id === "tyres") return !!build.tyres;
    if (id === "finishing") return !!build.finishing;
    if (id === "summary") return true;
    return false;
  };

  const canAdvance = (): boolean => {
    if (stepId === "frame") return !!build.frame;
    if (stepId === "color") return !!build.color;
    if (stepId === "groupset") return !!build.groupset;
    if (stepId === "wheels") return !!build.wheels;
    if (stepId === "tyres") return !!build.tyres;
    if (stepId === "finishing") return !!build.finishing;
    return false;
  };

  const goNext = () => {
    if (currentStep < CONFIG_STEPS.length - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  const goToStep = (idx: number) => {
    if (idx === currentStep) return;
    setDirection(idx > currentStep ? 1 : -1);
    setCurrentStep(idx);
  };

  const resetBuild = () => {
    setBuild(EMPTY_BUILD);
    setCurrentStep(0);
    setDirection(1);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-twh-dark flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>
      {/* ── TOP BAR ─────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-twh-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-twh-gold flex items-center justify-center">
            <span className="text-twh-dark font-bold text-lg leading-none">W</span>
          </div>
          <div>
            <p className="text-twh-gold text-[10px] tracking-widest uppercase leading-none">The</p>
            <p className="text-white text-base font-bold tracking-[0.2em] uppercase leading-tight">Wheelhouse</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/40 text-xs tracking-widest uppercase">Bike Configurator</p>
          <p className="text-twh-gold text-sm font-semibold tracking-wide mt-0.5">
            {build.frame ? `${build.frame.brand} ${build.frame.model}` : "Build Your Dream Bike"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-white/40 text-xs tracking-widest uppercase">Build Total</p>
          <p className="text-twh-gold text-xl font-bold tracking-wide">{formatPrice(total)}</p>
        </div>
      </header>

      {/* ── STEP PROGRESS ───────────────────────────────────────── */}
      <div className="px-8 py-4 border-b border-white/10 bg-twh-dark-light/50">
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {CONFIG_STEPS.map((step, idx) => {
            const complete = isStepComplete(idx);
            const active = idx === currentStep;
            const accessible = idx === 0 || isStepComplete(idx - 1) || idx <= currentStep;
            return (
              <button
                key={step.id}
                onClick={() => accessible && goToStep(idx)}
                disabled={!accessible}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                  active
                    ? "bg-twh-gold text-twh-dark font-bold"
                    : complete
                    ? "bg-twh-gold/20 text-twh-gold border border-twh-gold/40 hover:bg-twh-gold/30"
                    : accessible
                    ? "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                {complete && !active && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={stepId}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 overflow-y-auto"
          >
            {stepId === "frame" && (
              <FrameStep
                frames={FRAMES}
                selected={build.frame}
                onSelect={(frame: BikeFrame) => setBuild((b) => ({ ...b, frame, color: null }))}
              />
            )}
            {stepId === "color" && build.frame && (
              <ColorStep
                frame={build.frame}
                selected={build.color}
                onSelect={(color: ColorOption) => setBuild((b) => ({ ...b, color }))}
              />
            )}
            {stepId === "groupset" && (
              <GroupsetStep
                groupsets={GROUPSETS}
                selected={build.groupset}
                onSelect={(g: ComponentOption) => setBuild((b) => ({ ...b, groupset: g }))}
              />
            )}
            {stepId === "wheels" && (
              <WheelsStep
                wheels={WHEELS}
                selected={build.wheels}
                onSelect={(w: ComponentOption) => setBuild((b) => ({ ...b, wheels: w }))}
              />
            )}
            {stepId === "tyres" && (
              <TyresStep
                tyres={TYRES}
                selected={build.tyres}
                onSelect={(t: ComponentOption) => setBuild((b) => ({ ...b, tyres: t }))}
              />
            )}
            {stepId === "finishing" && (
              <FinishingStep
                kits={FINISHING_KITS}
                selected={build.finishing}
                onSelect={(f: ComponentOption) => setBuild((b) => ({ ...b, finishing: f }))}
              />
            )}
            {stepId === "summary" && (
              <SummaryStep build={build} total={total} onReset={resetBuild} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── BOTTOM NAV ──────────────────────────────────────────── */}
      {stepId !== "summary" && (
        <div className="px-8 py-5 border-t border-white/10 bg-twh-dark/95 backdrop-blur-md flex items-center justify-between sticky bottom-0 z-40">
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white/60 text-sm tracking-widest uppercase hover:border-white/40 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-2">
            {CONFIG_STEPS.slice(0, -1).map((_, idx) => (
              <div
                key={idx}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? "w-6 h-2 bg-twh-gold"
                    : isStepComplete(idx)
                    ? "w-2 h-2 bg-twh-gold/60"
                    : "w-2 h-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={!canAdvance()}
            className="flex items-center gap-2 px-8 py-3 bg-twh-gold text-twh-dark text-sm font-bold tracking-widest uppercase hover:bg-twh-gold-light transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {currentStep === CONFIG_STEPS.length - 2 ? "View Summary" : "Next"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
