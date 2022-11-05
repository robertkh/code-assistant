import { Result } from "antd";

const subStr = `Դուք կարող եք բացել նոր հաշիվ և այնուհետև օգտվեք կայքից լիարժեքորեն։
	 Կամ էլ կարող եք ծանոթանալ կայքի աշխատանքի դեմո  տարբերակին որոշակի 
	 սամանափակումներով։ Դրա համար պետք է մուտք գործել համակարգ հետևյալ տվյալներով՝ 
	\u00A0 email: \u00A0plainuser@a.com, \u00A0\u00A0password:  aaaaaa`;

const errPage = () => <Result status="403" subTitle={subStr} />;

export default errPage;
