import useSWR from "swr";
import { fetcher } from "../api";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";

const Dashboard = () => {
  const [filter, setFilter] = useState({ status: "" });
  const { data, isLoading, error, mutate } = useSWR(["/task", filter], fetcher);
  const [add, setAdd] = useState();
  const [deleteTask, setDeleteTask] = useState();
  const getContent = () => {
    if (isLoading) {
      return <CircularProgress />;
    }
    if (error) {
      return "Error occured";
    }
    if (data?.data?.length < 1) {
      return "No data found please create task";
    }
    return data?.data?.map((task) => (
      <Box key={task._id} p="1rem" border="1px solid #787676">
        <Typography
          color={task.status === "active" ? "warning.main" : "success.main"}
          textAlign="right"
        >
          {task.status}
        </Typography>
        <Typography variant="h6">{task.title}</Typography>
        <Typography pt="1rem">{task.description}</Typography>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap="1rem" pt="1rem">
          <Button variant="contained" onClick={() => setAdd(task)}>
            Update
          </Button>
          <Button variant="outlined" onClick={() => setDeleteTask(task._id)}>
            Delete
          </Button>
        </Box>
      </Box>
    ));
  };
  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap="1rem"
        px="1rem"
        pt="1rem"
      >
        <Button variant="contained" onClick={() => setAdd(true)}>
          Create task
        </Button>
        <Button
          variant="contained"
          onClick={() => setFilter({ status: "active" })}
        >
          Active task
        </Button>
        <Button
          variant="contained"
          onClick={() => setFilter({ status: "completed" })}
        >
          Completed task
        </Button>
        <Button variant="contained" onClick={() => setFilter({ status: "" })}>
          All task
        </Button>
      </Box>
      <Box
        display="grid"
        p="1rem"
        justifyContent="center"
        alignItems="stretch"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr 1fr 1fr 1fr",
        }}
        gap="1rem"
      >
        {getContent()}
      </Box>
      {add && <AddTask open={add} onClose={() => setAdd()} mutate={mutate} />}
      {deleteTask && (
        <DeleteTask
          open={deleteTask}
          onClose={() => setDeleteTask()}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default Dashboard;
