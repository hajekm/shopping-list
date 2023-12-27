import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// Překlady
const resources = {
    en: {
        translation: {
            "errorTitle": "OOPS! Something went wrong",
            "statusDone": "Done",
            "statusCancelled": "Cancelled",
            "statusNew": "New",
            "statusAll": "All",
            "statusPlaceholder": "Choose status",
            "toastSummarySuccess": "OK",
            "toastSummaryError": "Error",
            "toastMessageError": "Error",
            "toastMessageSuccess": "OK",
            "confirmYes": "Yes",
            "confirmNo": "No",
            "detail": "Detail",
            "newList": "Create list"
        }
    },
    cs: {
        translation: {
            "errorTitle": "JEJDA! Něco se pokazilo",
            "statusDone": "Hotový",
            "statusCancelled": "Zrušený",
            "statusNew": "Nový",
            "statusAll": "Vše",
            "statusPlaceholder": "Dle stavu",
            "toastSummarySuccess": "Úspěch",
            "toastSummaryError": "Chyba",
            "confirmYes": "Ano",
            "confirmNo": "Ne",
            "detail": "Detail",
            "newList": "Nový seznam"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "cs", // výchozí jazyk
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;