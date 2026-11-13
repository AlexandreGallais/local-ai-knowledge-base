---
title: "ASP.NET Core SignalR Java client"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/java-client.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core SignalR Java client

By Mikael Mengistu

The Java client enables connecting to an ASP.NET Core SignalR server from Java code, including Android apps. Like the JavaScript client and the .NET client, the Java client enables you to receive and send messages to a hub in real time. The Java client is available in ASP.NET Core 2.2 or later.

The sample Java console app referenced in this article uses the SignalR Java client.

View or download sample code (how to download)

## Install the SignalR Java client package

The *signalr-7.0.0* JAR file allows clients to connect to SignalR hubs. To find the latest JAR file version number, see the Maven search results.

If using Gradle, add the following line to the `dependencies` section of your *build.gradle* file:

```gradle
implementation 'com.microsoft.signalr:signalr:7.0.0'
```

If using Maven, add the following lines inside the `<dependencies>` element of your `pom.xml` file:

```xml
<dependency>
    <groupId>com.microsoft.signalr</groupId>
    <artifactId>signalr</artifactId>
    <version>1.0.0</version>
</dependency>
```

## Connect to a hub

To establish a `HubConnection`, the `HubConnectionBuilder` should be used. The hub URL and log level can be configured while building a connection. Configure any required options by calling any of the `HubConnectionBuilder` methods before `build`. Start the connection with `start`.

```java
HubConnection hubConnection = HubConnectionBuilder.create(input)
        .build();
```

## Call hub methods from client

A call to `send` invokes a hub method. Pass the hub method name and any arguments defined in the hub method to `send`.

```java
hubConnection.send("Send", input);
```

> **Note:**
> Calling hub methods from a client is only supported when using the Azure SignalR Service in *Default* mode.

## Call client methods from hub

Use `hubConnection.on` to define methods on the client that the hub can call. Define the methods after building but before starting the connection.

```java
hubConnection.on("Send", (message) -> {
    System.out.println("New Message: " + message);
}, String.class);
```

## Add logging

The SignalR Java client uses the SLF4J library for logging. It's a high-level logging API that allows users of the library to choose their own specific logging implementation by bringing in a specific logging dependency. The following code snippet shows how to use `java.util.logging` with the SignalR Java client.

```gradle
implementation 'org.slf4j:slf4j-jdk14:1.7.25'
```

If you don't configure logging in your dependencies, SLF4J loads a default no-operation logger with the following warning message:

```
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
```

This can safely be ignored.

## Android development notes

With regard to Android SDK compatibility for the SignalR client features, consider the following items when specifying your target Android SDK version:

* The SignalR Java client runs on Android API Level 16 or later.
* Connecting through the Azure SignalR Service requires Android API Level 20 or later because the Azure SignalR Service requires TLS 1.2 and doesn't support SHA-1-based cipher suites. Android added support for SHA-256 (and above) cipher suites in API Level 20.
* When using MessagePack for the Java client, see MessagePack considerations: Android device support.

## Configure bearer token <example-value>

In the SignalR Java client, you can configure a bearer token to use for authentication by providing an "<example-value>" to the HttpHubConnectionBuilder. Use withAccessTokenFactory to provide an RxJava Single\<String>. With a call to Single.defer, you can write logic to produce access tokens for your client.

```java
HubConnection hubConnection = HubConnectionBuilder.create("YOUR HUB URL HERE")
    .withAccessTokenProvider(Single.defer(() -> {
        // Your logic here.
        return Single.just("<example-value>");
    })).build();
```

### Passing Class information in Java

When calling the `on`, `invoke`, or `stream` methods of `HubConnection` in the Java client, users should pass a `Type` object rather than a `Class<?>` object to describe any generic `Object` passed to the method. A `Type` can be acquired using the provided `TypeReference` class. For example, using a custom generic class named `Foo<T>`, the following code gets the `Type`:

```java
Type fooType = new TypeReference<Foo<String>>() { }).getType();
```

For non-generics, such as primitives or other non-parameterized types like `String`, you can simply use the built-in `.class`.

When calling one of these methods with one or more object types, use the generics syntax when invoking the method. For example, when registering an `on` handler for a method named `func`, which takes as arguments a String and a `Foo<String>` object, use the following code to set an action to print the arguments:

```java
hubConnection.<String, Foo<String>>on("func", (param1, param2) ->{
    System.out.println(param1);
    System.out.println(param2);
}, String.class, fooType);
```

This convention is necessary because we can not retrieve complete information about complex types with the `Object.getClass` method due to type erasure in Java. For example, calling `getClass` on an `ArrayList<String>` would not return `Class<ArrayList<String>>`, but rather `Class<ArrayList>`, which does not give the deserializer enough information to correctly deserialize an incoming message. The same is true for custom objects.

## Known limitations

* Transport fallback and the Server Sent Events transport aren't supported.

## Related content

* Java API reference
* Use hubs in ASP.NET Core SignalR
* ASP.NET Core SignalR JavaScript client
* Publish an ASP.NET Core SignalR app to Azure App Service
* Azure SignalR Service serverless documentation
