import React, { useState } from "react";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";

const modalContainerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  "&:focus": {
    outline: "none",
  },
};

const cardContainerStyle = {
  minWidth: 250,
  padding: 2,
  borderRadius: 6,
  transition: "transform 0.3s ease-in-out",
};

const cardBoxStyle = {
  display: "flex",
  gap: 1,
  marginBottom: 1,
};

const logoContainerStyle = { width: "40px" };

const cardTypographyStyle = {
  color: "#8B8B8B",
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: 1,
};

const estimatedSalaryStyle = { color: "#4C5969", fontSize: 16, marginTop: 1 };

const aboutCompanyStyle = { fontSize: 16, fontWeight: 500 };

const aboutUsStyle = { fontSize: 14, fontWeight: 700 };

const jobDetailsContainerStyle = {
  maskImage:
    "linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))",
  maxHeight: 200,
};

const jobDetailsStyle = { fontSize: 14, fontWeight: 400, color: "grey" };

const boxShowMoreStyle = {
  position: "relative",
  bottom: 10,
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const showMoreStyle = { color: "blue", cursor: "pointer", fontSize: 14 };

const minimumExperienceStyle = {
  color: "grey",
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: 1,
};

const minimumExperienceValueStyle = { fontSize: 14, fontWeight: 400 };

const easyApplyButtonStyle = {
  border: "0px",
  borderRadius: 4,
  background: "rgb(85, 239, 196)",
  fontSize: 16,
  fontWeight: 400,
  letterSpacing: 1,
  cursor: "pointer",
  color: "black",
  textTransform: "none",
};

const boxColumnStyle = { display: "flex", flexDirection: "column" };

const jobRoleStyle = {
  fontSize: 14,
  textTransform: "capitalize",
  color: "#000000de",
};

const jobLocationStyle = { fontSize: 11, textTransform: "capitalize" };

const JobDetailsCard = ({ item }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleMouseEnter = () => setIsCardHovered(true);
  const handleMouseLeave = () => setIsCardHovered(false);

  const DisplaySalary = (item) => {
    const { minJdSalary, maxJdSalary } = item;
    if (minJdSalary && maxJdSalary) return `${minJdSalary}-${maxJdSalary} LPA`;
    if (minJdSalary) return `From ${minJdSalary} LPA`;
    if (maxJdSalary) return `${maxJdSalary} LPA`;
    return `Not Disclosed`;
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Paper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          ...cardContainerStyle,
          transform: isCardHovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        <Box sx={cardBoxStyle}>
          {item.logoUrl && (
            <Box sx={logoContainerStyle}>
              <img src={item.logoUrl} alt="logo" width="100%" />
            </Box>
          )}
          <Box sx={boxColumnStyle}>
            <Typography variant="body" sx={cardTypographyStyle}>
              {item.companyName}
            </Typography>
            <Typography mt={0.5} variant="body" sx={jobRoleStyle}>
              {item.jobRole}
            </Typography>
            <Typography mt={0.5} variant="body" sx={jobLocationStyle}>
              {item.location}
            </Typography>
          </Box>
        </Box>
        <Typography mt={1} variant="body" sx={estimatedSalaryStyle}>
          Estimated Salary: $ {DisplaySalary(item)} &#x2705;
        </Typography>
        <Typography mt={1} variant="body2" sx={aboutCompanyStyle}>
          About Company:
        </Typography>
        <Typography mt={0.2} variant="body2" sx={aboutUsStyle}>
          About us
        </Typography>
        <Box sx={jobDetailsContainerStyle}>
          <Typography mt={0.5} variant="body" sx={jobDetailsStyle}>
            {item.jobDetailsFromCompany}
          </Typography>
        </Box>
        <Box mb={1} sx={boxShowMoreStyle}>
          <Typography
            variant="body"
            sx={showMoreStyle}
            onClick={() => setOpenModal(true)}
          >
            Show more
          </Typography>
        </Box>
        <Box>
          <Typography variant="body" sx={minimumExperienceStyle}>
            Minimum Experience
          </Typography>
          <Typography mt={0.5} variant="body2" sx={minimumExperienceValueStyle}>
            {item.minExp ? `${item.minExp} Years` : "NA"}
          </Typography>
        </Box>
        <Box mt={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            fullWidth
            onClick={() => window.open(item.jdLink)}
            style={easyApplyButtonStyle}
          >
            ⚡ Easy Apply
          </Button>
        </Box>
      </Paper>
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={modalContainerStyle}>
          <Typography variant="h6" component="h2" textAlign={"center"}>
            Job Description
          </Typography>
          <Typography sx={{ mt: 2 }}>{item.jobDetailsFromCompany}</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default JobDetailsCard;
