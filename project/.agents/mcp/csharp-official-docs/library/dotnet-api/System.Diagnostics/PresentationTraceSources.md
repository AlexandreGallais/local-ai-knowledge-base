---
title: "PresentationTraceSources class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PresentationTraceSources.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PresentationTraceSources class

Namespace: `System.Diagnostics`

```csharp
public static class PresentationTraceSources
```

Provides debug tracing support that is specifically targeted for Windows Presentation Foundation (WPF) applications.

#### Remarks

To enable tracing, you must first set a registry key, and then configure trace sources. To create the registry key, set a `ManagedTracing` reg_dword value to 1 under `HKeyCurrentUser\Software\Microsoft\Tracing\WPF`.

Achieving optimal application performance requires forethought in application design and an understanding of best practices for Windows Presentation Foundation (WPF) application development. For more information, see Optimizing WPF Application Performance.

## PresentationTraceSources.TraceLevel attachedproperty

```csharp
see GetTraceLevel, and SetTraceLevel
```

To be added.

To be added.

## PresentationTraceSources.AnimationSource property

```csharp
public static System.Diagnostics.TraceSource AnimationSource { get; }
```

Gets an animation trace source.

Returns: An animation trace source.

To be added.

## PresentationTraceSources.DataBindingSource property

```csharp
public static System.Diagnostics.TraceSource DataBindingSource { get; }
```

Gets a data-binding trace source.

Returns: A data-binding trace source.

To be added.

## PresentationTraceSources.DependencyPropertySource property

```csharp
public static System.Diagnostics.TraceSource DependencyPropertySource { get; }
```

Gets a dependency property trace source.

Returns: A dependency property trace source.

To be added.

## PresentationTraceSources.DocumentsSource property

```csharp
public static System.Diagnostics.TraceSource DocumentsSource { get; }
```

Gets a document trace source.

Returns: A document trace source.

To be added.

## PresentationTraceSources.FreezableSource property

```csharp
public static System.Diagnostics.TraceSource FreezableSource { get; }
```

Gets a Freezable trace source.

Returns: A Freezable trace source.

To be added.

## PresentationTraceSources.HwndHostSource property

```csharp
public static System.Diagnostics.TraceSource HwndHostSource { get; }
```

Gets an hwnd host trace source.

Returns: An hwnd host trace source.

To be added.

## PresentationTraceSources.MarkupSource property

```csharp
public static System.Diagnostics.TraceSource MarkupSource { get; }
```

Gets a markup trace source.

Returns: A markup trace source.

To be added.

## PresentationTraceSources.NameScopeSource property

```csharp
public static System.Diagnostics.TraceSource NameScopeSource { get; }
```

Gets a name scope trace source.

Returns: A name scope trace source.

To be added.

## PresentationTraceSources.ResourceDictionarySource property

```csharp
public static System.Diagnostics.TraceSource ResourceDictionarySource { get; }
```

Gets a resource dictionary trace source.

Returns: A resource dictionary trace source.

To be added.

## PresentationTraceSources.RoutedEventSource property

```csharp
public static System.Diagnostics.TraceSource RoutedEventSource { get; }
```

Gets a routed event trace source.

Returns: A routed event trace source.

To be added.

## PresentationTraceSources.ShellSource property

```csharp
public static System.Diagnostics.TraceSource ShellSource { get; }
```

Gets a shell trace source.

Returns: A shell trace source.

To be added.

## PresentationTraceSources.GetTraceLevel(Object) method

```csharp
public static System.Diagnostics.PresentationTraceLevel GetTraceLevel (object element);
```

Gets the value of the `PresentationTraceSources.TraceLevel` attached property for a specified element.

Parameters:

- `element`: The element from which the property value is read.

Returns: The `PresentationTraceSources.TraceLevel` property value for the element.

To be added.

## PresentationTraceSources.Refresh() method

```csharp
public static void Refresh ();
```

Refreshes trace sources, by forcing the app.config file to be re-read.

To be added.

## PresentationTraceSources.SetTraceLevel(Object, PresentationTraceLevel) method

```csharp
public static void SetTraceLevel (object element, System.Diagnostics.PresentationTraceLevel traceLevel);
```

Sets the value of the `PresentationTraceSources.TraceLevel` attached property to a specified element.

Parameters:

- `element`: The element to which the attached property is written.
- `traceLevel`: The needed `PresentationTraceLevel` value.

To be added.

## PresentationTraceSources.TraceLevelProperty field

```csharp
public static readonly System.Windows.DependencyProperty TraceLevelProperty;
```

Identifies the `PresentationTraceSources.TraceLevel` attached property.

To be added.
