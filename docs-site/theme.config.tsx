import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.15em', fontFamily: 'monospace' }}>FRAMEWERK</span>,
  project: {
    link: 'https://github.com/depose28/framewerk',
  },
  docsRepositoryBase: 'https://github.com/depose28/framewerk/tree/main/docs-site',
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark',
  },
  footer: {
    text: 'Framewerk Documentation',
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Framewerk Docs" />
      <meta property="og:description" content="Documentation for Framewerk — a neural graph of 700 mental models" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s — Framewerk Docs'
    }
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    float: true,
  },
  primaryHue: 45,
  primarySaturation: 70,
}

export default config
