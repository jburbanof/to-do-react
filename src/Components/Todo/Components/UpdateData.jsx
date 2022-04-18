import { Button, CircularProgress, Paper, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { UpdateProfile } from "../../FetchFunctions";

const UpdateData = ({ data, setUserData }) => {
	const { enqueueSnackbar } = useSnackbar();
	const [error, setError] = useState(false);
	const [updateBody, setUpdateBody] = useState({
		age: data.user.age || "",
	});
	const updateProfile = async () => {
		const response = await UpdateProfile(data.token, updateBody);
		setUserData((prev) => ({
			...prev,
			user: response.data,
		}));
	};
	const handleUpdate = () => {
		if (isNaN(updateBody.age) || updateBody.age === "") {
			setError(true);
			enqueueSnackbar("Must be a number and is required", {
				variant: "error",
			});
		} else {
			updateProfile();
			setError(false);
			enqueueSnackbar("Data updated successfully", {
				variant: "success",
			});
		}
	};
	return (
		<div className="profile">
			<h1 style={{ margin: "20px 0" }}>Update your data</h1>
			{data ? (
				<Paper className="updateContainer">
					<div className="profileData">
						<h4>Name: </h4> <p>{data.user.name}</p>
						<h4>Email: </h4> <p>{data.user.email}</p>
						<h4>Age: </h4>
						<TextField
							label="Update age"
							sx={{ width: "100%" }}
							variant="outlined"
							size="small"
							error={error}
							value={updateBody.age || ""}
							onChange={(e) => setUpdateBody({ age: e.target.value })}
						/>
					</div>
					<Button
						variant="contained"
						sx={{ width: 90, marginBottom: "20px" }}
						onClick={handleUpdate}
						color="primary"
					>
						Update
					</Button>
				</Paper>
			) : (
				<CircularProgress color="primary" size={20} />
			)}
		</div>
	);
};

export default UpdateData;
