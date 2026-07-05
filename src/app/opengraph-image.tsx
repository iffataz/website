import { ImageResponse } from 'next/og'
import { siteConfig } from '@/src/lib/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Iffat Abdul Azeez: project ledger'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F6F1E9',
          color: '#1E1913',
          padding: 72,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '2px solid #DDD3C4',
            paddingBottom: 24,
            fontSize: 24,
          }}
        >
          <span style={{ color: '#2545C8' }}>01</span>
          <span style={{ color: '#6F6455' }}>{siteConfig.status}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: '-0.02em' }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 30, color: '#6F6455', marginTop: 16 }}>
            {siteConfig.positioning}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            borderTop: '2px solid #DDD3C4',
            paddingTop: 24,
            fontSize: 24,
            color: '#6F6455',
          }}
        >
          iffataz.dev
        </div>
      </div>
    ),
    size
  )
}
