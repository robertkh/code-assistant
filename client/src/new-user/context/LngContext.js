//?
import React, { useContext } from "react";
import LocalizedStrings from "react-localization";
const LngContext = React.createContext();

// todo - 1
export const useLngContext = () => {
	return useContext(LngContext);
};

// todo - 2
export const LngContextProvider = ({ children }) => {
	//
	const strings = new LocalizedStrings({
		// GB:

		AM: {
			// - user login
			login_1: "Մուտք համակարգ",
			login_2: "Հիշել ինձ",
			login_3: "Նոր ծածկագի՞ր",
			login_4: "Հաստատել",
			login_5: "Չունե՞ք հաշիվ",
			login_6: "Գրանցվել այստեղ",
			login_7: "Հաջողությամբ մուտք գործեցիք ձեր հաշիվ։",

			// - user signup
			signup_1: "Ստեղծել նոր հաշիվ",
			signup_2: "Հաստատել",
			signup_3: "Արդեն ունե՞ք հաշիվ",
			signup_4: "Մուտք համակարգ",

			// user Reset
			reset_1: "Վերակայե՞լ ձեր գաղտնաբառը",
			reset_2: "Մուտքագրեք ձեր էլ. Փոստը և նոր գաղտնաբառը:",
			reset_3: " Մենք ձեզ կուղարկենք զրոյացման հղում:",
			reset_4: "Հաստատել",
			reset_5: "Հիշո՞ւմ եք ձեր գաղտնաբառը:",
			reset_6: "Մուտք համակարգ",

			// - user Log out
			logout_1: "Բարի գալուստ",
			logout_2: "Ելք համակարգից",
			logout_3: "Հաջողությամբ ավարտեցիք սեանսը։",

			// - file-upload
			fu_1: "Ընտրեք նկարը",
			fu_2: "առավելագույն չափը:",
			fu_3: "Ընտրել",
			fu_4: "Փոխել",
			fu_5: "Վերբեռնել",
			fu_6: "Ընտրված ֆայլը նկար չէ։",
			fu_7: "Ընտրված ֆայլի ծավալը մեծ է 100KB։",

			// - get names
			gn_1: "Ներբեռնել ֆայլի անունները",

			// - del files
			df_1: "Հեռացնել ֆայլը",

			// -rename file
			rf_1: "Փոխել ֆայլի անունը",
		},
	});

	//
	return (
		<LngContext.Provider value={strings}>{children}</LngContext.Provider>
	);
};
