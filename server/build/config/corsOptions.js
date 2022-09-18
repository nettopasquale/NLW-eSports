"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins_1 = __importDefault(require("./allowedOrigins"));
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins_1.default.indexOf(origin) !== -1 || !origin) { // se o dominio n está na lista, origin aqui é apenas durante o desenvolvimento
            callback(null, true);
        }
        else {
            callback(new Error('Não permitido pelo CORS'));
        }
    },
    optionsSucessStatus: 200
};
exports.default = corsOptions;
