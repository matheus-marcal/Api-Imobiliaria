import {DefaultCrudRepository} from '@loopback/repository';
import {Imovel, ImovelRelations} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ImovelRepository extends DefaultCrudRepository<
  Imovel,
  typeof Imovel.prototype.id,
  ImovelRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Imovel, dataSource);
  }
}
