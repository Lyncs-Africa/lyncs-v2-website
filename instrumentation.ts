export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.DATABASE_URI) {
    const { getPayload } = await import('payload')
    const config = await import('@payload-config')
    await getPayload({ config: config.default })
  }
}
