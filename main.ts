import { app } from "./app";

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}/ \nWelcome to Titans Gym`);
});
