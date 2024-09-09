import { TextField, Box, Button, Stack, Snackbar } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function ChatInput({
  generateResponse,
  setScroll,
  chat,
  clearChat,
}) {
  const [input, setInput] = useState("Please Ask Your Question");
  const inputRef = useRef(null);
  const [showSnackbar, setShowSnackBar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    generateResponse(input);
    setInput("");
    setScroll((prev) => !prev);
  };

  const handleSave = () => {
    const chat_history = JSON.parse(localStorage.getItem("chat")) || [];
    const date = new Date();

    localStorage.setItem(
      "chat",
      JSON.stringify([{ chat: chat, datetime: date }, ...chat_history])
    );

    clearChat();

    setShowSnackBar(true);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Box flexShrink={0} px={{ xs: 0.5, md: 3 }} pb={{ xs: 1, md: 3 }}>
      <Box component={"form"} onSubmit={handleSubmit}>
        <Stack direction={"row"} spacing={{ xs: 0.5, md: 2 }}>
          <TextField
            placeholder="message your Bot AI"
            sx={{
              flex: 1,
              bgcolor: "primary.light",
              borderRadius: 1,
              "& input": {
                fontSize: { xs: 12, md: 16 },
                paddingLeft: { xs: 1, md: 2 },
                paddingRight: { xs: 1, md: 2 },
              },
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            inputRef={inputRef}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: { xs: 12, md: 16 },
              "@media (max-width:767px)": {
                minWidth: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              },
            }}
          >
            ASK
          </Button>

          <Button
            variant="outlined"
            onClick={handleSave}
            disabled={!(chat && chat.length > 0)}  //check if chat exists and has items
            sx={{
              fontSize: { xs: 12, md: 16 },
              "@media (max-width:767px)": {
                minWidth: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              },
            }}
          >
            SAVE{" "}
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={showSnackbar}
        message={"Chat Saved!"}
        onClose={() => setShowSnackBar(false)}
        autoHideDuration={5000}
        action={
          <Link to="/history">
            <Button size="small">See past conversations</Button>
          </Link>
        }
      />
    </Box>
  );
}
