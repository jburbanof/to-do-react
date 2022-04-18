import React from "react";

const TabPanel = ({ value, index, children, classname }) => {
	return (
		<div
			role="tabpanel"
			style={{ display: value !== index ? "none" : "flex" }}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			className={classname}
		>
			{value === index && children}
		</div>
	);
};

export default TabPanel;
