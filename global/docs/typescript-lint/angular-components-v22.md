---
id: angular-components-v22
title: Angular 22 components
topic: typescript-lint
summary: Rules for inject(), signal inputs and outputs, lifecycle methods, host bindings and standalone components. Angular 22.
tool: angular-eslint
version: "22.6"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, examples written for this base
---

# Angular 22 components

Contents: 1. inject() · 2. Signal inputs · 3. Outputs · 4. Lifecycle methods · 5. Host bindings · 6. Output names · 7. Standalone · Sources

In Angular 22, components are standalone and use OnPush by default: never write `standalone: true`
and never write `changeDetection` unless the project asks for it. [S2]

## 1. Inject with inject(), not with the constructor (angular-eslint prefer-inject)

Get a service with a field: `private readonly api = inject(ValveApi);`. Never list services in the constructor. [S1]

Wrong:

```ts
@Injectable({ providedIn: 'root' })
export class PumpStore {
  public constructor(private readonly http: HttpClient) {}
}
```

Right, with `@Service()`, the service decorator of Angular 22:

```ts
@Service()
export class PumpStore {
  private readonly http = inject(HttpClient);

  public load(): Observable<unknown> {
    return this.http.get<unknown>('/api/pumps');
  }
}
```

## 2. Use signal inputs (angular-eslint prefer-signals)

Declare an input with `input()` or `input.required()`, never with `@Input()`. Read it as a function in the template: `label()`. [S1]

Wrong:

```ts
@Component({ selector: 'app-pump-label', template: '{{ label }}' })
export class PumpLabel {
  @Input() public label = '';
}
```

Right:

```ts
@Component({ selector: 'app-pump-label', template: '{{ label() }}' })
export class PumpLabel {
  public readonly label = input('');
}
```

## 3. Use output() (angular-eslint prefer-output-emitter-ref)

Declare an output with `output<Type>()`, never with `@Output()` and `EventEmitter`. [S1]

Wrong:

```ts
@Component({
  selector: 'app-stop-button',
  template: '<button type="button" (click)="stopped.emit()">Stop</button>',
})
export class StopButton {
  @Output() public readonly stopped = new EventEmitter<void>();
}
```

Right:

```ts
@Component({
  selector: 'app-stop-button',
  template: '<button type="button" (click)="stopped.emit()">Stop</button>',
})
export class StopButton {
  public readonly stopped = output();
}
```

## 4. Keep lifecycle methods synchronous (angular-eslint no-async-lifecycle-method)

Never write `async ngOnInit()`. Angular does not wait for it. Start the work with `void`, in a separate method. [S1]

Wrong:

```ts
@Component({ selector: 'app-valve-count', template: '{{ count() }}' })
export class ValveCount implements OnInit {
  protected readonly count = signal(0);
  private readonly api = inject(ValveApi);

  public async ngOnInit(): Promise<void> {
    this.count.set((await this.api.loadValves()).length);
  }
}
```

Right:

```ts
@Component({ selector: 'app-valve-count', template: '{{ count() }}' })
export class ValveCount implements OnInit {
  protected readonly count = signal(0);
  private readonly api = inject(ValveApi);

  public ngOnInit(): void {
    void this.load();
  }

  private async load(): Promise<void> {
    const valves = await this.api.loadValves();

    this.count.set(valves.length);
  }
}
```

## 5. Bind host events in the metadata (angular-eslint prefer-host-metadata-property)

Write host events and bindings in `host: { … }` of `@Component`, never with `@HostListener` or `@HostBinding`. [S1]

Wrong:

```ts
@Component({ selector: 'app-escape-stop', template: '' })
export class EscapeStop {
  public readonly stopped = output();

  @HostListener('window:keydown.escape')
  protected stop(): void {
    this.stopped.emit();
  }
}
```

Right:

```ts
@Component({
  selector: 'app-escape-stop',
  template: '',
  host: { '(window:keydown.escape)': 'stop()' },
})
export class EscapeStop {
  public readonly stopped = output();

  protected stop(): void {
    this.stopped.emit();
  }
}
```

## 6. Name an output after the event, without "on" (angular-eslint no-output-on-prefix)

Name an output `stopped` or `valveSelected`, never `onStop`. [S1]

Wrong:

```ts
@Component({ selector: 'app-pump-stop', template: '' })
export class PumpStop {
  public readonly onStop = output();
}
```

Right:

```ts
@Component({ selector: 'app-pump-stop', template: '' })
export class PumpStop {
  public readonly stopped = output();
}
```

## 7. Keep components standalone (angular-eslint prefer-standalone)

Never write `standalone: false`. Import what the template needs in `imports: [ … ]` of the component. [S1] [S2]

Wrong:

```ts
@Component({ selector: 'app-tank-view', standalone: false, template: '' })
export class TankView {}
```

Right:

```ts
@Component({ selector: 'app-tank-view', template: '' })
export class TankView {}
```

## Sources

- [S1] angular-eslint, rules of @angular-eslint/eslint-plugin, version 22.6, <https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin/docs/rules>, read 2026-11-13, MIT, summarized.
- [S2] Google, "Angular coding style guide" and "Components", Angular 22, <https://angular.dev/style-guide>, read 2026-11-13, CC BY 4.0, summarized.
