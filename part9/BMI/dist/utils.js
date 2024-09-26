"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
const isNumber = (argument) => {
    return !isNaN(Number(argument));
};
exports.isNumber = isNumber;
