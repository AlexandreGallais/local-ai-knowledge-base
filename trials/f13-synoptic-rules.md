# F13 trial on the workstation

What to play on the workstation for the criterion of F13 that only a person can see. About 20
minutes.

## 1. Project

Use the Angular trial project of F8, with the base at its root.

## 2. The motorized valve symbol

In a new session, ask:

> Code the synoptic symbol of a motorized valve: its inputs, its view function and its SVG markup.
> It shows the commanded and the actual position, the control location and an alarm.

Expected:

- The AI opens `docs/synoptics/index.md`, then the three documents of the topic, and no other
  topic.
- Inputs follow the naming convention: `tagName`, `positionState`, `commandedPositionPercent`,
  `actualPositionPercent`, `controlLocation`, `alarmPriority`, `alarmState`, booleans in `is`,
  `has` or `can`.
- The view function is pure: no timer, no colour in the inputs; colours are CSS variables.
- The state is shown by a fill and a word, never by red and green; only the badge of an
  unacknowledged alert flashes, from one clock of the view.
- The AI runs `npm run fix`, `npm run check` and `npm run build`, and ends with zero errors.

## Results

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| Opened only the synoptics documents |  |  |
| Property names follow the convention |  |  |
| Pure view function, CSS variables |  |  |
| Fill and word, no red and green for the position |  |  |
| Lint and build at zero errors |  |  |
