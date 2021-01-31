"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express_1 = __importDefault(require("express"));
const queries_1 = require("./db/queries");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const PORT = 5000;
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(body_parser_1.default());
app.use(cors_1.default()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
app.options('*', cors_1.default());
app.use(express_1.default.static(publicDirectoryPath));
app.get('/getGrossDomesticProductGdp', queries_1.getGrossDomesticProductGdp);
app.get('/getGrossDomesticProductGdpByQuarter/:quarter', queries_1.getGrossDomesticProductGdpByQuarter);
app.post('/user', queries_1.createUser);
app.put('/user/:id', queries_1.updateUser);
app.delete('/user/:id', queries_1.deleteUser);
app.get('*', (req, res) => {
    res.send('My 404');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map