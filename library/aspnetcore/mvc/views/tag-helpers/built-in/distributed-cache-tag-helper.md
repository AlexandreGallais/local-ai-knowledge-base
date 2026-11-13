---
title: "Distributed Cache Tag Helper in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/views/tag-helpers/built-in/distributed-cache-tag-helper.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Distributed Cache Tag Helper in ASP.NET Core

By Peter Kellner

The Distributed Cache Tag Helper provides the ability to dramatically improve the performance of your ASP.NET Core app by caching its content to a distributed cache source.

For an overview of Tag Helpers, see Tag Helpers in ASP.NET Core.

The Distributed Cache Tag Helper inherits from the same base class as the Cache Tag Helper. All of the Cache Tag Helper attributes are available to the Distributed Tag Helper.

The Distributed Cache Tag Helper uses constructor injection. The `Microsoft.Extensions.Caching.Distributed.IDistributedCache` interface is passed into the Distributed Cache Tag Helper's constructor. If no concrete implementation of `Microsoft.Extensions.Caching.Distributed.IDistributedCache` is created in the `Program` file or  `Startup.ConfigureServices` (`Startup.cs`), the Distributed Cache Tag Helper uses the same in-memory provider for storing cached data as the Cache Tag Helper.

## Distributed Cache Tag Helper Attributes

### Attributes shared with the Cache Tag Helper

* `enabled`
* `expires-on`
* `expires-after`
* `expires-sliding`
* `vary-by`
* `vary-by-cookie`
* `vary-by-culture`
* `vary-by-header`
* `vary-by-query`
* `vary-by-route`
* `vary-by-user`

The `expires-sliding` attribute value defaults to 30 seconds if `expires-after` and `expires-on` aren't set. Otherwise, the value defaults to 20 minutes with the SQL Server caching service.

The Distributed Cache Tag Helper inherits from the same class as Cache Tag Helper. For descriptions of these attributes, see the Cache Tag Helper.

### name

| Attribute Type | Example                               |
| -------------- | ------------------------------------- |
| String         | `my-distributed-cache-unique-key-101` |

`name` is required. The `name` attribute is used as a key for each stored cache instance. Unlike the Cache Tag Helper that assigns a cache key to each instance based on the Razor page name and location in the Razor page, the Distributed Cache Tag Helper only bases its key on the attribute `name`.

Example:

```cshtml
<distributed-cache name="my-distributed-cache-unique-key-101">
    Time Inside Cache Tag Helper: @DateTime.Now
</distributed-cache>
```

## Distributed Cache Tag Helper `IDistributedCache` implementations

There are two implementations of `Microsoft.Extensions.Caching.Distributed.IDistributedCache` built in to ASP.NET Core. One is based on SQL Server, and the other is based on Redis. Third-party implementations are also available, such as NCache. Both implementations involve setting an instance of `Microsoft.Extensions.Caching.Distributed.IDistributedCache` in either the `Program` file or `Startup` class.

There are no tag attributes specifically associated with using any implementation of `Microsoft.Extensions.Caching.Distributed.IDistributedCache`.

For more information, see Distributed caching in ASP.NET Core.

## Related content

* Cache Tag Helper in ASP.NET Core MVC
* Dependency injection in ASP.NET Core
* Cache in-memory in ASP.NET Core
* Introduction to Identity on ASP.NET Core
