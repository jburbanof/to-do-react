import { Button, CircularProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import {
	CreateTask,
	DeleteTask,
	GetAllTasks,
	GetTasksByPagination,
} from "../../FetchFunctions";
import CreateTaskModal from "./CreateTaskModal";
import DecisionModal from "./DecisionModal";
import TaskTable from "./Table";

const Tasks = ({ data }) => {
	const [fulltableData, setFullTableData] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [tableData, setTableData] = useState(null);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [selectedIds, setSelectedIds] = useState([]);
    const [page, setPage] = useState(0)
	const [pagination, setPagination] = useState({
		limit: 5,
		skip: 0,
	});
	const getTasks = async () => {
		const response = await GetAllTasks(data.token);
		setFullTableData(response);
	};

	const getPagination = async () => {
		const response = await GetTasksByPagination(data.token, pagination);
		setTableData(response);
	};
	const handleDeleteTasks = async () => {
		for (let id of selectedIds) {
			const response = await DeleteTask(data.token, id);
		}
		setSelectedIds([]);
		setTimeout(() => {
			getPagination();
		}, 50);
	};
	
	useEffect(() => {
        getTasks();
		getPagination();
	}, [pagination]);
	useEffect(() => {
		setPagination((prev) => ({
			...prev,
			skip: page * prev.limit,
		}));
	}, [page]);
	return (
		<Fragment>
			<div className="tasksButtons">
				{selectedIds.length > 0 && (
					<Fragment>
						<Button
							sx={{ marginRight: "20px" }}
							variant="contained"
							onClick={() => setOpenDeleteModal(true)}
							color="error"
						>
							Delete {selectedIds.length > 1 ? "tasks" : "task"}
						</Button>
					</Fragment>
				)}

				<Button
					variant="contained"
					onClick={() => setOpenModal(true)}
					color="primary"
				>
					Create task
				</Button>
				<DecisionModal
					open={openDeleteModal}
					setOpen={setOpenDeleteModal}
					title={`Are you sure you want to delete ${
						selectedIds.length > 1 ? "these tasks" : "this task"
					}?`}
					buttonName="Delete"
					action={handleDeleteTasks}
				/>

				<CreateTaskModal
					data={data}
					open={openModal}
					setOpen={setOpenModal}
					refresh={getPagination}
				/>
			</div>

			<TaskTable
				fullTableData={fulltableData}
				tableData={tableData}
				selectedIds={selectedIds}
				setSelectedIds={setSelectedIds}
				userData={data}
				refresh={getPagination}
                pagination={pagination}
                setPagination={setPagination}
                page={page}
                setPage={setPage}
			/>
		</Fragment>
	);
};

export default Tasks;
