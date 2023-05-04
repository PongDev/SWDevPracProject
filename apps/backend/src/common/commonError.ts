// Invalid request such as missing property
export class InvalidRequestError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, InvalidRequestError.prototype);
  }
}

// Unauthenticated login
export class UnauthenticationError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, UnauthenticationError.prototype);
  }
}

// Unauthorized access
export class MissingPermissionError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, MissingPermissionError.prototype);
  }
}

export class RecordNotFound extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, RecordNotFound.prototype);
  }
}

export class RecordAlreadyExists extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, RecordAlreadyExists.prototype);
  }
}

export class FailedRelationConstraintError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, FailedRelationConstraintError.prototype);
  }
}
