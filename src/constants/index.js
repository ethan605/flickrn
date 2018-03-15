export const IN_DEV_MODE = global.__DEV__; // eslint-disable-line no-underscore-dangle

export const API_CONFIGS = {
  PAGINATION: 20,
  REQUEST_METHODS: {
    DELETE: 'del',
    GET: 'get',
    PATCH: 'patch',
    POST: 'post',
    PUT: 'put',
  },
  RESPONSE_STATUSES: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
  },
};

export const AXIOS_REQUEST_SUFFIXES = { ERROR: ':ERROR', SUCCESS: ':SUCCESS' };

export const DEBUGS = !IN_DEV_MODE ? {} : {
};

export const FORMATS = {
  DATE: 'DD/MM/YYYY',
  DATE_TIME: 'DD/MM/YYYY HH:mm',
  ISO_8601: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  TIME: 'HH:mm',
};

export const GLOBAL_ALERT_TYPES = {
  CUSTOM: 'custom',
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  WARN: 'warn',
};
