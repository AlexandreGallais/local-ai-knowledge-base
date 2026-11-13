// Typed reading of JSON whose shape is not known in advance: every access checks its type.
export type JsonObject = Record<string, unknown>;

export function object(value: unknown): JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value as JsonObject : {};
}

export function list(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function number(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

export function string(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

// A path of keys: at(node, 'meta', 'ux', 'uid').
export function at(value: unknown, ...keys: string[]): unknown {
  let current = value;

  for (const key of keys) {
    current = object(current)[key];
  }
  return current;
}
