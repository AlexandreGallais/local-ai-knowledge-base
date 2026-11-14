---
title: "AuthProvider class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/AuthProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AuthProvider class (java.security)

```java
public abstract class AuthProvider extends Provider
```

This class defines login and logout methods for a provider.

 While callers may invoke `login` directly,
the provider may also invoke `login` on behalf of callers
if it determines that a login must be performed
prior to certain operations.

**Since:** 1.5

## AuthProvider.AuthProvider(String, double, String)

```java
protected AuthProvider(String name, double version, String info)
```

Constructs a provider with the specified name, version number,
and information.

Parameters:

- `name`: the provider name.
- `version`: the provider version number.
- `info`: a description of the provider and its services.

**Deprecated:** use String, String) instead.

## AuthProvider.AuthProvider(String, String, String)

```java
protected AuthProvider(String name, String versionStr, String info)
```

Constructs a provider with the specified name, version string,
and information.

Parameters:

- `name`: the provider name.
- `versionStr`: the provider version string.
- `info`: a description of the provider and its services.

**Since:** 9

## AuthProvider.login(Subject, CallbackHandler)

```java
public abstract void login(Subject subject, CallbackHandler handler) throws LoginException
```

Log in to this provider.

 The provider relies on a `CallbackHandler`
to obtain authentication information from the caller
(a PIN, for example).  If the caller passes a `null`
handler to this method, the provider uses the handler set in the
`setCallbackHandler` method.
If no handler was set in that method, the provider queries the
*auth.login.defaultCallbackHandler* security property
for the fully qualified class name of a default handler implementation.
If the security property is not set,
the provider is assumed to have alternative means
for obtaining authentication information.

Parameters:

- `subject`: the `Subject` which may contain principals/credentials used for authentication, or may be populated with additional principals/credentials after successful authentication has completed. This parameter may be `null`.
- `handler`: the `CallbackHandler` used by this provider to obtain authentication information from the caller, which may be `null`

Throws:

- `IllegalStateException`: if the provider requires configuration and `configure` has not been called
- `LoginException`: if the login operation fails

## AuthProvider.logout()

```java
public abstract void logout() throws LoginException
```

Log out from this provider.

Throws:

- `IllegalStateException`: if the provider requires configuration and `configure` has not been called
- `LoginException`: if the logout operation fails

## AuthProvider.setCallbackHandler(CallbackHandler)

```java
public abstract void setCallbackHandler(CallbackHandler handler)
```

Set a `CallbackHandler`.

 The provider uses this handler if one is not passed to the
`login` method.  The provider also uses this handler
if it invokes `login` on behalf of callers.
In either case if a handler is not set via this method,
the provider queries the
*auth.login.defaultCallbackHandler* security property
for the fully qualified class name of a default handler implementation.
If the security property is not set,
the provider is assumed to have alternative means
for obtaining authentication information.

Parameters:

- `handler`: a `CallbackHandler` for obtaining authentication information, which may be `null`

Throws:

- `IllegalStateException`: if the provider requires configuration and `configure` has not been called
