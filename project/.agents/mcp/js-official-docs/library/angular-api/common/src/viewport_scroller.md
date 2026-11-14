# common/src/viewport_scroller

## ViewportScroller

```ts
export abstract class ViewportScroller
```

Defines a scroll position manager. Implemented by `BrowserViewportScroller`.

@publicApi

## ViewportScroller.setOffset

```ts
abstract setOffset(offset: [number, number] | (()
```

Configures the top offset used when scrolling to an anchor.
@param offset A position in screen coordinates (a tuple with x and y values)
or a function that returns the top offset position.

## ViewportScroller.getScrollPosition

```ts
abstract getScrollPosition(): [number, number]
```

Retrieves the current scroll position.
@returns A position in screen coordinates (a tuple with x and y values).

## ViewportScroller.scrollToPosition

```ts
abstract scrollToPosition(position: [number, number], options?: ScrollOptions): void
```

Scrolls to a specified position.
@param position A position in screen coordinates (a tuple with x and y values).

## ViewportScroller.scrollToAnchor

```ts
abstract scrollToAnchor(anchor: string, options?: ScrollOptions): void
```

Scrolls to an anchor element.
@param anchor The ID of the anchor element.
@param options Scroll options

## ViewportScroller.setHistoryScrollRestoration

```ts
abstract setHistoryScrollRestoration(scrollRestoration: 'auto' | 'manual'): void
```

Disables automatic scroll restoration provided by the browser.
See also [window.history.scrollRestoration
info](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration).