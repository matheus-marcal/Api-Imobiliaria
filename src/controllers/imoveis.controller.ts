import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Imovel} from '../models';
import {ImovelRepository} from '../repositories';

export class ImoveisController {
  constructor(
    @repository(ImovelRepository)
    public imovelRepository : ImovelRepository,
  ) {}

  @post('/imoveis', {
    responses: {
      '200': {
        description: 'Imovel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Imovel)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imovel, {
            title: 'NewImovel',
            exclude: ['id'],
          }),
        },
      },
    })
    imovel: Omit<Imovel, 'id'>,
  ): Promise<Imovel> {
    return this.imovelRepository.create(imovel);
  }

  @get('/imoveis/count', {
    responses: {
      '200': {
        description: 'Imovel model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Imovel) where?: Where<Imovel>,
  ): Promise<Count> {
    return this.imovelRepository.count(where);
  }

  @get('/imoveis', {
    responses: {
      '200': {
        description: 'Array of Imovel model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Imovel, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Imovel) filter?: Filter<Imovel>,
  ): Promise<Imovel[]> {
    return this.imovelRepository.find(filter);
  }

  @patch('/imoveis', {
    responses: {
      '200': {
        description: 'Imovel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imovel, {partial: true}),
        },
      },
    })
    imovel: Imovel,
    @param.where(Imovel) where?: Where<Imovel>,
  ): Promise<Count> {
    return this.imovelRepository.updateAll(imovel, where);
  }

  @get('/imoveis/{id}', {
    responses: {
      '200': {
        description: 'Imovel model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Imovel, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Imovel, {exclude: 'where'}) filter?: FilterExcludingWhere<Imovel>
  ): Promise<Imovel> {
    return this.imovelRepository.findById(id, filter);
  }

  @patch('/imoveis/{id}', {
    responses: {
      '204': {
        description: 'Imovel PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imovel, {partial: true}),
        },
      },
    })
    imovel: Imovel,
  ): Promise<void> {
    await this.imovelRepository.updateById(id, imovel);
  }

  @put('/imoveis/{id}', {
    responses: {
      '204': {
        description: 'Imovel PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() imovel: Imovel,
  ): Promise<void> {
    await this.imovelRepository.replaceById(id, imovel);
  }

  @del('/imoveis/{id}', {
    responses: {
      '204': {
        description: 'Imovel DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.imovelRepository.deleteById(id);
  }
}
