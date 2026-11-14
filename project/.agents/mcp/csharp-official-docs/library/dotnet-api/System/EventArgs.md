---
title: "EventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/EventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventArgs class

Namespace: `System`

```csharp
public class EventArgs
```

Represents the base class for classes that contain event data, and provides a value to use for events that do not include event data.

#### Remarks
This class serves as the base class for all classes that represent event data. For example, the `AssemblyLoadEventArgs` class derives from `EventArgs` and is used to hold the data for assembly load events. To create a custom event data class, create a class that derives from the `EventArgs` class and provide the properties to store the necessary data. The name of your custom event data class should end with `EventArgs`.

To pass an object that does not contain any data, use the `Empty` field.

For more information about events, see the Handling and Raising Events article.

#### Examples
The following example shows a custom event data class named `ThresholdReachedEventArgs` that derives from the `EventArgs` class. An instance of the event data class is passed to the event handler for the `ThresholdReached` event.

_Code sample not included: ~/snippets/csharp/System/EventArgs/Overview/programwithdata.cs._

## EventArgs.EventArgs() constructor

```csharp
public EventArgs ();
```

Initializes a new instance of the `EventArgs` class.

#### Remarks
To pass an object that does not contain any data, use the `Empty` field.

## EventArgs.Empty field

```csharp
public static readonly EventArgs Empty;
```

Provides a value to use with events that do not have event data.

#### Remarks
Pass this value to event handlers that are associated with events that do not have data.

#### Examples
The following example shows a simple counting application that raises an event when a threshold is equaled or exceeded. The `Empty` field is passed to the `OnThresholdReached` method.

_Code sample not included: ~/snippets/csharp/System/EventArgs/Overview/programnodata.cs._
