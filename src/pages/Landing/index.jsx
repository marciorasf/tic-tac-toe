import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";

import { store } from "../../store";

export default function Landing() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const history = useHistory();

  function handleInputChange(event) {
    const { name, value } = event.target;

    dispatch({
      type: "UPDATE",
      value: { [name]: value },
    });
  }

  function startGame(event) {
    event.preventDefault();

    history.push("/game");
  }

  return (
    <Container maxWidth="xs">
      <form onSubmit={startGame}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Change variant to h1 after assign theme */}
            <Typography component="h1" variant="h2">
              tic-tac-toe
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                row
                aria-label="number of players"
                name="mode"
                onChange={handleInputChange}
                value={globalState.state.mode}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="1 player"
                  value="single"
                ></FormControlLabel>

                <FormControlLabel
                  control={<Radio />}
                  label="2 players"
                  value="multi"
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              fullWidth
              disabled={globalState.state.mode !== "single"}
            >
              <InputLabel id="botDifficult">Bot difficult</InputLabel>
              <Select
                labelId="botDifficult"
                label="Bot difficult"
                name="botDifficult"
                onChange={handleInputChange}
                value={globalState.state.botDifficult}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="impossible">Impossible</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Player 1 (X)"
              fullWidth
              name="player1Name"
              onChange={handleInputChange}
              value={globalState.state.player1Name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Player 2 (O)"
              fullWidth
              name="player2Name"
              onChange={handleInputChange}
              value={globalState.state.player2Name}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained">
              Start
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
