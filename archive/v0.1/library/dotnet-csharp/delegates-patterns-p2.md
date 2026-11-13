---
title: "Common Patterns for Delegates (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/delegates-patterns.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Common Patterns for Delegates (part 2 of 2)

## Build a Second Output Engine

The Log component is coming along well. Let's add one more output
engine that logs messages to a file. This will be a slightly more
involved output engine. It will be a class that encapsulates the
file operations, and ensures that the file is always closed after
each write. That ensures that all the data is flushed to disk after
each message is generated.

Here is that file-based logger:

```csharp
﻿using System;
using System.IO;

namespace DelegatesAndEvents
{
    public class FileLogger
    {
        private readonly string logPath;
        public FileLogger(string path)
        {
            logPath = path;
            Logger.WriteMessage += LogMessage;
        }

        public void DetachLog() => Logger.WriteMessage -= LogMessage;
        // make sure this can't throw.
        private void LogMessage(string msg)
        {
            try
            {
                using (var log = File.AppendText(logPath))
                {
                    log.WriteLine(msg);
                    log.Flush();
                }
            }
            catch (Exception)
            {
                // Hmm. We caught an exception while
                // logging. We can't really log the
                // problem (since it's the log that's failing).
                // So, while normally, catching an exception
                // and doing nothing isn't wise, it's really the
                // only reasonable option here.
            }
        }
    }
}
```

Once you've created this class, you can instantiate it and it attaches
its LogMessage method to the Logger component:

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

These two are not mutually exclusive. You could attach both log
methods and generate messages to the console and a file:

```csharp
var fileOutput = new FileLogger("log.txt");
Logger.WriteMessage += LoggingMethods.LogToConsole; // LoggingMethods is the static class we utilized earlier
```

Later, even in the same application, you can remove one of the
delegates without any other issues to the system:

```csharp
Logger.WriteMessage -= LoggingMethods.LogToConsole;
```

### Practices

Now, you've added a second output handler for the logging subsystem.
This one needs a bit more infrastructure to correctly support the file
system. The delegate is an instance method. It's also a private method.
There's no need for greater accessibility because the delegate
infrastructure can connect the delegates.

Second, the delegate-based design enables multiple output methods
without any extra code. You don't need to build any additional infrastructure
to support multiple output methods. They simply become another method
on the invocation list.

Pay special attention to the code in the file logging output method. It
is coded to ensure that it does not throw any exceptions. While this isn't
always strictly necessary, it's often a good practice. If either of the
delegate methods throws an exception, the remaining delegates that are
on the invocation won't be invoked.

As a last note, the file logger must manage its resources by opening and
closing the file on each log message. You could choose to keep the file
open and implement `IDisposable` to close the file when you are completed.
Either method has its advantages and disadvantages. Both do create a bit
more coupling between the classes.

None of the code in the `Logger` class would need to be updated
in order to support either scenario.

## Handle Null Delegates

Finally, let's update the LogMessage method so that it is robust
for those cases when no output mechanism is selected. The current
implementation will throw a `NullReferenceException` when the
`WriteMessage` delegate does not have an invocation list attached.
You may prefer a design that silently continues when no methods
have been attached. This is easy using the null conditional operator,
combined with the `Delegate.Invoke()` method:

```csharp
public static void LogMessage(string msg)
{
    WriteMessage?.Invoke(msg);
}
```

The null conditional operator (`?.`) short-circuits when the left operand
(`WriteMessage` in this case) is null, which means no attempt is made
to log a message.

You won't find the `Invoke()` method listed in the documentation for
`System.Delegate` or `System.MulticastDelegate`. The compiler generates
a type safe `Invoke` method for any delegate type declared. In this example,
that means `Invoke` takes a single `string` argument, and has a void
return type.

## Summary of Practices

You've seen the beginnings of a log component that could be expanded
with other writers, and other features. By using delegates in the design,
these different components are loosely coupled. This provides
several advantages. It's easy to create new output mechanisms
and attach them to the system. These other mechanisms only need one
method: the method that writes the log message. It's a design that's resilient when new features are added. The contract required
for any writer is to implement one method. That method could be a
static or instance method. It could be public, private, or any other
legal access.

The Logger class can make any number of enhancements or changes without
introducing breaking changes. Like any class, you cannot modify the
public API without the risk of breaking changes. But, because the
coupling between the logger and any output engines is only through
the delegate, no other types (like interfaces or base classes) are
involved. The coupling is as small as possible.

Next
