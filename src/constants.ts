export const USERNAME_REGEX = /^[a-zA-Z0-9\-_]+$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
    alreadyExist: "USER_EMAIL_ALREADY_USED",
    notFound: "USER_NOT_FOUND",
  },
} as const;
