export function getCorsOrigins(value = process.env.CORS_ORIGINS): string[] {
  return (
    value
      ?.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean) ?? []
  );
}
