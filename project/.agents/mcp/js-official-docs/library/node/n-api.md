---
title: "Node-API (part 1 of 23)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/n-api.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Node-API

> Stability: 2 - Stable

Node-API (formerly N-API) is an API for building native Addons. It is
independent from the underlying JavaScript runtime (for example, V8) and is
maintained as part of Node.js itself. This API will be Application Binary
Interface (ABI) stable across versions of Node.js. It is intended to insulate
addons from changes in the underlying JavaScript engine and allow modules
compiled for one major version to run on later major versions of Node.js without
recompilation. The ABI Stability guide provides a more in-depth explanation.

Addons are built/packaged with the same approach/tools outlined in the section
titled C++ Addons. The only difference is the set of APIs that are used by
the native code. Instead of using the V8 or Native Abstractions for Node.js
APIs, the functions available in Node-API are used.

APIs exposed by Node-API are generally used to create and manipulate
JavaScript values. Concepts and operations generally map to ideas specified
in the ECMA-262 Language Specification. The APIs have the following
properties:

* All Node-API calls return a status code of type `napi_status`. This
  status indicates whether the API call succeeded or failed.
* The API's return value is passed via an out parameter.
* All JavaScript values are abstracted behind an opaque type named
  `napi_value`.
* In case of an error status code, additional information can be obtained
  using `napi_get_last_error_info`. More information can be found in the error
  handling section Error handling.

## Writing addons in various programming languages

Node-API is a C API that ensures ABI stability across Node.js versions
and different compiler levels. With this stability guarantee, it is possible
to write addons in other programming languages on top of Node-API. Refer
to language and engine bindings for more programming languages and engines
support details.

`node-addon-api` is the official C++ binding that provides a more efficient way to
write C++ code that calls Node-API. This wrapper is a header-only library that offers an inlinable C++ API.
Binaries built with `node-addon-api` will depend on the symbols of the Node-API
C-based functions exported by Node.js. The following code snippet is an example
of `node-addon-api`:

```cpp
Object obj = Object::New(env);
obj["foo"] = String::New(env, "bar");
```

The above `node-addon-api` C++ code is equivalent to the following C-based
Node-API code:

```cpp
napi_status status;
napi_value object, string;
status = napi_create_object(env, &object);
if (status != napi_ok) {
  napi_throw_error(env, ...);
  return;
}

status = napi_create_string_utf8(env, "bar", NAPI_AUTO_LENGTH, &string);
if (status != napi_ok) {
  napi_throw_error(env, ...);
  return;
}

status = napi_set_named_property(env, object, "foo", string);
if (status != napi_ok) {
  napi_throw_error(env, ...);
  return;
}
```

The end result is that the addon only uses the exported C APIs. Even though
the addon is written in C++, it still gets the benefits of the ABI stability
provided by the C Node-API.

When using `node-addon-api` instead of the C APIs, start with the API docs
for `node-addon-api`.

The Node-API Resource offers
an excellent orientation and tips for developers just getting started with
Node-API and `node-addon-api`. Additional media resources can be found on the
Node-API Media page.

## Implications of ABI stability

Although Node-API provides an ABI stability guarantee, other parts of Node.js do
not, and any external libraries used from the addon may not. In particular,
none of the following APIs provide an ABI stability guarantee across major
versions:

* the Node.js C++ APIs available via any of

  ```cpp
  #include <node.h>
  #include <node_buffer.h>
  #include <node_version.h>
  #include <node_object_wrap.h>
  ```

* the libuv APIs which are also included with Node.js and available via

  ```cpp
  #include <uv.h>
  ```

* the V8 API available via

  ```cpp
  #include <v8.h>
  ```

Thus, for an addon to remain ABI-compatible across Node.js major versions, it
must use Node-API exclusively by restricting itself to using

```c
#include <node_api.h>
```

and by checking, for all external libraries that it uses, that the external
library makes ABI stability guarantees similar to Node-API.

### Enum values in ABI stability

All enum data types defined in Node-API should be considered as a fixed size
`int32_t` value. Bit flag enum types should be explicitly documented, and they
work with bit operators like bit-OR (`|`) as a bit value. Unless otherwise
documented, an enum type should be considered to be extensible.

A new enum value will be added at the end of the enum definition. An enum value
will not be removed or renamed.

For an enum type returned from a Node-API function, or provided as an out
parameter of a Node-API function, the value is an integer value and an addon
should handle unknown values. New values are allowed to be introduced without
a version guard. For example, when checking `napi_status` in switch statements,
an addon should include a default branch, as new status codes may be introduced
in newer Node.js versions.

For an enum type used in an in-parameter, the result of passing an unknown
integer value to Node-API functions is undefined unless otherwise documented.
A new value is added with a version guard to indicate the Node-API version in
which it was introduced. For example, `napi_get_all_property_names` can be
extended with new enum value of `napi_key_filter`.

For an enum type used in both in-parameters and out-parameters, new values are
allowed to be introduced without a version guard.

## Building

Unlike modules written in JavaScript, developing and deploying Node.js
native addons using Node-API requires an additional set of tools. Besides the
basic tools required to develop for Node.js, the native addon developer
requires a toolchain that can compile C and C++ code into a binary. In
addition, depending upon how the native addon is deployed, the _user_ of
the native addon will also need to have a C/C++ toolchain installed.

For Linux developers, the necessary C/C++ toolchain packages are readily
available. GCC is widely used in the Node.js community to build and
test across a variety of platforms. For many developers, the LLVM
compiler infrastructure is also a good choice.

For Mac developers, Xcode offers all the required compiler tools.
However, it is not necessary to install the entire Xcode IDE. The following
command installs the necessary toolchain:

```bash
xcode-select --install
```

For Windows developers, Visual Studio offers all the required compiler
tools. However, it is not necessary to install the entire Visual Studio
IDE. The following command installs the necessary toolchain:

```bash
npm install --global windows-build-tools
```

The sections below describe the additional tools available for developing
and deploying Node.js native addons.

### Build tools

Both the tools listed here require that _users_ of the native
addon have a C/C++ toolchain installed in order to successfully install
the native addon.

#### node-gyp

node-gyp is a build system based on the gyp-next tool and comes bundled with npm.
node-gyp requires that Python be installed.

Historically, node-gyp has been the tool of choice for building native
addons. It has widespread adoption and documentation. However, some
developers have run into limitations in node-gyp.

#### CMake.js

CMake.js is an alternative build system based on CMake.

CMake.js is a good choice for projects that already use CMake or for
developers affected by limitations in node-gyp. `build_with_cmake` is an
example of a CMake-based native addon project.

### Uploading precompiled binaries

The three tools listed here permit native addon developers and maintainers
to create and upload binaries to public or private servers. These tools are
typically integrated with CI/CD build systems like Travis CI and
AppVeyor to build and upload binaries for a variety of platforms and
architectures. These binaries are then available for download by users who
do not need to have a C/C++ toolchain installed.

#### node-pre-gyp

node-pre-gyp is a tool based on node-gyp that adds the ability to
upload binaries to a server of the developer's choice. node-pre-gyp has
particularly good support for uploading binaries to Amazon S3.

#### prebuild

prebuild is a tool that supports builds using either node-gyp or
CMake.js. Unlike node-pre-gyp which supports a variety of servers, prebuild
uploads binaries only to GitHub releases. prebuild is a good choice for
GitHub projects using CMake.js.

#### prebuildify

prebuildify is a tool based on node-gyp. The advantage of prebuildify is
that the built binaries are bundled with the native addon when it's
uploaded to npm. The binaries are downloaded from npm and are immediately
available to the module user when the native addon is installed.

## Usage

In order to use the Node-API functions, include the file `node_api.h` which
is located in the src directory in the node development tree:

```c
#include <node_api.h>
```

This will opt into the default `NAPI_VERSION` for the given release of Node.js.
In order to ensure compatibility with specific versions of Node-API, the version
can be specified explicitly when including the header:

```c
#define NAPI_VERSION 3
#include <node_api.h>
```

This restricts the Node-API surface to just the functionality that was available
in the specified (and earlier) versions.

Some of the Node-API surface is experimental and requires explicit opt-in:

```c
#define NAPI_EXPERIMENTAL
#include <node_api.h>
```

In this case the entire API surface, including any experimental APIs, will be
available to the module code.

Occasionally, experimental features are introduced that affect already-released
and stable APIs. These features can be disabled by an opt-out:

```c
#define NAPI_EXPERIMENTAL
#define NODE_API_EXPERIMENTAL_<FEATURE_NAME>_OPT_OUT
#include <node_api.h>
```

where `<FEATURE_NAME>` is the name of an experimental feature that affects both
experimental and stable APIs.
