import roleService from "../services/role.service.js";

const list = async (req, res, next) => {
    try {
        const result = await roleService.list(req.query);

        res.status(200).json({
            data: result,
            info: {
                status: 200,
                message: "OK",
            },
        });
    } catch (error) {
        next(error);
    }
};

const read = async (req, res, next) => {
    try {
        const result = await roleService.read(req.params);

        res.status(200).json({
            data: result,
            info: {
                status: 200,
                message: "OK",
            },
        });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await roleService.create(req.body);

        res.status(201).json({
            data: null,
            info: {
                status: 201,
                message: "Created",
            },
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await roleService.update(req.params, req.body);

        res.status(200).json({
            data: result,
            info: {
                status: 200,
                message: "OK",
            },
        });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const result = await roleService.remove(req.params);

        res.status(200).json({
            data: null,
            info: {
                status: 200,
                message: "OK",
            },
        });
    } catch (error) {
        next(error);
    }
};

export default { create, list, read, remove, update };
