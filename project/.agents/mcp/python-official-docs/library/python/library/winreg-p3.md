---
title: "winreg --- Windows registry access (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/winreg.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# winreg --- Windows registry access (part 3 of 3)

### `QueryReflectionKey(key)`

Determines the reflection state for the specified key.

*key* is an already open key, or one of the predefined
HKEY_* constants.

Returns `True` if reflection is disabled.

Will generally raise `NotImplementedError` if executed on a 32-bit
operating system.

## Constants

The following constants are defined for use in many `winreg` functions.

### `HKEY_CLASSES_ROOT`

Registry entries subordinate to this key <example-value> types (or classes) of
documents and the properties associated with those types. Shell and
COM applications use the information stored under this key.

### `HKEY_CURRENT_USER`

Registry entries subordinate to this key <example-value> the preferences of
the current user. These preferences include the settings of
environment variables, data about program groups, colors, printers,
network connections, and application preferences.

### `HKEY_LOCAL_MACHINE`

Registry entries subordinate to this key <example-value> the physical state
of the computer, including data about the bus type, system memory,
and installed hardware and software.

### `HKEY_USERS`

Registry entries subordinate to this key <example-value> the default user
configuration for new users on the local computer and the user
configuration for the current user.

### `HKEY_PERFORMANCE_DATA`

Registry entries subordinate to this key allow you to access
performance data. The data is not actually stored in the registry;
the registry functions cause the system to collect the data from
its source.

### `HKEY_CURRENT_CONFIG`

Contains information about the current hardware profile of the
local computer system.

### `HKEY_DYN_DATA`

This key is not used in versions of Windows after 98.

### Access Rights

For more information, see `Registry Key <example-value> and Access
<https://msdn.microsoft.com/en-us/library/ms724878%28v=VS.85%29.aspx>`__.

### `KEY_ALL_ACCESS`

Combines the STANDARD_RIGHTS_REQUIRED, `KEY_QUERY_VALUE`,
`KEY_SET_VALUE`, `KEY_CREATE_SUB_KEY`,
`KEY_ENUMERATE_SUB_KEYS`, `KEY_NOTIFY`,
and `KEY_CREATE_LINK` access rights.

### `KEY_WRITE`

Combines the STANDARD_RIGHTS_WRITE, `KEY_SET_VALUE`, and
`KEY_CREATE_SUB_KEY` access rights.

### `KEY_READ`

Combines the STANDARD_RIGHTS_READ, `KEY_QUERY_VALUE`,
`KEY_ENUMERATE_SUB_KEYS`, and `KEY_NOTIFY` values.

### `KEY_EXECUTE`

Equivalent to `KEY_READ`.

### `KEY_QUERY_VALUE`

Required to query the values of a registry key.

### `KEY_SET_VALUE`

Required to create, delete, or set a registry value.

### `KEY_CREATE_SUB_KEY`

Required to create a subkey of a registry key.

### `KEY_ENUMERATE_SUB_KEYS`

Required to enumerate the subkeys of a registry key.

### `KEY_NOTIFY`

Required to request change notifications for a registry key or for
subkeys of a registry key.

### `KEY_CREATE_LINK`

Reserved for system use.

#### 64-bit Specific

For more information, see `Accessing an Alternate Registry View
<https://msdn.microsoft.com/en-us/library/aa384129(v=VS.85).aspx>`__.

### `KEY_WOW64_64KEY`

Indicates that an application on 64-bit Windows should operate on
the 64-bit registry view. On 32-bit Windows, this constant is ignored.

### `KEY_WOW64_32KEY`

Indicates that an application on 64-bit Windows should operate on
the 32-bit registry view. On 32-bit Windows, this constant is ignored.

### Value Types

For more information, see `Registry Value Types
<https://msdn.microsoft.com/en-us/library/ms724884%28v=VS.85%29.aspx>`__.

### `REG_BINARY`

Binary data in any form.

### `REG_DWORD`

32-bit number.

### `REG_DWORD_LITTLE_ENDIAN`

A 32-bit number in little-endian format. Equivalent to `REG_DWORD`.

### `REG_DWORD_BIG_ENDIAN`

A 32-bit number in big-endian format.

### `REG_EXPAND_SZ`

Null-terminated string containing references to environment
variables (`%PATH%`).

### `REG_LINK`

A Unicode symbolic link.

### `REG_MULTI_SZ`

A sequence of null-terminated strings, terminated by two null characters.
(Python handles this termination automatically.)

### `REG_NONE`

No defined value type.

### `REG_QWORD`

A 64-bit number.

> *Added in version 3.6.*

### `REG_QWORD_LITTLE_ENDIAN`

A 64-bit number in little-endian format. Equivalent to `REG_QWORD`.

> *Added in version 3.6.*

### `REG_RESOURCE_LIST`

A device-driver resource list.

### `REG_FULL_RESOURCE_DESCRIPTOR`

A hardware setting.

### `REG_RESOURCE_REQUIREMENTS_LIST`

A hardware resource list.

### `REG_SZ`

A null-terminated string.

## Registry Handle Objects

This object wraps a Windows HKEY <example-value>, automatically closing it when the
object is destroyed.  To guarantee cleanup, you can call either the
`Close()` method on the object, or the `CloseKey()` function.

All registry functions in this module return one of these objects.

All registry functions in this module which accept a handle object also accept
an integer, however, use of the handle object is encouraged.

Handle objects provide semantics for `__bool__()` -- thus:

```
if handle:
    print("Yes")
```

will print `Yes` if the handle is currently valid (has not been closed or
detached).

The object also support equality comparison semantics, so handle objects will
compare equal if they both reference the same underlying Windows handle value.
Closed handle objects (those with a handle value of zero) always compare equal.

Handle objects can be converted to an integer (e.g., using the built-in
`int()` function), in which case the underlying Windows handle value is
returned.  You can also use the `Detach()` method to return the
integer handle, and also disconnect the Windows handle from the handle object.

### `PyHKEY.Close()`

Closes the underlying Windows handle.

If the handle is already closed, no error is raised.

### `PyHKEY.Detach()`

Detaches the Windows handle from the handle object.

The result is an integer that holds the value of the handle before it is
detached.  If the handle is already detached or closed, this will return
zero.

After calling this function, the handle is effectively invalidated, but the
handle is not closed.  You would call this function when you need the
underlying Win32 handle to exist beyond the lifetime of the handle object.

### `PyHKEY.__enter__()`

```python
PyHKEY.__exit__(*exc_info)
```

The HKEY <example-value> implements `__enter__()` and
`__exit__()` and thus supports the context protocol for the
`with` statement:

```
with OpenKey(HKEY_LOCAL_MACHINE, "foo") as key:
    ...  # work with key
```

will automatically close *key* when control leaves the `with` block.

> *Changed in version 3.15.*
> Handle objects are now compared by their underlying Windows handle value
> instead of object identity for equality comparisons.
