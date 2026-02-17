import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { ISourceOptions } from '@tsparticles/engine';

const particleOptions: ISourceOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
      onClick: { enable: true, mode: 'push' },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.4 } },
      push: { quantity: 2 },
    },
  },
  particles: {
    color: { value: ['#7c3aed', '#a855f7', '#c084fc'] },
    links: {
      color: '#7c3aed',
      distance: 130,
      enable: true,
      opacity: 0.12,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: { default: 'bounce' },
      random: true,
      speed: 0.5,
      straight: false,
    },
    number: { density: { enable: true, width: 900 }, value: 70 },
    opacity: { value: { min: 0.2, max: 0.6 } },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

export default function HeroParticles() {
  const prefersReduced = useReducedMotion();
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, [prefersReduced]);

  if (prefersReduced || !engineReady) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 -z-10"
      options={particleOptions}
    />
  );
}
