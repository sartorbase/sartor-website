export function trackWhatsAppClick(location: string, label?: string) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'whatsapp_click',
      click_location: location,
      label: label || 'WhatsApp Conversion',
    });
  }
}
