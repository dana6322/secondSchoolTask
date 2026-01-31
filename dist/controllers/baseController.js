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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(model) {
        this.model = model;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query) {
                    const filterData = yield this.model.find(req.query);
                    return res.json(filterData);
                }
                const data = yield this.model.find();
                res.json(data);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error retrieving data" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const item = yield this.model.findById(id);
                if (!item) {
                    return res.status(404).json({ message: "Item not found" });
                }
                res.json(item);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error retrieving item" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemData = req.body;
            try {
                const newData = yield this.model.create(itemData);
                res.status(201).json(newData);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error creating item" });
            }
        });
    }
    del(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const deletedData = yield this.model.findByIdAndDelete(id);
                if (!deletedData) {
                    return res.status(404).json({ message: "Item not found" });
                }
                res.status(200).json(deletedData);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error deleting item" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const updateData = req.body;
            try {
                const data = yield this.model.findByIdAndUpdate(id, updateData, {
                    new: true,
                });
                if (!data) {
                    return res.status(404).json({ message: "Item not found" });
                }
                res.json(data);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error updating item" });
            }
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=baseController.js.map