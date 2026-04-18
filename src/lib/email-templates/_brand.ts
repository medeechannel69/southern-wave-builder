// Shared brand styles for MedeeWeb email templates.
// Body background MUST stay white (#ffffff). Inner accents use brand colors.
export const BRAND = {
  navy: '#0F2942',
  teal: '#0EA5A8',
  orange: '#F97316',
  text: '#334155',
  muted: '#64748B',
  border: '#E2E8F0',
  bg: '#F8FAFC',
}

export const styles = {
  main: {
    backgroundColor: '#ffffff',
    fontFamily: '"Sarabun", "Prompt", Arial, sans-serif',
    margin: 0,
    padding: 0,
  } as const,
  container: {
    maxWidth: '560px',
    margin: '0 auto',
    padding: '32px 24px',
  } as const,
  brandBar: {
    backgroundColor: BRAND.navy,
    color: '#ffffff',
    padding: '20px 24px',
    borderRadius: '12px 12px 0 0',
    fontSize: '20px',
    fontWeight: 700,
    letterSpacing: '0.5px',
  } as const,
  card: {
    border: `1px solid ${BRAND.border}`,
    borderTop: 'none',
    borderRadius: '0 0 12px 12px',
    padding: '28px 24px',
    backgroundColor: '#ffffff',
  } as const,
  h1: {
    fontSize: '22px',
    fontWeight: 700,
    color: BRAND.navy,
    margin: '0 0 16px',
  } as const,
  text: {
    fontSize: '15px',
    color: BRAND.text,
    lineHeight: '1.65',
    margin: '0 0 16px',
  } as const,
  button: {
    backgroundColor: BRAND.orange,
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    borderRadius: '999px',
    padding: '12px 28px',
    textDecoration: 'none',
    display: 'inline-block',
  } as const,
  link: { color: BRAND.teal, textDecoration: 'underline' } as const,
  footer: {
    fontSize: '12px',
    color: BRAND.muted,
    margin: '28px 0 0',
    textAlign: 'center' as const,
  } as const,
  code: {
    fontFamily: 'Courier, monospace',
    fontSize: '28px',
    fontWeight: 700,
    color: BRAND.navy,
    backgroundColor: BRAND.bg,
    padding: '14px 20px',
    borderRadius: '8px',
    letterSpacing: '4px',
    textAlign: 'center' as const,
    margin: '0 0 20px',
  } as const,
  infoRow: {
    fontSize: '14px',
    color: BRAND.text,
    lineHeight: '1.6',
    margin: '4px 0',
  } as const,
  infoBox: {
    backgroundColor: BRAND.bg,
    border: `1px solid ${BRAND.border}`,
    borderRadius: '10px',
    padding: '16px 18px',
    margin: '16px 0 20px',
  } as const,
}

export const SITE_NAME = 'MedeeWeb'
export const SITE_URL = 'https://medeeweb.com'
