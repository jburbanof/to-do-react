import {
	Button,
	CircularProgress,
	Modal,
	Paper,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateTask } from "../../FetchFunctions";

const CreateTaskModal = ({ open, setOpen, data, refresh }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [createTaskBody, setCreateTaskBody] = useState({ description: "" });
	const createTask = async () => {
		const response = await CreateTask(data.token, createTaskBody);
		setLoading(false);
	};
	const handleCreate = () => {
		if (createTaskBody.description === "") {
			setError(true);
		} else {
			setLoading(true);
			createTask();
			setTimeout(() => {
				refresh();
			}, 500);
			setOpen(false);
			setCreateTaskBody({ description: "" });
			setError(false);
		}
	};
	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Paper className="modalContainer">
				<h3>New task description</h3>
				<TextField
					label="Description"
					sx={{ width: "100%", marginTop: "20px" }}
					variant="outlined"
					size="small"
					error={error}
					helperText="Description is needed"
					value={createTaskBody.description}
					onChange={(e) => setCreateTaskBody({ description: e.target.value })}
				/>
				<div className="buttonContainer">
					<Button
						variant="contained"
						sx={{ width: 120 }}
						onClick={() => {
							setOpen(false);
							setCreateTaskBody({ description: "" });
						}}
						color="error"
					>
						Cancel
					</Button>
					<Button variant="contained" sx={{ width: 120 }} onClick={handleCreate}>
						{loading ? <CircularProgress color="inherit" size={20} /> : "Create"}
					</Button>
				</div>
			</Paper>
		</Modal>
	);
};

export default CreateTaskModal;
