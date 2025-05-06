import { Types } from 'mongoose';

const isEntity = (v: unknown): v is Entity<unknown> => v instanceof Entity;

/**
 * An entity is an object that has a distinct identity that runs through
 * time and different states. Entities are defined primarily by their identity
 * rather than their attributes.
 *
 * Entities represent the core business objects that need to be tracked and
 * managed. Their identities remain consistent even as their attributes change.
 */
export abstract class Entity<T> {
  protected readonly _id: Types.ObjectId;
  protected props: T;

  constructor(props: T, id?: Types.ObjectId) {
    this._id = id ?? new Types.ObjectId();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    return (
      object !== null &&
      object !== undefined &&
      isEntity(object) &&
      this._id.valueOf() === object._id.valueOf()
    );
  }

  get id(): Types.ObjectId {
    return this._id;
  }
}
