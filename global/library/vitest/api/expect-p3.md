---
title: "expect (part 3 of 5)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/expect.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# expect (part 3 of 5)

## toMatchAriaSnapshot <Version type="experimental">4.1.4</Version> <Experimental /> {#tomatcharisnapshot}

- **Type:** `() => void`

Captures the accessibility tree of a DOM element and generate a snapshot file or compares it against a stored snapshot. See the ARIA Snapshots guide for more details.

```ts
import { expect, test } from 'vitest'

test('navigation accessibility', () => {
  document.body.innerHTML = `
    <nav aria-label="Actions">
      <button>Save</button>
      <button>Cancel</button>
    </nav>
  `
  expect(document.querySelector('nav')).toMatchAriaSnapshot()
})
```

## toMatchAriaInlineSnapshot <Version type="experimental">4.1.4</Version> <Experimental /> {#tomatchariainlinesnapshot}

- **Type:** `(snapshot?: string) => void`

Same as `toMatchAriaSnapshot`, but stores the snapshot inline in the test file. See the ARIA Snapshots guide for more details.

```ts
import { expect, test } from 'vitest'

test('user profile', () => {
  expect(document.body).toMatchAriaInlineSnapshot(`
    - heading "Dashboard" [level=1]
    - button /User \\d+/: Profile
  `)
})
```

## toHaveBeenCalled

- **Type:** `() => Awaitable<void>`

This assertion is useful for testing that a function has been called. Requires a spy function to be passed to `expect`.

```ts
import { expect, test, vi } from 'vitest'

const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}

test('spy function', () => {
  const buySpy = vi.spyOn(market, 'buy')

  expect(buySpy).not.toHaveBeenCalled()

  market.buy('apples', 10)

  expect(buySpy).toHaveBeenCalled()
})
```

## toHaveBeenCalledTimes

- **Type:** `(amount: number) => Awaitable<void>`

This assertion checks if a function was called a certain amount of times. Requires a spy function to be passed to `expect`.

```ts
import { expect, test, vi } from 'vitest'

const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}

test('spy function called two times', () => {
  const buySpy = vi.spyOn(market, 'buy')

  market.buy('apples', 10)
  market.buy('apples', 20)

  expect(buySpy).toHaveBeenCalledTimes(2)
})
```

## toHaveBeenCalledWith

- **Type:** `(...args: any[]) => Awaitable<void>`

This assertion checks if a function was called at least once with certain parameters. Requires a spy function to be passed to `expect`.

```ts
import { expect, test, vi } from 'vitest'

const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}

test('spy function', () => {
  const buySpy = vi.spyOn(market, 'buy')

  market.buy('apples', 10)
  market.buy('apples', 20)

  expect(buySpy).toHaveBeenCalledWith('apples', 10)
  expect(buySpy).toHaveBeenCalledWith('apples', 20)
})
```

## toHaveBeenCalledBefore

- **Type:** `(mock: MockInstance, failIfNoFirstInvocation?: boolean) => Awaitable<void>`

This assertion checks if a `Mock` was called before another `Mock`.

```ts
test('calls mock1 before mock2', () => {
  const mock1 = vi.fn()
  const mock2 = vi.fn()

  mock1()
  mock2()
  mock1()

  expect(mock1).toHaveBeenCalledBefore(mock2)
})
```

## toHaveBeenCalledAfter

- **Type:** `(mock: MockInstance, failIfNoFirstInvocation?: boolean) => Awaitable<void>`

This assertion checks if a `Mock` was called after another `Mock`.

```ts
test('calls mock1 after mock2', () => {
  const mock1 = vi.fn()
  const mock2 = vi.fn()

  mock2()
  mock1()
  mock2()

  expect(mock1).toHaveBeenCalledAfter(mock2)
})
```

## toHaveBeenCalledExactlyOnceWith

- **Type:** `(...args: any[]) => Awaitable<void>`

This assertion checks if a function was called exactly once and with certain parameters. Requires a spy function to be passed to `expect`.

```ts
import { expect, test, vi } from 'vitest'

const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}

test('spy function', () => {
  const buySpy = vi.spyOn(market, 'buy')

  market.buy('apples', 10)

  expect(buySpy).toHaveBeenCalledExactlyOnceWith('apples', 10)
})
```

## toHaveBeenLastCalledWith

- **Type:** `(...args: any[]) => Awaitable<void>`

This assertion checks if a function was called with certain parameters at its last invocation. Requires a spy function to be passed to `expect`.

```ts
import { expect, test, vi } from 'vitest'

const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}

test('spy function', () => {
  const buySpy = vi.spyOn(market, 'buy')

  market.buy('apples', 10)
  market.buy('apples', 20)

  expect(buySpy).not.toHaveBeenLastCalledWith('apples', 10)
  expect(buySpy).toHaveBeenLastCalledWith('apples', 20)
})
```

## toHaveBeenNthCalledWith

- **Type:** `(time: number, ...args: any[]) => Awaitable<void>`

This assertion checks if a function was called with certain parameters at the certain time. The count starts at 1. So, to check the second entry, you would write `.toHaveBeenNthCalledWith(2, ...)`.

Requires a spy function to be passed to `expect`.

```ts
import { expect, test, vi } from 'vitest'

const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}

test('first call of spy function called with right params', () => {
  const buySpy = vi.spyOn(market, 'buy')

  market.buy('apples', 10)
  market.buy('apples', 20)

  expect(buySpy).toHaveBeenNthCalledWith(1, 'apples', 10)
})
```

## toHaveReturned

- **Type:** `() => Awaitable<void>`

This assertion checks if a function has successfully returned a value at least once (i.e., did not throw an error). Requires a spy function to be passed to `expect`.

```ts
import { expect, test, vi } from 'vitest'

function getApplesPrice(amount: number) {
  const PRICE = 10
  return amount * PRICE
}

test('spy function returned a value', () => {
  const getPriceSpy = vi.fn(getApplesPrice)

  const price = getPriceSpy(10)

  expect(price).toBe(100)
  expect(getPriceSpy).toHaveReturned()
})
```

## toHaveReturnedTimes

- **Type:** `(amount: number) => Awaitable<void>`

This assertion checks if a function has successfully returned a value an exact amount of times (i.e., did not throw an error). Requires a spy function to be passed to `expect`.

```ts
import { expect, test, vi } from 'vitest'

test('spy function returns a value two times', () => {
  const sell = vi.fn((product: string) => ({ product }))

  sell('apples')
  sell('bananas')

  expect(sell).toHaveReturnedTimes(2)
})
```

## toHaveReturnedWith

- **Type:** `(returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully returned a certain value at least once. Requires a spy function to be passed to `expect`. Values are compared with the same deep equality as `toEqual`.

```ts
import { expect, test, vi } from 'vitest'

test('spy function returns a product', () => {
  const sell = vi.fn((product: string) => ({ product }))

  sell('apples')

  expect(sell).toHaveReturnedWith({ product: 'apples' })
})
```

## toHaveLastReturnedWith

- **Type:** `(returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully returned a certain value when it was last invoked. Requires a spy function to be passed to `expect`. Values are compared with the same deep equality as `toEqual`.

```ts
import { expect, test, vi } from 'vitest'

test('spy function returns bananas on a last call', () => {
  const sell = vi.fn((product: string) => ({ product }))

  sell('apples')
  sell('bananas')

  expect(sell).toHaveLastReturnedWith({ product: 'bananas' })
})
```

## toHaveNthReturnedWith

- **Type:** `(time: number, returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully returned a certain value on a certain call. Requires a spy function to be passed to `expect`. Values are compared with the same deep equality as `toEqual`.

The count starts at 1. So, to check the second entry, you would write `.toHaveNthReturnedWith(2, ...)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy function returns bananas on second call', () => {
  const sell = vi.fn((product: string) => ({ product }))

  sell('apples')
  sell('bananas')

  expect(sell).toHaveNthReturnedWith(2, { product: 'bananas' })
})
```

## toHaveResolved

- **Type:** `() => Awaitable<void>`

This assertion checks if a function has successfully resolved a value at least once (i.e., did not reject). Requires a spy function to be passed to `expect`.

If the function returned a promise, but it was not resolved yet, this will fail.

```ts
import { expect, test, vi } from 'vitest'
import db from './db/apples.js'

async function getApplesPrice(amount: number) {
  return amount * await db.get('price')
}

test('spy function resolved a value', async () => {
  const getPriceSpy = vi.fn(getApplesPrice)

  const price = await getPriceSpy(10)

  expect(price).toBe(100)
  expect(getPriceSpy).toHaveResolved()
})
```

## toHaveResolvedTimes

- **Type:** `(amount: number) => Awaitable<void>`

This assertion checks if a function has successfully resolved a value an exact amount of times (i.e., did not reject). Requires a spy function to be passed to `expect`.

This will only count resolved promises. If the function returned a promise, but it was not resolved yet, it will not be counted.

```ts
import { expect, test, vi } from 'vitest'

test('spy function resolved a value two times', async () => {
  const sell = vi.fn((product: string) => Promise.resolve({ product }))

  await sell('apples')
  await sell('bananas')

  expect(sell).toHaveResolvedTimes(2)
})
```

## toHaveResolvedWith

- **Type:** `(returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully resolved a certain value at least once. Requires a spy function to be passed to `expect`. Values are compared with the same deep equality as `toEqual`.

If the function returned a promise, but it was not resolved yet, this will fail.

```ts
import { expect, test, vi } from 'vitest'

test('spy function resolved a product', async () => {
  const sell = vi.fn((product: string) => Promise.resolve({ product }))

  await sell('apples')

  expect(sell).toHaveResolvedWith({ product: 'apples' })
})
```

## toHaveLastResolvedWith

- **Type:** `(returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully resolved a certain value when it was last invoked. Requires a spy function to be passed to `expect`. Values are compared with the same deep equality as `toEqual`.

If the function returned a promise, but it was not resolved yet, this will fail.

```ts
import { expect, test, vi } from 'vitest'

test('spy function resolves bananas on a last call', async () => {
  const sell = vi.fn((product: string) => Promise.resolve({ product }))

  await sell('apples')
  await sell('bananas')

  expect(sell).toHaveLastResolvedWith({ product: 'bananas' })
})
```

## toHaveNthResolvedWith

- **Type:** `(time: number, returnValue: any) => Awaitable<void>`

You can call this assertion to check if a function has successfully resolved a certain value on a specific invocation. Requires a spy function to be passed to `expect`. Values are compared with the same deep equality as `toEqual`.

If the function returned a promise, but it was not resolved yet, this will fail.

The count starts at 1. So, to check the second entry, you would write `.toHaveNthResolvedWith(2, ...)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy function returns bananas on second call', async () => {
  const sell = vi.fn((product: string) => Promise.resolve({ product }))

  await sell('apples')
  await sell('bananas')

  expect(sell).toHaveNthResolvedWith(2, { product: 'bananas' })
})
```

## toHaveBeenExhausted <Version>5.0.0</Version> {#tohavebeenexhausted}

- **Type:** `() => void`

This assertion checks that every behavior registered on a `vi.when` chain has been consumed. A behavior is considered exhausted when it has been called the number of times specified by its `times` option, or at least once for behaviors that apply indefinitely.

Requires a `When` chain returned by `vi.when` to be passed to `expect`.

```ts
import { expect, test, vi } from 'vitest'

test('all behaviors were consumed', () => {
  const spy = vi.fn()
  const w = vi.when(spy)
    .calledWith(1)
    .thenReturnOnce('once')
    .calledWith(2)
    .thenReturn('always')

  expect(w).not.toHaveBeenExhausted()

  spy(1) // consumes the `thenReturnOnce` behavior
  spy(2) // satisfies the `thenReturn` behavior (called at least once)

  expect(w).toHaveBeenExhausted()
})
```

**Warning:**
A `When` chain with no registered behaviors is never considered exhausted. `toHaveBeenExhausted` only passes when at least one `calledWith` with an associated action (`then*`) has been registered and every registered behavior has been fully consumed.

## called <Version>4.1.0</Version> {#called}

- **Type:** `Assertion` (property, not a method)

Chai-style assertion that checks if a spy was called at least once. This is equivalent to `toHaveBeenCalled()`.

**Tip:**
This is a property assertion following sinon-chai conventions. Access it without parentheses: `expect(spy).to.have.been.called`

```ts
import { expect, test, vi } from 'vitest'

test('spy was called', () => {
  const spy = vi.fn()

  spy()

  expect(spy).to.have.been.called
  expect(spy).to.not.have.been.called // negation
})
```

## callCount <Version>4.1.0</Version> {#callcount}

- **Type:** `(count: number) => void`

Chai-style assertion that checks if a spy was called a specific number of times. This is equivalent to `toHaveBeenCalledTimes(count)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy call count', () => {
  const spy = vi.fn()

  spy()
  spy()
  spy()

  expect(spy).to.have.callCount(3)
})
```

## calledWith <Version>4.1.0</Version> {#calledwith}

- **Type:** `(...args: any[]) => void`

Chai-style assertion that checks if a spy was called with specific arguments at least once. This is equivalent to `toHaveBeenCalledWith(...args)`.

```ts
import { expect, test, vi } from 'vitest'

test('spy called with arguments', () => {
  const spy = vi.fn()

  spy('apple', 10)
  spy('banana', 20)

  expect(spy).to.have.been.calledWith('apple', 10)
  expect(spy).to.have.been.calledWith('banana', 20)
})
```

## calledOnce <Version>4.1.0</Version> {#calledonce}

- **Type:** `Assertion` (property, not a method)

Chai-style assertion that checks if a spy was called exactly once. This is equivalent to `toHaveBeenCalledOnce()`.

**Tip:**
This is a property assertion following sinon-chai conventions. Access it without parentheses: `expect(spy).to.have.been.calledOnce`

```ts
import { expect, test, vi } from 'vitest'

test('spy called once', () => {
  const spy = vi.fn()

  spy()

  expect(spy).to.have.been.calledOnce
})
```
