---
title: "AppDomain class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AppDomain.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AppDomain class (part 7 of 7)

## AppDomain.AssemblyResolve event

```csharp
public event ResolveEventHandler? AssemblyResolve;
```

Occurs when the resolution of an assembly fails.

#### Remarks
It is the responsibility of the `ResolveEventHandler` for this event to return the assembly that is specified by the `Name` property, or to return null if the assembly is not recognized. The assembly must be loaded into an execution context; if it is loaded into the reflection-only context, the load that caused this event to be raised fails.

For guidance on the use of this event, see Resolving Assembly Loads.

The `RequestingAssembly` property returns the assembly that requested the assembly load that could not be resolved. For example, the loader might be unable to load a dependency of the requesting assembly because the requesting assembly and its dependency are not in the probing path. Knowing the identity of the requesting assembly might be useful in locating the dependency or in identifying the correct version, if more than one version of the dependency is available. For more information, see `ResolveEventArgs.RequestingAssembly`.

> **Important:**
> The `ResolveEventHandler` event is raised for all assemblies, including resource assemblies. If the operating system is localized, the handler might be called multiple times: once for each culture in the fallback chain.

For this event, the `Name` property returns the assembly name before policy is applied.

> **Important:**
> If more than one event handler is registered for this event, the event handlers are called in order until an event handler returns a value that isn't `null`. Subsequent event handlers are ignored.

For more information about handling events, see Handling and Raising Events.

#### Examples
The following sample demonstrates the `AssemblyResolve` event.

For this code example to run, you must provide the fully qualified assembly name. For information about how to obtain the fully qualified assembly name, see Assembly Names.

_Code sample not included: ~/snippets/csharp/System/AppDomain/AssemblyResolve/assemblyresolve.cs._

## AppDomain.DomainUnload event

```csharp
public event EventHandler? DomainUnload;
```

Occurs when an `AppDomain` is about to be unloaded.

#### Remarks
The `EventHandler` delegate for this event can perform any termination activities before the application domain is unloaded.

Each application domain that needs to perform processing when it is unloaded should register an event handler for this event. A shared event handler should not be used, because the `EventHandler` delegate does not identify the domain that is being unloaded.

> **Note:**
> This event is never raised in the default application domain.

Do not make assumptions about the thread the event is raised on. The event can be raised on a different thread than the one that called the `AppDomain.Unload` method.

For more information about handling events, see Handling and Raising Events.

## AppDomain.FirstChanceException event

```csharp
public event EventHandler<System.Runtime.ExceptionServices.FirstChanceExceptionEventArgs>? FirstChanceException;
```

Occurs when an exception is thrown in managed code, before the runtime searches the call stack for an exception handler in the application domain.

#### Remarks
This event is only a notification. Handling this event does not handle the exception or affect subsequent exception handling in any way. After the event has been raised and event handlers have been invoked, the common language runtime (CLR) begins to search for a handler for the exception. `FirstChanceException` provides the application domain with a first chance to examine any managed exception.

The event can be handled per application domain. If a thread passes through multiple application domains while executing a call, the event is raised in each application domain that has registered an event handler, before the CLR begins searching for a matching exception handler in that application domain. After the event has been handled, a search is made for a matching exception handler in that application domain. If none is found, the event is raised in the next application domain.

You must handle all exceptions that occur in the event handler for the `FirstChanceException` event. Otherwise, `FirstChanceException` is raised recursively. This could result in a stack overflow and termination of the application.

This event is not raised for exceptions that indicate corruption of process state, such as access violations, unless the event handler is security-critical and has the `HandleProcessCorruptedStateExceptionsAttribute` attribute.

The common language runtime suspends thread aborts while this notification event is being handled.

## AppDomain.ProcessExit event

```csharp
public event EventHandler? ProcessExit;
```

Occurs when the default application domain's parent process exits.

#### Remarks
The `EventHandler` for this event can perform termination activities, such as closing files, releasing storage and so on, before the process ends.

This event is raised in each application domain that registers an event handler.

For more information about handling events, see Handling and Raising Events.

## AppDomain.ReflectionOnlyAssemblyResolve event

```csharp
public event ResolveEventHandler? ReflectionOnlyAssemblyResolve;
```

Occurs when the resolution of an assembly fails in the reflection-only context.

#### Remarks
In the reflection-only context, dependencies are not resolved automatically. They must be preloaded or returned by the handler for this event. This event is raised when an assembly has a dependency that is not already loaded into the reflection-only context. The missing dependency is specified by the `Name` property. The `ResolveEventHandler` for this event must return an assembly that satisfies the dependency. The assembly that is returned must be loaded into the reflection-only context.

> **Important:**
> This event is raised only for missing dependencies of the assembly that you are loading into the reflection-only context (for example, by using the `Assembly.ReflectionOnlyLoad` method). It is not raised if the assembly that you are loading cannot be found.

The `RequestingAssembly` property returns the assembly that requested the assembly load that could not be resolved. Knowing the identity of the requesting assembly might be useful in identifying the correct version of the dependency, if more than one version is available. For more information, see `ResolveEventArgs.RequestingAssembly`.

For this event, the `Name` property returns the assembly name before policy is applied.

For more information about handling events, see Handling and Raising Events.

## AppDomain.ResourceResolve event

```csharp
public event ResolveEventHandler? ResourceResolve;
```

Occurs when the resolution of a resource fails because the resource is not a valid linked or embedded resource in the assembly.

#### Remarks
The `ResolveEventHandler` for this event can attempt to locate the assembly containing the resource and return it.

> **Important:**
> This event is not raised if resolution fails because no file can be found for a valid linked resource. It is raised if a manifest resource stream cannot be found, but it is not raised if an individual resource key <example-value> be found.

The `RequestingAssembly` property contains the assembly that requested the resource. For more information, see `ResolveEventArgs.RequestingAssembly`.

To register an event handler for this event, you must have the required permissions, or a `SecurityException` is thrown.

For more information about handling events, see Handling and Raising Events.

## AppDomain.TypeResolve event

```csharp
public event ResolveEventHandler? TypeResolve;
```

Occurs when the resolution of a type fails.

#### Remarks
The `TypeResolve` event occurs when the common language runtime is unable to determine the assembly that can create the requested type. This can occur if the type is defined in a dynamic assembly, or the type is not defined in a dynamic assembly but the runtime does not know which assembly the type is defined in. The latter situation can occur when `Type.GetType` is called with a type name that is not qualified with the assembly name.

The `ResolveEventHandler` for this event can attempt to locate and create the type.

However, the `TypeResolve` event does not occur if the runtime knows it is not possible to find a type in certain assemblies. For example, this event does not occur if the type is not found in a static assembly because the runtime knows types cannot be added dynamically to static assemblies.

The `RequestingAssembly` property contains the assembly that requested the type. For more information, see `ResolveEventArgs.RequestingAssembly`.

To register an event handler for this event, you must have the required permissions, or a `SecurityException` is thrown.

For more information about handling events, see Handling and Raising Events.

## AppDomain.UnhandledException event

```csharp
public event UnhandledExceptionEventHandler? UnhandledException;
```

Occurs when an exception is not caught.

Handlers might be invoked multiple times if exceptions are thrown from different threads.

The `UnhandledException` event provides notification of uncaught exceptions. It allows the application to log information about the exception before the system default handler reports the exception to the user and terminates the application. If sufficient information about the state of the application is available, other actions may be undertaken - such as saving program data for later recovery. Caution is advised, because program data can become corrupted when exceptions are not handled. The handler will also be running while holding locks held when the exception was thrown, so care should be taken to avoid waiting on other resources which could introduce deadlocks.

This event can be handled in any application domain. However, the event is not necessarily raised in the application domain where the exception occurred. An exception is unhandled only if the entire stack for the thread has been unwound without finding an applicable exception handler, so the first place the event can be raised is in the application domain where the thread originated.

If the `UnhandledException` event is handled in the default application domain, it is raised there for any unhandled exception in any thread, no matter what application domain the thread started in. If the thread started in an application domain that has an event handler for `UnhandledException`, the event is raised in that application domain. If that application domain is not the default application domain, and there is also an event handler in the default application domain, the event is raised in both application domains.

For example, suppose a thread starts in application domain "AD1", calls a method in application domain "AD2", and from there calls a method in application domain "AD3", where it throws an exception. The first application domain in which the `UnhandledException` event can be raised is "AD1". If that application domain is not the default application domain, the event can also be raised in the default application domain.

> **Note:**
> The common language runtime suspends thread aborts while event handlers for the `UnhandledException` event are executing.

If the event handler has a `ReliabilityContractAttribute` attribute with the appropriate flags, the event handler is treated as a constrained execution region.

This event is not raised for exceptions that corrupt the state of the process, such as stack overflows or access violations, unless the event handler is security-critical and has the `HandleProcessCorruptedStateExceptionsAttribute` attribute.

To register an event handler for this event, you must have the required permissions, or a `SecurityException` is thrown.

For more information about handling events, see Handling and Raising Events.

#### Other events for unhandled exceptions

For certain application models, the `UnhandledException` event can be preempted by other events if the unhandled exception occurs in the main application thread.

In applications that use Windows Forms, unhandled exceptions in the main application thread cause the `ThreadException` event to be raised. If this event is handled, the default behavior is that the unhandled exception does not terminate the application, although the application is left in an unknown state. In that case, the `UnhandledException` event is not raised. This behavior can be changed by using the application configuration file, or by using the `Application.SetUnhandledExceptionMode` method to change the mode to `ThrowException` before the `ThreadException` event handler is hooked up. This applies only to the main application thread. The `UnhandledException` event is raised for unhandled exceptions thrown in other threads.

The Visual Basic <example-value> framework provides another event for unhandled exceptions in the main application thread—the `UnhandledException` event. This event has an event arguments object with the same name as the event arguments object used by `UnhandledException`, but with different properties. In particular, this event arguments object has an `ExitApplication` property that allows the application to continue running, ignoring the unhandled exception (and leaving the application in an unknown state). In that case, the `UnhandledException` event is not raised.

#### Examples

The following example demonstrates the `UnhandledException` event. It defines an event handler, `MyHandler`, that is invoked whenever an unhandled exception is thrown in the default application domain. It then throws two exceptions. The first is handled by a **try/catch** block. The second is unhandled and invokes the `MyHandle` routine before the application terminates.

_Code sample not included: ~/snippets/csharp/System/AppDomain/UnhandledException/unhandledexception.cs._
