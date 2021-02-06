import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Visita extends Entity {
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
  cpf_visitante: string;

  @property({
    type: 'date',
    required: true,
  })
  data: string;

  @property({
    type: 'string',
    required: true,
  })
  id_imovel: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Visita>) {
    super(data);
  }
}

export interface VisitaRelations {
  // describe navigational properties here
}

export type VisitaWithRelations = Visita & VisitaRelations;
