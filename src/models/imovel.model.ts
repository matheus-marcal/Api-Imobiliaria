import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Imovel extends Entity {
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
  rua: string;
  @property({
    type: 'string',
    required: false,
  })
  complemento?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Imovel>) {
    super(data);
  }
}

export interface ImovelRelations {
  // describe navigational properties here
}

export type ImovelWithRelations = Imovel & ImovelRelations;
