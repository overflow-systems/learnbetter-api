import conexao from '../database/conexao';

export default async function BuscarAvaliacoesMentor(
  idMentor: number
): Promise<number> {
  await conexao
    .select('avaliacao_mentor')
    .from('mentorias')
    .where('id_mentor', idMentor);

  return 0;
}
