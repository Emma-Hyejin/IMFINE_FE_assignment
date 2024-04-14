import express from "express";
import path from "path";
import { fileURLToPath } from "url";

//경로에 대한 get 요청 시 index.html file을 보냅니다. 
const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//정적 파일 
app.use(express.static(path.join(__dirname,"fe", "static")));

// 경로에 대한 get 요청 시 index.html file을 보냅니다. 
app.get("/*", (req, res) => {
    res.sendFile(path.resolve("fe", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
