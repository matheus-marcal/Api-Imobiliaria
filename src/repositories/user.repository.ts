import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {UserCredencial, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  UserCredencial,
  typeof UserCredencial.prototype.id,
  UserRelations
  > {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(UserCredencial, dataSource);
  }
}
