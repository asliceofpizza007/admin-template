import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import * as transEn from './lang/en'
import * as transCn from './lang/zh_cn'
import * as transTw from './lang/zh_tw'

const languages = [
  'en',
  'zh_tw',
  'zh_cn',
]

let language = navigator.languages ?
  navigator.languages[0] :
  (navigator.language || navigator.userLanguage);
language = language.replace('-', '_').toLowerCase();

// fallback to en
const enabledLanguage = languages.includes(language) ? language : 'en'

const resources = {
  en: {
    ...transEn,
  },
  zh_tw: {
    ...transTw,
  },
  zh_cn: {
    ...transCn,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: enabledLanguage,
    fallbackLng: 'en',
    defaultNS: 'common',
    whitelist: languages,
    interpolation: {
      escapeValue: false,
    }
  }, (err, t) => {
    if(err) {
      return console.log(`something went wrong ${err}`)
    }
  })

export default i18n
