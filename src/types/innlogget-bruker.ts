import { TiltaksType } from '@/types/avtale';
import { Organisasjon as AltinnOrganisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

export interface Innloggingskilde {
    tittel: string;
    part: string;
    url: string;
}

export type Tilganger = { [bedriftNr: string]: TiltaksType[] };

export type Rolle = 'DELTAKER' | 'ARBEIDSGIVER' | 'VEILEDER' | 'INGEN_ROLLE';

export interface InnloggetBruker {
    identifikator: string;
    erNavAnsatt: boolean;
    altinnOrganisasjoner: AltinnOrganisasjon[];
    rolle: Rolle;
    tilganger: Tilganger;
}

export interface Organisasjon {
    bedriftNavn: string;
    bedriftNr: string;
    tilgangstyper: TiltaksType[];
}
