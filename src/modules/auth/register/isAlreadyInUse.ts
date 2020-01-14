import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint
} from 'class-validator';
import { User } from '../../../entity/User';

@ValidatorConstraint({ async: true })
class IsNotInUseConstraint implements ValidatorConstraintInterface {
  validate(value: any, { property }: ValidationArguments) {
    return User.findOne({ where: { [property]: value } })
      .then(user => {
        if (user) return false;
        return true;
      })
      .catch(() => true);
  }

  defaultMessage({ property }: ValidationArguments) {
    return `${property} already in use`;
  }
}

export function IsNotInUse(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotInUseConstraint
    });
  };
}
