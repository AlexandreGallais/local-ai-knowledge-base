---
title: "Trace viewer (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/trace-viewer.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Trace viewer (part 2 of 2)

## Run trace only on failure
* langs: csharp

Setup your tests to record a trace only when the test fails:

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
public class ExampleTest : PageTest
{
    [SetUp]
    public async Task Setup()
    {
        await Context.Tracing.StartAsync(new()
        {
            Title = $"{TestContext.CurrentContext.Test.ClassName}.{TestContext.CurrentContext.Test.Name}",
            Screenshots = true,
            Snapshots = true,
            Sources = true
        });
    }

    [TearDown]
    public async Task TearDown()
    {
        var failed = TestContext.CurrentContext.Result.Outcome == NUnit.Framework.Interfaces.ResultState.Error
            || TestContext.CurrentContext.Result.Outcome == NUnit.Framework.Interfaces.ResultState.Failure;

        await Context.Tracing.StopAsync(new()
        {
            Path = failed ? Path.Combine(
                TestContext.CurrentContext.WorkDirectory,
                "playwright-traces",
                $"{TestContext.CurrentContext.Test.ClassName}.{TestContext.CurrentContext.Test.Name}.zip"
            ) : null,
        });
    }

    [Test]
    public async Task GetStartedLink()
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

namespace PlaywrightTests;

[TestClass]
public class ExampleTest : PageTest
{
    [TestInitialize]
    public async Task TestInitialize()
    {
         await Context.Tracing.StartAsync(new()
        {
            Title = $"{TestContext.FullyQualifiedTestClassName}.{TestContext.TestName}",
            Screenshots = true,
            Snapshots = true,
            Sources = true
        });
    }

    [TestCleanup]
    public async Task TestCleanup()
    {
        var failed = new[] { UnitTestOutcome.Failed, UnitTestOutcome.Error, UnitTestOutcome.Timeout, UnitTestOutcome.Aborted }.Contains(TestContext.CurrentTestOutcome);

        await Context.Tracing.StopAsync(new()
        {
            Path = failed ? Path.Combine(
                Environment.CurrentDirectory,
                "playwright-traces",
                $"{TestContext.FullyQualifiedTestClassName}.{TestContext.TestName}.zip"
            ) : null,
        });
    }

    [TestMethod]
    public async Task GetStartedLink()
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
            Path = !TestOk ? Path.Combine(
                Environment.CurrentDirectory,
                "playwright-traces",
               $"{WithTestNameAttribute.CurrentClassName}.{WithTestNameAttribute.CurrentTestName}.zip"
            ) : null
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
            Path = !TestOk ? Path.Combine(
                Environment.CurrentDirectory,
                "playwright-traces",
               $"{WithTestNameAttribute.CurrentClassName}.{WithTestNameAttribute.CurrentTestName}.zip"
            ) : null
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

## Trace Viewer features
### Actions

In the Actions tab you can see what locator was used for every action and how long each one took to run. Hover over each action of your test and visually see the change in the DOM snapshot. Go back and forward in time and click an action to inspect and debug. Use the Before and After tabs to visually see what happened before and after the action.

**Selecting each action reveals:**
- Action snapshots
- Action log
- Source code location

### Screenshots

When tracing with the [`option: Tracing.start.screenshots`] option turned on (default), each trace records a screencast and renders it as a film strip. You can hover over the film strip to see a magnified image of for each action and state which helps you easily find the action you want to inspect.

Double click on an action to see the time range for that action. You can use the slider in the timeline to increase the actions selected and these will be shown in the Actions tab and all console logs and network logs will be filtered to only show the logs for the actions selected.

### Snapshots

When tracing with the [`option: Tracing.start.snapshots`] option turned on (default), Playwright captures a set of complete DOM snapshots for each action. Depending on the type of the action, it will capture:

| Type | Description |
|------|-------------|
|Before|A snapshot at the time action is called.|
|Action|A snapshot at the moment of the performed input. This type of snapshot is especially useful when exploring where exactly Playwright clicked.|
|After|A snapshot after the action.|

Here is what the typical Action snapshot looks like:

Notice how it highlights both, the DOM Node as well as the exact click position.

### Source

When you click on an action in the sidebar, the line of code for that action is highlighted in the source panel.

### Call

The call tab shows you information about the action such as the time it took, what locator was used, if in strict mode and what key was used.

### Log

See a full log of your test to better understand what Playwright is doing behind the scenes such as scrolling into view, waiting for element to be visible, enabled and stable and performing actions such as click, fill, press etc.

### Errors

If your test fails you will see the error messages for each test in the Errors tab. The timeline will also show a red line highlighting where the error occurred. You can also click on the source tab to see on which line of the source code the error is.

### Console

See console logs from the browser as well as from your test. Different icons are displayed to show you if the console log came from the browser or from the test file.

Double click on an action from your test in the actions sidebar. This will filter the console to only show the logs that were made during that action. Click the *Show all* button to see all console logs again.

Use the timeline to filter actions, by clicking a start point and dragging to an ending point. The console tab will also be filtered to only show the logs that were made during the actions selected.

### Network

The Network tab shows you all the network requests that were made during your test. You can sort by different types of requests, status code, method, request, content type, duration and size. Click on a request to see more information about it such as the request headers, response headers, request body and response body.

Double click on an action from your test in the actions sidebar. This will filter the network requests to only show the requests that were made during that action. Click the *Show all* button to see all network requests again.

Use the timeline to filter actions, by clicking a start point and dragging to an ending point. The network tab will also be filtered to only show the network requests that were made during the actions selected.

### Metadata

Next to the Actions tab you will find the Metadata tab which will show you more information on your test such as the Browser, viewport size, test duration and more.

### Attachments
* langs: js

The "Attachments" tab allows you to explore attachments. If you're doing visual regression testing, you'll be able to compare screenshots by examining the image diff, the actual image and the expected image. When you click on the expected image you can use the slider to slide one image over the other so you can easily see the differences in your screenshots.
