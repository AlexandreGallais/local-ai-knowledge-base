---
title: "Clock (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/clock.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Clock (part 2 of 2)

## Tick through time manually, firing all the timers consistently

In rare cases, you may want to tick through time manually, firing all timers and
animation frames in the process to achieve a fine-grained control over the passage of time.

```html
<div id="current-time" data-testid="current-time"></div>
<script>
  const renderTime = () => {
    document.getElementById('current-time').textContent =
        new Date().toLocaleString();
  };
  setInterval(renderTime, 1000);
</script>
```

```js
// Initialize clock with a specific time, let the page load naturally.
await page.clock.install({ time: new Date('2024-02-02T08:00:00') });
await page.goto('http://localhost:3333');

// Pause the time flow, stop the timers, you now have manual control
// over the page time.
await page.clock.pauseAt(new Date('2024-02-02T10:00:00'));
await expect(page.getByTestId('current-time')).toHaveText('2/2/2024, 10:00:00 AM');

// Tick through time manually, firing all timers in the process.
// In this case, time will be updated in the screen 2 times.
await page.clock.runFor(2000);
await expect(page.getByTestId('current-time')).toHaveText('2/2/2024, 10:00:02 AM');
```

```python
# Initialize clock with a specific time, let the page load naturally.
await page.clock.install(time=
    datetime.datetime(2024, 2, 2, 8, 0, 0, tzinfo=datetime.timezone.pst),
)
await page.goto("http://localhost:3333")
locator = page.get_by_test_id("current-time")

# Pause the time flow, stop the timers, you now have manual control
# over the page time.
await page.clock.pause_at(datetime.datetime(2024, 2, 2, 10, 0, 0))
await expect(locator).to_have_text("2/2/2024, 10:00:00 AM")

# Tick through time manually, firing all timers in the process.
# In this case, time will be updated in the screen 2 times.
await page.clock.run_for(2000)
await expect(locator).to_have_text("2/2/2024, 10:00:02 AM")
```

```python
# Initialize clock with a specific time, let the page load naturally.
page.clock.install(
    time=datetime.datetime(2024, 2, 2, 8, 0, 0, tzinfo=datetime.timezone.pst),
)
page.goto("http://localhost:3333")
locator = page.get_by_test_id("current-time")

# Pause the time flow, stop the timers, you now have manual control
# over the page time.
page.clock.pause_at(datetime.datetime(2024, 2, 2, 10, 0, 0))
expect(locator).to_have_text("2/2/2024, 10:00:00 AM")

# Tick through time manually, firing all timers in the process.
# In this case, time will be updated in the screen 2 times.
page.clock.run_for(2000)
expect(locator).to_have_text("2/2/2024, 10:00:02 AM")
```

```java
SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
// Initialize clock with a specific time, let the page load naturally.
page.clock().install(new Clock.InstallOptions()
    .setTime(format.parse("2024-02-02T08:00:00")));
page.navigate("http://localhost:3333");
Locator locator = page.getByTestId("current-time");

// Pause the time flow, stop the timers, you now have manual control
// over the page time.
page.clock().pauseAt(format.parse("2024-02-02T10:00:00"));
assertThat(locator).hasText("2/2/2024, 10:00:00 AM");

// Tick through time manually, firing all timers in the process.
// In this case, time will be updated in the screen 2 times.
page.clock().runFor(2000);
assertThat(locator).hasText("2/2/2024, 10:00:02 AM");
```

```csharp
// Initialize clock with a specific time, let the page load naturally.
await Page.Clock.InstallAsync(new()
{
  TimeDate = new DateTime(2024, 2, 2, 8, 0, 0, DateTimeKind.Pst)
});
await page.GotoAsync("http://localhost:3333");
var locator = page.GetByTestId("current-time");

// Pause the time flow, stop the timers, you now have manual control
// over the page time.
await Page.Clock.PauseAtAsync(new DateTime(2024, 2, 2, 10, 0, 0));
await Expect(locator).ToHaveTextAsync("2/2/2024, 10:00:00 AM");

// Tick through time manually, firing all timers in the process.
// In this case, time will be updated in the screen 2 times.
await Page.Clock.RunForAsync(2000);
await Expect(locator).ToHaveTextAsync("2/2/2024, 10:00:02 AM");
```

## Related Videos

<LiteYouTube
  id="54_aC-rVKHg"
  title="Playwright 1.45"
/>
