export function fail(statusCode, message) {
  throw Object.assign(new Error(message), { statusCode })
}
