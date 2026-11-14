---
title: "Trace viewer (part 1 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/trace-viewer.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

import LiteYouTube from '@site/src/components/LiteYouTube';

## Introduction

Playwright Trace Viewer is a GUI tool that helps you explore recorded Playwright traces after the script has run. Traces are a great way for debugging your tests when they fail on CI. You can open traces locally or in your browser on trace.playwright.dev.

######
* langs: js

<LiteYouTube
    id="yP6AnTxC34s"
    title="Viewing Playwright Traces"
/>

## Opening Trace Viewer

You can open a saved trace using either the Playwright CLI or in the browser at trace.playwright.dev. Make sure to add the full path to where your `trace.zip` file is located.

```bash
npx playwright show-trace path/to/trace.zip
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="show-trace trace.zip"
```

```bash
playwright show-trace trace.zip
```

```bash
pwsh bin/Debug/netX/playwright.ps1 show-trace trace.zip
```

### Using trace.playwright.dev

trace.playwright.dev is a statically hosted variant of the Trace Viewer. You can upload a trace file using drag and drop or via the `Select file` button.

Trace Viewer loads the trace entirely in your browser and does not transmit any data externally.

### Viewing remote traces

You can open remote traces directly using its URL. This makes it easy to view the remote trace without having to manually download the file from CI runs, for example.

```bash
npx playwright show-trace https://example.com/trace.zip
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="show-trace https://example.com/trace.zip"
```

```bash
playwright show-trace https://example.com/trace.zip
```

```bash
pwsh bin/Debug/netX/playwright.ps1 show-trace https://example.com/trace.zip
```

When using trace.playwright.dev, you can also pass the URL of your uploaded trace at some accessible storage (e.g. inside your CI) as a query parameter. CORS (Cross-Origin Resource Sharing) rules might apply.

```txt
https://trace.playwright.dev/?trace=https://demo.playwright.dev/reports/todomvc/data/e6099cadf79aa753d5500aa9508f9d1dbd87b5ee.zip
```

## Recording a trace
* langs: js

### Tracing locally
* langs: js

To record a trace during development mode set the `--trace` flag to `on` when running your tests. You can also use UI Mode for a better developer experience, as it traces each test automatically.

```bash
npx playwright test --trace on
```

You can then open the HTML report and click on the trace icon to open the trace.
```bash
npx playwright show-report
```
### Tracing on CI
* langs: js

Traces should be run on continuous integration on the first retry of a failed test
by setting the `trace: 'on-first-retry'` option in the test configuration file. This will produce a `trace.zip` file for each test that was retried.

```js
import { defineConfig } from '@playwright/test';
export default defineConfig({
  retries: 1,
  use: {
    trace: 'on-first-retry',
  },
});
```

```js
const browser = await chromium.launch();
const context = await browser.newContext();

// Start tracing before creating / navigating a page.
await context.tracing.start({ screenshots: true, snapshots: true });

const page = await context.newPage();
await page.goto('https://playwright.dev');

// Stop tracing and export it into a zip archive.
await context.tracing.stop({ path: 'trace.zip' });
```

Available options to record a trace:
- `'on-first-retry'` - Record a trace only when retrying a test for the first time.
- `'on-all-retries'` - Record traces for all test retries.
- `'off'` - Do not record a trace.
- `'on'` - Record a trace for each test. (not recommended as it's performance heavy)
- `'retain-on-failure'` - Record a trace for each test, but remove it from successful test runs.

You can also use `trace: 'retain-on-failure'` if you do not enable retries but still want traces for failed tests.

There are more granular options available, see [`property: TestOptions.trace`].

If you are not using Playwright as a Test Runner, use the [`property: BrowserContext.tracing`] API instead.

## Recording a trace
* langs: python

Traces can be recorded by running your tests with the `--tracing` flag.

```bash
pytest --tracing on
```
Options for tracing are:
- `on`: Record trace for each test
- `off`: Do not record trace. (default)
- `retain-on-failure`: Record trace for each test, but remove all traces from successful test runs.

This will record the trace and place it into the file named `trace.zip` in your `test-results` directory.

**If you are not using Pytest, click here to learn how to record traces.**

```python
browser = await chromium.launch()
context = await browser.new_context()

# Start tracing before creating / navigating a page.
await context.tracing.start(screenshots=True, snapshots=True, sources=True)

page = await context.new_page()
await page.goto("https://playwright.dev")

# Stop tracing and export it into a zip archive.
await context.tracing.stop(path = "trace.zip")
```

```python
browser = chromium.launch()
context = browser.new_context()

# Start tracing before creating / navigating a page.
context.tracing.start(screenshots=True, snapshots=True, sources=True)

page = context.new_page()
page.goto("https://playwright.dev")

# Stop tracing and export it into a zip archive.
context.tracing.stop(path = "trace.zip")
```

## Recording a trace
* langs: java

Traces can be recorded using the [`property: BrowserContext.tracing`] API as follows:

```java
Browser browser = browserType.launch();
BrowserContext context = browser.newContext();

// Start tracing before creating / navigating a page.
context.tracing().start(new Tracing.StartOptions()
  .setScreenshots(true)
  .setSnapshots(true)
  .setSources(true));

Page page = context.newPage();
page.navigate("https://playwright.dev");

// Stop tracing and export it into a zip archive.
context.tracing().stop(new Tracing.StopOptions()
  .setPath(Paths.get("trace.zip")));
```

This will record the trace and place it into the file named `trace.zip`.

## Recording a trace
* langs: csharp

Traces can be recorded using the [`property: BrowserContext.tracing`] API as follows:

<Tabs
  groupId="test-runners"
  defaultValue="mstest"
  values={[
    {label: 'MSTest', value: 'mstest'},
    {label: 'NUnit', value: 'nunit'},
    {label: 'xUnit', value: 'xunit'},
    {label: 'xUnit v3', value: 'xunit-v3'},
  ]
}>
<TabItem value="nunit">

```csharp
namespace PlaywrightTests;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class Tests : PageTest
{
    [SetUp]
    public async Task Setup()
    {
        await Context.Tracing.StartAsync(new()
        {
            Title = TestContext.CurrentContext.Test.ClassName + "." + TestContext.CurrentContext.Test.Name,
            Screenshots = true,
            Snapshots = true,
            Sources = true
        });
    }

    [TearDown]
    public async Task TearDown()
    {
        // This will produce e.g.:
        // bin/Debug/net8.0/playwright-traces/PlaywrightTests.Tests.Test1.zip
        await Context.Tracing.StopAsync(new()
        {
            Path = Path.Combine(
                TestContext.CurrentContext.WorkDirectory,
                "playwright-traces",
                $"{TestContext.CurrentContext.Test.ClassName}.{TestContext.CurrentContext.Test.Name}.zip"
            )
        });
    }

    [Test]
    public async Task TestYourOnlineShop()
    {
        // ..
    }
}
```

</TabItem>
<TabItem value="mstest">

```csharp
using System.Text.RegularExpressions;
using Microsoft.Playwright;
using Microsoft.Playwright.MSTest;

namespace PlaywrightTestsMSTest;

[TestClass]
public class UnitTest1 : PageTest
{
    [TestInitialize]
    public async Task TestInitialize()
    {
         await Context.Tracing.StartAsync(new()
        {
            Title = TestContext.TestName,
            Screenshots = true,
            Snapshots = true,
            Sources = true
        });
    }

    [TestCleanup]
    public async Task TestCleanup()
    {
        // This will produce e.g.:
        // bin/Debug/net8.0/playwright-traces/PlaywrightTests.UnitTest1.zip
        await Context.Tracing.StopAsync(new()
        {
            Path = Path.Combine(
                Environment.CurrentDirectory,
                "playwright-traces",
                $"{TestContext.FullyQualifiedTestClassName}.zip"
            )
        });
    }

    [TestMethod]
    public async Task TestYourOnlineShop()
    {
        // ...
    }
}
```

</TabItem>
<TabItem value="xunit">

```csharp
using System.Reflection;
using Microsoft.Playwright;
using Microsoft.Playwright.Xunit;
using Xunit.Sdk;

namespace PlaywrightTests;

[WithTestName]
public class UnitTest1 : PageTest
{
    public override async Task InitializeAsync()
    {
        await base.InitializeAsync().ConfigureAwait(false);
        await Context.Tracing.StartAsync(new()
        {
            Title = $"{WithTestNameAttribute.CurrentClassName}.{WithTestNameAttribute.CurrentTestName}",
            Screenshots = true,
            Snapshots = true,
            Sources = true
        });
    }

    public override async Task DisposeAsync()
    {
        await Context.Tracing.StopAsync(new()
        {
            Path = Path.Combine(
                Environment.CurrentDirectory,
                "playwright-traces",
               $"{WithTestNameAttribute.CurrentClassName}.{WithTestNameAttribute.CurrentTestName}.zip"
            )
        });
        await base.DisposeAsync().ConfigureAwait(false);
    }

    [Fact]
    public async Task GetStartedLink()
    {
        // ...
        await Page.GotoAsync("https://playwright.dev/dotnet/docs/intro");
    }
}

public class WithTestNameAttribute : BeforeAfterTestAttribute
{
    public static string CurrentTestName = string.Empty;
    public static string CurrentClassName = string.Empty;

    public override void Before(MethodInfo methodInfo)
    {
        CurrentTestName = methodInfo.Name;
        CurrentClassName = methodInfo.DeclaringType!.Name;
    }

    public override void After(MethodInfo methodInfo)
    {
    }
}
```

</TabItem>
<TabItem value="xunit-v3">

```csharp
using System.Reflection;
using Microsoft.Playwright;
using Microsoft.Playwright.Xunit.v3;
using Xunit.Sdk;

namespace PlaywrightTests;

[WithTestName]
public class UnitTest1 : PageTest
{
    public override async Task InitializeAsync()
    {
        await base.InitializeAsync().ConfigureAwait(false);
        await Context.Tracing.StartAsync(new()
        {
            Title = $"{WithTestNameAttribute.CurrentClassName}.{WithTestNameAttribute.CurrentTestName}",
            Screenshots = true,
            Snapshots = true,
            Sources = true
        });
    }

    public override async Task DisposeAsync()
    {
        await Context.Tracing.StopAsync(new()
        {
            Path = Path.Combine(
                Environment.CurrentDirectory,
                "playwright-traces",
               $"{WithTestNameAttribute.CurrentClassName}.{WithTestNameAttribute.CurrentTestName}.zip"
            )
        });
        await base.DisposeAsync().ConfigureAwait(false);
    }

    [Fact]
    public async Task GetStartedLink()
    {
        // ...
        await Page.GotoAsync("https://playwright.dev/dotnet/docs/intro");
    }
}

public class WithTestNameAttribute : BeforeAfterTestAttribute
{
    public static string CurrentTestName = string.Empty;
    public static string CurrentClassName = string.Empty;

    public override void Before(MethodInfo methodInfo)
    {
        CurrentTestName = methodInfo.Name;
        CurrentClassName = methodInfo.DeclaringType!.Name;
    }

    public override void After(MethodInfo methodInfo)
    {
    }
}
```

</TabItem>
</Tabs>

This will record the trace and place it into the `bin/Debug/net8.0/playwright-traces/` directory.
