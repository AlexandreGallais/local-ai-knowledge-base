---
title: "PaymentAddress"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentaddress/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentAddress

The **`PaymentAddress`** interface of the Payment Request API is used to store shipping or payment address information.

It may be useful to refer to the Universal Postal Union website's Addressing S42 standard materials, which provide information about international standards for postal addresses.

## Instance properties

- `PaymentAddress.addressLine` (read-only) (deprecated) (non-standard)
    An array of strings providing each line of the address not included among the other properties. The exact size and content varies by country or location and can include, for example, a street name, house number, apartment number, rural delivery route, descriptive instructions, or post office box number.
- `PaymentAddress.country` (read-only) (deprecated) (non-standard)
    A string specifying the country in which the address is located, using the ISO-3166-1 alpha-2 standard. The string is always given in its canonical upper-case form. Some examples of valid `country` values: `"US"`, `"GB"`, `"CN"`, or `"JP"`.
- `PaymentAddress.city` (read-only) (deprecated) (non-standard)
    A string which contains the city or town portion of the address.
- `PaymentAddress.dependentLocality` (read-only) (deprecated) (non-standard)
    A string giving the dependent locality or sublocality within a city, for example, a neighborhood, borough, district, or UK dependent locality.
- `PaymentAddress.organization` (read-only) (deprecated) (non-standard)
    A string specifying the name of the organization, firm, company, or institution at the payment address.
- `PaymentAddress.phone` (read-only) (deprecated) (non-standard)
    A string specifying the telephone number of the recipient or contact person.
- `PaymentAddress.postalCode` (read-only) (deprecated) (non-standard)
    A string specifying a code used by a jurisdiction for mail routing, for example, the ZIP code in the United States or the PIN code in India.
- `PaymentAddress.recipient` (read-only) (deprecated) (non-standard)
    A string giving the name of the recipient, purchaser, or contact person at the payment address.
- `PaymentAddress.region` (read-only) (deprecated) (non-standard)
    A string containing the top level administrative subdivision of the country, for example a state, province, oblast, or prefecture.
- `PaymentAddress.sortingCode` (read-only) (deprecated) (non-standard)
    A string providing a postal sorting code such as is used in France.

> **Note:**
> Properties for which values were not specified contain empty strings.

## Instance methods

- `PaymentAddress.toJSON()` (deprecated) (non-standard)
    Returns a JSON-serializable plain object representing the `PaymentAddress` object. Automatically called by `JSON.stringify()`.

## Examples

In the following example, the `PaymentRequest()` constructor is used to create a new payment request, which takes three objects as parameters — one containing details of the payment methods that can be used for the payment, one containing details of the actual order (such as items bought and shipping options), and an optional object containing further options.

The first of these three (`supportedInstruments` in the example below) contains a `data` property that has to conform to the structure defined by the payment method.

```js
const supportedInstruments = [
  {
    supportedMethods: "https://example.com/pay",
  },
];

const details = {
  total: { label: "Donation", amount: { currency: "USD", value: "65.00" } },
  displayItems: [
    {
      label: "Original donation amount",
      amount: { currency: "USD", value: "65.00" },
    },
  ],
  shippingOptions: [
    {
      id: "standard",
      label: "Standard shipping",
      amount: { currency: "USD", value: "0.00" },
      selected: true,
    },
  ],
};

const options = { requestShipping: true };

async function doPaymentRequest() {
  const request = new PaymentRequest(supportedInstruments, details, options);
  // Add event listeners here.
  // Call show() to trigger the browser's payment flow.
  const response = await request.show();
  // Process payment.
  const json = response.toJSON();
  const httpResponse = await fetch("/pay/", { method: "POST", body: json });
  const result = httpResponse.ok ? "success" : "failure";

  await response.complete(result);
}
doPaymentRequest();
```

Once the payment flow has been triggered using `PaymentRequest.show()` and the promise resolves successfully, the `PaymentResponse` object available from the fulfilled promise (`instrumentResponse` above) will have a `PaymentResponse.details` property containing response details. This has to conform to the structure defined by the payment method provider.
