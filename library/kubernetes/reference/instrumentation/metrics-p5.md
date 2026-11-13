---
title: "Kubernetes Metrics Reference (part 5 of 13)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/instrumentation/metrics.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Metrics Reference (part 5 of 13)

### List of Alpha Kubernetes Metrics

Alpha metrics do not have any API guarantees. These metrics must be used at your own risk, subsequent versions of Kubernetes may remove these metrics altogether, or mutate the API in such a way that breaks existing dashboards and alerts.

	aggregator_discovery_aggregation_count_total
	Counter of number of times discovery was aggregated

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	aggregator_discovery_nopeer_requests_total
	Counter of number of times no-peer (non peer-aggregated) discovery was requested

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	aggregator_discovery_peer_aggregated_cache_hits_total
	Counter of number of times discovery was served from peer-aggregated cache

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	aggregator_discovery_peer_aggregated_cache_misses_total
	Counter of number of times discovery was aggregated across all API servers

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	aggregator_openapi_v2_regeneration_count
	Counter of OpenAPI v2 spec regeneration count broken down by causing APIService name and reason.

	Stability Level:ALPHA
	Type: Counter
	Labels:apiservicereasonComponents:kube-apiserver (/metrics)

	aggregator_openapi_v2_regeneration_duration
	Gauge of OpenAPI v2 spec regeneration duration in seconds.

	Stability Level:ALPHA
	Type: Gauge
	Labels:reasonComponents:kube-apiserver (/metrics)

	aggregator_unavailable_apiservice
	Gauge of APIServices which are marked as unavailable broken down by APIService name.

	Stability Level:ALPHA
	Type: Custom
	Labels:nameComponents:kube-apiserver (/metrics)

	aggregator_unavailable_apiservice_total
	Counter of APIServices which are marked as unavailable broken down by APIService name and reason.

	Stability Level:ALPHA
	Type: Counter
	Labels:namereasonComponents:kube-apiserver (/metrics)

	apiextensions_apiserver_validation_ratcheting_seconds
	Time for comparison of old to new for the purposes of CRDValidationRatcheting during an UPDATE in seconds.

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-apiserver (/metrics)

	apiextensions_openapi_v2_regeneration_count
	Counter of OpenAPI v2 spec regeneration count broken down by causing CRD name and reason.

	Stability Level:ALPHA
	Type: Counter
	Labels:crdreasonComponents:kube-apiserver (/metrics)

	apiextensions_openapi_v3_regeneration_count
	Counter of OpenAPI v3 spec regeneration count broken down by group, version, causing CRD and reason.

	Stability Level:ALPHA
	Type: Counter
	Labels:crdgroupreasonversionComponents:kube-apiserver (/metrics)

	apiserver_admission_match_condition_evaluation_errors_total
	Admission match condition evaluation errors count, identified by name of resource containing the match condition and broken out for each kind containing matchConditions (webhook or policy), operation and admission type (validate or admit).

	Stability Level:ALPHA
	Type: Counter
	Labels:kindnameoperationtypeComponents:kube-apiserver (/metrics)

	apiserver_admission_match_condition_evaluation_seconds
	Admission match condition evaluation time in seconds, identified by name and broken out for each kind containing matchConditions (webhook or policy), operation and type (validate or admit).

	Stability Level:ALPHA
	Type: Histogram
	Labels:kindnameoperationtypeComponents:kube-apiserver (/metrics)

	apiserver_admission_match_condition_exclusions_total
	Admission match condition evaluation exclusions count, identified by name of resource containing the match condition and broken out for each kind containing matchConditions (webhook or policy), operation and admission type (validate or admit).

	Stability Level:ALPHA
	Type: Counter
	Labels:kindnameoperationtypeComponents:kube-apiserver (/metrics)

	apiserver_admission_step_admission_duration_seconds_summary
	Admission sub-step latency summary in seconds, broken out for each operation and API resource and step type (validate or admit).

	Stability Level:ALPHA
	Type: Summary
	Labels:operationrejectedtypeComponents:kube-apiserver (/metrics)

	apiserver_admission_webhook_fail_open_count
	Admission webhook fail open count, identified by name and broken out for each admission type (validating or admit).

	Stability Level:ALPHA
	Type: Counter
	Labels:nametypeComponents:kube-apiserver (/metrics)

	apiserver_admission_webhook_rejection_count
	Admission webhook rejection count, identified by name and broken out for each admission type (validating or admit) and operation. Additional labels specify an error type (calling_webhook_error or apiserver_internal_error if an error occurred; no_error otherwise) and optionally a non-zero rejection code if the webhook rejects the request with an HTTP status code (honored by the apiserver when the code is greater or equal to 400). Codes greater than 600 are truncated to 600, to keep the metrics cardinality bounded.

	Stability Level:ALPHA
	Type: Counter
	Labels:error_typenameoperationrejection_codetypeComponents:kube-apiserver (/metrics)

	apiserver_admission_webhook_request_total
	Admission webhook request total, identified by name and broken out for each admission type (validating or admit) and operation. Additional labels specify whether the request was rejected or not and an HTTP status code. Codes greater than 600 are truncated to 600, to keep the metrics cardinality bounded.

	Stability Level:ALPHA
	Type: Counter
	Labels:codenameoperationrejectedtypeComponents:kube-apiserver (/metrics)

	apiserver_audit_error_total
	Counter of audit events that failed to be audited properly. Plugin identifies the plugin affected by the error.

	Stability Level:ALPHA
	Type: Counter
	Labels:pluginComponents:kube-apiserver (/metrics)

	apiserver_audit_event_total
	Counter of audit events generated and sent to the audit backend.

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_audit_level_total
	Counter of policy levels for audit events (1 per request).

	Stability Level:ALPHA
	Type: Counter
	Labels:levelComponents:kube-apiserver (/metrics)

	apiserver_audit_requests_rejected_total
	Counter of apiserver requests rejected due to an error in audit logging backend.

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_authentication_config_controller_last_config_info
	Information about the last applied authentication configuration with hash as label, split by apiserver identity.

	Stability Level:ALPHA
	Type: Custom
	Labels:apiserver_id_hashhashComponents:kube-apiserver (/metrics)

	apiserver_authentication_jwt_authenticator_jwks_fetch_last_key_set_info
	Information about the last JWKS fetched by the JWT authenticator with hash as label, split by api server identity and jwt issuer.

	Stability Level:ALPHA
	Type: Custom
	Labels:jwt_issuer_hashapiserver_id_hashhashComponents:kube-apiserver (/metrics)

	apiserver_authentication_jwt_authenticator_jwks_fetch_last_timestamp_seconds
	Timestamp of the last successful or failed JWKS fetch split by result, api server identity and jwt issuer for the JWT authenticator.

	Stability Level:ALPHA
	Type: Gauge
	Labels:apiserver_id_hashjwt_issuer_hashresultComponents:kube-apiserver (/metrics)

	apiserver_authentication_jwt_authenticator_latency_seconds
	Latency of jwt authentication operations in seconds. This is the time spent authenticating a token for cache miss only (i.e. when the token is not found in the cache).

	Stability Level:ALPHA
	Type: Histogram
	Labels:jwt_issuer_hashresultComponents:kube-apiserver (/metrics)

	apiserver_authorization_config_controller_last_config_info
	Information about the last applied authorization configuration with hash as label, split by apiserver identity.

	Stability Level:ALPHA
	Type: Custom
	Labels:apiserver_id_hashhashComponents:kube-apiserver (/metrics)

	apiserver_authorization_decisions_total
	Total number of terminal decisions made by an authorizer split by authorizer type, name, and decision.

	Stability Level:ALPHA
	Type: Counter
	Labels:decisionnametypeComponents:kube-apiserver (/metrics)

	apiserver_authorization_match_condition_evaluation_errors_total
	Total number of errors when an authorization webhook encounters a match condition error split by authorizer type and name.

	Stability Level:ALPHA
	Type: Counter
	Labels:nametypeComponents:kube-apiserver (/metrics)

	apiserver_authorization_match_condition_evaluation_seconds
	Authorization match condition evaluation time in seconds, split by authorizer type and name.

	Stability Level:ALPHA
	Type: Histogram
	Labels:nametypeComponents:kube-apiserver (/metrics)

	apiserver_authorization_match_condition_exclusions_total
	Total number of exclusions when an authorization webhook is skipped because match conditions exclude it.

	Stability Level:ALPHA
	Type: Counter
	Labels:nametypeComponents:kube-apiserver (/metrics)

	apiserver_authorization_webhook_duration_seconds
	Request latency in seconds.

	Stability Level:ALPHA
	Type: Histogram
	Labels:nameresultComponents:kube-apiserver (/metrics)

	apiserver_authorization_webhook_evaluations_fail_open_total
	NoOpinion results due to webhook timeout or error.

	Stability Level:ALPHA
	Type: Counter
	Labels:nameresultComponents:kube-apiserver (/metrics)

	apiserver_authorization_webhook_evaluations_total
	Round-trips to authorization webhooks.

	Stability Level:ALPHA
	Type: Counter
	Labels:nameresultComponents:kube-apiserver (/metrics)

	apiserver_cache_list_fetched_objects_total
	Number of objects read from watch cache in the course of serving a LIST request

	Stability Level:ALPHA
	Type: Counter
	Labels:groupindexresourceComponents:kube-apiserver (/metrics)Deprecated Versions:1.37.0

	apiserver_cache_list_returned_objects_total
	Number of objects returned for a LIST request from watch cache

	Stability Level:ALPHA
	Type: Counter
	Labels:groupresourceComponents:kube-apiserver (/metrics)Deprecated Versions:1.37.0

	apiserver_cache_list_total
	Number of LIST requests served from watch cache

	Stability Level:ALPHA
	Type: Counter
	Labels:groupindexresourceComponents:kube-apiserver (/metrics)Deprecated Versions:1.37.0

	apiserver_certificates_registry_csr_honored_duration_total
	Total number of issued CSRs with a requested duration that was honored, sliced by signer (only kubernetes.io signer names are specifically identified)

	Stability Level:ALPHA
	Type: Counter
	Labels:signerNameComponents:kube-apiserver (/metrics)

	apiserver_certificates_registry_csr_requested_duration_total
	Total number of issued CSRs with a requested duration, sliced by signer (only kubernetes.io signer names are specifically identified)

	Stability Level:ALPHA
	Type: Counter
	Labels:signerNameComponents:kube-apiserver (/metrics)

	apiserver_client_certificate_expiration_seconds
	Distribution of the remaining lifetime on the certificate used to authenticate a request.

	Stability Level:ALPHA
	Type: Histogram
	Components:kube-apiserver (/metrics)

	apiserver_clusterip_repair_ip_errors_total
	Number of errors detected on clusterips by the repair loop broken down by type of error: leak, repair, full, outOfRange, duplicate, unknown, invalid

	Stability Level:ALPHA
	Type: Counter
	Labels:typeComponents:kube-apiserver (/metrics)

	apiserver_clusterip_repair_reconcile_errors_total
	Number of reconciliation failures on the clusterip repair reconcile loop

	Stability Level:ALPHA
	Type: Counter
	Components:kube-apiserver (/metrics)

	apiserver_conversion_webhook_duration_seconds
	Conversion webhook request latency

	Stability Level:ALPHA
	Type: Histogram
	Labels:failure_typeresultComponents:kube-apiserver (/metrics)

	apiserver_conversion_webhook_request_total
	Counter for conversion webhook requests with success/failure and failure error type

	Stability Level:ALPHA
	Type: Counter
	Labels:failure_typeresultComponents:kube-apiserver (/metrics)

	apiserver_crd_conversion_webhook_duration_seconds
	CRD webhook conversion duration in seconds

	Stability Level:ALPHA
	Type: Histogram
	Labels:crd_namefrom_versionsucceededto_versionComponents:kube-apiserver (/metrics)

	apiserver_current_inqueue_requests
	Maximal number of queued requests in this apiserver per request kind in last second.

	Stability Level:ALPHA
	Type: Gauge
	Labels:request_kindComponents:kube-apiserver (/metrics)

	apiserver_delegated_authn_request_duration_seconds
	Request latency in seconds. Broken down by status code.

	Stability Level:ALPHA
	Type: Histogram
	Labels:codeComponents:kube-apiserver (/metrics)

	apiserver_delegated_authn_request_total
	Number of HTTP requests partitioned by status code.

	Stability Level:ALPHA
	Type: Counter
	Labels:codeComponents:kube-apiserver (/metrics)

	apiserver_delegated_authz_request_duration_seconds
	Request latency in seconds. Broken down by status code.

	Stability Level:ALPHA
	Type: Histogram
	Labels:codeComponents:kube-apiserver (/metrics)

	apiserver_delegated_authz_request_total
	Number of HTTP requests partitioned by status code.

	Stability Level:ALPHA
	Type: Counter
	Labels:codeComponents:kube-apiserver (/metrics)

	apiserver_egress_dialer_dial_duration_seconds
	Dial latency histogram in seconds, labeled by the protocol (http-connect or grpc), transport (tcp or uds)

	Stability Level:ALPHA
	Type: Histogram
	Labels:protocoltransportComponents:kube-apiserver (/metrics)

	apiserver_egress_dialer_dial_failure_count
	Dial failure count, labeled by the protocol (http-connect or grpc), transport (tcp or uds), and stage (connect or proxy). The stage indicates at which stage the dial failed

	Stability Level:ALPHA
	Type: Counter
	Labels:protocolstagetransportComponents:kube-apiserver (/metrics)

	apiserver_egress_dialer_dial_start_total
	Dial starts, labeled by the protocol (http-connect or grpc) and transport (tcp or uds).

	Stability Level:ALPHA
	Type: Counter
	Labels:protocoltransportComponents:kube-apiserver (/metrics)

	apiserver_encryption_config_controller_automatic_reload_last_timestamp_seconds
	Timestamp of the last successful or failed automatic reload of encryption configuration split by apiserver identity.

	Stability Level:ALPHA
	Type: Gauge
	Labels:apiserver_id_hashstatusComponents:kube-apiserver (/metrics)

	apiserver_encryption_config_controller_automatic_reloads_total
	Total number of reload successes and failures of encryption configuration split by apiserver identity.

	Stability Level:ALPHA
	Type: Counter
	Labels:apiserver_id_hashstatusComponents:kube-apiserver (/metrics)

	apiserver_encryption_config_controller_last_config_info
	Information about the last applied encryption configuration with hash as label, split by apiserver identity.

	Stability Level:ALPHA
	Type: Custom
	Labels:apiserver_id_hashhashComponents:kube-apiserver (/metrics)

	apiserver_envelope_encryption_dek_cache_fill_percent
	Percent of the cache slots currently occupied by cached DEKs.

	Stability Level:ALPHA
	Type: Gauge
	Components:kube-apiserver (/metrics)
