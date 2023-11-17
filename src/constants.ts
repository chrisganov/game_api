export const USERNAME_REGEX = /^[a-zA-Z0-9\-_]+$/;

export const HTTP_STATUS = {
  ok: 200,
  created: 201,
  successNothing: 204,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
} as const;

export const ERROR_MESSAGE = {
  general: {
    invalidRequest: "INVALID_REQUEST",
  },
  user: {
    notFound: "USER_NOT_FOUND",
  },
} as const;
