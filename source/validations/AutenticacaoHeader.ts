import { Joi } from 'celebrate';

export const AutenticacaoHeader = Joi.object().keys({
  id: Joi.number().required(),
  tipo: Joi.string().min(6).max(9).required(),
  token: Joi.string().required(),
  'content-length': Joi.string(),
  'content-type': Joi.string(),
});
