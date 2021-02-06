import {DefaultCrudRepository} from '@loopback/repository';
import {Visita, VisitaRelations} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VisitaRepository extends DefaultCrudRepository<
  Visita,
  typeof Visita.prototype.id,
  VisitaRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Visita, dataSource);
  }
}
