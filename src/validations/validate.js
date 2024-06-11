import createError from "http-errors";

export const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false,
    });

    if (result.error) {
        throw new Error(createError(400, result.error.message));
    } else {
        return result.value;
    }
};
