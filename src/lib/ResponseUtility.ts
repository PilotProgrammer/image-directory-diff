
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Result {
  /**
   * Wraps a function with a try catch, creating a new function with the same
   * arguments but returning `Ok` if successful, `Err` if the function throws
   *
   * @param fn function to wrap with ok on success or err on failure
   * @param errorFn when an error is thrown, this will wrap the error result if provided
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function fromThrowable<Fn extends (...args: readonly unknown[]) => any, E>(
    fn: Fn,
    errorFn?: (e: unknown) => E,
  ): (...args: Parameters<Fn>) => Result<ReturnType<Fn>, E> {
    return (...args) => {
      try {
        const result = fn(...args)
        return ok(result)
      } catch (e) {
        return err(errorFn ? errorFn(e) : e)
      }
    }
  }
}
export type Result<T, E> = Ok<T, E> | Err<T, E>

export const ok = <T, E>(value: T): Ok<T, E> => new Ok(value)

export const err = <T, E>(err: E): Err<T, E> => new Err(err)

export class Ok<T, E> {
  constructor(public readonly value: T) {}

  contents(): T {
    return this.value
  }

  isOk(): this is Ok<T, E> {
    return true
  }

  isErr(): this is Err<T, E> {
    return !this.isOk()
  }

  map<A>(f: (t: T) => A): Result<A, E> {
    return ok(f(this.value))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mapErr<U>(_f: (e: E) => U): Result<T, U> {
    return ok(this.value)
  }

  // add info on how this is really useful for converting a
  // Result<Result<T, E2>, E1>
  // into a Result<T, E2>
  andThen<U>(f: (t: T) => Result<U, E>): Result<U, E> {
    return f(this.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unwrapOr(_v: T): T {
    return this.value
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  match<A>(ok: (t: T) => A, _err: (e: E) => A): A {
    return ok(this.value)
  }
}

export class Err<T, E> {
  
  constructor(readonly error: E) {}

  contents(): E {
    return this.error
  }

  isOk(): this is Ok<T, E> {
    return false
  }

  isErr(): this is Err<T, E> {
    return !this.isOk()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map<A>(_f: (t: T) => A): Result<A, E> {
    return err(this.error)
  }

  mapErr<U>(f: (e: E) => U): Result<T, U> {
    return err(f(this.error))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  andThen<U>(_f: (t: T) => Result<U, E>): Result<U, E> {
    return err(this.error)
  }

  unwrapOr(v: T): T {
    return v
  }

  match<A>(_ok: (t: T) => A, err: (e: E) => A): A {
    return err(this.error)
  }
}