---
title: "ISupportInitialize interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ISupportInitialize.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ISupportInitialize interface

Namespace: `System.ComponentModel`

```csharp
public interface ISupportInitialize
```

Specifies that this object supports a simple, transacted notification for batch initialization.

#### Remarks
`ISupportInitialize` allows controls to optimize multiple property assignments. As a result, you can initialize co-dependent properties or batch set multiple properties at design time.

Call the `ISupportInitialize.BeginInit` method to signal the object that initialization is starting. Call the `ISupportInitialize.EndInit` method to signal that initialization is complete.

#### Examples
The following code example demonstrates how to use the `ISupportInitialize` interface to initialize three `TrackBar` controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ISupportInitialize/Overview/form1.cs._

## ISupportInitialize.BeginInit() method

```csharp
public void BeginInit ();
```

Signals the object that initialization is starting.

#### Examples
The following code example demonstrates how to use the `ISupportInitialize` interface to initialize three `TrackBar` controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ISupportInitialize/Overview/form1.cs._

## ISupportInitialize.EndInit() method

```csharp
public void EndInit ();
```

Signals the object that initialization is complete.

#### Examples
The following code example demonstrates how to use the `ISupportInitialize` interface to initialize three `TrackBar` controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ISupportInitialize/Overview/form1.cs._
