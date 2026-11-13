---
title: "Testing with FakeTimeProvider"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/timeprovider-testing.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Testing with FakeTimeProvider

The 📦 `Microsoft.Extensions.TimeProvider.Testing` NuGet package provides a `FakeTimeProvider` class that enables deterministic testing of code that depends on time. This fake implementation allows you to control the system time within your tests, ensuring predictable and repeatable results.

## Why use FakeTimeProvider

Testing code that depends on the current time or uses timers can be challenging:

- **Non-deterministic tests**: Tests that depend on real time can produce inconsistent results.
- **Slow tests**: Tests that need to wait for actual time to pass can significantly slow down test execution.
- **Race conditions**: Time-dependent logic can introduce race conditions that are hard to reproduce.
- **Edge cases**: Testing time-based logic at specific times (such as midnight or month boundaries) is difficult with real time.

The `FakeTimeProvider` addresses these challenges by:

- Providing complete control over the current time.
- Allowing you to advance time instantly without waiting.
- Enabling deterministic testing of time-based behavior.
- Making it easy to test edge cases and boundary conditions.

## Get started

To get started with `FakeTimeProvider`, install the `Microsoft.Extensions.TimeProvider.Testing` NuGet package.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Extensions.TimeProvider.Testing
```

### PackageReference

```xml
<PackageReference Include="Microsoft.Extensions.TimeProvider.Testing" Version="10.0.0" />
```

---

For more information, see dotnet add package or Manage package dependencies in .NET applications.

## Basic usage

The `FakeTimeProvider` extends `System.TimeProvider` to provide controllable time for testing:

```csharp
var fakeTimeProvider = new FakeTimeProvider();

// Get the current time (defaults to January 1, 2000, midnight UTC).
Console.WriteLine($"Start time: {fakeTimeProvider.GetUtcNow()}");
```
## Initialize with specific time

You can initialize `FakeTimeProvider` with a specific starting time:

```csharp
DateTimeOffset startTime = new(2025, 10, 20, 12, 0, 0, TimeSpan.Zero);
fakeTimeProvider = new FakeTimeProvider(startTime);

Console.WriteLine($"Started at: {fakeTimeProvider.GetUtcNow()}");
```
## Advance time

The `Advance` method moves time forward by a specified duration:

```csharp
// Advance time by 30 minutes.
fakeTimeProvider.Advance(TimeSpan.FromMinutes(30));
Console.WriteLine($"After advancing 30 minutes: {fakeTimeProvider.GetUtcNow()}");
```
## Configure time zone

Set the local time zone for the fake time provider:

```csharp
var timeZoneId = OperatingSystem.IsWindows() ? "Pacific Standard Time" : "America/Los_Angeles";
var pacificTimeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
fakeTimeProvider.SetLocalTimeZone(pacificTimeZone);

var localTime = fakeTimeProvider.GetLocalNow();
Console.WriteLine($"Local time: {localTime}");
```
## Test delayed operations

`FakeTimeProvider` is particularly useful for testing operations that involve delays:

```csharp
public class DelayedOperationTests
{
    [Fact]
    public async Task DelayedOperation_CompletesAfterDelay()
    {
        // Arrange
        var fakeTimeProvider = new FakeTimeProvider();
        var operation = new DelayedOperation(fakeTimeProvider);

        // Act
        Task task = operation.ExecuteAsync(TimeSpan.FromMinutes(5));

        // Assert - operation should not be complete yet
        Assert.False(task.IsCompleted);

        // Advance time by 5 minutes
        fakeTimeProvider.Advance(TimeSpan.FromMinutes(5));

        // Wait for the task to complete
        await task;

        // Operation should now be complete
        Assert.True(task.IsCompleted);
    }
}

public class DelayedOperation(TimeProvider timeProvider)
{
    public async Task ExecuteAsync(TimeSpan delay)
    {
        await Task.Delay(delay, timeProvider);
    }
}
```
## Test periodic operations

Test operations that execute periodically using timers:

```csharp
public class PeriodicOperationTests
{
    [Fact]
    public void PeriodicOperation_ExecutesAtIntervals()
    {
        // Arrange
        var fakeTimeProvider = new FakeTimeProvider();
        var counter = new PeriodicCounter(fakeTimeProvider);
        counter.Start(TimeSpan.FromSeconds(10));

        // Act & Assert
        Assert.Equal(0, counter.Count);

        // Advance by 10 seconds
        fakeTimeProvider.Advance(TimeSpan.FromSeconds(10));
        Assert.Equal(1, counter.Count);

        // Advance by 20 more seconds
        fakeTimeProvider.Advance(TimeSpan.FromSeconds(20));
        Assert.Equal(3, counter.Count);

        // Clean up
        counter.Stop();
    }
}

public class PeriodicCounter(TimeProvider timeProvider)
{
    private ITimer? _timer;

    public int Count { get; private set; }

    public void Start(TimeSpan interval)
    {
        _timer = timeProvider.CreateTimer(
            callback: _ => Count++,
            state: null,
            dueTime: interval,
            period: interval);
    }

    public void Stop()
    {
        _timer?.Dispose();
    }
}
```
## Test time-based business logic

Test business logic that depends on specific times or dates:

```csharp
public class SubscriptionTests
{
    [Fact]
    public void Subscription_ExpiresAfterOneYear()
    {
        // Arrange
        var fakeTimeProvider = new FakeTimeProvider();
        var startDate = new DateTimeOffset(2025, 1, 1, 0, 0, 0, TimeSpan.Zero);
        fakeTimeProvider.SetUtcNow(startDate);

        var subscription = new Subscription(fakeTimeProvider);
        subscription.Activate();

        // Assert - subscription is active
        Assert.True(subscription.IsActive);

        // Act - advance time by 11 months
        fakeTimeProvider.Advance(TimeSpan.FromDays(30 * 11));
        Assert.True(subscription.IsActive);

        // Advance time by 2 more months
        fakeTimeProvider.Advance(TimeSpan.FromDays(60));
        Assert.False(subscription.IsActive);
    }
}

public class Subscription(TimeProvider timeProvider)
{
    private DateTimeOffset _activationDate;

    public void Activate()
    {
        _activationDate = timeProvider.GetUtcNow();
    }

    public bool IsActive
    {
        get
        {
            DateTimeOffset currentTime = timeProvider.GetUtcNow();
            DateTimeOffset expirationDate = _activationDate.AddYears(1);
            return currentTime < expirationDate;
        }
    }
}
```
## Integration with dependency injection

Use `FakeTimeProvider` in tests for services registered with dependency injection:

```csharp
public class CacheServiceTests
{
    [Fact]
    public void Cache_ExpiresAfterTimeout()
    {
        // Arrange
        var fakeTimeProvider = new FakeTimeProvider();

        var services = new ServiceCollection();
        services.AddSingleton<TimeProvider>(fakeTimeProvider);
        services.AddSingleton<CacheService>();

        ServiceProvider provider = services.BuildServiceProvider();
        CacheService cache = provider.GetRequiredService<CacheService>();

        // Act
        cache.Set("key", "value", TimeSpan.FromMinutes(10));

        // Assert - value is present
        Assert.True(cache.TryGet("key", out string? value));
        Assert.Equal("value", value);

        // Advance time beyond expiration
        fakeTimeProvider.Advance(TimeSpan.FromMinutes(11));

        // Value should be expired
        Assert.False(cache.TryGet("key", out _));
    }
}

public class CacheService(TimeProvider timeProvider)
{
    private readonly Dictionary<string, CacheEntry> _cache = [];

    public void Set(string key, string value, TimeSpan expiration)
    {
        DateTimeOffset expiresAt = timeProvider.GetUtcNow() + expiration;
        _cache[key] = new CacheEntry(value, expiresAt);
    }

    public bool TryGet(string key, out string? value)
    {
        if (_cache.TryGetValue(key, out CacheEntry? entry))
        {
            if (timeProvider.GetUtcNow() < entry.ExpiresAt)
            {
                value = entry.Value;
                return true;
            }

            // Entry expired, remove it
            _cache.Remove(key);
        }

        value = null;
        return false;
    }

    private record CacheEntry(string Value, DateTimeOffset ExpiresAt);
}
```
## Best practices

When using `FakeTimeProvider`, consider the following best practices:

- **Inject TimeProvider**: Always inject `TimeProvider` as a dependency rather than using `System.DateTime` or `System.DateTimeOffset` directly. This makes your code testable.
- **Use UTC time**: Work with UTC time in your business logic and convert to local time only when needed for display.
- **Test edge cases**: Use `FakeTimeProvider` to test edge cases like midnight, month boundaries, daylight saving time transitions, and leap years.
- **Clean up timers**: Dispose of timers created with `CreateTimer` to avoid resource leaks in your tests.
- **Advance time deliberately**: Advance time explicitly in your tests to make the test behavior clear and predictable.
- **Avoid mixing real and fake time**: Don't mix real `TimeProvider.System` with `FakeTimeProvider` in the same test, as this can lead to unpredictable behavior.

## See also

- `System.TimeProvider`
- Unit testing in .NET
- Dependency injection in .NET
