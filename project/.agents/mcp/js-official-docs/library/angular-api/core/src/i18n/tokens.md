# core/src/i18n/tokens

## LOCALE_ID

```ts
export const LOCALE_ID: InjectionToken<string> = new InjectionToken( typeof ngDevMode !== 'undefined' && ngDevMode ? 'LocaleId' : '',
```

Provide this token to set the locale of your application.
It is used for i18n extraction, by i18n pipes (DatePipe, I18nPluralPipe, CurrencyPipe,
DecimalPipe and PercentPipe) and by ICU expressions.

See the [i18n guide](guide/i18n/locale-id) for more information.

@usageNotes
### Example
In standalone apps:
```ts
import { LOCALE_ID, ApplicationConfig } from '@angular/core';
import { AppModule } from './app/app.module';

const appConfig: ApplicationConfig = {
  providers: [{provide: LOCALE_ID, useValue: 'en-US' }]
};
```

In module based apps:
```ts
import { LOCALE_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule, {
  providers: [{provide: LOCALE_ID, useValue: 'en-US' }]
});
```

@publicApi
@see [Import global variants of the locale data](guide/i18n/import-global-variants)

## DEFAULT_CURRENCY_CODE

```ts
export const DEFAULT_CURRENCY_CODE = new InjectionToken<string>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'DefaultCurrencyCode' : '',
```

Provide this token to set the default currency code your application uses for
CurrencyPipe when there is no currency code passed into it. This is only used by
CurrencyPipe and has no relation to locale currency. Defaults to USD if not configured.

See the [i18n guide](guide/i18n/locale-id) for more information.

<div class="docs-alert docs-alert-helpful">

The default currency code is currently always `USD`.

If you need the previous behavior then set it by creating a `DEFAULT_CURRENCY_CODE` provider in
your application `NgModule`:

```ts
{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}
```

</div>

@usageNotes
### Example
In standalone apps:
```ts
import { LOCALE_ID, ApplicationConfig } from '@angular/core';

const appConfig: ApplicationConfig = {
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }]
};
```

In module based apps:
```ts
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule, {
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }]
});
```

@publicApi

## TRANSLATIONS

```ts
export const TRANSLATIONS = new InjectionToken<string>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'Translations' : '', )
```

Use this token at bootstrap to provide the content of your translation file (`xtb`,
`xlf` or `xlf2`) when you want to translate your application in another language.

See the [i18n guide](guide/i18n/merge) for more information.

@usageNotes
### Example
In standalone apps:
```ts
import { LOCALE_ID, ApplicationConfig } from '@angular/core';

const appConfig: ApplicationConfig = {
  providers: [{provide: TRANSLATIONS, useValue: translations }]
};
```

In module based apps:
```ts
import { TRANSLATIONS } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

// content of your translation file
const translations = '....';

platformBrowser().bootstrapModule(AppModule, {
  providers: [{provide: TRANSLATIONS, useValue: translations }]
});
```

@publicApi

## TRANSLATIONS_FORMAT

```ts
export const TRANSLATIONS_FORMAT = new InjectionToken<string>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'TranslationsFormat' : '', )
```

Provide this token at bootstrap to set the format of your {@link TRANSLATIONS}: `xtb`,
`xlf` or `xlf2`.

See the [i18n guide](guide/i18n/merge) for more information.

@usageNotes
### Example
In standalone apps:
```ts
import { LOCALE_ID, ApplicationConfig } from '@angular/core';

const appConfig: ApplicationConfig = {
  providers: [{provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }]
};
```

In module based apps: *
```ts
import { TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule, {
  providers: [{provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }]
});
```

@publicApi

## MissingTranslationStrategy

```ts
export enum MissingTranslationStrategy
```

Use this enum at bootstrap as an option of `bootstrapModule` to define the strategy
that the compiler should use in case of missing translations:
- Error: throw if you have missing translations.
- Warning (default): show a warning in the console and/or shell.
- Ignore: do nothing.

See the [i18n guide](guide/i18n/merge#report-missing-translations) for more information.

@usageNotes
### Example
```ts
import { MissingTranslationStrategy } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule, {
  missingTranslation: MissingTranslationStrategy.Error
});
```

@publicApi