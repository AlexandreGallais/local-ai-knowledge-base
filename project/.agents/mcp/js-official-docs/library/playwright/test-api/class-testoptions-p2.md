---
title: "class: TestOptions (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-api/class-testoptions.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: TestOptions (part 2 of 2)

## property: TestOptions.storageState = %%-js-python-context-option-storage-state-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    storageState: 'storage-state.json',
  },
});
```

**Details**

When storage state is set up in the config, it is possible to reset storage state for a file:

```js
import { test } from '@playwright/test';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test('not signed in test', async ({ page }) => {
  // ...
});
```

## property: TestOptions.testIdAttribute
* since: v1.27

Custom attribute to be used in [`method: Page.getByTestId`]. `data-testid` is used by default. To match
elements with any of several attributes, pass them as a comma-separated list.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'pw-test-id',
  },
});
```

Multiple attributes:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-pw,data-ti',
  },
});
```

## property: TestOptions.timezoneId = %%-context-option-timezoneid-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    timezoneId: 'Europe/Rome',
  },
});
```

## property: TestOptions.trace
* since: v1.10
- type: "TraceMode" <[Object]|"off"|"on"|"on-first-retry"|"on-all-retries"|"retain-on-failure"|"retain-on-first-failure"|"retain-on-failure-and-retries">
  - `mode` "TraceMode" <"off"|"on"|"retain-on-failure"|"on-first-retry"|"on-all-retries"|"retain-on-first-failure"|"retain-on-failure-and-retries"> Trace recording mode.
  - `attachments` ?<[boolean]> Whether to include test attachments. Defaults to true. Optional.
  - `screenshots` ?<[boolean]> Whether to capture screenshots during tracing. Screenshots are used to build a timeline preview. Defaults to true. Optional.
  - `snapshots` ?<[boolean]|[Object]> Which snapshots to capture on every action. Passing `true` is a shortcut for `{ dom: true }`. Defaults to true. Optional.
    - `dom` ?<[boolean]> Capture DOM snapshot on every action and record network activity. Optional.
    - `aria` ?<[boolean]> Capture aria snapshot of the page on every action. Optional.
    - `screen` ?<[boolean]> Capture a screenshot of the page on every action. Optional.
  - `sources` ?<[boolean]> Whether to include source files for trace actions. Defaults to true. Optional.

Whether to record trace for each test. Defaults to `'off'`. The initial run of a test is the "first run"; subsequent runs caused by retries are "retries".
* `'off'`: Do not record trace.
* `'on'`: Record and keep a trace for every run.
* `'on-first-retry'`: Record and keep a trace only for the first retry of a test.
* `'on-all-retries'`: Record and keep a trace for every retry.
* `'retain-on-failure'`: Record a trace for every run, but keep it only for runs that failed. A failed run's trace is kept even when a later retry passes.
* `'retain-on-first-failure'`: Record a trace only for the first run of a test (not for retries), and keep it only if that run failed.
* `'retain-on-failure-and-retries'`: Record a trace for every run, and keep it for any run that failed or that is a retry.

See trace modes for a side-by-side comparison of what each mode records and keeps.

For more control, pass an object that specifies `mode` and trace features to enable.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    trace: 'on-first-retry'
  },
});
```

Learn more about recording trace.

## property: TestOptions.userAgent = %%-context-option-useragent-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    userAgent: 'some custom ua',
  },
});
```

## property: TestOptions.video
* since: v1.10
- type: "VideoMode" <[Object]|"off"|"on"|"retain-on-failure"|"on-first-retry"|"on-all-retries"|"retain-on-first-failure"|"retain-on-failure-and-retries">
  - `mode` "VideoMode" <"off"|"on"|"retain-on-failure"|"on-first-retry"|"on-all-retries"|"retain-on-first-failure"|"retain-on-failure-and-retries"> Video recording mode.
  - `size` ?<[Object]> Size of the recorded video. Optional.
    - `width` <[int]>
    - `height` <[int]>
  - `fps` ?<[int]> Frame rate of the recorded video in frames per second. Defaults to `25`.
  - `show` ?<[Object]> If specified, visually annotates the video with test information and action highlights.
    - `actions` ?<[Object]> Controls visual annotations on interacted elements.
      - `duration` ?<[float]> How long each annotation is displayed in milliseconds. Defaults to `500`.
      - `position` "AnnotatePosition" ?<"top-left"|"top"|"top-right"|"bottom-left"|"bottom"|"bottom-right"> Position of the action title overlay. Defaults to `"top-right"`.
      - `fontSize` ?<[int]> Font size of the action title in pixels. Defaults to `24`. Deprecated, use `style.title` instead.
      - `cursor` "ScreencastCursor" ?<"none"|"pointer"> Cursor decoration shown for pointer actions. `"pointer"` (the default) renders a mouse pointer that animates from the previous action point to the next one. `"none"` disables the cursor decoration.
      - `style` ?<[Object]> Styles of the action decorations.
        - `point` ?<[string]> CSS declarations for the zero-sized marker centered on the action point. Not shown when omitted.
        - `highlight` ?<[string]> CSS declarations for the box that covers the target element. Not shown when omitted.
        - `title` ?<[string]> CSS declarations for the action title.
    - `test` ?<[Object]> Controls test information displayed as a status overlay in the video.
      - `level` "TestAnnotationLevel" ?<"file"|"title"|"step"> Level of the detail to include about the current test.
      - `position` "AnnotatePosition" ?<"top-left"|"top"|"top-right"|"bottom-left"|"bottom"|"bottom-right"> Position of the test information overlay. Defaults to `"top-left"`.
      - `fontSize` ?<[int]> Font size of the test information in pixels. Defaults to `14`.

Whether to record video for each test. Defaults to `'off'`. The initial run of a test is the "first run"; subsequent runs caused by retries are "retries".
* `'off'`: Do not record video.
* `'on'`: Record and keep a video for every run.
* `'on-first-retry'`: Record and keep a video only for the first retry of a test.
* `'on-all-retries'`: Record and keep a video for every retry.
* `'retain-on-failure'`: Record a video for every run, but keep it only for runs that failed. A failed run's video is kept even when a later retry passes.
* `'retain-on-first-failure'`: Record a video only for the first run of a test (not for retries), and keep it only if that run failed.
* `'retain-on-failure-and-retries'`: Record a video for every run, and keep it for any run that failed or that is a retry.

See video modes for a side-by-side comparison of what each mode records and keeps.

To control video size, pass an object with `mode` and `size` properties. If video size is not specified, it will be equal to [`property: TestOptions.viewport`] scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual picture of each page will be scaled down if necessary to fit the specified size.

To record smoother video of animations and scrolling, pass `fps`, for example `{ mode: 'on', size: { width: 1920, height: 1080 }, fps: 60 }`. Higher frame rates and sizes use more CPU for encoding. Firefox and WebKit currently capture up to 25 frames per second.

To annotate actions in the video, pass `show` with `actions` and/or `test` sub-options. The `actions` option controls visual highlights on interacted elements, each shown for an optional `duration` in milliseconds (defaults to `500`). The `test` option controls which test information is displayed as a status overlay.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    video: 'on-first-retry',
  },
});
```

Learn more about recording video.

## property: TestOptions.viewport = %%-context-option-viewport-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    viewport: { width: 100, height: 100 },
  },
});
```

## property: TestOptions.serviceWorkers = %%-context-option-service-worker-policy-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    serviceWorkers: 'allow'
  },
});
```
