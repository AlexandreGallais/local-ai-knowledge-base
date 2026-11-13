---
title: "Generating attribution reports (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/attribution_reporting_api/generating_reports/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Generating attribution reports

This article explains how Attribution Reporting API reports are generated — both attribution reports and debug reports — and how you can control the generated reports. This includes handling noise, prioritizing reports, filtering reports, and generating debug reports.

## Basic <example-value>

When a match occurs between a trigger and a source, the browser generates a report and sends it via an uncredentialed `POST` request to a specific endpoint on the reporting origin:

- For event-level reports, this is `<reporting-origin>/.well-known/attribution-reporting/report-event-attribution`.
- For summary reports, this is `<reporting-origin>/.well-known/attribution-reporting/report-aggregate-attribution`.

The `<reporting-origin>` will be same-origin with the one that registered the source and trigger.

The report data is contained in a JSON structure.

## Event-level reports

Event-level reports are generated and scheduled to be sent at the end of their containing **report window**. The length of the report window is determined by the values set in the `"event_report_window"` or `"event_report_windows"` field set in the source's `Attribution-Reporting-Register-Source` header.

If neither of these fields are specified, the report window falls back to the following defaults:

- For event-based sources, the default report window ends at the source's expiry, which is set in the `Attribution-Reporting-Register-Source` `"expiry"` field. This defaults to 30 days after registration if not explicitly set.
- For navigation-based sources, the default report windows are 2 days, 7 days, and the source's `"expiry"`.

See Custom report windows for more details.

Once an event-level report is received at the appropriate endpoint, how the data is processed, stored, and displayed is completely up to the developer. A typical event-level report might look like this:

```json
{
  "attribution_destination": "https://advertiser.example",
  "source_event_id": "412444888111012",
  "trigger_data": "4",
  "report_id": "123e4567-e89b-12d3-a456-426614174000",
  "source_type": "navigation",
  "randomized_trigger_rate": 0.34,
  "scheduled_report_time": "1692255696",
  "source_debug_key": <example-value>,
  "trigger_debug_key": <example-value>
}
```

The properties are as follows:

- `"attribution_destination"`
    A string, or an array of 2–3 strings, depending on whether the source was registered with multiple destinations or not. These strings represent the attribution `"destination"` site(s) set in the source registration via the associated `Attribution-Reporting-Register-Source` response header.
- `"source_event_id"`
    A string representing the attribution source ID. This is equal to the `"source_event_id"` set in the source registration (via the associated `Attribution-Reporting-Register-Source` response header).
- `"trigger_data"`
    A string representing data originating from the attribution trigger, set in the trigger registration (the `"trigger_data"` set via the associated `Attribution-Reporting-Register-Trigger` response header).
- `"report_id"`
    A string representing a Universally Unique Identifier (UUID) for this report, which can be used to prevent duplicate counting.
- `"source_type"`
    A string equal to either `"navigation"` or `"event"`, which respectively indicate whether the associated attribution source is navigation-based, or event-based.
- `"randomized_trigger_rate"`
    A random number between 0 and 1 indicating how often noise is applied for this particular source configuration.
- `"scheduled_report_time"`
    A string representing the number of seconds from the Unix Epoch until the browser initially scheduled the report to be sent (to avoid inaccuracies as a result of offline devices reporting late).
- `"source_debug_key"` (optional)
    A 64 bit unsigned integer representing the debugging key for the attribution source. This mirrors the value set in the associated `Attribution-Reporting-Register-Source` header's `"debug_key"` field. See Debug reports for more information.
- `"trigger_debug_key"` (optional)
    A 64 bit unsigned integer representing the debugging key for the attribution trigger. This mirrors the value set in the associated `Attribution-Reporting-Register-Trigger` header's `"debug_key"` field. See Debug reports for more information.

## Summary reports

A summary report is created from several aggregatable reports received at the appropriate endpoint and then batched to prepare them to be processed by an aggregation service. When this has occurred, how the data is processed, stored, and displayed is completely up to the developer.

An aggregatable report by default is generated and scheduled to be sent after a trigger is interacted with, with a random delay to help fuzz the timings and improve privacy. For a given registered attribution source, attribution source events will be recorded from registration up until the source expires - this is referred to as the **report window**.

The expiry time is defined by the `expiry` value set in the associated `Attribution-Reporting-Register-Source` header, which defaults to 30 days after registration if not explicitly set. Bear in mind that the length of the report window can be further modified by setting an `aggregatable_report_window` value in the `Attribution-Reporting-Register-Source` header. See Custom report windows for more details.

> **Note:**
> To further protect user privacy, the summary report values associated with each attribution source have a finite total value — this is called the **contribution budget**. This value may vary across different implementations of the API; in Chrome it is 65,536. Any conversions that would generate reports adding values over that limit are not recorded. Make sure you keep track of the budget and share it between the different metrics you are trying to measure.

A typical aggregatable report might look like this:

```json
{
  "shared_info": "{\"api\":\"attribution-reporting\",\"attribution_destination\":\"https://advertiser.example\",\"report_id\":\"123e4567-e89b-12d3-a456-426614174000\",\"reporting_origin\":\"https://reporter.example\",\"scheduled_report_time\":\"1692255696\",\"source_registration_time\":\"1692230400\",\"version\":\"3\"}",
  "aggregation_service_payloads": [
    {
      "payload": "[base64-encoded HPKE encrypted data readable only by the aggregation service]",
      "key_id": "[string identifying public key used to encrypt payload]",
      "debug_cleartext_payload": "[base64-encoded unencrypted payload]"
    }
  ],
  "aggregation_coordinator_origin": "https://publickeyservice.aws.privacysandboxservices.com",
  "source_debug_key": <example-value>,
  "trigger_debug_key": <example-value>
}
```

The properties are as follows:

- `"shared_info"`
    This is a serialized JSON object providing information that an aggregation service will use to put together a summary report. This data is encrypted using AEAD to prevent tampering. The following properties are represented in the serialized string:
    - `"api"`
        An enumerated value representing the API that triggered the report generation. Currently this will always be equal to `"attribution-reporting"`, but it may be extended with additional values to support other APIs in the future.
    - `"attribution_destination"`
        A string representing the attribution `"destination"` URL set in the source registration (via the associated `Attribution-Reporting-Register-Source` response header).
    - `"report_id"`
        A string representing a Universally Unique Identifier (UUID) for this report, which can be used to prevent duplicate counting.
    - `"reporting_origin"`
        The origin that triggered the report generation.
    - `"scheduled_report_time"`
        A string representing the number of seconds from the Unix Epoch until the browser initially scheduled the report to be sent (to avoid inaccuracies as a result of offline devices reporting late).
    - `"source_registration_time"`
        A string representing the number of seconds from the Unix Epoch until the attribution source was registered, rounded down to a whole day.
    - `"version"`
        A string representing the version of the API used to generate the report.
- `"aggregation_service_payloads"`
    An array of objects representing payload objects containing the histogram contributions used by the aggregation service to assemble the data contained in the report. Currently, only a single payload is supported per report, configured by the browser. In the future multiple, customizable payloads may be supported. Each payload object can contain the following properties:
    - `"payload"`
        A CBOR map encrypted via HPKE and then base64-encoded, with the following structure (using JSON for notation only):

        ```json
        {
          "operation": "histogram",
          "data": [
            {
              "bucket": "<Encoded as a 16-byte (i.e. 128-bit) big-endian bytestring>",
              "value": "<Encoded as a 4-byte (i.e. 32-bit) big-endian bytestring>"
            }
            // …
          ]
        }
        ```

        The `operation` is always `"histogram"`; it allows for the service to support other operations in the future.

    - `"key_id"`
        A string identifying the public key used to encrypt the payload.
    - `"debug_cleartext_payload"` (optional)
        Optional debugging information.

- `"aggregation_coordinator_origin"`
    The deployment option for the aggregation service.
- `"source_debug_key"` (optional)
    A 64 bit unsigned integer representing the debugging key for the attribution source. This mirrors the value set in the associated `Attribution-Reporting-Register-Source` header's `"debug_key"` field. See Debug reports for more information.
- `"trigger_debug_key"` (optional)
    A 64 bit unsigned integer representing the debugging key for the attribution trigger. This mirrors the value set in the associated `Attribution-Reporting-Register-Trigger` header's `"debug_key"` field. See Debug reports for more information.

## Adding noise to reports

<!--
THIS INFORMATION IS NOT COMPLETE; WE HAVE PARKED IT FOR NOW SO THAT WE CAN GET THIS DOCUMENTATION PUBLISHED, AND WE WILL DO MORE WORK ON ARA NOISE ON A FUTURE DATE, IF/WHEN THE DEMAND IS THERE

In the case of event-level reports, this is done using a randomized response algorithm, which works like so:

1. When an attribution source is stored, the browser generates a list of all possible sets of reports that could originate from the source's configuration (including the set consisting of no reports).
2. In a small percentage of cases, the browser prevents the source from being attributed and instead picks a random member of that list to use as the source's reports. The probability of this happening is based on the size of that list, the browser's implementation-specific privacy parameters, and the source's chosen `"event_level_epsilon"`.

Typical settings in the `Attribution-Reporting-Register-Source` header might look like so:

```json
{
  ...,
  "trigger_data": [0, 1, 2, 3, 4],
  "trigger_data_matching": "exact",
  ...,
}
```

The source `"trigger_data"` can have a maximum of 32 values. Increasing the number of values and `"event_report_windows"` increases the number of elements in the overall report set.

A matching `Attribution-Reporting-Register-Trigger` could contain the following:

```json
{
  ...,
  "event_trigger_data": [
    {
      // The value 4 is contained in the source data, therefore a match is possible
      "trigger_data": "4"
    },
  ],
  ...,
}
```

It is however still possible that a match may not occur, based on the randomized response algorithm described above.
-->

Noise is added to reports in order to obscure the output associated with a particular source, and thereby protect user privacy. The exact source data cannot be identified and attributed back to individual users, but the overall patterns taken from the data will still provide the same meaning.

For information on how noise works in attribution reporting, see:

- Understanding noise in summary reports.
- Data limits and noise
- Working with noise

## Report priorities and limits

By default, all attribution sources have the same priority, and the attribution model is last-touch, meaning that a conversion is attributed to the most recent matching source event. For both event-level and aggregatable reports you can change source priority by setting a new value for the `"priority"` field in the associated `Attribution-Reporting-Register-Source` header. The default value is `0`; if you set a `"priority"` value of `1` on a particular source, that source will be matched first, before any priority `0` sources. Sources with `"priority": "2"` will be matched before `"priority": "1"` sources, and so on.

Attribution trigger priorities work the same way; you can also set trigger priorities by adding a `"priority"` field to the associated `Attribution-Reporting-Register-Trigger` header, but only for event-level reports.

Different source types have different default limits:

- Navigation-based attribution sources have a three-report limit by default. For example, say a user clicks an ad and converts four times: they visit the advertiser site homepage, then visit a product page, sign up to the newsletter, and finally make a purchase. The purchase report would be dropped, as it comes from the fourth conversion.
- Event-based attribution sources have a one-report limit by default.

> **Note:**
> The report limit can be adjusted by setting a different number of `"end_times"` in the `"event_report_windows"` fields of the associated `Attribution-Reporting-Register-Source` header.

When an attribution is triggered for a given source event, if the maximum number of attributions (three for clicks, one for images/scripts) has been reached for this source the browser will:

- Compare the priority of the new report with the priorities of existing scheduled reports for that same source.
- Delete the report with the lowest priority to schedule the new report instead. If the new report is the one with the lowest priority, it is ignored and you won't receive it.

If no priorities are set, the browser falls back to its default behavior: any conversion happening after the third conversion for clicks or the first conversion for views is dropped.
