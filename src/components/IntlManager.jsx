import { IntlProvider } from 'react-intl';
import messages_en from '@/i18n/en.json';
import messages_zh from '@/i18n/zh.json';


const messages = {
  en: messages_en,
  zh: messages_zh,
 
};

export function IntlManager({ children, locale }) {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
}