import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import AlleredeOpprettetAvtale from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/AlleredeOpprettetAvtale';
import BEMHelper from '@/utils/bem';
import { AlleredeRegistrertAvtale } from '@/types/avtale';
import { Alert} from '@navikt/ds-react';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
}

const GodkjenningsInnhold: React.FC<Props> = ({ alleredeRegistrertAvtale, children }) => {
    const cls = BEMHelper('alleredeOpprettetAvtaleModal');

    return (
        <div className={cls.element('body')}>
            <div className={cls.element('tittel')}>
                <Systemtittel id="Allerede registrerte tiltak for deltaker">
                    Godkjenning av avtale innhold.
                </Systemtittel>
            </div>
            <div className={cls.element('ingress')}>
                <Alert variant="info">
                    Du er i ferd med å godkjenne en avtale som har overlappende tidsrom, og/eller har påbegynte
                    avtale(r) på deltaker sitt fødselsnummer.
                </Alert>
            </div>
            <AlleredeOpprettetAvtale alleredeRegistrertAvtale={alleredeRegistrertAvtale} />
            {children}
        </div>
    );
};
export default GodkjenningsInnhold;