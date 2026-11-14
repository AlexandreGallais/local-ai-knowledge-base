# core/src/event_emitter

## EventEmitter

```ts
export interface EventEmitter<T> extends Subject<T>, OutputRef<T>
```

Use in components with the `@Output` directive to emit custom events
synchronously or asynchronously, and register handlers for those events
by subscribing to an instance.

@usageNotes

Extends
[RxJS `Subject`](https://rxjs.dev/api/index/class/Subject)
for Angular by adding the `emit()` method.

In the following example, a component defines two output properties
that create event emitters. When the title is clicked, the emitter
emits an open or close event to toggle the current visibility state.

```angular-ts
@Component({
  selector: 'zippy',
  template: `
  <div class="zippy">
    <div (click)="toggle()">Toggle</div>
    <div [hidden]="!visible">
      <ng-content></ng-content>
    </div>
 </div>`})
export class Zippy {
  visible: boolean = true;
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  toggle() {
    this.visible = !this.visible;
    if (this.visible) {
      this.open.emit(null);
    } else {
      this.close.emit(null);
    }
  }
}
```

Access the event object with the `$event` argument passed to the output event
handler:

```html
<zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
```

@see [Declaring outputs with the @Output decorator](guide/components/outputs#declaring-outputs-with-the-output-decorator)

@publicApi

## EventEmitter.new

```ts
new (isAsync?: boolean): EventEmitter<T>
```

Creates an instance of this class that can
deliver events synchronously or asynchronously.

@param [isAsync=false] When true, deliver events asynchronously.

## EventEmitter.emit

```ts
emit(value?: T): void
```

Emits an event containing a given value.
@param value The value to emit.

## EventEmitter.subscribe

```ts
subscribe( next?: (value: T)
```

Registers handlers for events emitted by this instance.
@param next When supplied, a custom handler for emitted events.
@param error When supplied, a custom handler for an error notification from this emitter.
@param complete When supplied, a custom handler for a completion notification from this
    emitter.

## EventEmitter.subscribe

```ts
subscribe(observerOrNext?: any, error?: any, complete?: any): Subscription
```

Registers handlers for events emitted by this instance.
@param observerOrNext When supplied, a custom handler for emitted events, or an observer
    object.
@param error When supplied, a custom handler for an error notification from this emitter.
@param complete When supplied, a custom handler for a completion notification from this
    emitter.

## EventEmitter

```ts
export const EventEmitter:
```

@publicApi