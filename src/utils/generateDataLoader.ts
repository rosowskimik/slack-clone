import DataLoader from 'dataloader';
import { BaseEntity } from 'typeorm';
import { dataRelations } from '../constant/dataRelations';
import { RelationOwner } from '../@types/RelationOwner';

export const generateDataLoader = <
  E extends typeof BaseEntity,
  V extends BaseEntity & { id: string | number }
>(
  parent: RelationOwner,
  Entity: E
) => () =>
  new DataLoader<V['id'], V>(async ids => {
    const results = await Entity.findByIds<V>(ids as number[], {
      relations: dataRelations[parent]
    });

    const dataMap: { [key: string]: V } = {};
    results.forEach(result => {
      dataMap[result.id] = result;
    });

    return ids.map(id => dataMap[id]);
  });
