import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import { fileURLToPath } from "url";
import path from "path";
import friendshipRouter from "./routes/friendship.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("Server is running ....")
});

app.use(
  "/profile-pics",
  express.static(path.join(__dirname, "profile-pics"))
);
app.use('/api/auth', authRouter)
app.use('/api/user',userRouter);
app.use('/api/friendship', friendshipRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
