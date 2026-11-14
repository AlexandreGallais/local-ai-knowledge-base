---
title: "Log buffering"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/logging/log-buffering.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Log buffering in .NET

.NET provides log buffering capabilities that allow you to delay the emission of logs until certain conditions are met. Log buffering is useful in scenarios where you want to:

- Collect all logs from a specific operation before deciding whether to emit them.
- Prevent logs from being emitted during normal operation, but emit them when errors occur.
- Optimize performance by reducing the number of logs written to storage.

Buffered logs are stored in temporary circular buffers in process memory, and the following conditions apply:

- If the buffer is full, the oldest logs are dropped and never emitted.
- If you want to emit the buffered logs, you can call `Microsoft.Extensions.Diagnostics.Buffering.LogBuffer.Flush` on the `Microsoft.Extensions.Diagnostics.Buffering.GlobalLogBuffer` or `Microsoft.Extensions.Diagnostics.Buffering.PerRequestLogBuffer` class.
- If you never flush the buffers, the buffered logs will eventually be dropped as the application runs, so it effectively behaves like those logs are disabled.

There are two buffering strategies available:

- Global buffering: Buffers logs across the entire application.
- Per-request buffering: Buffers logs for each individual HTTP request if available; otherwise, buffers to the global buffer.

> **Note:**
> Log buffering is available in .NET 9 and later versions.

Log buffering works with all logging providers. If a logging provider you use does not implement the `Microsoft.Extensions.Logging.Abstractions.IBufferedLogger` interface, log buffering will call log methods directly on each buffered log record when flushing the buffer.

Log buffering extends filtering capabilities by allowing you to capture and store logs temporarily. Rather than making an immediate emit-or-discard decision, buffering lets you hold logs in memory and decide later whether to emit them.

## Get started

To get started, install the 📦 Microsoft.Extensions.Telemetry NuGet package for global buffering.
Or, install the 📦 Microsoft.AspNetCore.Diagnostics.Middleware NuGet package for per-request buffering.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Extensions.Telemetry
dotnet add package Microsoft.AspNetCore.Diagnostics.Middleware
```

### PackageReference

```xml
<ItemGroup>
  <PackageReference Include="Microsoft.Extensions.Telemetry"
                    Version="*" />
  <PackageReference Include="Microsoft.AspNetCore.Diagnostics.Middleware"
                    Version="*" />
</ItemGroup>
```

---

For more information about adding packages, see dotnet add package or Manage package dependencies in .NET applications.

## Global buffering

Global buffering allows you to buffer logs across your entire application. You can configure which logs to buffer using filter rules, and then flush the buffer as needed to emit those logs.

### Simple configuration

To enable global buffering at or below a specific log level, specify that level:

```csharp
// Add the Global buffer to the logging pipeline.
hostBuilder.Logging.AddGlobalBuffer(LogLevel.Information);
```
The preceding configuration enables buffering logs with level `Microsoft.Extensions.Logging.LogLevel.Information` and below.

### File-based configuration

Create a configuration section in your _appsettings.json_, for example:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    },

    "GlobalLogBuffering": {
      "MaxBufferSizeInBytes": 104857600,
      "MaxLogRecordSizeInBytes": 51200,
      "AutoFlushDuration": "00:00:30",
      "Rules": [
        {
          "CategoryName": "BufferingDemo",
          "LogLevel": "Information"
        },
        {
          "EventId": 1001
        }
      ]
    }
  }
}
```
The preceding configuration:

- Buffers logs from categories starting with `BufferingDemo` with level `Microsoft.Extensions.Logging.LogLevel.Information` and below.
- Buffers all logs with event ID 1001.
- Sets the maximum buffer size to approximately 100 MB.
- Sets the maximum log record size to 50 KB.
- Sets an auto-flush duration of 30 seconds after manual flushing.

To register the log buffering with the configuration, consider the following code:

```csharp
// Add the Global buffer to the logging pipeline.
hostBuilder.Logging.AddGlobalBuffer(hostBuilder.Configuration.GetSection("Logging"));
```
### Inline code configuration

```csharp
// Add the Global buffer to the logging pipeline.
hostBuilder.Logging.AddGlobalBuffer(options =>
{
    options.MaxBufferSizeInBytes = 104857600; // 100 MB
    options.MaxLogRecordSizeInBytes = 51200; // 50 KB
    options.AutoFlushDuration = TimeSpan.FromSeconds(30);
    options.Rules.Add(new LogBufferingFilterRule(
        categoryName: "BufferingDemo",
        logLevel: LogLevel.Information));
    options.Rules.Add(new LogBufferingFilterRule(eventId: 1001));
});
```
The preceding configuration:

- Buffers logs from categories starting with `BufferingDemo` with level `Microsoft.Extensions.Logging.LogLevel.Information` and below.
- Buffers all logs with event ID 1001.
- Sets the maximum buffer size to approximately 100 MB.
- Sets the maximum log record size to 50 KB.
- Sets an auto-flush duration of 30 seconds after manual flushing.

### Flushing the buffer

To flush the buffered logs, inject the `GlobalLogBuffer` abstract class and call the `Flush()` method:

```cs
public class MyService
{
    private readonly GlobalLogBuffer _buffer;

    public MyService(GlobalLogBuffer buffer)
    {
        _buffer = buffer;
    }

    public void HandleException(Exception ex)
    {
        _buffer.Flush();

        // After flushing, log buffering will be temporarily suspended (= all logs will be emitted immediately)
        // for the duration specified by AutoFlushDuration.
    }
}
```
## Per-request buffering

Per-request buffering is specific to ASP.NET Core applications and allows you to buffer logs independently for each HTTP request. The
buffer for each respective request is created when the request starts and disposed when the request ends, so if you don't flush the buffer, the logs will be lost when the request ends. This way, it is useful to only flush buffers when you really need to, such as when an error occurs.

Per-request buffering is tightly coupled with global buffering. If a log entry is supposed to be buffered to a per-request buffer, but there is no active HTTP context at the moment
of buffering attempt, it will be buffered to the global buffer instead. If buffer flush is triggered, the per-request buffer will be flushed first, followed by the global buffer.

### Simple configuration

To buffer only logs at or below a specific log level:

```cs
builder.Logging.AddPerIncomingRequestBuffer(LogLevel.Information);
```
### File-based configuration

Create a configuration section in your _appsettings.json_:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.*": "None"
    },

    "PerIncomingRequestLogBuffering": {
      "AutoFlushDuration": "00:00:05",
      "Rules": [
        {
          "CategoryName": "PerRequestLogBufferingFileBased.*",
          "LogLevel": "Information"
        }
      ]
    }
  }
}
```
The preceding configuration:

- Buffers logs from categories starting with `PerRequestLogBufferingFileBased.` with level `Microsoft.Extensions.Logging.LogLevel.Information` and below.
- Sets an auto-flush duration of 5 seconds after manual flushing.

To register the log buffering with the configuration, consider the following code:

```cs
builder.Logging.AddPerIncomingRequestBuffer(builder.Configuration.GetSection("Logging"));
```
### Inline code configuration

```cs
builder.Logging.AddPerIncomingRequestBuffer(options =>
{
    options.AutoFlushDuration = TimeSpan.FromSeconds(5);
    options.Rules.Add(new Microsoft.Extensions.Diagnostics.Buffering.LogBufferingFilterRule("PerRequestLogBufferingCodeBased.*", LogLevel.Information));
});
```
The preceding configuration:

- Buffers logs from categories starting with `PerRequestLogBufferingFileBased.` with level `Microsoft.Extensions.Logging.LogLevel.Information` and below.
- Sets an auto-flush duration of 5 seconds after manual flushing.

### Flushing the per-request buffer

To flush the buffered logs for the current request, inject the `PerRequestLogBuffer` abstract class and call its `Flush()` method:

```cs
[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    private readonly ILogger<HomeController> _logger;
    private readonly PerRequestLogBuffer _buffer;

    public HomeController(ILogger<HomeController> logger, PerRequestLogBuffer buffer)
    {
        _logger = logger;
        _buffer = buffer;
    }

    [HttpGet("index/{id}")]
    public IActionResult Index(int id)
    {
        try
        {
            _logger.RequestStarted(id);

            // Simulate exception every 10th request
            if (id % 10 == 0)
            {
                throw new Exception("Simulated exception in controller");
            }

            _logger.RequestEnded(id);

            return Ok();
        }
        catch
        {
            _logger.ErrorMessage(id);
            _buffer.Flush();

            _logger.ExceptionHandlingFinished(id);

            return StatusCode(500, "An error occurred.");
        }
    }
}
```
> **Note:**
> Flushing the per-request buffer also flushes the global buffer.

## How buffering rules are applied

Log buffering rules evaluation is performed on each log record. The following algorithm is used for each log record:

1. If a log entry matches any rule, it is buffered instead of being emitted immediately.
1. If a log entry does not match any rule, it is emitted normally.
1. If the buffer size limit is reached, the oldest buffered log entries are dropped (not emitted!) to make room for new ones.
1. If a log entry size is greater than the maximum log record size, it will not be buffered and is emitted normally.

For each log record, the algorithm checks:

- If the log level matches (is equal to or lower than) the rule's log level.
- If the category name starts with the rule's `CategoryName` prefix.
- If the event ID matches the rule's `EventId`.
- If the event name matches the rule's `EventName`.
- If any attributes match the rule's `Attributes`.

### Change buffer filtering rules in a running app

Both global buffering and per-request buffering support runtime configuration updates via the `Microsoft.Extensions.Options.IOptionsMonitor`1` interface. If you're using a configuration provider that supports reloads—such as the File Configuration Provider—you can update filtering rules at runtime without restarting the application.

For example, you can start your application with the following _appsettings.json_, which enables log buffering for logs with the `Microsoft.Extensions.Logging.LogLevel.Information` level and category starting with `PerRequestLogBufferingFileBased.`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.*": "None"
    },

    "PerIncomingRequestLogBuffering": {
      "AutoFlushDuration": "00:00:05",
      "Rules": [
        {
          "CategoryName": "PerRequestLogBufferingFileBased.*",
          "LogLevel": "Information"
        }
      ]
    }
  }
}
```
While the app is running, you can update the _appsettings.json_ with the following configuration:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.*": "None"
    },

    "PerIncomingRequestLogBuffering": {
      "Rules": [
        {
          "LogLevel": "Information"
        }
      ]
    }
  }
}
```
The new rules are applied automatically. For example, with the preceding configuration, all logs with the `Microsoft.Extensions.Logging.LogLevel.Information` level will be buffered.

## Performance considerations

Log buffering offers a trade-off between memory usage and log storage costs. Buffering logs in memory allows you to:

1. Selectively emit logs based on runtime conditions.
1. Drop unnecessary logs without writing them to storage.

However, be mindful of the memory consumption, especially in high-throughput applications. Configure appropriate buffer size limits to prevent excessive memory usage.

## Best practices

- Set appropriate buffer size limits based on your application's memory constraints.
- Use per-request buffering for web applications to isolate logs by request.
- Configure auto-flush duration carefully to balance memory usage and log availability.
- Implement explicit flush triggers for important events (such as errors and warnings).
- Monitor buffer memory usage in production to ensure it remains within acceptable limits.

## Limitations

- Log buffering is not supported in .NET 8 and earlier versions.
- The order of logs is not guaranteed to be preserved. However, original timestamps are preserved.
- Custom configuration per each logging provider is not supported. The same configuration is used for all providers.
- Log scopes are not supported. This means that if you use the `Microsoft.Extensions.Logging.ILogger.BeginScope*` method, the buffered log records will not be associated with the scope.
- Not all information of the original log record is preserved. Log buffering internally uses `Microsoft.Extensions.Logging.Abstractions.BufferedLogRecord` class when flushing, and the following of its properties are always empty:
  - `Microsoft.Extensions.Logging.Abstractions.BufferedLogRecord.ActivitySpanId`
  - `Microsoft.Extensions.Logging.Abstractions.BufferedLogRecord.ActivityTraceId`
  - `Microsoft.Extensions.Logging.Abstractions.BufferedLogRecord.ManagedThreadId`
  - `Microsoft.Extensions.Logging.Abstractions.BufferedLogRecord.MessageTemplate`

## See also

- Log sampling
- Logging in .NET
- High-performance logging in .NET
