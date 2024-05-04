import React from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";

const FilterComponent = ({ data, label, value, setValue }) => {
  return (
    <Autocomplete
      sx={{ height: "100px" }}
      multiple
      id="fixed-tags-demo"
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
        <TextField {...params} label={label} size="small" />
      )}
    />
  );
};

export default FilterComponent;
