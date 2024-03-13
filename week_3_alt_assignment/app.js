const express = require("express");
const app = express();
const PORT = 5000;

const randomNumber = Math.floor(Math.random() * 10) + 1;


app.get("/guessinggame", (req, res) => {
  res.send(`
    <h1>Welcome to the Guessing Game!</h1>
    <p>Can you guess the secret number between 1 and 10?</p>
    <form action="/guess" method="GET">
      <input type="number" name="number" min="1" max="10" required>
      <button type="submit">Submit Guess</button>
    </form>
  `);
});


app.get("/guess", (req, res) => {
  const guessedNumber = parseInt(req.query.number);
  if (guessedNumber === randomNumber) {
    res.send("<h2>Congratulations! You guessed the correct number!</h2>");
  } else {
    res.send("<h2>Sorry, that's not the correct number. Try again!</h2>");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});