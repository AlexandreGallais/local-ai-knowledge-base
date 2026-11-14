# signals/events/src/case-reducer

## on

```ts
export function on< State extends object, EventCreators extends EventCreator<string, any>[], >( ...args: [ ...events: [...EventCreators], reducer: CaseReducer<NoInfer<State>, NoInfer<EventCreators>>, ] ): CaseReducerResult<State, EventCreators>
```

@description

Creates a case reducer that can be used with the `withReducer` feature.