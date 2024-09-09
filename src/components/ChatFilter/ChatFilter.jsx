import { Box, Select, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ChatFilter({ allChats, filterChats }) {
  const [option, setOption] = useState("All Ratings");
  const handleChange = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    if ((option = "All Ratings")) {
      filterChats(allChats);
    } else {
      const filtered = allChats.filter((item) => {
        let found = false;

        item.chat.forEach((ch) => {
          if (ch.rating == option) {
            found = true;
          }
        });
        return found;
      });
    }
  }, [option]);

  return (
    <Box mb={3}>
      <Typography fontSize={12} mb={0.5}>
        Filtered By Ratings:
      </Typography>

      <Select
        value={option}
        onChange={handleChange}
        size="small"
        sx={{
          minWidth: { xs: 1, md: 160 },
        }}
      ></Select>
    </Box>
  );
}
