---
title: "BufferedLogRecord class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging.Abstractions/BufferedLogRecord.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BufferedLogRecord class

Namespace: `Microsoft.Extensions.Logging.Abstractions`

```csharp
public abstract class BufferedLogRecord
```

Represents a buffered log record to be written in batch to an `IBufferedLogger`.

Instances of this type can be pooled and reused. Implementations of `IBufferedLogger` must
not hold onto instance of `BufferedLogRecord` passed to its `IBufferedLogger.LogRecords` method
beyond the invocation of that method.

## BufferedLogRecord.BufferedLogRecord() constructor

```csharp
protected BufferedLogRecord ();
```

To be added.

To be added.

## BufferedLogRecord.ActivitySpanId property

```csharp
public virtual System.Diagnostics.ActivitySpanId? ActivitySpanId { get; }
```

Gets an activity span ID for this record, representing the state of the thread that created the record.

Returns: To be added.

To be added.

## BufferedLogRecord.ActivityTraceId property

```csharp
public virtual System.Diagnostics.ActivityTraceId? ActivityTraceId { get; }
```

Gets an activity trace ID for this record, representing the state of the thread that created the record.

Returns: To be added.

To be added.

## BufferedLogRecord.Attributes property

```csharp
public virtual System.Collections.Generic.IReadOnlyList<System.Collections.Generic.KeyValuePair<string,object?>> Attributes { get; }
```

Gets the variable set of name/value pairs associated with the record.

Returns: To be added.

To be added.

## BufferedLogRecord.EventId property

```csharp
public abstract Microsoft.Extensions.Logging.EventId EventId { get; }
```

Gets the record's event ID.

Returns: To be added.

To be added.

## BufferedLogRecord.Exception property

```csharp
public virtual string? Exception { get; }
```

Gets an exception string for this record.

Returns: To be added.

To be added.

## BufferedLogRecord.FormattedMessage property

```csharp
public virtual string? FormattedMessage { get; }
```

Gets the formatted log message.

Returns: To be added.

To be added.

## BufferedLogRecord.LogLevel property

```csharp
public abstract Microsoft.Extensions.Logging.LogLevel LogLevel { get; }
```

Gets the record's logging severity level.

Returns: To be added.

To be added.

## BufferedLogRecord.ManagedThreadId property

```csharp
public virtual int? ManagedThreadId { get; }
```

Gets the ID of the thread that created the log record.

Returns: To be added.

To be added.

## BufferedLogRecord.MessageTemplate property

```csharp
public virtual string? MessageTemplate { get; }
```

Gets the original log message template.

Returns: To be added.

To be added.

## BufferedLogRecord.Timestamp property

```csharp
public abstract DateTimeOffset Timestamp { get; }
```

Gets the time when the log record was first created.

Returns: To be added.

To be added.
