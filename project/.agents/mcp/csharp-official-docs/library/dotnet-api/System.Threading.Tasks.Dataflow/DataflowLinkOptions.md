---
title: "DataflowLinkOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/DataflowLinkOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataflowLinkOptions class

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public class DataflowLinkOptions
```

Provides options used to configure a link between dataflow blocks.

#### Remarks

`DataflowLinkOptions` is mutable and can be configured through its properties.

When specific configuration options are not set, the following defaults are used:

| Options             | Default                             |
|---------------------|-------------------------------------|
| PropagateCompletion | False                               |
| MaxMessages         | DataflowBlockOptions.Unbounded (-1) |
| Append              | True                                |

Dataflow blocks capture the state of the options at linking. Subsequent changes to the provided `DataflowLinkOptions` instance should not affect the behavior of a link.

## DataflowLinkOptions.DataflowLinkOptions() constructor

```csharp
public DataflowLinkOptions ();
```

Initializes the `DataflowLinkOptions`.

To be added.

## DataflowLinkOptions.Append property

```csharp
public bool Append { get; set; }
```

Gets or sets whether the link should be appended to the source's list of links, or whether it should be prepended.

Returns: Returns  `Boolean`.

To be added.

## DataflowLinkOptions.MaxMessages property

```csharp
public int MaxMessages { get; set; }
```

Gets or sets the maximum number of messages that may be consumed across the link.

Returns: Returns  `Int32`.

To be added.

## DataflowLinkOptions.PropagateCompletion property

```csharp
public bool PropagateCompletion { get; set; }
```

Gets or sets whether the linked target will have completion and faulting notification propagated to it automatically.

Returns: Returns  `Boolean`.

To be added.
