import React, { Fragment } from "react";
import { CircularProgress, Paper } from "@mui/material";

const Profile = ({ data }) => {
	return (
		<Fragment>
			<h1 style={{ margin: "20px 0" }}>Your data</h1>
			{data ? (
				<Paper className="profileData">
					<h4>Name: </h4> <p>{data.user.name}</p>
					<h4>Email: </h4> <p>{data.user.email}</p>
					<h4>Age: </h4> <p>{data.user.age} years</p>
				</Paper>
			) : (
				<CircularProgress color="primary" size={20} />
			)}
		</Fragment>
	);
};

export default Profile;
