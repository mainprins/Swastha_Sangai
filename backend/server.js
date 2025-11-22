import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("Server is running ....")
});

app.use('/api/auth/', authRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
