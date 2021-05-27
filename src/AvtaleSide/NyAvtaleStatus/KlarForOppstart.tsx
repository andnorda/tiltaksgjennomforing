import React, { FunctionComponent } from 'react';
import { Avtale } from '@/types/avtale';
import StatusPanel from '@/AvtaleSide/NyAvtaleStatus/StatusPanel';
import { Normaltekst } from 'nav-frontend-typografi';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';

interface Props {
    avtale: Avtale;
}

const KlarForOppstart: FunctionComponent<Props> = ({ avtale }) => {
    return (
        <StatusPanel
            ikon={CheckIkon}
            header="Avtalen er ferdig utfylt og godkjent"
            body={
                <Normaltekst>
                    Avtale ble inngått {formatterDato(avtale.avtaleInngått!, NORSK_DATO_FORMAT)}. Tiltaket starter{' '}
                    {formatterDato(avtale.startDato!, NORSK_DATO_FORMAT)}.
                </Normaltekst>
            }
        />
    );
};

export default KlarForOppstart;
