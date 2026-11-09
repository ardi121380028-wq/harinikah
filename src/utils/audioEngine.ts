// Web Audio API Sound Engine for Authentic Wedding Music Ambiance
// Generates soothing cultural music loops without external network dependencies

class WeddingAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: any = null;
  private currentTemplate: string = 'modern';
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Javanese Gamelan Scale (Slendro & Pelog harmonics)
  private playGamelanTone(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Warm bell tone with gentle harmonics
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Envelope: quick attack, long gentle metallic decay
    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(0.18, time + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Minang Saluang & Talempong (Gentle bamboo flute breath + brass chime)
  private playMinangTone(freq: number, time: number, duration: number, isTalempong = false) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    if (isTalempong) {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);
      noteGain.gain.setValueAtTime(0, time);
      noteGain.gain.linearRampToValueAtTime(0.12, time + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);
    } else {
      // Saluang breathy flute
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      noteGain.gain.setValueAtTime(0, time);
      noteGain.gain.linearRampToValueAtTime(0.14, time + 0.15);
      noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    }

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Modern Romance (Piano & Harp Arpeggio chords)
  private playPianoHarpTone(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(0.15, time + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(time);
    osc.stop(time + duration);
  }

  public play(template: 'modern' | 'jawa' | 'minang' = 'modern') {
    this.initContext();
    if (!this.ctx) return;

    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;
    this.currentTemplate = template;

    // Master volume with smooth ramp
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 1.5);
    this.gainNode.connect(this.ctx.destination);

    let step = 0;

    // Melody loops based on culture
    const loop = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;

      if (template === 'jawa') {
        // Gamelan Pelog/Slendro calming pentatonic scale: 1 (C4), 2 (D4), 3 (E4), 5 (G4), 6 (A4)
        const gamelanScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
        const note = gamelanScale[step % gamelanScale.length];
        this.playGamelanTone(note, now, 2.5);

        // Occasional deep gong resonance
        if (step % 4 === 0) {
          this.playGamelanTone(130.81, now, 4.0); // Low Gong C3
        }
      } else if (template === 'minang') {
        // Minang Saluang romantic mode: E4, F4, G#4, A4, B4, C5
        const saluangScale = [329.63, 349.23, 415.30, 440.00, 493.88, 523.25];
        const note = saluangScale[(step * 2) % saluangScale.length];
        this.playMinangTone(note, now, 2.2, false);

        // Talempong accompaniment chime
        if (step % 2 === 0) {
          this.playMinangTone(659.25, now + 0.3, 1.0, true);
        }
      } else {
        // Modern Romance (D major / Canon in D arpeggio: D4, F#4, A4, D5)
        const modernScale = [293.66, 369.99, 440.00, 587.33, 329.63, 392.00, 493.88];
        const note = modernScale[step % modernScale.length];
        this.playPianoHarpTone(note, now, 2.0);

        if (step % 3 === 0) {
          this.playPianoHarpTone(146.83, now, 3.0); // D3 root
        }
      }

      step++;
      this.timer = setTimeout(loop, 900);
    };

    loop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      } catch (e) {}
    }
  }

  public toggle(template: 'modern' | 'jawa' | 'minang' = 'modern'): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play(template);
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioEngine();

