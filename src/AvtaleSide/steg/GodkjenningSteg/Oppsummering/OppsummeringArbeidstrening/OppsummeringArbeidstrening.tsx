import { ArbeidstreningAvtaleinnhold } from '@/types/avtale';
import * as React from 'react';
import { FunctionComponent } from 'react';
import MaalOppsummering from '../maalOppsummering/MaalOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import OppgaverOppsummering from '../oppgaveOppsummering/OppgaverOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';

interface Props {
    avtaleinnhold: ArbeidstreningAvtaleinnhold;
}

const OppsummeringArbeidstrening: FunctionComponent<Props> = props => (
    <>
        <MaalOppsummering {...props.avtaleinnhold} />
        <OppgaverOppsummering {...props.avtaleinnhold} />
        <VarighetOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
    </>
);

export default OppsummeringArbeidstrening;