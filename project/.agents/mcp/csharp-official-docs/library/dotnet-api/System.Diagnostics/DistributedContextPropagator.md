---
title: "DistributedContextPropagator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DistributedContextPropagator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DistributedContextPropagator class

Namespace: `System.Diagnostics`

```csharp
public abstract class DistributedContextPropagator
```

An implementation of `DistributedContextPropagator` determines if and how distributed context information is encoded and decoded as it traverses the network.
The encoding can be transported over any network protocol that supports string key-value pairs. For example, when using HTTP, each key-value pair is an HTTP header.
`DistributedContextPropagator` injects values into and extracts values from carriers as string key-value pairs.

To be added.

## DistributedContextPropagator.DistributedContextPropagator() constructor

```csharp
protected DistributedContextPropagator ();
```

Initializes an instance of the `DistributedContextPropagator` class. This constructor is protected and only meant to be called from parent classes.

To be added.

## DistributedContextPropagator.Current property

```csharp
public static System.Diagnostics.DistributedContextPropagator Current { get; set; }
```

Get or set the process-wide propagator object to use as the current selected propagator.

Returns: The currently selected process-wide propagator object.

To be added.

## DistributedContextPropagator.Fields property

```csharp
public abstract System.Collections.Generic.IReadOnlyCollection<string> Fields { get; }
```

Gets the set of field names this propagator is likely to read or write.

Returns: The list of fields that will be used by the
```csharp
DistributedContextPropagator
```
.

To be added.

## DistributedContextPropagator.CreateDefaultPropagator() method

```csharp
public static System.Diagnostics.DistributedContextPropagator CreateDefaultPropagator ();
```

Returns the default propagator object that `DistributedContextPropagator.Current` will be initialized with.

Returns: An instance of the `DistributedContextPropagator` class.

#### Remarks

`CreateDefaultPropagator` creates a propagator instance that can inject and extract the headers with field names "tracestate",
"traceparent" of the identifiers that are formatted as W3C trace parent, and "Request-Id" of the identifiers that are formatted as a hierarchical identifier.
The returned propagator can inject the baggage key-value pair list with header name "Correlation-Context", and it can extract the baggage values mapped to header names "Correlation-Context" and "baggage".

## DistributedContextPropagator.CreateNoOutputPropagator() method

```csharp
public static System.Diagnostics.DistributedContextPropagator CreateNoOutputPropagator ();
```

Returns a propagator that does not transmit any distributed context information in outbound network messages.

Returns: An instance of the `DistributedContextPropagator` class.

To be added.

## DistributedContextPropagator.CreatePassThroughPropagator() method

```csharp
public static System.Diagnostics.DistributedContextPropagator CreatePassThroughPropagator ();
```

Returns a propagator that attempts to act transparently, emitting the same data on outbound network requests that was received on the inbound request.
When encoding the outbound message, this propagator uses information from the request's root Activity, ignoring any intermediate Activities that may have been created while processing the request.

Returns: An instance of the `DistributedContextPropagator` class.

To be added.

## DistributedContextPropagator.CreatePreW3CPropagator() method

```csharp
public static System.Diagnostics.DistributedContextPropagator CreatePreW3CPropagator ();
```

Returns a propagator that encodes and decodes distributed context and baggage information in a backward-compatible manner.

Returns: To be added.

This propagator is not fully compliant with the W3C specification.

It inserts baggage using the "Correlation-Context" header instead of "baggage".

It also takes a more relaxed approach to handling trace state and baggage key-value pairs, allowing characters that are not permitted by the W3C specification.

Additionally, this propagator supports injecting values from Activity objects that use the ActivityIdFormat.Hierarchical format, which is not supported by the W3C specification.

## DistributedContextPropagator.CreateW3CPropagator() method

```csharp
public static System.Diagnostics.DistributedContextPropagator CreateW3CPropagator ();
```

Returns a propagator that encodes and decodes distributed context information in accordance with the W3C Trace Context and Baggage specifications.

Returns: To be added.

To be added.

## DistributedContextPropagator.ExtractBaggage(Object, DistributedContextPropagator+PropagatorGetterCallback) method

```csharp
public abstract System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,string?>>? ExtractBaggage (object? carrier, System.Diagnostics.DistributedContextPropagator.PropagatorGetterCallback? getter);
```

Extracts the baggage key-value pair list from an incoming request represented by the carrier. For example, from the headers of an HTTP request.

Parameters:

- `carrier`: The medium from which values will be read.
- `getter`: The callback method to invoke to get the propagation baggage list from the carrier.

Returns: Returns the extracted key-value pair list from the carrier.

To be added.

## DistributedContextPropagator.ExtractTraceIdAndState(Object, DistributedContextPropagator+PropagatorGetterCallback, String, String) method

```csharp
public abstract void ExtractTraceIdAndState (object? carrier, System.Diagnostics.DistributedContextPropagator.PropagatorGetterCallback? getter, out string? traceId, out string? traceState);
```

Extracts the trace ID and trace state from an incoming request represented by the carrier. For example, from the headers of an HTTP request.

Parameters:

- `carrier`: The medium from which values will be read.
- `getter`: The callback method to invoke to get the propagation trace ID and state from the carrier.
- `traceId`: When this method returns, contains the trace ID extracted from the carrier.
- `traceState`: When this method returns, contains the trace state extracted from the carrier.

To be added.

## DistributedContextPropagator.Inject(Activity, Object, DistributedContextPropagator+PropagatorSetterCallback) method

```csharp
public abstract void Inject (System.Diagnostics.Activity? activity, object? carrier, System.Diagnostics.DistributedContextPropagator.PropagatorSetterCallback? setter);
```

Injects the trace values stored in the `Activity` object into a carrier. For example, into the headers of an HTTP request.

Parameters:

- `activity`: The Activity object has the distributed context to inject to the carrier.
- `carrier`: The medium in which the distributed context will be stored.
- `setter`: The callback method to invoke to set a named key-value pair on the carrier.

To be added.
