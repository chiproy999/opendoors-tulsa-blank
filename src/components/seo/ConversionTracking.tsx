import { useEffect } from 'react';

interface ConversionTrackingProps {
  event: 'contact_form_submit' | 'newsletter_signup' | 'job_application' | 'housing_inquiry';
  value?: number;
  currency?: string;
  itemId?: string;
  itemName?: string;
}

const ConversionTracking = ({ event, value, currency = 'USD', itemId, itemName }: ConversionTrackingProps) => {
  useEffect(() => {
    // Track conversion in Google Analytics 4
    if (window.gtag) {
      const eventData: any = {
        event_category: 'conversion',
        event_label: itemName || itemId
      };

      if (value) {
        eventData.value = value;
        eventData.currency = currency;
      }

      if (itemId) {
        eventData.content_id = itemId;
      }

      window.gtag('event', event, eventData);

      // Track specific conversion goals
      switch (event) {
        case 'contact_form_submit':
          window.gtag('event', 'generate_lead', {
            value: value || 10,
            currency: currency,
            content_category: 'contact'
          });
          break;
        case 'newsletter_signup':
          window.gtag('event', 'sign_up', {
            method: 'newsletter'
          });
          break;
        case 'job_application':
          window.gtag('event', 'conversion', {
            send_to: 'GA_MEASUREMENT_ID/job_application',
            value: value || 50,
            currency: currency
          });
          break;
        case 'housing_inquiry':
          window.gtag('event', 'conversion', {
            send_to: 'GA_MEASUREMENT_ID/housing_inquiry',
            value: value || 30,
            currency: currency
          });
          break;
      }
    }

    // Track conversion in Meta Pixel
    if (window.fbq) {
      const pixelEventMap = {
        contact_form_submit: 'Lead',
        newsletter_signup: 'CompleteRegistration',
        job_application: 'SubmitApplication',
        housing_inquiry: 'Contact'
      };

      const pixelEvent = pixelEventMap[event] || 'Other';
      
      const eventData: any = {
        content_category: 'conversion',
        content_name: itemName || event
      };

      if (value) {
        eventData.value = value;
        eventData.currency = currency;
      }

      if (itemId) {
        eventData.content_ids = [itemId];
      }

      window.fbq('track', pixelEvent, eventData);
    }
  }, [event, value, currency, itemId, itemName]);

  return null;
};

export default ConversionTracking;