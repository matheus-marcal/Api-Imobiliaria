import {Entity, model, property} from '@loopback/repository';

@model()
export class UserCredencial extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<UserCredencial>) {
    super(data);
  }
}
@model()
export class Userfront extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;
  constructor(data?: Partial<Userfront>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = UserCredencial & UserRelations;
