export interface FrameSequenceConfig {
  totalFrames: number;
  framePrefix: string;
  frameExtension: string;
  padDigits: number;
}

export interface ScrollProgressState {
  progress: number;
  currentFrame: number;
  isPinned: boolean;
}

export interface FrameStyle {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  weight: string;
  tag: string;
  image: string;
  accentColor: string;
  features: string[];
}

export interface TechSpecGroup {
  category: string;
  specs: { label: string; value: string; detail?: string }[];
}
