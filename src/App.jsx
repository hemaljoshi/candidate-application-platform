import React, { useEffect, useRef, useState } from "react";
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
import {
  ROLES,
  EXPERIENCE_LEVELS,
  JOB_TYPES,
  SALARY_RANGES,
  filterJobsByLocation,
  filterJobsByRole,
  filterJobsByExperience,
  filterJobsBySalary,
} from "./constants/filterOptions";
import FilterComponent from "./components/FilterComponent";

const App = () => {
  const dispatch = useDispatch();
  const jobListings = useSelector((state) => state.jobs.jobListings);
  const loading = useSelector((state) => state.jobs.loading);
  const error = useSelector((state) => state.jobs.error);
  const offset = useSelector((state) => state.jobs.offset);

  const [roles, setRoles] = useState([]);
  const [experience, setExperience] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [salary, setSalary] = useState([]);
  const [filteredJobs, setFilteredDetails] = useState(jobListings);

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

  useEffect(() => {
    const filteredData = jobListings?.filter((item) => {
      return (
        filterJobsByRole(item, roles) &&
        filterJobsByExperience(item, experience) &&
        filterJobsBySalary(item, salary) &&
        filterJobsByLocation(item, jobType)
      );
    });

    setFilteredDetails([...filteredData]);
  }, [roles, experience, salary, jobType, jobListings]);

  return (
    <div ref={containerRef} style={{ height: "100vh", overflowY: "scroll" }}>
      <Container>
        <Box p={2} sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant="h4">Job Listings</Typography>
        </Box>
        <Grid
          container
          columnGap={2}
          rowGap={0}
          justifyContent="center"
          alignItems="center"
          px={2}
        >
          <Grid xs={12} sm={5} md={2.5} item>
            <FilterComponent
              data={ROLES}
              label="Roles"
              value={roles}
              setValue={setRoles}
            />
          </Grid>
          <Grid xs={12} sm={5} md={2.5} item>
            <FilterComponent
              data={EXPERIENCE_LEVELS}
              label="Experience"
              value={experience}
              setValue={setExperience}
            />
          </Grid>
          <Grid xs={12} sm={5} md={2.5} item>
            <FilterComponent
              data={JOB_TYPES}
              label="Job Type"
              value={jobType}
              setValue={setJobType}
            />
          </Grid>
          <Grid xs={12} sm={5} md={2.5} item>
            <FilterComponent
              data={SALARY_RANGES}
              label="Minimum Base Pay Salary"
              value={salary}
              setValue={setSalary}
            />
          </Grid>
        </Grid>
        <Grid container p={2} rowSpacing={4} columnSpacing={4} mt={2}>
          {filteredJobs?.length > 0 ? (
            filteredJobs.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <JobDetailsCard item={item} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ width: "100%", textAlign: "center" }}>
              No jobs found based on the selected filters
            </Typography>
          )}
          <Box mt={1} sx={{ width: "100%", textAlign: "center" }}>
            {loading && <CircularProgress />}
          </Box>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
