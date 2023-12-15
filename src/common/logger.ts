export const LOGGER = 'Logger';

export interface Logger {
  info(message: string): void;
  error(message: string): void;
}
