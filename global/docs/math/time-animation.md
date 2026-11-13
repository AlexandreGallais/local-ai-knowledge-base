---
id: time-animation
title: "Time and animation"
topic: math
summary: "The two clocks, durations, progress of an animation, requestAnimationFrame, the fixed time step."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S21, S22, S24]
license: MIT, written for this base; facts from the sources below
---

# Time and animation

Contents: Two clocks · Split and show a duration · Progress of an animation · requestAnimationFrame · Fixed time step · Sources

## 1. Two clocks

Formula: elapsed = performance.now() - start, in milliseconds.

Example: `performance.now()` returns a number with a fraction; `Date.now()` returns an integer.

Pitfall: `Date.now()` follows the system clock and can jump. Measure a duration with `performance.now()`. Use `Date` only for the time of day.

Sources: [S21] [E]

## 2. Split and show a duration

Formula: round once to milliseconds, then divide by 3600000, 60000 and 1000 with `Math.floor`.

Example: `splitDuration(3725.5)` gives 1 h, 2 min, 5 s, 500 ms. `formatDuration(3661)` gives `"01:01:01"`. `formatDuration(59.999)` gives `"00:00:59"`.

Pitfall: Do not round each part alone: 59.9996 s would show 60 seconds. `splitDuration(59.9996)` gives 1 min, 0 s.

Kit: `splitDuration` in `kit/math/split-duration.ts`. , `formatDuration`. Sources: [E]

## 3. Progress of an animation

Formula: progress = clamp((now - start) / duration, 0, 1). Then value = lerp(from, to, progress).

Example: `computeProgress(1000, 2000, 1500)` gives `0.25`.

Pitfall: Compute the value from the elapsed time, not from the number of frames.

Kit: `computeProgress` in `kit/math/compute-progress.ts`. Sources: [S22] [E]

## 4. requestAnimationFrame

Formula: the callback receives a timestamp in milliseconds. Ask again for each frame.

Example:

```ts
function step(timestampMs: number): void {
  const progress = computeProgress(startTimeMs, durationMs, timestampMs);
  draw(lerp(fromValue, toValue, progress));
  if (progress < 1) {
    requestAnimationFrame(step);
  }
}
```

Pitfall: Screens run at 60, 75, 120 or 144 Hz: a fixed move per frame runs faster on a fast screen. The callback stops in a hidden tab: the next frame can come seconds later.

Sources: [S22]

## 5. Fixed time step

Formula: total = left + min(frameTime, maximum). steps = floor(total / step). left = total - steps * step. alpha = left / step.

Example: `advanceFixedTimestep(0, 16, { stepMs: 10, maximumFrameTimeMs: 250 })` gives 1 step, 6 ms left, alpha 0.6.

Pitfall: Use a step in whole milliseconds: `0.3 / 0.1` gives `2.9999999999999996`, so 2 steps and not 3. Cap the frame time, or a long pause runs hundreds of steps at once.

Kit: `advanceFixedTimestep` in `kit/math/advance-fixed-timestep.ts`. Sources: [S24] [E]

## Sources

- [S21] MDN, 2025, "Performance: now() method", <https://developer.mozilla.org/en-US/docs/Web/API/Performance/now>.
- [S22] MDN, 2026, "Window: requestAnimationFrame() method", <https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame>.
- [S24] Fiedler G., 2004, "Fix Your Timestep!", <https://gafferongames.com/post/fix_your_timestep/>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
