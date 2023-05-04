// Invalid request such as missing property
export class InvalidRequestError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, InvalidRequestError.prototype);
  }
}

export class PermissionError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, PermissionError.prototype);
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
