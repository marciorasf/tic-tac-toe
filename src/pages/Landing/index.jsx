import React from "react";

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

export default function Landing() {
  return (
    <Container maxWidth="xs">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Change variant to h1 after assign theme */}
            <Typography component="h1" variant="h2">tic-tac-toe</Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup row aria-label="number of players">
                <FormControlLabel
                  control={<Radio />}
                  label="1 player"
                ></FormControlLabel>

                <FormControlLabel
                  control={<Radio />}
                  label="2 players"
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="botDifficult">Bot difficult</InputLabel>
              <Select labelId="botDifficult" label="Bot difficult">
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="impossible">Impossible</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Player 1 (X)" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Player 2 (O)" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained">
              Start
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
