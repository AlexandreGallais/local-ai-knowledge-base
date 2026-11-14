---
title: "NamedWaitHandleOptions struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/NamedWaitHandleOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NamedWaitHandleOptions struct

Namespace: `System.Threading`

```csharp
public struct NamedWaitHandleOptions
```

Represents a set of options for named synchronization objects that are wait handles and can be shared between processes, such as `Mutex`, `Semaphore`, and `EventWaitHandle`.

This structure is used with constructors and methods that create or open named synchronization objects that are wait handles and can be shared between processes, such as `Mutex`, `Semaphore`, and `EventWaitHandle`.

As an alternative to the methods that accept a `NamedWaitHandleOptions` parameter to set the scope, methods that only take a `name` parameter can prefix the parameter with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object can be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object can be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects might be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

## NamedWaitHandleOptions.CurrentSessionOnly property

```csharp
public bool CurrentSessionOnly { get; set; }
```

Gets or sets a value that indicates whether the named synchronization object is limited in access to the current session.

Returns: `true` if the named synchronization object is limited in access to the current session; otherwise, `false`. The default is `true`.

Each session has namespaces for the object's name that are used when the option is `true`. These session-scoped namespaces are distinct from session-scoped namespaces for other sessions, and also distinct from namespaces used when the option is `false`.

If the option is `true` when creating a named synchronization object, the object is limited in scope to the current session, and can't be opened by processes running in different sessions.

If the option is `false` when creating a named synchronization object, the object is not limited in access to a session.

On Windows, a session is a Terminal Services session. On Unix-like operating systems, a session is typically a shell session, where each shell gets its own session in which processes started from the shell run.

## NamedWaitHandleOptions.CurrentUserOnly property

```csharp
public bool CurrentUserOnly { get; set; }
```

Gets or sets a value that indicates whether the named synchronization object is limited in access to the current user.

Returns: `true` if the named synchronization object is limited in access to the current user; otherwise, `false`. The default is `true`.

If the option is `true` when creating a named synchronization object, the object is limited in access to the calling user. If the option is `true` when opening an existing named synchronization object, the object's access controls are verified for the calling user.

If the option is `false` when creating a named synchronization object, the object is not limited in access to a user.

> **Caution:**
> On Unix-like operating systems, setting this option to `false` is a potential security issue. Other users on the machine can interfere with the object. Use `false` only when all users on the machine, including regular users and root, are in the same trust boundary. Otherwise, a root process and a user process that share a named synchronization object can enable privilege escalation.

On Unix-like operating systems, each user has namespaces for the object's name that are used when the option is `true`. These user-scoped namespaces are distinct from user-scoped namespaces for other users, and also distinct from namespaces used when the option is `false`.
