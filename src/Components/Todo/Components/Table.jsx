import {
	Box,
	Checkbox,
	CircularProgress,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
} from "@mui/material";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import DecisionModal from "./DecisionModal";
import { GetTasksByPagination, UpdateTask } from "../../FetchFunctions";

const TaskTable = ({
	fullTableData,
	tableData,
	selectedIds,
	setSelectedIds,
	userData,
	refresh,
	pagination,
	setPagination,
	page,
	setPage,
}) => {
	const headCells = [
		{
			id: "description",
			center: false,
			disablePadding: false,
			label: "Description",
		},
		{
			id: "completed",
			center: true,
			disablePadding: false,
			label: "Completed",
		},
		{
			id: "createdAt",
			center: false,
			disablePadding: false,
			label: "Created at",
		},
		{
			id: "updatedAt",
			center: false,
			disablePadding: false,
			label: "Updated at",
		},
	];
	const [openUpdateTaskModal, setOpenUpdateTaskModal] = useState(false);
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("calories");
	const [taskInfo, setTaskInfo] = useState({
		id: "",
		description: "task.description",
		completed: null,
	});
	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	function getComparator(order, orderBy) {
		return order === "desc"
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	}

	const handleTaskCheck = (checked, id) => {
		if (checked) {
			setSelectedIds((prev) => [...prev, id]);
		} else {
			const index = selectedIds.indexOf(id);
			setSelectedIds((prev) => prev.filter((_, i) => i !== index));
		}
	};
	const handleChangePage = (_, newPage) => {
		setPage(newPage);
	};
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};
	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property);
	};
	const updateTask = async (id, completed) => {
		const response = await UpdateTask(userData.token, id, { completed });
		setTimeout(() => {
			refresh();
		}, 50);
	};

	return (
		<Fragment>
			{tableData && fullTableData ? (
				<Fragment>
					<TableContainer
						component={Paper}
						sx={{ maxHeight: "calc(100vh - 250px)" }}
					>
						<Table
							sx={{ minWidth: 650 }}
							aria-label="simple table"
							stickyHeader
						>
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									{headCells.map((headCell) => (
										<TableCell
											key={headCell.id}
											align={headCell.center ? "center" : "left"}
											padding={headCell.disablePadding ? "none" : "normal"}
											sortDirection={orderBy === headCell.id ? order : false}
										>
											<TableSortLabel
												active={orderBy === headCell.id}
												direction={orderBy === headCell.id ? order : "asc"}
												onClick={createSortHandler(headCell.id)}
											>
												{headCell.label}
											</TableSortLabel>
										</TableCell>
									))}
									<TableCell align={"center"}>Actions</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{tableData.data.sort(getComparator(order, orderBy)).map((task) => (
									<TableRow
										key={task._id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell>
											<Checkbox
												color="primary"
												onChange={(e) => handleTaskCheck(e.target.checked, task._id)}
											/>
										</TableCell>
										<TableCell component="th" scope="row">
											{task.description}
										</TableCell>
										<TableCell align="center">{task.completed ? "Yes" : "No"}</TableCell>
										<TableCell align="left">
											{moment(task.createdAt).format("DD MMM YYYY hh:mm z")}
										</TableCell>
										<TableCell align="left">
											{moment(task.updatedAt).format("DD MMM YYYY hh:mm z")}
										</TableCell>
										<TableCell align="center">
											{task.completed ? (
												<IconButton
													onClick={() => {
														setTaskInfo({
															id: task._id,
															description: task.description,
															completed: task.completed,
														});
														setOpenUpdateTaskModal(true);
													}}
												>
													<HighlightOffOutlinedIcon sx={{ color: "#1976d2" }} />
												</IconButton>
											) : (
												<IconButton
													onClick={() => {
														setTaskInfo({
															id: task._id,
															description: task.description,
															completed: task.completed,
														});
														setOpenUpdateTaskModal(true);
													}}
												>
													<CheckCircleOutlinedIcon sx={{ color: "#1976d2" }} />
												</IconButton>
											)}
											<DecisionModal
												open={openUpdateTaskModal}
												setOpen={setOpenUpdateTaskModal}
												title={`Set ${taskInfo.description} as ${
													task.completed ? "uncompleted" : "copleted"
												}?`}
												action={() => {
													updateTask(taskInfo.id, !taskInfo.completed);
												}}
												buttonName="Set"
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 15]}
						component="div"
						count={fullTableData.data.length}
						rowsPerPage={pagination.limit}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={(e) =>
							setPagination((prev) => ({
								...prev,
								limit: e.target.value,
							}))
						}
					/>
				</Fragment>
			) : (
				<CircularProgress color="primary" size={40} />
			)}
		</Fragment>
	);
};

export default TaskTable;
