import React, { createContext, useState } from "react";
export const AppContext = createContext();
const Provider = ({ children }) => {
	const [isLog, setIsLog] = useState(false);
	const [userData, setUserData] = useState(null);
	return (
		<AppContext.Provider value={[isLog, setIsLog, userData, setUserData]}>
			{children}
		</AppContext.Provider>
	);
};
export default Provider;
