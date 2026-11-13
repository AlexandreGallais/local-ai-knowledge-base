---
title: "Common Patterns for Delegates (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/delegates-patterns.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Common patterns for delegates

Previous

Delegates provide a mechanism that enables software designs
involving minimal coupling between components.

One excellent example for this kind of design is LINQ. The LINQ
Query Expression Pattern relies on delegates for all of its
features. Consider this simple example:

```csharp
var smallNumbers = numbers.Where(n => n < 10);
```

This filters the sequence of numbers to only those less than the value 10.
The `Where` method uses a delegate that determines which elements of a
sequence pass the filter. When you create a LINQ query, you supply the
implementation of the delegate for this specific purpose.

The prototype for the Where method is:

```csharp
public static IEnumerable<TSource> Where<TSource> (this IEnumerable<TSource> source, Func<TSource, bool> predicate);
```

This example is repeated with all the methods that are part of LINQ. They
all rely on delegates for the code that manages the specific query. This API
design pattern is a powerful one to learn and understand.

This simple example illustrates how delegates require very little coupling
between components. You don't need to create a class that derives from a
particular base class. You don't need to implement a specific interface.
The only requirement is to provide the implementation of one method that
is fundamental to the task at hand.

## Build Your Own Components with Delegates

Let's build on that example by creating a component using a design that
relies on delegates.

Let's define a component that could be used for log messages in a large
system. The library components could be used in many different environments,
on multiple different platforms. There are a lot of common features in the
component that manages the logs. It will need to accept messages from any
component in the system. Those messages will have different priorities, which
the core component can manage. The messages should have timestamps in their
final archived form. For more advanced scenarios, you could filter messages by
the source component.

There is one aspect of the feature that will change often: where messages are
written. In some environments, they may be written to the error console. In
others, a file. Other possibilities include database storage, OS event logs,
or other document storage.

There are also combinations of output that might be used in different
scenarios. You may want to write messages to the console and to a file.

A design based on delegates will provide a great deal of flexibility, and
make it easy to support storage mechanisms that may be added in the future.

Under this design, the primary log component can be a non-virtual, even
sealed class. You can plug in any set of delegates to write the messages
to different storage media. The built-in support for multicast delegates
makes it easy to support scenarios where messages must be written to multiple
locations (a file, and a console).

## A First Implementation

Let's start small: the initial implementation will accept new messages,
and write them using any attached delegate. You can start with one delegate
that writes messages to the console.

```csharp
﻿using System;

namespace DelegatesAndEvents
{

    // Logger implementation two
    public enum Severity
    {
        Verbose,
        Trace,
        Information,
        Warning,
        Error,
        Critical
    }

    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static Severity LogLevel { get; set; } = Severity.Warning;

        public static void LogMessage(Severity s, string component, string msg)
        {
            if (s < LogLevel)
                return;

            var outputMsg = $"{DateTime.Now}\t{s}\t{component}\t{msg}";
            if (WriteMessage is not null)
                WriteMessage(outputMsg);
        }
    }
}

namespace ImplementationOne
{
    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static void LogMessage(string msg)
        {
            if (WriteMessage is not null)
                WriteMessage(msg);
        }
    }
}

namespace ImplementationTwo
{
    using DelegatesAndEvents;

    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static void LogMessage(Severity s, string component, string msg)
        {
            var outputMsg = $"{DateTime.Now}\t{s}\t{component}\t{msg}";
            if (WriteMessage is not null)
                WriteMessage(outputMsg);
        }
    }
}
```

The static class above is the simplest thing that can work. We need to
write the single implementation for the method that writes messages
to the console:

```csharp
﻿using System;

namespace DelegatesAndEvents
{
    public static class LoggingMethods
    {
        public static void LogToConsole(string message)
        {
            Console.Error.WriteLine(message);
        }
    }
}
```

Finally, you need to hook up the delegate by attaching it to
the WriteMessage delegate declared in the logger:

```csharp
﻿using System;

namespace DelegatesAndEvents
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Logger.WriteMessage += LoggingMethods.LogToConsole;
            var file = new FileLogger("log.txt");

            Logger.LogMessage(Severity.Warning, "Console", "This is a warning message");

            Logger.LogMessage(Severity.Information, "Console", "Information message one");
            Logger.LogLevel = Severity.Information;

            Logger.LogMessage(Severity.Information, "Console", "Information message two");
        }
    }
}
```

### Practices

Our sample so far is fairly simple, but it still demonstrates some
of the important guidelines for designs involving delegates.

Using the delegate types defined in the core framework makes it easier
for users to work with the delegates. You don't need to define new types,
and developers using your library do not need to learn new, specialized
delegate types.

The interfaces used are as minimal and as flexible as possible: To create
a new output logger, you must create one method. That method may be a static
method, or an instance method. It may have any access.

## Format Output

Let's make this first version a bit more robust, and then start
creating other logging mechanisms.

Next, let's add a few arguments to the `LogMessage()` method so that
your log class creates more structured messages:

```csharp
﻿using System;

namespace DelegatesAndEvents
{

    // Logger implementation two
    public enum Severity
    {
        Verbose,
        Trace,
        Information,
        Warning,
        Error,
        Critical
    }

    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static Severity LogLevel { get; set; } = Severity.Warning;

        public static void LogMessage(Severity s, string component, string msg)
        {
            if (s < LogLevel)
                return;

            var outputMsg = $"{DateTime.Now}\t{s}\t{component}\t{msg}";
            if (WriteMessage is not null)
                WriteMessage(outputMsg);
        }
    }
}

namespace ImplementationOne
{
    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static void LogMessage(string msg)
        {
            if (WriteMessage is not null)
                WriteMessage(msg);
        }
    }
}

namespace ImplementationTwo
{
    using DelegatesAndEvents;

    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static void LogMessage(Severity s, string component, string msg)
        {
            var outputMsg = $"{DateTime.Now}\t{s}\t{component}\t{msg}";
            if (WriteMessage is not null)
                WriteMessage(outputMsg);
        }
    }
}
```
```csharp
﻿using System;

namespace DelegatesAndEvents
{

    // Logger implementation two
    public enum Severity
    {
        Verbose,
        Trace,
        Information,
        Warning,
        Error,
        Critical
    }

    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static Severity LogLevel { get; set; } = Severity.Warning;

        public static void LogMessage(Severity s, string component, string msg)
        {
            if (s < LogLevel)
                return;

            var outputMsg = $"{DateTime.Now}\t{s}\t{component}\t{msg}";
            if (WriteMessage is not null)
                WriteMessage(outputMsg);
        }
    }
}

namespace ImplementationOne
{
    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static void LogMessage(string msg)
        {
            if (WriteMessage is not null)
                WriteMessage(msg);
        }
    }
}

namespace ImplementationTwo
{
    using DelegatesAndEvents;

    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static void LogMessage(Severity s, string component, string msg)
        {
            var outputMsg = $"{DateTime.Now}\t{s}\t{component}\t{msg}";
            if (WriteMessage is not null)
                WriteMessage(outputMsg);
        }
    }
}
```

Next, let's make use of that `Severity` argument to filter the messages
that are sent to the log's output.

```csharp
﻿using System;

namespace DelegatesAndEvents
{

    // Logger implementation two
    public enum Severity
    {
        Verbose,
        Trace,
        Information,
        Warning,
        Error,
        Critical
    }

    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static Severity LogLevel { get; set; } = Severity.Warning;

        public static void LogMessage(Severity s, string component, string msg)
        {
            if (s < LogLevel)
                return;

            var outputMsg = $"{DateTime.Now}\t{s}\t{component}\t{msg}";
            if (WriteMessage is not null)
                WriteMessage(outputMsg);
        }
    }
}

namespace ImplementationOne
{
    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static void LogMessage(string msg)
        {
            if (WriteMessage is not null)
                WriteMessage(msg);
        }
    }
}

namespace ImplementationTwo
{
    using DelegatesAndEvents;

    public static class Logger
    {
        public static Action<string>? WriteMessage;

        public static void LogMessage(Severity s, string component, string msg)
        {
            var outputMsg = $"{DateTime.Now}\t{s}\t{component}\t{msg}";
            if (WriteMessage is not null)
                WriteMessage(outputMsg);
        }
    }
}
```

### Practices

You've added new features to the logging infrastructure. Because
the logger component is very loosely coupled to any output mechanism,
these new features can be added with no impact on any of the code
implementing the logger delegate.

As you keep building this, you'll see more examples of how this loose
coupling enables greater flexibility in updating parts of the site without
any changes to other locations. In fact, in a larger application, the logger
output classes might be in a different assembly, and not even need to be
rebuilt.
