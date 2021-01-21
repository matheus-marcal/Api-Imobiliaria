import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,
  patch, post,
  put,
  requestBody
} from '@loopback/rest';
import {UserCredencial, Userfront} from '../models';
import {UserRepository} from '../repositories';
import {UserService} from '../services';
export class UserController {
  userservice = new UserService()
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @post('/users', {
    responses: {
      '200': {
        description: 'UserCredencial model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userfront)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredencial, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<UserCredencial, 'id'>,
  ): Promise<Userfront> {
    try {
      const userbd = await this.userRepository.findOne({where: {name: user.name}})
      if (userbd) {
        throw new HttpErrors.BadRequest("Usuario ja Existe")
      }
      const senhabanana = this.userservice.criptografarsenha(user.password)
      const usuario = new UserCredencial({name: user.name, password: senhabanana})
      const response = await this.userRepository.create(usuario);
      return new Userfront({name: response.name})
    } catch (err) {

      throw err
    }

  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'UserCredencial model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserCredencial) where?: Where<UserCredencial>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of UserCredencial model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserCredencial, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserCredencial) filter?: Filter<UserCredencial>,
  ): Promise<UserCredencial[]> {
    try {

      return this.userRepository.find(filter);
    } catch (err) {
      throw new HttpErrors.NotFound("Usuario não encontrado")
    }
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'UserCredencial PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredencial, {partial: true}),
        },
      },
    })
    user: UserCredencial,
    @param.where(UserCredencial) where?: Where<UserCredencial>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'UserCredencial model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserCredencial, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserCredencial, {exclude: 'where'}) filter?: FilterExcludingWhere<UserCredencial>
  ): Promise<UserCredencial> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'UserCredencial PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredencial, {partial: true}),
        },
      },
    })
    user: UserCredencial,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'UserCredencial PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: UserCredencial,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'UserCredencial DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'UserCredencial model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userfront)}},
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredencial, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<UserCredencial, 'id'>,
  ): Promise<Userfront> {
    try {
      const userbd = await this.userRepository.findOne({where: {name: user.name}})
      if (!userbd) {
        throw new HttpErrors.NotFound("Usuario não encontrado")
      }
      if (!this.userservice.login(userbd.password, this.userservice.criptografarsenha(user.password)))
        throw new HttpErrors.Unauthorized("Senha incorreta")
      return new Userfront({name: userbd.name})

    } catch (err) {
      throw err
    }

  }
}
