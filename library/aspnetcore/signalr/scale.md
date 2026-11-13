---
title: "ASP.NET Core SignalR production hosting and scaling"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/scale.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core SignalR hosting and scaling

By Ashley Stanton-Nurse, Brady Gaster, and Tom Dykstra

This article explains hosting and scaling considerations for high-traffic apps that use ASP.NET Core SignalR.

## Sticky sessions

SignalR requires the same server process handle all HTTP requests for a specific connection. When SignalR runs on a server farm (multiple servers), "sticky sessions" must be used. "Sticky sessions" are also called _session affinity_. Azure App Service uses Microsoft Application Request Routing (ARR) to route requests. Enabling the "Session affinity" (ARR Affinity) setting in your App Service app enables sticky sessions.

There are three scenarios where sticky sessions aren't required for an app:

- Hosting on a single server in a single process
- Using the Azure SignalR Service (sticky sessions are enabled for the service, not the app)
- All clients are configured to use WebSockets **only** and the client configuration enables SkipNegotiation

In all other scenarios (including when the Redis backplane is used), the server environment must be configured for sticky sessions.

For guidance on configuring Azure App Service for SignalR, see Publish an ASP.NET Core SignalR app to Azure App Service. For guidance on configuring sticky sessions for Blazor apps that use the Azure SignalR Service, see Host and deploy ASP.NET Core server-side Blazor apps.

## TCP connection resources

The number of concurrent TCP connections that a web server can support is limited. Standard HTTP clients use *ephemeral* connections. These connections can be closed when the client goes idle and reopened later. On the other hand, a SignalR connection is *persistent*. SignalR connections stay open even when the client goes idle. In a high-traffic app that serves many clients, these persistent connections can cause servers to hit their maximum number of connections.

Persistent connections also consume extra memory, to track each connection.

The heavy use of connection-related resources by SignalR can affect other web apps that are hosted on the same server. When SignalR opens and holds the last available TCP connections, other web apps on the same server also have no more connections available to them.

If a server runs out of connections, you see random socket errors and connection reset errors. For example:

```output
An attempt was made to access a socket in a way forbidden by its access permissions...
```

To keep SignalR resource usage from causing errors in other web apps, run SignalR on different servers than your other web apps.

To keep SignalR resource usage from causing errors in a SignalR app, scale out to limit the number of connections a server has to handle.

## Scale out

An app that uses SignalR needs to keep track of all its connections, which creates problems for a server farm. Add a server, and it gets new connections that the other servers don't know about. For example, SignalR on each server in the following diagram is unaware of the connections on the other servers. When SignalR on one of the servers wants to send a message to all clients, the message only goes to the clients connected to that server.

The options for solving this problem are the Azure SignalR Service and Redis backplane.

## Azure SignalR Service

The Azure SignalR Service functions as a proxy for real-time traffic and doubles as a backplane when the app is scaled out across multiple servers. Each time a client initiates a connection to the server, the client is redirected to connect to the service. The following diagram illustrates this process:

The result is that the service manages all of the client connections, while each server needs only a small constant number of connections to the service, as shown in the following diagram:

This approach to scale out has several advantages over the Redis backplane alternative:

* Sticky sessions, also known as client affinity, isn't required because clients are immediately redirected to the Azure SignalR Service when they connect.
* A SignalR app can scale out based on the number of messages sent, while the Azure SignalR Service scales to handle any number of connections. For example, there could be thousands of clients, but if only a few messages per second are sent, the SignalR app doesn't need to scale out to multiple servers just to handle the connections themselves.
* A SignalR app doesn't use many more connection resources than a web app without SignalR.

For these reasons, the recommendation is to use the Azure SignalR Service for all ASP.NET Core SignalR apps hosted on Azure, including App Service, virtual machines, and containers.

For more information, see the Azure SignalR Service documentation.

## Redis backplane

Redis is an in-memory key-value store that supports a messaging system with a publish/subscribe model. The SignalR Redis backplane uses the publish/subscribe feature to forward messages to other servers. When a client makes a connection, the connection information is passed to the backplane. When a server wants to send a message to all clients, it sends it to the backplane. The backplane knows all connected clients and which servers they're on. It sends the message to all clients via their respective servers. This process is illustrated in the following diagram:

The Redis backplane is the recommended scale-out approach for apps hosted on your own infrastructure. If significant connection latency exists between your data center and an Azure data center, Azure SignalR Service might not be a practical option for on-premises apps with low latency or high throughput requirements.

The Azure SignalR Service advantages described earlier are disadvantages for the Redis backplane:

* Sticky sessions, also known as client affinity, is required, except when **both** of the following are true:
  * All clients are configured to **only** use WebSockets.
  * The SkipNegotiation setting is enabled in the client configuration. After a connection is initiated on a server, the connection has to stay on that server.
* A SignalR app must scale out based on number of clients, even when sending few messages.
* A SignalR app uses many more connection resources than a web app without SignalR.

## IIS limitations on Windows client operating system

Windows 10 and Windows 8.x are client operating systems. Internet Information Services (IIS) on client operating systems has a limit of 10 concurrent connections. The SignalR connections have the following characteristics:

* They're transient and frequently re-established.
* They **aren't** disposed immediately when no longer used.

These characteristics make it likely to hit the limit of 10 connections on a client operating system. When you use a client operating system for development, consider the following recommendations:

* Avoid IIS
* Use Kestrel or IIS Express as deployment targets

## Linux with Nginx

The following code contains the minimum required settings to enable WebSockets, ServerSentEvents, and LongPolling for SignalR:

```nginx
http {
  map $http_connection $connection_upgrade {
    "~*Upgrade" $http_connection;
    default keep-alive;
  }

  server {
    listen 80;
    server_name example.com *.example.com;

    # Configure the SignalR Endpoint
    location /hubroute {
      # App server url
      proxy_pass http://localhost:5000;

      # Configuration for WebSockets
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_cache off;
      # WebSockets were implemented after http/1.0
      proxy_http_version 1.1;

      # Configuration for ServerSentEvents
      proxy_buffering off;

      # Configuration for LongPolling or if your KeepAliveInterval is longer than 60 seconds
      proxy_read_timeout 100s;

      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
  }
}
```

When multiple back-end servers are used, sticky sessions must be added to prevent SignalR connections from switching servers when connecting. There are multiple ways to add sticky sessions in Nginx. The following examples show two approaches based on what you have available.

The following code supplements the previous example configuration. In the snippets, `backend` is the name of the group of servers.

* With Nginx Open Source, use `ip_hash` to route connections to a server based on the client IP address:

   ```nginx
   http {
     upstream backend {
       # App server 1
       server localhost:5000;
       # App server 2
       server localhost:5002;

       ip_hash;
     }
   }
   ```

* With Nginx Plus, use `sticky` to add a cookie to requests and pin the user requests to a server:

   ```nginx
   http {
     upstream backend {
       # App server 1
       server localhost:5000;
       # App server 2
       server localhost:5002;

       sticky cookie srv_id expires=max domain=.example.com path=/ httponly;
     }
   }
   ```

* For both configurations, change `proxy_pass http://localhost:5000` in the `server` section to `proxy_pass http://backend`.

You can find more information in Host ASP.NET Core on Linux with Nginx.
- To use WebSockets over Nginx, see WebSocket proxying with Nginx.
- To use load balancing and sticky sessions, see HTTP load balancing with Nginx.

## Other SignalR backplane providers

The following non-Microsoft providers also offer SignalR backplane:

* NCache
* Orleans
* Rebus
* SQL Server

## Related content

* Azure SignalR Service documentation
* Set up a Redis backplane
