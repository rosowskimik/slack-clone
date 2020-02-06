import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { BaseEntity } from 'typeorm';

export function IsNotInUse<T extends typeof BaseEntity>(
  Model: T,
  validationOptions?: ValidationOptions
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, { property }: ValidationArguments) {
          return Model.findOne({ where: { [property]: value } })
            .then(data => {
              if (data) return false;
              return true;
            })
            .catch(() => true);
        },

        defaultMessage({ property }: ValidationArguments) {
          return `${property} already in use`;
        }
      },
      async: true
    });
  };
}
