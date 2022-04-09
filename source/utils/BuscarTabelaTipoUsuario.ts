import { TabelaUsuarioEnum } from '../enum/TabelaUsuarioEnum';
import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';

export default function BuscarTabelaTipoUsuario(tipo: TipoUsuarioEnum): TabelaUsuarioEnum {
	switch (tipo) {
		case TipoUsuarioEnum.MENTOR:
			return TabelaUsuarioEnum.MENTORES;
		case TipoUsuarioEnum.MENTORADO:
			return TabelaUsuarioEnum.MENTORADOS;
	}
}
