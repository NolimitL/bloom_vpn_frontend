export type ApplicationMode = 'DEV' | 'PROD'

export const applicationMode = (): ApplicationMode => {
  const mode = (import.meta.env.VITE_APP_MODE ?? 'PROD') as string
  if (['DEV', 'PROD'].includes(mode)) {
    return mode as ApplicationMode
  }

  throw new Error(`Unknown application mode: ${mode}`)
}

export const backendBaseUrl = (): string => {
  const url = import.meta.env.VITE_BACKEND_BASE_URL as string
  if (url) {
    return url
  }
  throw new Error(`Backend URL is not defined in environment variables`)
}

export const frontendBaseUrl = (): string => {
  const url = import.meta.env.VITE_FRONTEND_BASE_URL as string
  if (url) {
    return url
  }
  throw new Error(`Frontend URL is not defined in environment variables`)
}
