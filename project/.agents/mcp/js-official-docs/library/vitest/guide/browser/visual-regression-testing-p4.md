---
title: "Visual Regression Testing (part 4 of 4)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/browser/visual-regression-testing.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Visual Regression Testing (part 4 of 4)

### Picking the right option

All approaches work. The real question is what pain points matter most to you and your team.

If you're comfortable with containerization, a self-hosted Docker setup gives you a controlled environment without any external dependencies or costs. The downside is maintenance as you own the setup, the browser versions, and any breakage.

CI runs work with any browser provider and give you full control, but screenshots can only be generated in CI. If someone runs `vitest --update` locally and commits the result, those references will likely fail on the next CI run. This is preventable by guarding the command behind a CI environment check.

A cloud service makes sense if you want developers to be able to run and update visual tests locally without risking mismatched references. It becomes even more useful when designers are involved in reviewing changes, or when the push-wait-check-fix-push cycle becomes a real bottleneck.

Still on the fence? Start with the CI workflow. You can always move to a container or cloud service later if it becomes a pain point.

## Going deeper

### How Vitest ensures screenshot stability

Visual regression tests rely on screenshots remaining stable across runs. In practice, pages are not instantly stable: images load asynchronously, animations finish at different times, fonts render, and layouts settle. To mitigate this, Vitest uses a "Stable Screenshot Detection" strategy:

1. It takes an initial screenshot (or uses the reference screenshot if available) as baseline
1. It takes another screenshot and compares it with the baseline
   - If the screenshots match, the page is stable and testing continues
   - If they differ, Vitest uses the newest screenshot as the baseline and repeats
1. This continues until stability is achieved or the timeout is reached

This ensures that transient visual changes (like loading spinners or animations) don't cause false positives. If something never stops animating, though, you'll hit the timeout, so consider disabling animations during testing.

If a stable screenshot is captured after one or more retries and a reference screenshot exists, Vitest performs a final comparison with the reference using `createDiff: true`. This will generate a diff image if they don't match.

During stability detection, Vitest calls comparators with `createDiff: false` since it only needs to know if screenshots match. This keeps the detection process fast.
