---
title: "ASP.NET Core built-in Blazor (Razor components) metrics"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/metrics/blazor.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core built-in Blazor (Razor components) metrics

This article describes the built-in Blazor (Razor components) metrics for ASP.NET Core produced using the `System.Diagnostics.Metrics` API. These metrics cover Razor component route changes and browser events, component lifecycle events, and server-side Blazor circuits. They're available in ASP.NET Core 10.0 or later.

For an overview of all built-in metrics reference pages and how to read this reference, see ASP.NET Core built-in metrics. For information on how to collect, report, enrich, and test with ASP.NET Core metrics, see ASP.NET Core metrics.

## `Microsoft.AspNetCore.Components`

The `Microsoft.AspNetCore.Components` metrics report information on Razor component route changes and browser events:

* `aspnetcore.components.navigate`
* `aspnetcore.components.handle_event.duration`

### Metric: `aspnetcore.components.navigate`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.components.navigate` | Counter | `{route}` | Tracks the total number of route changes in the app.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`aspnetcore.components.type` | string | Component navigated to. | `TestComponent` | Always
`aspnetcore.components.route` | string | The component's route. | `/test-route` | Always

Usage: How many different Blazor pages did users visit?

### Metric: `aspnetcore.components.handle_event.duration`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.components.handle_event.duration` | Histogram | `s` | Measures the duration of processing browser events, including business logic of the component, excluding the duration of child component event handling.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`aspnetcore.components.type` | string | Component type handling the event. | `TestComponent` | Always
`code.function.name` | string | C# method handling the event. | `OnClick` | Always
`aspnetcore.components.attribute.name` | string | Component attribute name handling the event. | `onclick` | Always
`error.type` | string | The full name of exception type. | `System.InvalidOperationException`; `Contoso.MyException` | If an exception is thrown.

Usage:

* Which component's click event handler is slow?
* Which buttons are selected often?

## `Microsoft.AspNetCore.Components.Lifecycle`

The `Microsoft.AspNetCore.Components.Lifecycle` metrics report information on Razor component lifecycle events:

* `aspnetcore.components.update_parameters.duration`
* `aspnetcore.components.render_diff.duration`
* `aspnetcore.components.render_diff.size`

### Metric: `aspnetcore.components.update_parameters.duration`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.components.update_parameters.duration` | Histogram | `s` | Measures the duration of processing component parameters, including business logic.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`aspnetcore.components.type` | string | Component type handling the event. | `TestComponent` | Always
`error.type` | string | The full name of exception type. | `System.InvalidOperationException`; `Contoso.MyException` | If an exception is thrown.

Usage:

* Which components are slow to update?
* Which components are updated often?

### Metric: `aspnetcore.components.render_diff.duration`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.components.render_diff.duration` | Histogram | `s` | Measures the duration of rendering a component tree and producing the HTML diff, including business logic of the changed components.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`error.type` | string | The full name of exception type. | `System.InvalidOperationException`; `Contoso.MyException` | If an exception is thrown.

Usage: Is rendering slow?

### Metric: `aspnetcore.components.render_diff.size`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.components.render_diff.size` | Histogram | `{elements}` | Tracks the number of HTML elements modified during a rendering batch.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`error.type` | string | The full name of exception type. | `System.InvalidOperationException`; `Contoso.MyException` | If an exception is thrown.

Usage: Do I render diffs that are too large? (network bandwidth, DOM update)

## `Microsoft.AspNetCore.Components.Server.Circuits`

The `Microsoft.AspNetCore.Components.Server.Circuits` metrics report information on server-side Blazor circuits in Blazor Server and Blazor Web Apps:

* `aspnetcore.components.circuit.active`
* `aspnetcore.components.circuit.connected`
* `aspnetcore.components.circuit.duration`

### Metric: `aspnetcore.components.circuit.active`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.components.circuit.active` | UpDownCounter | `{circuit}` | Shows the number of active circuits currently in memory.

Usage: How much memory does the session state hold?

### Metric: `aspnetcore.components.circuit.connected`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.components.circuit.connected` | UpDownCounter | `{circuit}` | Tracks the number of circuits connected to clients.

Usage: How many SignalR connections are open?

### Metric: `aspnetcore.components.circuit.duration`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.components.circuit.duration` | Histogram | `s` | Measures circuit lifetime duration and provides total circuit count.

Usage:

* How many sessions processed?
* How long do users keep the session/tab open?

## Related content

* ASP.NET Core built-in metrics
* ASP.NET Core built-in HTTP metrics
* ASP.NET Core built-in diagnostics metrics
* ASP.NET Core built-in authentication and authorization metrics
* ASP.NET Core metrics
