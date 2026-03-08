module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/data/translations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        appName: "Salary Splitter",
        tagline: "Split smart, save smarter",
        monthlySalary: "Monthly Salary",
        enterYourSalary: "Enter your salary",
        mustBeGreaterThanZero: "Must be greater than 0",
        enterValidAmount: "Enter a valid amount",
        categories: "Categories",
        categoryName: "Category name",
        nameRequired: "Name required",
        addCategory: "+ Add category",
        overBy: (pct)=>`Over by ${pct}% — remove some to reach 100%`,
        remaining: (pct)=>`${pct}% remaining — add more or adjust`,
        remove: "Remove",
        yourSplit: "Your Split",
        emptyState: "Enter your salary and set up categories to see the split",
        totalAllocated: "Total allocated",
        unallocated: "unallocated",
        financialGuidelines: "Financial Guidelines",
        guidelinesDescription: "General recommendations based on the",
        rule503020: "50 / 30 / 20",
        guidelinesDisclaimer: "These are general guidelines, not financial advice. Your ideal split depends on income level, cost of living, debt obligations, and personal goals.",
        sixAccountsRule: "The 6 Accounts Rule",
        sixAccountsDescription: "Popularised by T. Harv Eker in",
        sixAccountsBook: "Secrets of the Millionaire Mind",
        sixAccountsDisclaimer: "The percentages above total 100% of after-tax income. Adapt the ratios to your reality — the key principle is giving every dollar a purpose.",
        housingRent: "Housing / Rent",
        savingsInvestments: "Savings & Investments",
        foodGroceries: "Food & Groceries",
        transportation: "Transportation",
        utilitiesBills: "Utilities & Bills",
        entertainmentFun: "Entertainment / Fun",
        emergencyFund: "Emergency Fund",
        housingNote: 'Includes rent or mortgage. Keeping this under 30% avoids being "house poor."',
        savingsNote: "Pay yourself first — the 50/30/20 rule suggests at least 20% toward savings and debt repayment.",
        foodNote: "Cooking at home keeps this on the lower end; dining out pushes it higher.",
        transportNote: "Gas, insurance, public transit, or car payment. Aim for the lower range if possible.",
        utilitiesNote: "Electricity, water, internet, phone. Relatively fixed — budget a consistent amount.",
        entertainmentNote: 'Part of the "wants" bucket. Guilt-free spending once essentials are covered.',
        emergencyNote: "Not a monthly %, but a target reserve. Build it gradually, then maintain it.",
        emergencyRecommended: "3 – 6 months of expenses",
        necessities: "Necessities",
        financialFreedom: "Financial Freedom",
        longTermSavings: "Long-term Savings",
        education: "Education",
        play: "Play",
        give: "Give",
        necessitiesNote: "Rent, food, bills, transport — everything you need to live day-to-day.",
        financialFreedomNote: "Investments and passive-income building. Never spend this — let it compound.",
        longTermSavingsNote: "Big future purchases: house deposit, car, holidays. Goal-based saving.",
        educationNote: "Courses, books, coaching — invest in growing your earning potential.",
        playNote: "Guilt-free fun money. Spend it every month to reward yourself.",
        giveNote: "Charity, gifts, helping others. Builds gratitude and community."
    },
    lt: {
        appName: "Atlyginimo Skaidyklė",
        tagline: "Skaidyk protingai, taupyk išmaniai",
        monthlySalary: "Mėnesinis atlyginimas",
        enterYourSalary: "Įveskite atlyginimą",
        mustBeGreaterThanZero: "Turi būti daugiau nei 0",
        enterValidAmount: "Įveskite teisingą sumą",
        categories: "Kategorijos",
        categoryName: "Kategorijos pavadinimas",
        nameRequired: "Pavadinimas privalomas",
        addCategory: "+ Pridėti kategoriją",
        overBy: (pct)=>`Viršyta ${pct}% — pašalinkite dalį, kad pasiektumėte 100%`,
        remaining: (pct)=>`Liko ${pct}% — pridėkite daugiau arba pakoreguokite`,
        remove: "Pašalinti",
        yourSplit: "Jūsų paskirstymas",
        emptyState: "Įveskite atlyginimą ir nustatykite kategorijas, kad matytumėte paskirstymą",
        totalAllocated: "Iš viso paskirstyta",
        unallocated: "nepaskirstyta",
        financialGuidelines: "Finansinės gairės",
        guidelinesDescription: "Bendros rekomendacijos pagal",
        rule503020: "50 / 30 / 20",
        guidelinesDisclaimer: "Tai bendros gairės, o ne finansinė konsultacija. Idealus paskirstymas priklauso nuo pajamų lygio, pragyvenimo išlaidų, skolų ir asmeninių tikslų.",
        sixAccountsRule: "6 sąskaitų taisyklė",
        sixAccountsDescription: "Populiarinta T. Harv Eker knygoje",
        sixAccountsBook: "Secrets of the Millionaire Mind",
        sixAccountsDisclaimer: "Aukščiau pateikti procentai sudaro 100% pajamų po mokesčių. Pritaikykite proporcijas savo realybei — pagrindinis principas yra kiekvienam eurui skirti paskirtį.",
        housingRent: "Būstas / Nuoma",
        savingsInvestments: "Santaupos ir investicijos",
        foodGroceries: "Maistas ir bakalėja",
        transportation: "Transportas",
        utilitiesBills: "Komunalinės paslaugos",
        entertainmentFun: "Pramogos / Laisvalaikis",
        emergencyFund: "Atsargų fondas",
        housingNote: "Apima nuomą arba paskolą. Laikant šią dalį mažesnę nei 30%, išvengsite finansinio spaudimo.",
        savingsNote: "Mokėkite pirma sau — 50/30/20 taisyklė rekomenduoja bent 20% taupymui ir skolų grąžinimui.",
        foodNote: "Gaminimas namuose padeda išlaikyti mažesnę dalį; valgymas ne namuose ją padidina.",
        transportNote: "Kuras, draudimas, viešasis transportas ar automobilio išlaidos. Stenkitės laikytis mažesnio diapazono.",
        utilitiesNote: "Elektra, vanduo, internetas, telefonas. Gana pastovios išlaidos — planuokite pastovią sumą.",
        entertainmentNote: "\u201ENor\u0173\u201C kategorija. Leiskite be kalt\u0117s jausmo, kai pagrindiniai poreikiai patenkinti.",
        emergencyNote: "Ne mėnesinis %, o tikslinis rezervas. Kaupkite palaipsniui, paskui palaikykite.",
        emergencyRecommended: "3 – 6 mėn. išlaidų",
        necessities: "Būtinybės",
        financialFreedom: "Finansinė laisvė",
        longTermSavings: "Ilgalaikės santaupos",
        education: "Švietimas",
        play: "Pramogos",
        give: "Labdara",
        necessitiesNote: "Nuoma, maistas, sąskaitos, transportas — viskas, ko reikia kasdieniam gyvenimui.",
        financialFreedomNote: "Investicijos ir pasyvių pajamų kūrimas. Niekada neišleiskite — leiskite augti.",
        longTermSavingsNote: "Dideli ateities pirkiniai: būsto įnašas, automobilis, atostogos. Taupymas pagal tikslus.",
        educationNote: "Kursai, knygos, koučingas — investuokite į savo uždarbio potencialo augimą.",
        playNote: "Pinigai pramogoms be kaltės jausmo. Išleiskite juos kiekvieną mėnesį.",
        giveNote: "Labdara, dovanos, pagalba kitiems. Ugdo dėkingumą ir bendruomeniškumą."
    }
};
}),
"[project]/src/components/language-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/translations.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const LANG_KEY = "salary-splitter-lang";
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    locale: "en",
    setLocale: ()=>{},
    t: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"].en
});
function LanguageProvider({ children }) {
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("en");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const saved = localStorage.getItem(LANG_KEY);
            if (saved && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][saved]) {
                setLocaleState(saved);
            }
        } catch  {
        // ignore
        }
    }, []);
    const setLocale = (l)=>{
        setLocaleState(l);
        try {
            localStorage.setItem(LANG_KEY, l);
        } catch  {
        // ignore
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            locale,
            setLocale,
            t: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][locale]
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/language-provider.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
function useLanguage() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1435cc59._.js.map