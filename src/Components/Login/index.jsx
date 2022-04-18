import React, { Fragment, useContext, useEffect, useState } from "react";
//Router
import { useNavigate } from "react-router-dom";
//Style sheet
import "./Login.scss";
//mui coponents
import {
	InputAdornment,
	TextField,
	Paper,
	Button,
	IconButton,
	CircularProgress,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
//Fetch
import { RegisterUser, LoginUser } from "../FetchFunctions";
//Context
import { AppContext } from "../Context/Provider";
import { useSnackbar } from "notistack";

const Login = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [isLog, setIsLog, userData, setUserData] = useContext(AppContext);
	const [signIn, setSignIn] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loginError, setLoginError] = useState(false);
	const [signinError, setSigninError] = useState(false);
	const [loginBody, setLoginBody] = useState({
		email: "",
		password: "",
	});
	const [signinBody, setSigninBody] = useState({
		name: "",
		email: "",
		password: "",
		age: "",
	});
	const registerUser = async () => {
		const response = await RegisterUser(signinBody);
		if (response.user) {
			setIsLog(true);
			setUserData(response);
			navigate("/todo");
		} else {
			enqueueSnackbar("Error", {
				variant: "error",
			});
		}
		setLoading(false);
	};
	const loginUser = async () => {
		const response = await LoginUser(loginBody);
		if (response.user) {
			setIsLog(true);
			setUserData(response);
			navigate("/todo");
		} else {
			enqueueSnackbar("Wrong data", {
				variant: "error",
			});
		}
		setLoading(false);
	};
	const handleInputsChange = (login, key, value) => {
		if (login) {
			setLoginBody((prev) => ({
				...prev,
				[key]: value,
			}));
		} else {
			setSigninBody((prev) => ({
				...prev,
				[key]: value,
			}));
		}
	};
	const handleLogin = () => {
		if (!loginBody.email || !loginBody.password) {
			setLoginError(true);
		} else {
			setLoading(true);
			loginUser();
			setLoginError(false);
		}
	};
	const handleSignin = () => {
		if (
			signinBody.name === "" ||
			signinBody.age === "" ||
			signinBody.email === "" ||
			signinBody.password === ""
		) {
			setSigninError(true);
		} else {
			setLoading(true);
			registerUser();
		}
	};
	return (
		<div className="loginContainer">
			<h1>To-do App</h1>
			<Paper className="inputsContainer" elevation={4}>
				{signIn ? (
					<Fragment>
						<TextField
							label="Name"
							required
							error={signinError && signinBody.name === ""}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
							}}
							variant="standard"
							onChange={(e) => handleInputsChange(false, "name", e.target.value)}
							value={signinBody.name}
						/>
						<TextField
							label="Age"
							required
							sx={{ marginTop: 2 }}
							error={signinError && signinBody.age === ""}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
							}}
							variant="standard"
							onChange={(e) => handleInputsChange(false, "age", e.target.value)}
							value={signinBody.age}
						/>
						<TextField
							label="Email"
							required
							sx={{ marginTop: 2 }}
							error={signinError && signinBody.email === ""}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AlternateEmailIcon />
									</InputAdornment>
								),
							}}
							variant="standard"
							onChange={(e) => handleInputsChange(false, "email", e.target.value)}
							value={signinBody.email}
						/>
						<TextField
							label="Password"
							required
							sx={{ marginTop: 2, width: "100%" }}
							type={showPassword ? "text" : "password"}
							error={signinError && signinBody.password === ""}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
							}}
							onChange={(e) => handleInputsChange(false, "password", e.target.value)}
							variant="standard"
							value={signinBody.password}
						/>
						<div className="loginButtonContainer">
							<Button
								variant="contained"
								sx={{ width: 90 }}
								onClick={() => setSignIn(false)}
								color="error"
							>
								Back
							</Button>
							<Button variant="contained" sx={{ width: 90 }} onClick={handleSignin}>
								{loading ? <CircularProgress color="inherit" size={20} /> : "Sign in"}
							</Button>
						</div>
					</Fragment>
				) : (
					<Fragment>
						<TextField
							label="Email"
							required
							sx={{ width: "100%" }}
							error={loginError && loginBody.email === ""}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AlternateEmailIcon />
									</InputAdornment>
								),
							}}
							onChange={(e) => handleInputsChange(true, "email", e.target.value)}
							variant="standard"
						/>
						<TextField
							label="Password"
							required
							sx={{ marginTop: 2, width: "100%" }}
							error={loginError && loginBody.password === ""}
							type={showPassword ? "text" : "password"}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
							}}
							onChange={(e) => handleInputsChange(true, "password", e.target.value)}
							variant="standard"
						/>

						<Button
							type="submit"
							variant="contained"
							sx={{ width: 90, margin: "20px" }}
							onClick={handleLogin}
						>
							{loading ? <CircularProgress color="inherit" size={20} /> : "Log in"}
						</Button>

						<p onClick={() => setSignIn(true)} style={{ cursor: "pointer" }}>
							Don`t you have an account? {""}
							<span style={{ color: "#1976d2", borderBottom: "1px solid #1976d2" }}>
								Create accont.
							</span>
						</p>
					</Fragment>
				)}
			</Paper>
		</div>
	);
};

export default Login;
