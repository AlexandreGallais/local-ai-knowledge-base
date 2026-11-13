---
title: "TypeScript 4.3 (part 3 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 4.3.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 4.3 (part 3 of 3)

## Breaking Changes

### `lib.d.ts` Changes

As with every TypeScript version, declarations for `lib.d.ts` (especially the declarations generated for web contexts), have changed.
In this release, we leveraged Mozilla's browser-compat-data to remove APIs that no browser implements.
While it is unlike that you are using them, APIs such as `Account`, `AssertionOptions`, `RTCStatsEventInit`, `MSGestureEvent`, `DeviceLightEvent`, `MSPointerEvent`, `ServiceWorkerMessageEvent`, and `WebAuthentication` have all been removed from `lib.d.ts`.
This is discussed in some detail here.

https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/991

### `useDefineForClassFields` now defaults to true on `esnext` and eventually on `es2022`

In 2021 the class fields feature was added into the JavaScript specification with behavior which differed from how TypeScript had implemented it. In preparation for this, in TypeScript 3.7, a flag was added (`useDefineForClassFields`) to migrate to emitted JavaScript to match the JavaScript standard behavior.

Now that the feature is in JavaScript we are changing the default to `true` for ES2022 and above, including ESNext.

### Errors on Always-Truthy Promise Checks

Under `strictNullChecks`, using a `Promise` that always appears to be defined within a condition check is now considered an error.

```ts
declare var p: Promise<number>;

if (p) {
  //  ~
  // Error!
  // This condition will always return true since
  // this 'Promise<number>' appears to always be defined.
  //
  // Did you forget to use 'await'?
}
```

For more details, see the original change.

### Union Enums Cannot Be Compared to Arbitrary Numbers

Certain `enum`s are considered _union `enum`s_ when their members are either automatically filled in, or trivially written.
In those cases, an enum can recall each value that it potentially represents.

In TypeScript 4.3, if a value with a union `enum` type is compared with a numeric literal that it could never be equal to, then the type-checker will issue an error.

```ts
enum E {
  A = 0,
  B = 1,
}

function doSomething(x: E) {
  // Error! This condition will always return 'false' since the types 'E' and '-1' have no overlap.
  if (x === -1) {
    // ...
  }
}
```

As a workaround, you can re-write an annotation to include the appropriate literal type.

```ts
enum E {
  A = 0,
  B = 1,
}

// Include -1 in the type, if we're really certain that -1 can come through.
function doSomething(x: E | -1) {
  if (x === -1) {
    // ...
  }
}
```

You can also use a type-assertion on the value.

```ts
enum E {
  A = 0,
  B = 1,
}

function doSomething(x: E) {
  // Use a type assertion on 'x' because we know we're not actually just dealing with values from 'E'.
  if ((x as number) === -1) {
    // ...
  }
}
```

Alternatively, you can re-declare your enum to have a non-trivial initializer so that any number is both assignable and comparable to that enum. This may be useful if the intent is for the enum to specify a few well-known values.

```ts
enum E {
  // the leading + on 0 opts TypeScript out of inferring a union enum.
  A = +0,
  B = 1,
}
```

For more details, see the original change
