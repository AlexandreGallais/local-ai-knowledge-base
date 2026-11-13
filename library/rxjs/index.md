# rxjs library index

RxJS 7 guides and deprecations. Version 7.8, from <https://github.com/ReactiveX/rxjs> at 7.8.2, commit e5351d02e225e275ac0e497c7b66eaa5f0c88791.
License: Apache-2.0, by Google, Inc., Netflix, Inc., Microsoft Corp. and contributors; see THIRD_PARTY_NOTICES.md. The text was converted to plain Markdown and cut into files of 16 KB at most.

This index is long: search it with grep for your words, never read it whole. Then open one file and read only the section you need.

- [RxJS 6.x to 7.x Detailed Change List (part 1 of 2)](library/rxjs/6-to-7-change-summary.md): This document contains a detailed list of changes between RxJS 6.x and RxJS 7.x, presented in the order they can be found when diffing… (11 KB)
- [RxJS 6.x to 7.x Detailed Change List (part 2 of 2)](library/rxjs/6-to-7-change-summary-p2.md): No changes. (12 KB)
- [Array Arguments](library/rxjs/deprecations/array-argument.md): To unify the API surface of forkJoin and combineLatest we deprecated some signatures. (1 KB)
- [Breaking Changes in Version 7](library/rxjs/deprecations/breaking-changes.md): (10 KB)
- [Deprecations and Breaking Changes](library/rxjs/deprecations.md): While the core team always tries to limit changes, sometimes we have to deprecate APIs or do breaking changes for various reasons. (1 KB)
- [Multicasting](library/rxjs/deprecations/multicasting.md): In version 7, the multicasting APIs were simplified to just a few functions: (9 KB)
- [ResultSelector Parameter](library/rxjs/deprecations/resultSelector.md): Some operator supported a resultSelector argument that acted as mapping function on the result of that operator. (1 KB)
- [Scheduler Argument](library/rxjs/deprecations/scheduler-argument.md): To limit the API surface of some operators, but also prepare for a major refactoring in V8, we agreed on deprecating the scheduler argument… (3 KB)
- [Subscribe Arguments](library/rxjs/deprecations/subscribe-arguments.md): You might have seen that we deprecated some signatures of the subscribe method, which might have caused some confusion. (2 KB)
- [Conversion to Promises](library/rxjs/deprecations/to-promise.md): The similarity between Observables and Promises is that both collections may produce values over time, but the difference is that Observables may produce none… (4 KB)
- [RxJS Core Semantics](library/rxjs/guide/core-semantics.md): Starting in version 8, all RxJS operators that are provided in the core library MUST meet the following semantics. (5 KB)
- [RxJS: Glossary And Semantics](library/rxjs/guide/glossary-and-semantics.md): When discussing and documenting observables, it's important to have a common language and a known set of rules around what is going on. (11 KB)
- [Higher-order Observables](library/rxjs/guide/higher-order-observables.md): Observables most commonly emit ordinary values like strings and numbers, but surprisingly often, it is necessary to handle Observables of Observables, so-called higher-order Observables. (2 KB)
- [Importing instructions](library/rxjs/guide/importing.md): There are different ways you can {@link guide/installation install} RxJS. (6 KB)
- [Installation Instructions](library/rxjs/guide/installation.md): Here are different ways you can install RxJS: (3 KB)
- [Observable (part 1 of 2)](library/rxjs/guide/observable.md): Observables are lazy Push collections of multiple values. (8 KB)
- [Observable (part 2 of 2)](library/rxjs/guide/observable-p2.md): Observables are created using new Observable or a creation operator, are subscribed to with an Observer, execute to deliver next / error / complete… (8 KB)
- [Observer](library/rxjs/guide/observer.md): To use the Observer, provide it to the subscribe of an Observable: (2 KB)
- [RxJS Operators](library/rxjs/guide/operators.md): RxJS is mostly useful for its operators, even though the Observable is the foundation. (12 KB)
- [Introduction](library/rxjs/guide/overview.md): RxJS is a library for composing asynchronous and event-based programs by using observable sequences. (4 KB)
- [Scheduler](library/rxjs/guide/scheduler.md): A Scheduler lets you define in what execution context will an Observable deliver notifications to its Observer. (9 KB)
- [Subject](library/rxjs/guide/subject.md): A Subject is like an Observable, but can multicast to many Observers. (13 KB)
- [Subscription](library/rxjs/guide/subscription.md): const observable = interval(1000); const subscription = observable.subscribe(x => console.log(x)); // Later: // This cancels the ongoing Observable execution which // was started by… (2 KB)
- [Testing RxJS Code with Marble Diagrams (part 1 of 2)](library/rxjs/guide/testing/marble-testing.md): This guide refers to usage of marble diagrams when using the new testScheduler.run(callback). (14 KB)
- [Testing RxJS Code with Marble Diagrams (part 2 of 2)](library/rxjs/guide/testing/marble-testing-p2.md): Sometimes, we need to assert changes in state after an observable stream has completed - such as when a side effect like tap updates… (4 KB)
- [license](library/rxjs/license.md): @title @description The MIT License (1 KB)
