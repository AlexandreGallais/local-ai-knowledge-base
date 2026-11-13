---
id: synoptics-symbol-component
title: Symbol component
topic: synoptics
summary: How to code a reusable SVG symbol, with typed inputs, data attributes, CSS variables and one flash clock.
tool: none
version: "none"
checked: 2026-11-12
sources: [S2, S14, S32, S33, S34]
license: MIT (own words; guides are cited by reference, never copied)
variant: files
---

# Symbol component

Contents: 1. Structure · 2. Inputs and view function · 3. Markup · 4. Styles · 5. Flash clock · 6. Pitfalls · 7. Final check · Sources

## 1. Structure (symbol component)

- One symbol is one pure function: the same inputs always give the same picture.
- The symbol reads no data by itself. It starts no timer. It keeps no state.
- The inputs carry states and values. They never carry a colour.
- The function turns the inputs into `data-*` attributes, one state word and one accessible name.
- The styles choose the fill, the pattern and the badge from the `data-*` attributes.
- Every colour comes from a CSS variable set on the view.
- Follow the document "Symbol property naming" for every input name.

## 2. Inputs and view function (symbol component)

```ts
export type PositionState = 'open' | 'closed' | 'opening' | 'closing' | 'intermediate' | 'unknown';
export type AlarmPriority = 'none' | 'caution' | 'warning' | 'alarm' | 'emergency';
export type AlarmState = 'normal' | 'unacknowledged' | 'acknowledged';

export interface ValveSymbolInputs {
  readonly tagName: string;
  readonly positionState: PositionState;
  readonly actualPositionPercent?: number;
  readonly alarmPriority: AlarmPriority;
  readonly alarmState: AlarmState;
  readonly isOutOfService: boolean;
}

export interface SymbolView {
  readonly attributes: Readonly<Record<string, string>>;
  readonly stateText: string;
  readonly badgeLetter: string;
  readonly isBadgeFlashing: boolean;
  readonly accessibleName: string;
}

const POSITION_TEXT: Readonly<Record<PositionState, string>> = {
  open: 'OPEN',
  closed: 'CLOSED',
  opening: 'OPENING',
  closing: 'CLOSING',
  intermediate: 'PARTIAL',
  unknown: '?',
};

const BADGE_LETTER: Readonly<Record<AlarmPriority, string>> = {
  none: '',
  caution: 'C',
  warning: 'W',
  alarm: 'A',
  emergency: 'E',
};

export function toValveView(inputs: ValveSymbolInputs): SymbolView {
  const stateText =
    inputs.positionState === 'intermediate' && inputs.actualPositionPercent !== undefined
      ? `${String(Math.round(inputs.actualPositionPercent))} %`
      : POSITION_TEXT[inputs.positionState];
  const hasAlert = inputs.alarmPriority !== 'none';
  const alarmText = hasAlert ? `, ${inputs.alarmPriority} ${inputs.alarmState}` : '';

  return {
    attributes: {
      'data-position': inputs.positionState,
      'data-alarm-priority': inputs.alarmPriority,
      'data-alarm-state': inputs.alarmState,
      'data-out-of-service': String(inputs.isOutOfService),
    },
    stateText,
    badgeLetter: BADGE_LETTER[inputs.alarmPriority],
    isBadgeFlashing: hasAlert && inputs.alarmState === 'unacknowledged',
    accessibleName: `Valve ${inputs.tagName}, ${stateText}${alarmText}`,
  };
}
```

- Write one such function per symbol type. Test it without a browser: give inputs, compare the result.
- Copy the template `templates/typescript-angular/synoptic-symbol.ts`; it passes the lint of the base.
- Use a `Record` keyed by the state type. The compiler then refuses a missing state.

## 3. Markup (symbol component)

Draw the symbol inline, in one `svg` element. Put the attributes of the view function on the root.

```html
<svg class="syn-symbol syn-valve" viewBox="0 0 64 80" role="img"
     aria-label="Valve V101, OPEN, warning unacknowledged"
     data-position="open" data-alarm-priority="warning" data-alarm-state="unacknowledged"
     data-out-of-service="false">
  <path class="syn-shape" d="M8 16 L32 32 L8 48 Z M56 16 L32 32 L56 48 Z" />
  <g class="syn-badge" transform="translate(44 0)">
    <path class="syn-badge-shape" d="M9 1 L17 17 L1 17 Z" />
    <text class="syn-badge-letter" x="9" y="15" text-anchor="middle">W</text>
  </g>
  <text class="syn-state" x="32" y="62" text-anchor="middle">OPEN</text>
  <text class="syn-tag" x="32" y="76" text-anchor="middle">V101</text>
</svg>
```

- Give every symbol type the same `viewBox` grid, so that symbols line up.
- Keep the same parts in the same order: shape, badge, state word, tag.
- Set `role="img"` and `aria-label` with the accessible name: type, tag, state word, alert. [S14]
- To rotate a symbol, rotate the shape only. Keep the texts horizontal. [S2]

Define the hatch pattern once per page:

```html
<svg width="0" height="0" aria-hidden="true">
  <defs>
    <pattern id="syn-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line class="syn-hatch-line" x1="0" y1="0" x2="0" y2="6" />
    </pattern>
  </defs>
</svg>
```

## 4. Styles (symbol component)

```css
.syn-view {
  --syn-bg: #d9d9d9;
  --syn-line: #333333;
  --syn-text: #1a1a1a;
  --syn-fill-active: #ffffff;
  --syn-fill-inactive: #595959;
  --syn-alert-alarm: #c4001a;
  --syn-alert-warning: #e07000;
  --syn-alert-caution: #f2d000;
  --syn-invalid: #7a1fa2;
  background: var(--syn-bg);
}
.syn-view[data-palette="night"] {
  --syn-bg: #1a1a1a;
  --syn-line: #b3b3b3;
  --syn-text: #e6e6e6;
  --syn-fill-active: #e6e6e6;
  --syn-fill-inactive: #6b6b6b;
  --syn-alert-alarm: #ff4d4d;
  --syn-alert-warning: #ff9a1f;
  --syn-alert-caution: #ffe14d;
  --syn-invalid: #d48cff;
}
.syn-shape { fill: var(--syn-fill-inactive); stroke: var(--syn-line); stroke-width: 2; }
.syn-hatch-line { stroke: var(--syn-line); stroke-width: 2; }
.syn-symbol[data-position="open"] .syn-shape,
.syn-symbol[data-position="intermediate"] .syn-shape { fill: var(--syn-fill-active); }
.syn-symbol[data-position="opening"] .syn-shape,
.syn-symbol[data-position="closing"] .syn-shape { fill: url(#syn-hatch); }
.syn-symbol[data-position="unknown"] .syn-shape { fill: none; stroke: var(--syn-invalid); stroke-dasharray: 4 3; }
.syn-state, .syn-tag { fill: var(--syn-text); font: 10px sans-serif; }
.syn-badge { display: none; }
.syn-symbol:not([data-alarm-priority="none"]) .syn-badge { display: inline; }
.syn-badge-shape { stroke: var(--syn-line); stroke-width: 1.5; }
.syn-symbol[data-alarm-priority="caution"] .syn-badge-shape { fill: var(--syn-alert-caution); }
.syn-symbol[data-alarm-priority="warning"] .syn-badge-shape { fill: var(--syn-alert-warning); }
.syn-symbol[data-alarm-priority="alarm"] .syn-badge-shape,
.syn-symbol[data-alarm-priority="emergency"] .syn-badge-shape { fill: var(--syn-alert-alarm); }
.syn-view[data-flash-phase="off"] .syn-symbol[data-alarm-state="unacknowledged"] .syn-badge { opacity: 0.25; }
@media (prefers-reduced-motion: reduce) {
  .syn-symbol[data-alarm-state="unacknowledged"] .syn-badge-shape { stroke-width: 4; }
}
```

- The closed valve keeps the dark default fill. The open valve takes the bright fill.
- The badge always has a border in the line colour.
- The night palette changes only the variables. No symbol changes.
- With reduced motion, the badge does not flash. Its border is thicker instead. [S14] [S32]

## 5. Flash clock (symbol component)

Start one clock per view. It sets `data-flash-phase` on the view root. All badges then flash in phase, at 1 Hz.

```ts
export function startFlashClock(root: HTMLElement, periodMs = 1000): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.dataset['flashPhase'] = 'on';
    return () => undefined;
  }
  let isOn = true;
  const timer = window.setInterval(() => {
    isOn = !isOn;
    root.dataset['flashPhase'] = isOn ? 'on' : 'off';
  }, periodMs / 2);
  return () => window.clearInterval(timer);
}
```

- Call the returned function when the view closes. It stops the clock.
- Never write a CSS animation inside a symbol. Two symbols would then flash out of phase.

## 6. Pitfalls (SVG symbol and use elements)

- A `symbol` element is never drawn by itself. Only a `use` element that points to it is drawn. [S34]
- A `use` element copies the shape into a tree that the page cannot reach. A style rule of the page does not select the parts of the copy. Only inherited properties get in. [S33]
- An attribute set inside the copied shape wins over the same attribute set on `use`. A `fill` on `use` has no effect when the shape already has a `fill`. [S33]
- `width` and `height` on `use` work only when the target is an `svg` or a `symbol` with a `viewBox`. [S33]
- A browser can refuse a `use` that points to a file from another origin. [S33]
- So: use `symbol` and `use` only for a part that never changes with the state. Draw every part that changes inline, as in section 3.
- The hatch does not show: check that the pattern with the id `syn-hatch` is in the same page.
- A graphic part needs a contrast of at least 3:1 with what touches it. Check each new colour in both palettes. [S14]

## 7. Final check (symbol component)

- Does the symbol take states and values only, and no colour?
- Is every colour a CSS variable?
- Is the state shown by a fill or a shape, and by a word?
- Does only the badge of an unacknowledged alarm or warning flash, from the view clock?
- Does the root have `role="img"` and an `aria-label` with the tag and the state word?

## Sources

- [S2] U.S. NRC, "Human-System Interface Design Review Guidelines", NUREG-0700 Rev. 3, 2020, sections 1.3.3 to 1.3.5 and 1.3.10, <https://www.nrc.gov/docs/ML2016/ML20162A214.pdf>, read 2026-11-12, U.S. federal publication, summarized.
- [S14] W3C, "Web Content Accessibility Guidelines (WCAG) 2.2", Recommendation of 2024-12-12, <https://www.w3.org/TR/WCAG22/>, read 2026-11-12, W3C Document License, summarized.
- [S32] MDN, "prefers-reduced-motion", <https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion>, read 2026-11-12, license not read, summarized.
- [S33] MDN, "use, SVG element", <https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/use>, read 2026-11-12, Creative Commons, summarized.
- [S34] MDN, "symbol, SVG element", <https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/symbol>, read 2026-11-12, Creative Commons, summarized.
