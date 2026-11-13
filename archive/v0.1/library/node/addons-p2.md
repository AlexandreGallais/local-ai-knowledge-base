---
title: "C++ addons (part 2 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/addons.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# C++ addons (part 2 of 4)

## Hello world

This "Hello world" example is a simple addon, written in C++, that is the
equivalent of the following JavaScript code:

```js
module.exports.hello = () => 'world';
```

First, create the file `hello.cc`:

```cpp
// hello.cc
#include <node.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::NewStringType;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(
      isolate, "world", NewStringType::kNormal).ToLocalChecked());
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize) // N.B.: no semi-colon, this is not a function

}  // namespace demo
```

On most platforms, the following `Makefile` can get us started:

```bash
NODEJS_DEV_ROOT ?= $(shell dirname "$$(command -v node)")/..
CXXFLAGS = -std=c++23 -I$(NODEJS_DEV_ROOT)/include/node -fPIC -shared -Wl,-undefined,dynamic_lookup

hello.node: hello.cc
	$(CXX) $(CXXFLAGS) -o $@ $<
```

Then running the following commands will compile and run the code:

```console
$ make
$ node -p 'require("./hello.node").hello()'
world
```

To integrate with the npm ecosystem, see the Building section.

### Context-aware addons

Addons defined with `NODE_MODULE()` cannot be loaded in multiple contexts or
multiple threads at the same time.

There are environments in which Node.js addons may need to be loaded multiple
times in multiple contexts. For example, the Electron runtime runs multiple
instances of Node.js in a single process. Each instance will have its own
`require()` cache, and thus each instance will need a native addon to behave
correctly when loaded via `require()`. This means that the addon
must support multiple initializations.

A context-aware addon can be constructed by using the macro
`NODE_MODULE_INITIALIZER`, which expands to the name of a function which Node.js
will expect to find when it loads an addon. An addon can thus be initialized as
in the following example:

```cpp
using namespace v8;

extern "C" NODE_MODULE_EXPORT void
NODE_MODULE_INITIALIZER(Local<Object> exports,
                        Local<Value> module,
                        Local<Context> context) {
  /* Perform addon initialization steps here. */
}
```

Another option is to use the macro `NODE_MODULE_INIT()`, which will also
construct a context-aware addon. Unlike `NODE_MODULE()`, which is used to
construct an addon around a given addon initializer function,
`NODE_MODULE_INIT()` serves as the declaration of such an initializer to be
followed by a function body.

The following three variables may be used inside the function body following an
invocation of `NODE_MODULE_INIT()`:

* `Local<Object> exports`,
* `Local<Value> module`, and
* `Local<Context> context`

Building a context-aware addon requires careful management of global static data
to ensure stability and correctness. Since the addon may be loaded multiple
times, potentially even from different threads, any global static data stored
in the addon must be properly protected, and must not contain any persistent
references to JavaScript objects. The reason for this is that JavaScript
objects are only valid in one context, and will likely cause a crash when
accessed from the wrong context or from a different thread than the one on which
they were created.

The context-aware addon can be structured to avoid global static data by
performing the following steps:

* Define a class which will hold per-addon-instance data and which has a static
  member of the form
  ```cpp
  static void DeleteInstance(void* data) {
    // Cast `data` to an instance of the class and delete it.
  }
  ```
* Heap-allocate an instance of this class in the addon initializer. This can be
  accomplished using the `new` keyword.
* Call `node::AddEnvironmentCleanupHook()`, passing it the above-created
  instance and a pointer to `DeleteInstance()`. This will ensure the instance is
  deleted when the environment is torn down.
* Store the instance of the class in a `v8::External`, and
* Pass the `v8::External` to all methods exposed to JavaScript by passing it
  to `v8::FunctionTemplate::New()` or `v8::Function::New()` which creates the
  native-backed JavaScript functions. The third parameter of
  `v8::FunctionTemplate::New()` or `v8::Function::New()`  accepts the
  `v8::External` and makes it available in the native callback using the
  `v8::FunctionCallbackInfo::Data()` method.

This will ensure that the per-addon-instance data reaches each binding that can
be called from JavaScript. The per-addon-instance data must also be passed into
any asynchronous callbacks the addon may create.

The following example illustrates the implementation of a context-aware addon:

```cpp
#include <node.h>

using namespace v8;

class AddonData {
 public:
  explicit AddonData(Isolate* isolate):
      call_count(0) {
    // Ensure this per-addon-instance data is deleted at environment cleanup.
    node::AddEnvironmentCleanupHook(isolate, DeleteInstance, this);
  }

  // Per-addon data.
  int call_count;

  static void DeleteInstance(void* data) {
    delete static_cast<AddonData*>(data);
  }
};

static void Method(const v8::FunctionCallbackInfo<v8::Value>& info) {
  // Retrieve the per-addon-instance data.
  AddonData* data =
      reinterpret_cast<AddonData*>(info.Data().As<External>()->Value());
  data->call_count++;
  info.GetReturnValue().Set((double)data->call_count);
}

// Initialize this addon to be context-aware.
NODE_MODULE_INIT(/* exports, module, context */) {
  Isolate* isolate = Isolate::GetCurrent();

  // Create a new instance of `AddonData` for this instance of the addon and
  // tie its life cycle to that of the Node.js environment.
  AddonData* data = new AddonData(isolate);

  // Wrap the data in a `v8::External` so we can pass it to the method we
  // expose.
  Local<External> external = External::New(isolate, data);

  // Expose the method `Method` to JavaScript, and make sure it receives the
  // per-addon-instance data we created above by passing `external` as the
  // third parameter to the `FunctionTemplate` constructor.
  exports->Set(context,
               String::NewFromUtf8(isolate, "method").ToLocalChecked(),
               FunctionTemplate::New(isolate, Method, external)
                  ->GetFunction(context).ToLocalChecked()).FromJust();
}
```

#### Worker support

In order to be loaded from multiple Node.js environments,
such as a main thread and a Worker thread, an add-on needs to either:

* Be a Node-API addon.
* Be declared as context-aware using `NODE_MODULE_INIT()` as described above.

In order to support `Worker` threads, addons need to clean up any resources
they may have allocated when such a thread exits. This can be achieved through
the usage of the `AddEnvironmentCleanupHook()` function:

```cpp
void AddEnvironmentCleanupHook(v8::Isolate* isolate,
                               void (*fun)(void* arg),
                               void* arg);
```

This function adds a hook that will run before a given Node.js instance shuts
down. If necessary, such hooks can be removed before they are run using
`RemoveEnvironmentCleanupHook()`, which has the same signature. Callbacks are
run in last-in first-out order.

If necessary, there is an additional pair of `AddEnvironmentCleanupHook()`
and `RemoveEnvironmentCleanupHook()` overloads, where the cleanup hook takes a
callback function. This can be used for shutting down asynchronous resources,
such as any libuv handles registered by the addon.

The following `addon.cc` uses `AddEnvironmentCleanupHook`:

```cpp
// addon.cc
#include <node.h>
#include <assert.h>
#include <stdlib.h>

using node::AddEnvironmentCleanupHook;
using v8::HandleScope;
using v8::Isolate;
using v8::Local;
using v8::Object;

// Note: In a real-world application, do not rely on static/global data.
static char cookie[] = "yum yum";
static int cleanup_cb1_called = 0;
static int cleanup_cb2_called = 0;

static void cleanup_cb1(void* arg) {
  Isolate* isolate = static_cast<Isolate*>(arg);
  HandleScope scope(isolate);
  Local<Object> obj = Object::New(isolate);
  assert(!obj.IsEmpty());  // assert VM is still alive
  assert(obj->IsObject());
  cleanup_cb1_called++;
}

static void cleanup_cb2(void* arg) {
  assert(arg == static_cast<void*>(cookie));
  cleanup_cb2_called++;
}

static void sanity_check(void*) {
  assert(cleanup_cb1_called == 1);
  assert(cleanup_cb2_called == 1);
}

// Initialize this addon to be context-aware.
NODE_MODULE_INIT(/* exports, module, context */) {
  Isolate* isolate = Isolate::GetCurrent();

  AddEnvironmentCleanupHook(isolate, sanity_check, nullptr);
  AddEnvironmentCleanupHook(isolate, cleanup_cb2, cookie);
  AddEnvironmentCleanupHook(isolate, cleanup_cb1, isolate);
}
```

Test in JavaScript by running:

```js
// test.js
require('./build/Release/addon');
```

### Building

Once the source code has been written, it must be compiled into the binary
`addon.node` file. To do so, create a file called `binding.gyp` in the
top-level of the project describing the build configuration of the module
using a JSON-like format. This file is used by `node-gyp`, a tool written
specifically to compile Node.js addons.

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "hello.cc" ]
    }
  ]
}
```

A version of the `node-gyp` utility is bundled and distributed with
Node.js as part of `npm`. This version is not made directly available for
developers to use and is intended only to support the ability to use the
`npm install` command to compile and install addons. Developers who wish to
use `node-gyp` directly can install it using the command
`npm install -g node-gyp`. See the `node-gyp` installation instructions for
more information, including platform-specific requirements.

Once the `binding.gyp` file has been created, use `node-gyp configure` to
generate the appropriate project build files for the current platform. This
will generate either a `Makefile` (on Unix platforms) or a `vcxproj` file
(on Windows) in the `build/` directory.

Next, invoke the `node-gyp build` command to generate the compiled `addon.node`
file. This will be put into the `build/Release/` directory.

When using `npm install` to install a Node.js addon, npm uses its own bundled
version of `node-gyp` to perform this same set of actions, generating a
compiled version of the addon for the user's platform on demand.

Once built, the binary addon can be used from within Node.js by pointing
`require()` to the built `addon.node` module:

```js
// hello.js
const addon = require('./build/Release/addon');

console.log(addon.hello());
// Prints: 'world'
```

Because the exact path to the compiled addon binary can vary depending on how
it is compiled (i.e. sometimes it may be in `./build/Debug/`), addons can use
the bindings package to load the compiled module.

While the `bindings` package implementation is more sophisticated in how it
locates addon modules, it is essentially using a `try…catch` pattern similar to:

```js
try {
  return require('./build/Release/addon.node');
} catch (err) {
  return require('./build/Debug/addon.node');
}
```

### Linking to libraries included with Node.js

Node.js uses statically linked libraries such as V8, libuv, and OpenSSL. All
addons are required to link to V8 and may link to any of the other dependencies
as well. Typically, this is as simple as including the appropriate
`#include <...>` statements (e.g. `#include <v8.h>`) and `node-gyp` will locate
the appropriate headers automatically. However, there are a few caveats to be
aware of:

* When `node-gyp` runs, it will detect the specific release version of Node.js
  and download either the full source tarball or just the headers. If the full
  source is downloaded, addons will have complete access to the full set of
  Node.js dependencies. However, if only the Node.js headers are downloaded,
  then only the symbols exported by Node.js will be available.

* `node-gyp` can be run using the `--nodedir` flag pointing at a local Node.js
  source image. Using this option, the addon will have access to the full set of
  dependencies.

### Loading addons using `require()`

The filename extension of the compiled addon binary is `.node` (as opposed
to `.dll` or `.so`). The `require()` function is written to look for
files with the `.node` file extension and initialize those as dynamically-linked
libraries.

When calling `require()`, the `.node` extension can usually be
omitted and Node.js will still find and initialize the addon. One caveat,
however, is that Node.js will first attempt to locate and load modules or
JavaScript files that happen to share the same base name. For instance, if
there is a file `addon.js` in the same directory as the binary `addon.node`,
then `require('addon')` will give precedence to the `addon.js` file
and load it instead.

### Loading addons using `import`

> Stability: 1.0 - Early development

You can use the `--experimental-addon-modules` flag to enable support for
both static `import` and dynamic `import()` to load binary addons.

If we reuse the Hello World example from earlier, you could do:

```mjs
// hello.mjs
import myAddon from './hello.node';
// N.B.: import {hello} from './hello.node' would not work

console.log(myAddon.hello());
```

```console
$ node --experimental-addon-modules hello.mjs
world
```

## Native abstractions for Node.js

Each of the examples illustrated in this document directly use the
Node.js and V8 APIs for implementing addons. The V8 API can, and has, changed
dramatically from one V8 release to the next (and one major Node.js release to
the next). With each change, addons may need to be updated and recompiled in
order to continue functioning. The Node.js release schedule is designed to
minimize the frequency and impact of such changes but there is little that
Node.js can do to ensure stability of the V8 APIs.

The Native Abstractions for Node.js (or `nan`) provide a set of tools that
addon developers are recommended to use to keep compatibility between past and
future releases of V8 and Node.js. See the `nan` examples for an
illustration of how it can be used.

## Node-API

> Stability: 2 - Stable

See C/C++ addons with Node-API.
