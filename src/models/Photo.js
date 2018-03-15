import Joi from 'react-native-joi';

// Locals
import BaseModel, { COMMON_SCHEMAS } from './BaseModel';

const { INTEGER, STRING } = COMMON_SCHEMAS;

export default class Photo extends BaseModel {
  static dataValidator(): Joi.SchemaMap {
    return {
      farm: INTEGER.required(),
      id: STRING.required(),
      owner: STRING.required(),
      secret: STRING.required(),
      server: STRING.required(),
      title: STRING.required(),
    };
  }

  get thumbnail() {
    const { farm, id, secret, server } = this;
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
  }
}
