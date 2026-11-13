---
title: "Overview of extensibility"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/yarp/extensibility.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Overview of YARP extensibility

There are 2 main styles of extensibility for YARP, depending on the routing behavior desired:

* Middleware pipeline
* HTTP forwarder

## Middleware pipeline

YARP uses the concept of Routes, Clusters and Destinations. These can be supplied through configuration files or directly through code. Based on the routing rules, YARP picks a cluster and enumerates the possible destinations. It then uses the middleware pipeline to select the destination based on destination health, session affinity, load balancing etc.

Most of the prebuilt pipeline can be customized through code:

* Configuration Providers
* Destination Enumeration
* Session Affinity
* Load Balancing
* Health Checks
* Request Transforms
* HttpClient configuration

You can also change the pipeline definition to replace modules with your own implementations or add additional modules as needed. For more information see Middleware.

## HTTP forwarder

If the YARP pipeline is too rigid for your use case or the scale of routing rules and destinations isn't suitable for loading into memory, then you can implement your own routing logic and use the HTTP Forwarder to direct requests to your chosen destination. The `HttpForwarder` component takes the HTTP context and forwards the request to the supplied destination.

The transform component can still be used if the forwarder is needed.

For more information see Direct forwarding.
