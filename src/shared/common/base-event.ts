type Props<T> = { occurredOn: Date } & T;

export abstract class BaseEvent<T> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  abstract readonly props: Props<T>;
  constructor(props: Props<T>) {}
}
