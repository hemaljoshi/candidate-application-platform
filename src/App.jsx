import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "./redux/slices/jobsSlice";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import JobDetailsCard from "./components/JobDetailsCard";

const App= () => {
  const dispatch = useDispatch();
  const jobListings = useSelector((state) => state.jobs.jobListings);
  const loading = useSelector((state) => state.jobs.loading);
  const error = useSelector((state) => state.jobs.error);
  const offset = useSelector((state) => state.jobs.offset);

  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchJobs(0));
  }, [dispatch]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        dispatch(fetchJobs(offset));
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, offset, containerRef.current]);

  return (
    <div ref={containerRef} style={{ height: "100vh", overflowY: "scroll"}}>
      <Container>
      <Box p={2} sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h4">Job Listings</Typography>
      </Box>
      <Grid container p={2} rowSpacing={4} columnSpacing={4}>
        {jobListings?.length && (
          jobListings?.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <JobDetailsCard item={item} />
              </Grid>
            );
          })
        ) }
        <Box mt={1} sx={{ width: "100%", textAlign: "center" }}>
          {loading ? <CircularProgress /> : ""}
        </Box>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
