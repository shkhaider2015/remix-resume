import * as Sentry from "@sentry/remix";

Sentry.init({
    dsn: "https://3ef6c2cee7b29ffc322a08fcecfc1538@o4511326897963008.ingest.us.sentry.io/4511326900846592",
    tracesSampleRate: 1,
    enableLogs: true
})