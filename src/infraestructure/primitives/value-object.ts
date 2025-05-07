import { isDeepStrictEqual } from 'util';

interface ValueObjectProps {
  [index: string]: any;
}

/**
 * A value object is an immutable object that is defined by its attributes.
 * Value objects do not have an identity and are typically used for descriptive
 * aspects of the domain.
 *
 * Value objects enforce business rules and constraints and make your domain
 * model more expressive and easier to reason about.
 */
export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  equals(vo?: ValueObject<T>): boolean {
    return !(
      vo === null ||
      vo?.props === undefined ||
      !isDeepStrictEqual(this.props, vo.props)
    );
  }
}
