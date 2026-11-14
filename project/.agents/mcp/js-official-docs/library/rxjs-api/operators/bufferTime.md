# src/internal/operators/bufferTime

## bufferTime

```ts
export function bufferTime<T>(bufferTimeSpan: number, ...otherArgs: any[]): OperatorFunction<T, T[]>
```

Buffers the source Observable values for a specific time period.

<span class="informal">Collects values from the past as an array, and emits
those arrays periodically in time.</span>

![](bufferTime.png)

Buffers values from the source for a specific time duration `bufferTimeSpan`.
Unless the optional argument `bufferCreationInterval` is given, it emits and
resets the buffer every `bufferTimeSpan` milliseconds. If
`bufferCreationInterval` is given, this operator opens the buffer every
`bufferCreationInterval` milliseconds and closes (emits and resets) the
buffer every `bufferTimeSpan` milliseconds. When the optional argument
`maxBufferSize` is specified, the buffer will be closed either after
`bufferTimeSpan` milliseconds or when it contains `maxBufferSize` elements.

## Examples

Every second, emit an array of the recent click events

```ts
import { fromEvent, bufferTime } from 'rxjs';

const clicks = fromEvent(document, 'click');
const buffered = clicks.pipe(bufferTime(1000));
buffered.subscribe(x => console.log(x));
```

Every 5 seconds, emit the click events from the next 2 seconds

```ts
import { fromEvent, bufferTime } from 'rxjs';

const clicks = fromEvent(document, 'click');
const buffered = clicks.pipe(bufferTime(2000, 5000));
buffered.subscribe(x => console.log(x));
```

@see {@link buffer}
@see {@link bufferCount}
@see {@link bufferToggle}
@see {@link bufferWhen}
@see {@link windowTime}

@param bufferTimeSpan The amount of time to fill each buffer array.
@param otherArgs Other configuration arguments such as:
- `bufferCreationInterval` - the interval at which to start new buffers;
- `maxBufferSize` - the maximum buffer size;
- `scheduler` - the scheduler on which to schedule the intervals that determine buffer boundaries.
@return A function that returns an Observable of arrays of buffered values.