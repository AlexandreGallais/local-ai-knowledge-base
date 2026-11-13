---
title: "Single executable applications (part 1 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/single-executable-applications.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Single executable applications

> Stability: 1.1 - Active development

This feature allows the distribution of a Node.js application conveniently to a
system that does not have Node.js installed.

Node.js supports the creation of single executable applications by allowing
the injection of a blob prepared by Node.js, which can contain a bundled script,
into the `node` binary. During start up, the program checks if anything has been
injected. If the blob is found, it executes the script in the blob. Otherwise
Node.js operates as it normally does.

The single executable application feature supports running a
single embedded script using the CommonJS or the ECMAScript Modules module system.

Users can create a single executable application from their bundled script
with the `node` binary itself and any tool which can inject resources into the
binary.

1. Create a JavaScript file:
   ```bash
   echo 'console.log(`Hello, ${process.argv[2]}!`);' > hello.js
   ```

2. Create a configuration file building a blob that can be injected into the
   single executable application (see
   Generating single executable preparation blobs for details):

   * On systems other than Windows:

   ```bash
   echo '{ "main": "hello.js", "output": "sea" }' > sea-config.json
   ```

   * On Windows:

   ```bash
   echo '{ "main": "hello.js", "output": "sea.exe" }' > sea-config.json
   ```

   The `.exe` extension is necessary.

3. Generate the target executable:
   ```bash
   node --build-sea sea-config.json
   ```

4. Sign the binary (macOS and Windows only):

   * On macOS:

   ```bash
   codesign --sign - sea
   ```

   * On Windows (optional):

   A certificate needs to be present for this to work. However, the unsigned
   binary would still be runnable.

   ```powershell
   signtool sign /fd SHA256 sea.exe
   ```

5. Run the binary:

   * On systems other than Windows

   ```console
   $ ./sea world
   Hello, world!
   ```

   * On Windows

   ```console
   $ .\sea.exe world
   Hello, world!
   ```
