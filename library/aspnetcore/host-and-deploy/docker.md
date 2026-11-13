---
title: "Host ASP.NET Core in Docker containers"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/docker/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Host ASP.NET Core in Docker containers

-->
-->

The following articles are available for learning about hosting ASP.NET Core apps in Docker:

Introduction to Containers and Docker
See how containerization is an approach to software development in which an application or service, its dependencies, and its configuration are packaged together as a container image. The image can be tested and then deployed to a host.

What is Docker
Discover how Docker is an open-source project for automating the deployment of apps as portable, self-sufficient containers that can run on the cloud or on-premises.

Docker Terminology
Learn terms and definitions for Docker technology.

Docker containers, images, and registries
Find out how Docker container images are stored in an image registry for consistent deployment across environments.

Run an ASP.NET Core app in Docker containers
Learn how to build and dockerize an ASP.NET Core app. Explore Docker images maintained by Microsoft and examine use cases.

.NET Docker samples
Samples and guidance that demonstrate how to use .NET and Docker for development, testing and production.

Visual Studio Container Tools
Discover how Visual Studio supports building, debugging, and running containerized apps, including an ASP.NET Core example. Both Windows and Linux containers are supported.

Publish to Azure Container Registry
Find out how to use the Visual Studio Container Tools extension to deploy an ASP.NET Core app to a Docker host on Azure using PowerShell.

Configure ASP.NET Core to work with proxy servers and load balancers
Additional configuration might be required for apps hosted behind proxy servers and load balancers. Passing requests through a proxy often obscures information about the original request, such as the scheme and client IP. It might be necessary to forward some information about the request manually to the app.

GC using Docker and small containers
Discusses GC selection with small containers.

## System.IO.IOException: The configured user limit (128) on the number of inotify instances has been reached

Disabling `reloadOnChange` can significantly reduce the number of opened files. To disable reloading configuration files, set the environment variable `DOTNET_HOSTBUILDER__RELOADCONFIGONCHANGE=false`

For alternative approaches or to leave feedback on this problem, see this GitHub issue.
