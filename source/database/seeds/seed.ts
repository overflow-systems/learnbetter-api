import { Knex } from 'knex';
import CriptografarSenha from '../../utils/CriptografarSenha';

export async function seed(knex: Knex): Promise<void> {
  await knex('usuarios').insert([
    {
      id: 1,
      nome: 'Mentorado 1',
      sobrenome: 'Mentorado 1',
      data_nascimento: '2001/01/12',
      email: 'primerio@seed.com.br',
      celular: 11111111111,
      senha: CriptografarSenha('primerio@seed.com.br'),
      genero: 1,
      mentor: false,
      mentorado: true,
    },
    {
      id: 2,
      nome: 'Mentor e Mentorado',
      sobrenome: 'Mentor e Mentorado',
      data_nascimento: '2001/01/12',
      email: 'segundo@seed.com.br',
      celular: 22222222222,
      senha: CriptografarSenha('segundo@seed.com.br'),
      genero: 2,
      mentor: true,
      mentorado: true,
    },
    {
      id: 3,
      nome: 'Mentor',
      sobrenome: 'Mentor',
      data_nascimento: '2001/01/12',
      email: 'terceiro@seed.com.br',
      celular: 33333333333,
      senha: CriptografarSenha('terceiro@seed.com.br'),
      genero: 3,
      mentor: true,
      mentorado: false,
    },
  ]);

  await knex('cursos').insert([
    {
      id: 1,
      nome: 'Curso 1',
      instituicao: 'Instituição 1',
      data_inicio: '2022/01/12',
      data_fim: '2022/01/20',
      tipo_curso: 'Tecnólogo',
      id_mentor: 2,
    },
    {
      id: 2,
      nome: 'Curso 2',
      instituicao: 'Instituição 2',
      data_inicio: '2022/02/12',
      data_fim: '2022/02/20',
      tipo_curso: 'Técnico',
      id_mentor: 3,
    },
  ]);

  await knex('tags').insert([
    {
      id: 1,
      nome: 'Tag 1',
    },
    {
      id: 2,
      nome: 'Tag 2',
    },
    {
      id: 3,
      nome: 'Tag 3',
    },
    {
      id: 4,
      nome: 'Tag 4',
    },
  ]);

  await knex('usuarios_tags').insert([
    { id_mentorado: 1, id_tag: 1 },
    { id_mentorado: 1, id_tag: 2 },
    { id_mentorado: 1, id_tag: 3 },

    { id_mentorado: 2, id_tag: 1 },
    { id_mentorado: 2, id_tag: 2 },
    { id_mentorado: 2, id_tag: 3 },

    { id_mentor: 2, id_tag: 1 },
    { id_mentor: 2, id_tag: 2 },
    { id_mentor: 2, id_tag: 3 },

    { id_mentor: 3, id_tag: 1 },
    { id_mentor: 3, id_tag: 2 },
    { id_mentor: 3, id_tag: 3 },
  ]);

  await knex('notificacoes').insert([
    {
      id: 1,
      status: 1,
      mensagem: 'Mensagem 1',
      id_mentorado: 1,
    },
    {
      id: 2,
      status: 2,
      mensagem: 'Mensagem 2',
      id_mentorado: 2,
    },
    {
      id: 3,
      status: 3,
      mensagem: 'Mensagem 3',
      id_mentor: 2,
    },
    {
      id: 4,
      status: 1,
      mensagem: 'Mensagem 4',
      id_mentor: 3,
    },
  ]);
}
