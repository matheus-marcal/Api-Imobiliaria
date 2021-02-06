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
  CEP: string;

  @property({
    type: 'string',
    required: true,
  })
  rua: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  cidade: string;

  @property({
    type: 'string',
    required: true,
  })
  bairro: string;
  
  @property({
    type: 'string',
    required: false,
  })
  complemento?: string;
   
  @property({
     type: 'number',
     required: true,
   })
  preco:number

  @property({
    type: 'string',
    required: false,
  })
  tipo?: string;

  @property({
    type: 'number',
    required: true,
  })
  qtd_quartos: number;

  @property({
    type: 'string',
    required: true,
  })
  descricao: string;

  @property({
    type: 'number',
    required: true,
  })
  qtd_suites: number;

  @property({
    type: 'number',
    required: true,
  })
  qtd_sala_estar: number;

  @property({
    type: 'number',
    required: true,
  })
  qtd_vagas_garagem: number;

  @property({
    type: 'number',
    required: true,
  })
  area: number;

  @property({
    type: 'Boolean',
    required: true,
  })
  armario: Boolean;

  @property({
    type: 'number',
    required: true,
  })
  numero:number ;
  @property({
    type: 'number',
    required: false,
  })
  andar?:number ;
  @property({
    type: 'number',
    required: false,
  })
  vlr_condominio?:Int16Array ;
  @property({
    type: 'Boolean',
    required: true,
  })
  portaria_24h: Boolean;

  @property({
    type: 'number',
    required: false,
  })
  numero_apto:number ;

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
