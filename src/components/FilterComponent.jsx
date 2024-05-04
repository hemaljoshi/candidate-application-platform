import React from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const FilterComponent = ({ data, label, value, setValue }) => {
  return (
    <Autocomplete
      sx={{ my: 1 }}
      multiple
      value={value}
      onChange={(event, newValue) => {
        setValue([...newValue]);
      }}
      options={data}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option.title} {...getTagProps({ index })} key={index} />
        ))
      }
      style={{ minWidth: 200 }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          hiddenLabel
          placeholder={label}
          sx={{
            width: "100%",
            "& .MuiAutocomplete-input": {
              borderRight: "1px solid #ccc",
            },
          }}
        />
      )}
    />
  );
};

export default FilterComponent;
