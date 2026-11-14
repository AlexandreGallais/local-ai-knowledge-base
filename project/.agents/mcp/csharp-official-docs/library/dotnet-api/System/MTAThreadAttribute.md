---
title: "MTAThreadAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MTAThreadAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MTAThreadAttribute class

Namespace: `System`

```csharp
public sealed class MTAThreadAttribute : Attribute
```

Indicates that the COM threading model for an application is multithreaded apartment (MTA).

#### Remarks
Apply this attribute to the entry point method (the `Main()` method in C# and Visual Basic). It has no effect on other methods. To set the apartment state of threads you start in your code, use the `Thread.SetApartmentState` or `Thread.TrySetApartmentState` method before starting the thread.

COM threading models only apply to applications that use COM interop. The COM threading model can be set to single-threaded apartment or multithreaded apartment. The application thread is only initialized for COM interop if the thread actually makes a call to a COM component. If COM interop is not used, then the thread is not initialized, and the `MTAThreadAttribute` attribute, if it is present, has no effect.

The default threading model for COM interop depends on the language in which you're developing your application, as the following table shows.

|Language|COM apartment model|
|--------------|-------------------------|
|C#|Multithreaded apartment|
|C++|Multithreaded apartment|
|Visual Basic|Single-threaded apartment|

To change these defaults, you use the `MTAThreadAttribute` attribute to set the threading model for the application, or call the `Thread.SetApartmentState` or `Thread.TrySetApartmentState` method before starting the thread to set the threading model for a particular thread. In C++, you can also use the /CLRTHREADATTRIBUTE (Set CLR Thread Attribute) linker option to specify the apartment model.

Use the `MTAThreadAttribute` attribute to explicitly set the threading model to multithreaded apartment in the following cases:

- You're developing a Visual Basic app that calls to a C# library that in turn relies on COM interop. Because the multithreaded apartment model is the default for C#, you should change your app's threading model to multithreaded by using the `MTAThreadAttribute` attribute.
- Your application makes calls to COM components that use the multithreaded apartment model.

## MTAThreadAttribute.MTAThreadAttribute() constructor

```csharp
public MTAThreadAttribute ();
```

Initializes a new instance of the `MTAThreadAttribute` class.

To be added.
