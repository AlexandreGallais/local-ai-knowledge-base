// A valve of a circuit, as the server sends it. Invented example.
export interface Valve {
  readonly id: string;
  readonly isOpen: boolean;
}
