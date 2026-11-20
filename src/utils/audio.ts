// Apple & Linear-inspired Web Audio API Synthesizer
// Zero external assets, instant zero-latency response, calibrated audible volume

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private lastScrollTime: number = 0;
  private lastCardFrictionTime: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sound_enabled');
      if (saved !== null) {
        this.enabled = saved === 'true';
      }
      this.initAutoplayUnlock();
    }
  }

  /**
   * Browser Autoplay Policy Handler:
   * Modern browsers require a user gesture (tap, click, keydown, scroll) to resume AudioContext.
   * This listener detects the first interaction and resumes the context silently.
   */
  public initAutoplayUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      const ctx = this.getContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('wheel', unlock);
      window.removeEventListener('scroll', unlock);
    };

    window.addEventListener('pointerdown', unlock, { passive: true, once: true });
    window.addEventListener('touchstart', unlock, { passive: true, once: true });
    window.addEventListener('keydown', unlock, { passive: true, once: true });
    window.addEventListener('wheel', unlock, { passive: true, once: true });
    window.addEventListener('scroll', unlock, { passive: true, once: true });
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound_enabled', String(this.enabled));
    }
    if (this.enabled) {
      this.playChime(680, 1020);
    }
    return this.enabled;
  }

  /**
   * Tactile Mechanical Click Sound (Punchy Apple trackpad / tactile switch click)
   */
  public playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;

      // High click transient
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, t);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.045);

      gain.gain.setValueAtTime(0.32, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.05);

      // Low mechanical pop body
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(220, t);
      sub.frequency.exponentialRampToValueAtTime(60, t + 0.035);
      subGain.gain.setValueAtTime(0.28, t);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

      sub.connect(subGain);
      subGain.connect(ctx.destination);

      sub.start(t);
      sub.stop(t + 0.04);
    } catch {
      // Audio autoplay policy catch
    }
  }

  /**
   * Tactile Card Friction / Shuffle Sound (Suara gesekan permukaan kartu saat di-hover)
   */
  public playCardFriction() {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.lastCardFrictionTime < 70) return;
    this.lastCardFrictionTime = now;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const duration = 0.065; // 65ms tactile friction sweep
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // White/pink texture noise burst
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.45));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.Q.setValueAtTime(2.2, t);
      // Downward frequency sweep simulating sliding friction across smooth glass/deck
      bandpass.frequency.setValueAtTime(1750, t);
      bandpass.frequency.exponentialRampToValueAtTime(420, t + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      // Add soft physical card displacement thump
      const cardThump = ctx.createOscillator();
      const thumpGain = ctx.createGain();
      cardThump.type = 'sine';
      cardThump.frequency.setValueAtTime(170, t);
      cardThump.frequency.exponentialRampToValueAtTime(65, t + 0.04);
      thumpGain.gain.setValueAtTime(0.2, t);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(ctx.destination);

      cardThump.connect(thumpGain);
      thumpGain.connect(ctx.destination);

      noise.start(t);
      cardThump.start(t);
      cardThump.stop(t + 0.045);
    } catch {
      // Ignore
    }
  }

  /**
   * Crisp button/pill hover tick
   */
  public playHover() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, t);
      osc.frequency.exponentialRampToValueAtTime(750, t + 0.02);

      gain.gain.setValueAtTime(0.14, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.025);
    } catch {
      // Ignore
    }
  }

  /**
   * Rotational crown tick on scroll (loud enough to hear cleanly, throttled)
   */
  public playScrollTick() {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.lastScrollTime < 95) return;
    this.lastScrollTime = now;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, t);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(850, t);
      osc.frequency.exponentialRampToValueAtTime(260, t + 0.018);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.022);
    } catch {
      // Ignore
    }
  }

  /**
   * Crystal chime for modal open, theme switch, or credential unlock
   */
  public playChime(freq1 = 560, freq2 = 920) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [freq1, freq2].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.065);

        gain.gain.setValueAtTime(0.22, now + i * 0.065);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.065 + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.065);
        osc.stop(now + i * 0.065 + 0.24);
      });
    } catch {
      // Ignore
    }
  }
}

export const sounds = new SoundEngine();
