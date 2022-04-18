import React, { Fragment, useContext, useEffect, useState } from "react";
//Stylesheet
import "./Todo.scss";
//mui components
import {
	Button,
	CircularProgress,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Tab,
	Tabs,
} from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import TabPanel from "./Components/TabPanel";
import { AppContext } from "../Context/Provider";
import { useNavigate } from "react-router-dom";
import UpdateData from "./Components/UpdateData";
import Profile from "./Components/Profile";
import DecisionModal from "./Components/DecisionModal";
import Tasks from "./Components/Tasks";
import { LogoutUser } from "../FetchFunctions";

const Todo = () => {
	const navigate = useNavigate();
	const [isLog, setIsLog, userData, setUserData] = useContext(AppContext);
	const [value, setValue] = useState(0);
	const [openLogout, setOpenLogout] = useState(false);
	const [settings, setSettings] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleTabChange = (_, newValue) => {
		setValue(newValue);
	};
	const logout = async () => {
		const response = await LogoutUser(userData.token);
		navigate("/");
	};
	useEffect(() => {
		if (!isLog) {
			return navigate("/");
		}
	}, [isLog]);
	

	return (
		<div className="todoContainer">
			<div className="tabs">
				{settings ? (
					<div className="settigsTitle">
						<IconButton onClick={() => setSettings(false)}>
							<ArrowCircleLeftIcon sx={{ color: "#1976d2" }} />
						</IconButton>
						<h3>Profile settings</h3>
					</div>
				) : (
					<Tabs
						value={value}
						onChange={handleTabChange}
						aria-label="basic tabs example"
					>
						<Tab label="To do" />
						<Tab label="Profile" />
					</Tabs>
				)}

				<div style={{ marginRight: "40px" }}>
					<Button
						id="basic-button"
						aria-controls={open ? "basic-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
					>
						Account settings
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<MenuItem
							onClick={() => {
								setAnchorEl(null);
								setSettings(true);
							}}
						>
							Profile settings
						</MenuItem>
						<MenuItem
							onClick={() => {
								setAnchorEl(null);
								setOpenLogout(true);
							}}
							sx={{ color: "red" }}
						>
							Logout
						</MenuItem>
					</Menu>
					<DecisionModal
						open={openLogout}
						setOpen={setOpenLogout}
						title="Are you sure you wanto to leave?"
						action={logout}
						buttonName="Leave"
					/>
				</div>
			</div>
			{settings ? (
				<UpdateData data={userData} setUserData={setUserData} />
			) : (
				<Fragment>
					<TabPanel value={value} index={0} classname="tasks">
						<Tasks data={userData} />
					</TabPanel>
					<TabPanel value={value} index={1} classname="profile">
						<Profile data={userData} />
					</TabPanel>
				</Fragment>
			)}
		</div>
	);
};

export default Todo;
