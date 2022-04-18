import { Button, CircularProgress, Modal, Paper } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../FetchFunctions";

const DecisionModal = ({ open, setOpen, action, title, buttonName }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const handleAction = async () => {
		setLoading(true);
		await action();
		setLoading(false);
		setOpen(false);
	};

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Paper className="modalContainer">
				<p>{title}</p>
				<div className="buttonContainer">
					<Button
						variant="contained"
						sx={{ width: 120 }}
						onClick={() => setOpen(false)}
						color="error"
					>
						Cancel
					</Button>
					<Button variant="contained" sx={{ width: 120 }} onClick={handleAction}>
						{loading ? <CircularProgress color="inherit" size={20} /> : buttonName}
					</Button>
				</div>
			</Paper>
		</Modal>
	);
};

export default DecisionModal;
