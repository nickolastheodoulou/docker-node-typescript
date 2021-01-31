"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getGrossDomesticProductGdpByQuarter = exports.getGrossDomesticProductGdp = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const pg_1 = require("pg");
const postgresSetupParameters = {
    user: 'postgres',
    host: 'host.docker.internal',
    database: 'nick_db',
    password: 'newpass123',
    port: 5432,
};
const pool = new pg_1.Pool(postgresSetupParameters);
// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack)
//   }
//   client.query('SELECT NOW()', (err, result) => {
//     release()
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     console.log(result.rows)
//   })
// })
const getGrossDomesticProductGdp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sqlQuery = 'select * from reference.gross_domestic_product_gdp';
        const results = yield pool.query(sqlQuery);
        response.status(200).json(results.rows);
    }
    catch (_a) {
        error => {
            throw error;
        };
    }
});
exports.getGrossDomesticProductGdp = getGrossDomesticProductGdp;
const getGrossDomesticProductGdpByQuarter = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quarter = request.params.quarter;
        const sqlQuery = `SELECT * FROM reference.gross_domestic_product_gdp WHERE quarter = '${quarter}'`;
        const results = yield pool.query(sqlQuery);
        response.status(200).json(results.rows);
    }
    catch (_b) {
        error => {
            throw error;
        };
    }
});
exports.getGrossDomesticProductGdpByQuarter = getGrossDomesticProductGdpByQuarter;
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = request.body;
        const sqlQuery = `INSERT INTO reference.user (username, created_date) VALUES ('${username}', '${dayjs_1.default().format('YYYY-MM-DD HH:mm:ss')}')`;
        yield pool.query(sqlQuery);
        response.status(201).send(`User added with username: ${username}`);
    }
    catch (_c) {
        error => {
            console.log(error);
            throw error;
        };
    }
});
exports.createUser = createUser;
const updateUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const { username } = request.body;
        const sqlQuery = `UPDATE reference.user SET username ='${username}' WHERE id = ${id}`;
        yield pool.query(sqlQuery);
        response.status(200).send(`User modified with ID: ${id}`);
    }
    catch (_d) {
        error => {
            console.log(error);
            throw error;
        };
    }
});
exports.updateUser = updateUser;
const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(request.params.id);
        const sqlQuery = `DELETE FROM reference.user WHERE id = ${id}`;
        yield pool.query(sqlQuery);
        response.status(200).send(`User deleted with ID: ${id}`);
    }
    catch (_e) {
        error => {
            console.log(error);
            throw error;
        };
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=queries.js.map