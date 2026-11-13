---
title: "`calc-size()` CSS function (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/calc-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `calc-size()` CSS function

The **`calc-size()`** CSS function allows you to perform calculations on intrinsic size values such as `auto`, `fit-content`, and `max-content`; this is not supported by the regular `calc()` function.

`calc-size()` return values can also be interpolated, enabling size keyword values to be used in animations and transitions. In effect, including `calc-size()` in a property value automatically applies `interpolate-size: allow-keywords` to the selection.

Note however that `interpolate-size` is inherited, therefore applying it to an element enables interpolation of intrinsic size keywords for every property applied to that element and its children. As a result, `interpolate-size` is the preferred solution for enabling intrinsic size animations. You should only use `calc-size()` to enable intrinsic size animations if they also require calculations.

## Syntax

```css
/* Pass a value through calc-size() */
calc-size(auto, size)
calc-size(fit-content, size)

/* Perform a calculation */
calc-size(min-content, size + 100px)
calc-size(fit-content, size / 2)

/* Calculation including a function */
calc-size(auto, round(up, size, 50px))
```

### Parameters

The `calc-size()` function's syntax is as follows:

```plain
calc-size(<calc-size-basis>, <calc-sum>)
```

The parameters are:

- `<calc-size-basis>`
    The value (most commonly an intrinsic size) that you want to perform a calculation on.

- `calc-sum`
    An expression that defines the calculation to be performed on the `<calc-size-basis>`.

### Return value

Returns a value equal to the `<calc-size-basis>` modified by the `<calc-sum>` expression. As the `<calc-size-basis>` value is an intrinsic size value, the return value is a modified intrinsic size value that behaves like the intrinsic size value input into the function.

## Description

Certain browser layout algorithms have special behaviors for intrinsic sizing keywords. The `calc-size()` function is explicitly defined to represent an intrinsic size rather than a `length-percentage`, thereby enforcing correctness. `calc-size()` enables calculations to be performed on intrinsic size values in a safe, well-defined manner.

### Valid values for the first argument (`<calc-size-basis>`)

The first `calc-size()` argument can be one of the following intrinsic values:

- `auto`
- `min-content`
- `max-content`
- `fit-content`
- `content` (for containers sized using `flex-basis`).

There are also a few special values that this argument can take:

- A nested `calc-size()` value. This isn't something you'd be likely to do very often, but it is available ensuring using a CSS variable as the `<calc-size-basis>` will always work, provided the variable is a valid value for the property `calc-size()` is being set on. So for example, this will work:

  ```css
  section {
    height: calc-size(calc-size(max-content, size), size + 2rem);
  }
  ```

  As will this:

  ```css
  :root {
    --intrinsic-size: calc-size(max-content, size);
  }

  section {
    height: calc-size(var(--intrinsic-size), size + 2rem);
  }
  ```

- Another `<calc-sum>`, with the same restrictions as the `<calc-sum>` specified for the second argument, except that the `size` keyword cannot be included. You likely will not do this, as you are no longer doing a calculation on an intrinsic size value, but if a custom property value is a `<calc-sum>`, the function will still work. For example, this will work directly or if you use a custom property with a value of `300px + 2rem`:

  ```css
  section {
    height: calc-size(300px + 2rem, size / 2);
  }
  ```

- The keyword `any`, which represents an unspecified definite size. In this case, the `size` keyword cannot be included in the second argument, and the `calc-size()` returns the result of the second argument calculation. For example:

  ```css
  section {
    height: calc-size(any, 300px * 1.5); /* Returns 450px */
  }
  ```

Mixing different intrinsic sizes together in the same calculation doesn't work. For example, `max-content - min-content` doesn't make sense. `calc-size()` only allows a single intrinsic size value in each calculation, avoiding this problem.

### Valid values for the second argument (`<calc-sum>`)

The second `calc-size()` argument is a `calc-sum` expression.

In this expression:

- The keyword `size` represents the `<calc-size-basis>` specified as the first argument.
- Operands can include `size`, and any value types that make sense in the context.
- The `+`, `-`, `*`, and `/` operators can be included.
- Other mathematical functions can be included such as `round()`, `max()`, or even a nested `calc-size()`.
- The overall expression must match `length-percentage`, and resolve to a `length`.

### Enabling animation of intrinsic size values

`calc-size()` return values can be interpolated, enabling animations between a `length-percentage` value and a `calc-size()` intrinsic size return value.

> **Note:**
> You should avoid animating box model properties if possible, to cut down on layout events and mitigate the resulting impact on performance (see Critical rendering path > Layout).

For example, you could use a transition to animate a container `width` between `0` and `auto` like so:

```css
section {
  width: 0;
  transition: width ease 1s;
}

section:hover,
section:focus {
  width: calc-size(auto, size);
}
```

In the above case, we are not calculating anything — we are putting `auto` into `calc-size()` and returning it unchanged. The `interpolate-size` property makes animations like the above simpler to implement in most cases, especially when there are multiple animations to consider. It is inherited and therefore only needs to be declared once on an ancestor property, meaning we could have transitioned between `0` and `auto` without using `calc-size()`.

The `calc-size()` function should only be used to enable intrinsic size animations if they also require calculations. For example, in the following case we are animating the `width` _and_ applying a calculation to the intrinsic size end state:

```css
section {
  width: 0;
  transition: width ease 1s;
}

section:hover,
section:focus {
  width: calc-size(auto, size + 2rem);
}
```

One case in which `calc-size()` is useful is when you want to animate between an intrinsic size and a modified version of the same intrinsic size. This is not possible with `interpolate-size` and `calc()`. For example, the following `@keyframes` definition animates a container `width` between `fit-content` and 70% of the `fit-content`.

```css
@keyframes narrower {
  from {
    width: fit-content;
  }

  to {
    width: calc-size(fit-content, size * 0.7);
  }
}
```

> **Note:**
> Note that `calc-size()` does not enable animating between two different intrinsic size values.
