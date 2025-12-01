export interface MousePosition {
  x: number;
  y: number;
}

export interface PixelConfig {
  gap: number;
  speed: number;
  color: string;
}

export enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}