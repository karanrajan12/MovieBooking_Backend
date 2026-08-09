export const USER_STATUS={
    approved:"APPROVED",
    pending:"PENDING",
    rejected:"REJECTED"
};

export const USER_TYPE={
    customer:"CUSTOMER",
    admin:"ADMIN",
    client:"CLIENT"
};

export const STATUS_CODES = {
    OK: 200,
    INTERNAL_SERVER_ERROR: 500,
    CREATED: 201,
    UNAUTHORISED: 401,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    FORBIDDEN:403,
    UNPROCESSABLE_ENTITY:422,
    GONE: 410,
    PAYMENT_REQUIRED: 402
};

export const BOOKING_STATUS={
    inProcess:"IN_PROCESS",
    cancelled:"CANCELLED",
    successfull:"SUCCESSFULL",
    expired:"EXPIRED"
}

export const PAYMENT_STATUS={
    success:"SUCCESS",
    pending:"PENDING",
    cancelled:"CANCELLED",
    failed:"FAILED"
}
