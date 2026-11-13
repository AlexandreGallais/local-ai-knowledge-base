---
id: svg-class-tests
title: Test a TypeScript class that drives SVG
topic: angular-testing
summary: Test the classes that animate synoptic symbols, with a simulated DOM, a fake clock, and a real browser for geometry.
tool: vitest
version: "5.1"
checked: 2026-11-13
sources: [S42, S65, S66, S69, S70, S71]
license: MIT, written for this base from the sources below
---

# Test a TypeScript class that drives SVG

Contents: 1. Where to run the test · 2. Rules · 3. Example · Sources

## 1. Where to run the test (simulated DOM or real browser)

| Environment | `getBBox`, `getCTM`, `getScreenCTM` | Layout | Sources |
| --- | --- | --- | --- |
| jsdom | Not declared: calling one throws a `TypeError` | None | [S69] [S70] |
| happy-dom | Declared, but return an empty `DOMRect` and an identity `DOMMatrix` | Not computed | [S71] |
| Browser mode of Vitest (Playwright) | The real values | Real | [S66] |

- A test that reads attributes, classes, text or calls: simulated DOM.
- A test that needs geometry: pass the geometry to the class as a parameter, or run that test in the browser mode (`ng test --browsers chromium`) in a file of its own. [S42]
- Never assert a geometry in a simulated DOM: under happy-dom, the test passes on zeros.

## 2. Rules (SVG class tests)

- Keep the computation of the shown state a pure function, and test it without any DOM.
- Create the SVG nodes in the test as the code does: `document.createElementNS` with the SVG namespace.
- Time: `vi.useFakeTimers()`, then `vi.advanceTimersToNextFrame()` for one `requestAnimationFrame` step, or `vi.advanceTimersByTime(ms)` for a blink; `vi.useRealTimers()` in `afterEach`. [S65]
- Check the effect on the node (attribute, class, `data-*` value), not the calls inside the class.
- Call `dispose()` of the class in `afterEach`, and check that no timer is left: `vi.getTimerCount()` is 0.

## 3. Example (a valve symbol class)

```ts
describe('ValveSymbol', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('marks the symbol closed, then flashes an unacknowledged alarm at 1 Hz', () => {
    vi.useFakeTimers();
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const symbol = new ValveSymbol(group);

    symbol.update({ positionState: 'closed', alarmState: 'unacknowledged' });
    expect(group.dataset['position']).toBe('closed');
    expect(group.classList.contains('is-flashing-on')).toBe(true);

    vi.advanceTimersByTime(500);
    expect(group.classList.contains('is-flashing-on')).toBe(false);

    symbol.dispose();
    expect(vi.getTimerCount()).toBe(0);
  });
});
```

The expected values come from the synoptic rules of the base: the state by a data attribute and a word, the flash at 1 Hz until acknowledged.

## Sources

- [S42] Angular, "Testing", v22.2.6, <https://angular.dev/guide/testing>, read 2026-11-13, CC BY 4.0, summarized.
- [S65] Vitest, "Vi" API reference, v5.1.0, <https://vitest.dev/api/vi>, read 2026-11-13, summarized.
- [S66] Vitest, "Browser Mode" guide, v5.1.0, <https://vitest.dev/guide/browser/>, read 2026-11-13, summarized.
- [S69] jsdom, README of the repository, <https://github.com/jsdom/jsdom>, read 2026-11-13, MIT, summarized.
- [S70] jsdom, `SVGGraphicsElement.webidl`, <https://github.com/jsdom/jsdom/blob/main/lib/jsdom/living/nodes/SVGGraphicsElement.webidl>, read 2026-11-13, MIT, summarized.
- [S71] happy-dom, `SVGGraphicsElement.ts`, <https://github.com/capricorn86/happy-dom/blob/master/packages/happy-dom/src/nodes/svg-graphics-element/SVGGraphicsElement.ts>, read 2026-11-13, summarized.
