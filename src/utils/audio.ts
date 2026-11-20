// Apple & Linear-inspired Web Audio API Synthesizer
// Studio-calibrated acoustic tactile feedback, warm haptic micro-taps, and harmonious acoustic chords
// Zero external audio files required, zero latency, calibrated comfortable volume levels

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private lastScrollTime: number = 0;
  private lastCardFrictionTime: number = 0;
  private hasPlayedWelcome: boolean = false;

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
   * This listener detects the first interaction, resumes the context silently,
   * and plays a warm welcoming arrival chord.
   */
  public initAutoplayUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      const ctx = this.getContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().then(() => {
          if (!this.hasPlayedWelcome && this.enabled) {
            this.hasPlayedWelcome = true;
            this.playWelcome();
          }
        }).catch(() => {});
      } else if (ctx && !this.hasPlayedWelcome && this.enabled) {
        this.hasPlayedWelcome = true;
        this.playWelcome();
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
      this.playChime(523.25, 659.25, 783.99);
    }
    return this.enabled;
  }

  /**
   * Warm Welcome Arrival Chord (Diputar halus saat pertama kali pengunjung berinteraksi)
   * Referensi: Apple device wake-up & boutique studio arrival ambient chord
   */
  public playWelcome() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Warm A Major Triad: A4 (440Hz), C#5 (554.37Hz), E5 (659.25Hz)
      const chord = [440, 554.37, 659.25];
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, now);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        // Soft ambient swell and gentle bell decay
        gain.gain.setValueAtTime(0.0001, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.045, now + i * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.38);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.4);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Tactile Mechanical Click (Apple Trackpad / Lubricated mechanical switch "thock")
   * Referensi: Apple Magic Trackpad haptic feedback & Linear.app task toggle
   */
  public playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;

      // 1. Tactile click transient (lembut, tidak cempreng)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(580, t);
      filter.Q.setValueAtTime(1.6, t);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.024);

      gain.gain.setValueAtTime(0.10, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.024);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.026);

      // 2. Deep warm acoustic body thump (memberi bobot fisik saklar)
      const body = ctx.createOscillator();
      const bodyGain = ctx.createGain();
      body.type = 'sine';
      body.frequency.setValueAtTime(130, t);
      body.frequency.exponentialRampToValueAtTime(45, t + 0.032);

      bodyGain.gain.setValueAtTime(0.09, t);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.032);

      body.connect(bodyGain);
      bodyGain.connect(ctx.destination);

      body.start(t);
      body.stop(t + 0.035);
    } catch {
      // Audio autoplay policy catch
    }
  }

  /**
   * Velvet Card Friction / Surface Tilt (Sensasi gesekan halus saat kursor melintasi kartu 3D)
   * Referensi: Raycast card hover & kartu deck halus
   */
  public playCardFriction() {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.lastCardFrictionTime < 90) return;
    this.lastCardFrictionTime = now;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(460, t);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.032);

      gain.gain.setValueAtTime(0.035, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.032);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.035);
    } catch {
      // Ignore
    }
  }

  /**
   * Warm Haptic Micro-Tap (Hover tombol & tab)
   * Referensi: Apple Watch Digital Crown micro-tick & Linear.app navigation tap
   */
  public playHover() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(820, t);

      // Frekuensi rendah-menengah organik, tidak menusuk telinga
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(240, t + 0.016);

      gain.gain.setValueAtTime(0.042, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.016);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.018);
    } catch {
      // Ignore
    }
  }

  /**
   * Rotary Crown Wheel Tick on Scroll (Detent halus roda putar saat scroll)
   * Referensi: Leica camera dial detent & digital crown rotary click
   */
  public playScrollTick() {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.lastScrollTime < 115) return;
    this.lastScrollTime = now;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, t);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(150, t + 0.012);

      gain.gain.setValueAtTime(0.030, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.014);
    } catch {
      // Ignore
    }
  }

  /**
   * Harmonious Glass Pentatonic Bell Chime (Modal buka, inspeksi sertifikat, ganti tema)
   * Referensi: Apple Pay success chord & Stripe Press chapter transition chime
   */
  public playChime(freq1 = 523.25, freq2 = 659.25, freq3 = 783.99) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const chord = [freq1, freq2, freq3];
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, now);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.045);

        gain.gain.setValueAtTime(0.065, now + i * 0.045);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.045 + 0.28);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.045);
        osc.stop(now + i * 0.045 + 0.3);
      });
    } catch {
      // Ignore
    }
  }
}

export const sounds = new SoundEngine();
