import _ from 'lodash';
import Joi from 'react-native-joi';

// Locals
import BaseModel, { COMMON_SCHEMAS } from './BaseModel';

const { INTEGER, OBJECT, STRING } = COMMON_SCHEMAS;

export default class PhotoInfo extends BaseModel {
  static dataValidator(): Joi.SchemaMap {
    return {
      description: OBJECT,
      farm: INTEGER.required(),
      id: STRING.required(),
      originalformat: STRING,
      originalsecret: STRING,
      owner: OBJECT.required(),
      secret: STRING.required(),
      server: STRING.required(),
      title: OBJECT.required(),
    };
  }

  get titleContent() {
    const { _content: content } = this.title || {};
    return content;
  }

  get descriptionContent() {
    const { _content: content } = this.description || {};
    return content;
  }

  get originalImage() {
    const { farm, id, originalformat, originalsecret, secret, server } = this;

    if (!_.isEmpty(originalsecret) && !_.isEmpty(originalformat))
      return `https://farm${farm}.staticflickr.com/${server}/${id}_${originalsecret}_o.${originalformat}`;

    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
  }
}
