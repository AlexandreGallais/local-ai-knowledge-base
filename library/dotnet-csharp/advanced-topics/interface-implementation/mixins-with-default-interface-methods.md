---
title: "Create mixin types using default interface methods (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/advanced-topics/interface-implementation/mixins-with-default-interface-methods.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Mix functionality in when creating classes using interfaces with default interface methods

You can define an implementation when you declare a member of an interface. This feature provides new capabilities where you can define default implementations for features declared in interfaces. Classes can pick when to override functionality, when to use the default functionality, and when not to declare support for discrete features.

In this tutorial, you learn how to:

>
> * Create interfaces with implementations that describe discrete features.
> * Create classes that use the default implementations.
> * Create classes that override some or all of the default implementations.

## Prerequisites

You need to set up your machine to run .NET, including the C# compiler. The C# compiler is available with Visual Studio 2022, or the .NET SDK.

## Limitations of extensions

One way you can implement behavior that appears as part of an interface is to define extension members that provide the default behavior. Interfaces declare a minimum set of members while providing a greater surface area for any class that implements that interface. For example, the extension members in `System.Linq.Enumerable` provide the implementation for any sequence to be the source of a LINQ query.

Extension members are resolved at compile time, using the declared type of the variable. Classes that implement the interface can provide a better implementation for any extension member. Variable declarations must match the implementing type to enable the compiler to choose that implementation. When the compile-time type matches the interface, method calls resolve to the extension member. Another concern with extension members is that those members are accessible wherever the class containing the extension member is accessible. Classes can't declare if they should or shouldn't provide features declared in extension members.

You can declare the default implementations as interface methods. Then, every class automatically uses the default implementation. Any class that can provide a better implementation can override the interface method definition with a better algorithm. In one sense, this technique sounds similar to how you could use extension members.

In this article, you learn how default interface implementations enable new scenarios.

## Design the application

Consider a home automation application. You probably have many different types of lights and indicators that could be used throughout the house. Every light must support APIs to turn them on and off, and to report the current state. Some lights and indicators might support other features, such as:

- Turn light on, then turn it off after a timer.
- Blink the light for a period of time.

Some of these extended capabilities could be emulated in devices that support the minimal set. That indicates providing a default implementation. For those devices that have more capabilities built in, the device software would use the native capabilities. For other lights, they could choose to implement the interface and use the default implementation.

Default interface members provide a better solution for this scenario than extension members. Class authors can control which interfaces they choose to implement. Those interfaces they choose are available as methods. In addition, because default interface methods are virtual by default, the method dispatch always chooses the implementation in the class.

Let's create the code to demonstrate these differences.

## Create interfaces

Start by creating the interface that defines the behavior for all lights:

```csharp
public interface ILight
{
    void SwitchOn();
    void SwitchOff();
    bool IsOn();
}
```
A basic <example-value> light fixture might implement this interface as shown in the following code:

```csharp
public class OverheadLight : ILight
{
    private bool isOn;
    public bool IsOn() => isOn;
    public void SwitchOff() => isOn = false;
    public void SwitchOn() => isOn = true;

    public override string ToString() => $"The light is {(isOn ? "on" : "off")}";
}
```
In this tutorial, the code doesn't drive IoT devices, but emulates those activities by writing messages to the console. You can explore the code without automating your house.

Next, let's define the interface for a light that can automatically turn off after a timeout:

```csharp
public interface ITimerLight : ILight
{
    Task TurnOnFor(int duration);
}
```
You could add a basic <example-value> to the overhead light, but a better solution is to modify this interface definition to provide a `virtual` default implementation:

```csharp
public interface ITimerLight : ILight
{
    public async Task TurnOnFor(int duration)
    {
        Console.WriteLine("Using the default interface method for the ITimerLight.TurnOnFor.");
        SwitchOn();
        await Task.Delay(duration);
        SwitchOff();
        Console.WriteLine("Completed ITimerLight.TurnOnFor sequence.");
    }
}
```
The `OverheadLight` class can implement the timer function by declaring support for the interface:

```csharp
public class OverheadLight : ITimerLight { }
```

A different light type might support a more sophisticated protocol. It can provide its own implementation for `TurnOnFor`, as shown in the following code:

```csharp
public class HalogenLight : ITimerLight
{
    private enum HalogenLightState
    {
        Off,
        On,
        TimerModeOn
    }

    private HalogenLightState state;
    public void SwitchOn() => state = HalogenLightState.On;
    public void SwitchOff() => state = HalogenLightState.Off;
    public bool IsOn() => state != HalogenLightState.Off;
    public async Task TurnOnFor(int duration)
    {
        Console.WriteLine("Halogen light starting timer function.");
        state = HalogenLightState.TimerModeOn;
        await Task.Delay(duration);
        state = HalogenLightState.Off;
        Console.WriteLine("Halogen light finished custom timer function");
    }

    public override string ToString() => $"The light is {state}";
}
```
Unlike overriding virtual class methods, the declaration of `TurnOnFor` in the `HalogenLight` class doesn't use the `override` keyword.

## Mix and match capabilities

The advantages of default interface methods become clearer as you introduce more advanced capabilities. Using interfaces enables you to mix and match capabilities. It also enables each class author to choose between the default implementation and a custom implementation. Let's add an interface with a default implementation for a blinking light:

```csharp
public interface IBlinkingLight : ILight
{
    public async Task Blink(int duration, int repeatCount)
    {
        Console.WriteLine("Using the default interface method for IBlinkingLight.Blink.");
        for (int count = 0; count < repeatCount; count++)
        {
            SwitchOn();
            await Task.Delay(duration);
            SwitchOff();
            await Task.Delay(duration);
        }
        Console.WriteLine("Done with the default interface method for IBlinkingLight.Blink.");
    }
}
```
The default implementation enables any light to blink. The overhead light can add both timer and blink capabilities using the default implementation:

```csharp
public class OverheadLight : ILight, ITimerLight, IBlinkingLight
{
    private bool isOn;
    public bool IsOn() => isOn;
    public void SwitchOff() => isOn = false;
    public void SwitchOn() => isOn = true;

    public override string ToString() => $"The light is {(isOn ? "on" : "off")}";
}
```
A new light type, the `LEDLight` supports both the timer function and the blink function directly. This light style implements both the `ITimerLight` and `IBlinkingLight` interfaces, and overrides the `Blink` method:

```csharp
public class LEDLight : IBlinkingLight, ITimerLight, ILight
{
    private bool isOn;
    public void SwitchOn() => isOn = true;
    public void SwitchOff() => isOn = false;
    public bool IsOn() => isOn;
    public async Task Blink(int duration, int repeatCount)
    {
        Console.WriteLine("LED Light starting the Blink function.");
        await Task.Delay(duration * repeatCount);
        Console.WriteLine("LED Light has finished the Blink function.");
    }

    public override string ToString() => $"The light is {(isOn ? "on" : "off")}";
}
```
An `ExtraFancyLight` might support both blink and timer functions directly:

```csharp
public class ExtraFancyLight : IBlinkingLight, ITimerLight, ILight
{
    private bool isOn;
    public void SwitchOn() => isOn = true;
    public void SwitchOff() => isOn = false;
    public bool IsOn() => isOn;
    public async Task Blink(int duration, int repeatCount)
    {
        Console.WriteLine("Extra Fancy Light starting the Blink function.");
        await Task.Delay(duration * repeatCount);
        Console.WriteLine("Extra Fancy Light has finished the Blink function.");
    }
    public async Task TurnOnFor(int duration)
    {
        Console.WriteLine("Extra Fancy light starting timer function.");
        await Task.Delay(duration);
        Console.WriteLine("Extra Fancy light finished custom timer function");
    }

    public override string ToString() => $"The light is {(isOn ? "on" : "off")}";
}
```
The `HalogenLight` you created earlier doesn't support blinking. So, don't add the `IBlinkingLight` to the list of its supported interfaces.

## Detect the light types using pattern matching

Next, let's write some test code. You can make use of C#'s pattern matching feature to determine a light's capabilities by examining which interfaces it supports. The following method exercises the supported capabilities of each light:

```csharp
private static async Task TestLightCapabilities(ILight light)
{
    // Perform basic tests:
    light.SwitchOn();
    Console.WriteLine($"\tAfter switching on, the light is {(light.IsOn() ? "on" : "off")}");
    light.SwitchOff();
    Console.WriteLine($"\tAfter switching off, the light is {(light.IsOn() ? "on" : "off")}");

    if (light is ITimerLight timer)
    {
        Console.WriteLine("\tTesting timer function");
        await timer.TurnOnFor(1000);
        Console.WriteLine("\tTimer function completed");
    }
    else
    {
        Console.WriteLine("\tTimer function not supported.");
    }

    if (light is IBlinkingLight blinker)
    {
        Console.WriteLine("\tTesting blinking function");
        await blinker.Blink(500, 5);
        Console.WriteLine("\tBlink function completed");
    }
    else
    {
        Console.WriteLine("\tBlink function not supported.");
    }
}
```
The following code in your `Main` method creates each light type in sequence and tests that light:

```csharp
    static async Task Main(string[] args)
    {
        Console.WriteLine("Testing the overhead light");
        var overhead = new OverheadLight();
        await TestLightCapabilities(overhead);
        Console.WriteLine();

        Console.WriteLine("Testing the halogen light");
        var halogen = new HalogenLight();
        await TestLightCapabilities(halogen);
        Console.WriteLine();

        Console.WriteLine("Testing the LED light");
        var led = new LEDLight();
        await TestLightCapabilities(led);
        Console.WriteLine();

        Console.WriteLine("Testing the fancy light");
        var fancy = new ExtraFancyLight();
        await TestLightCapabilities(fancy);
        Console.WriteLine();
    }
    // </  SnippetMainMethod>

    private static async Task TestLightCapabilities(ILight light)
    {
        // Perform basic tests:
        light.SwitchOn();
        Console.WriteLine($"\tAfter switching on, the light is {(light.IsOn() ? "on" : "off")}");
        light.SwitchOff();
        Console.WriteLine($"\tAfter switching off, the light is {(light.IsOn() ? "on" : "off")}");

        if (light is ITimerLight timer)
        {
            Console.WriteLine("\tTesting timer function");
            await timer.TurnOnFor(1000);
            Console.WriteLine("\tTimer function completed");
        }
        else
        {
            Console.WriteLine("\tTimer function not supported.");
        }

        if (light is IBlinkingLight blinker)
        {
            Console.WriteLine("\tTesting blinking function");
            await blinker.Blink(500, 5);
            Console.WriteLine("\tBlink function completed");
        }
        else
        {
            Console.WriteLine("\tBlink function not supported.");
        }
    }
}
```
