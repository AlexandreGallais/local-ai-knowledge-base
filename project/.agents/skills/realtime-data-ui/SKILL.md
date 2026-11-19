---
name: realtime-data-ui
description: "Displays real-time data streams in a UI without freezing it - WebSocket or SSE, throttling and debouncing, batching, incremental rendering, reconnection. Use when a screen shows live values (simulation, telemetry, logs, prices), when the UI lags under a stream of updates, or when adding a WebSocket or EventSource client."
metadata:
  id: FE-05
  stars: "3"
  nature: reference
  mode: A
  wave: V2
  load: auto
---

# Real-time data UI

**Core rule:** decouple the data rate from the render rate: buffer incoming messages and render at most once per animation frame.

## Procedure

1. Measure the incoming rate and the message size (count per second in a test or a log).
   - Check: you know messages per second and bytes per message.
2. Keep the latest state in a store outside the components; incoming messages update the store only.
   - Check: no component re-renders per message.
3. Render from the store at most once per frame (`requestAnimationFrame`) or at a fixed rate (throttle, e.g. 10 per second for numbers people read).
   - Check: render count per second stays at or under the chosen rate under load.
4. Render incrementally: update the changed rows or points only; virtualise long lists; drop points beyond the visible window.
   - Check: memory stays flat over a 10-minute run.
5. Handle the connection: reconnect with backoff, show a "disconnected" state, resubscribe, and mark stale data.
   - Check: killing the server shows the state; restarting it resumes the stream.
6. Clean up on unmount: close the socket, cancel frames and timers.
   - Check: no listener or timer left after leaving the page (browser memory tools or a test).

| Technique | Use for |
| --- | --- |
| Throttle | continuous values shown to a person (gauges, counters) |
| Debounce | user input that triggers work (search box) |
| Batching | many messages per frame applied in one store update |
| Virtualisation | lists or tables over a few hundred rows |

## Stop and ask the human if

- The required refresh rate or the acceptable staleness is not specified.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Set state on every message." | Hundreds of renders per second freeze the page. |
| "The socket never drops." | It does; plan the reconnect and the stale state. |

## Definition of done

- [ ] Render rate capped; store updated per message, rendered per frame.
- [ ] Reconnect, stale state and cleanup tested.
