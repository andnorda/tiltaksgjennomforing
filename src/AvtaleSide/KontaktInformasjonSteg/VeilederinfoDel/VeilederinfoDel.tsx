import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { EndreAvtale } from '../../EndreAvtale';
import { Veilederinfo } from '../../avtale';
import './VeilederinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';

const VeilederinfoDel = (props: Veilederinfo & EndreAvtale) => (
    <>
        <Systemtittel className="veilederinfo__tittel">
            Kontaktperson i NAV
        </Systemtittel>
        <div className="veilederinfo__rad">
            <Input
                className="veilederinfo__fornavn"
                label="Fornavn"
                defaultValue={props.veilederFornavn}
                onChange={event =>
                    props.endreVerdi('veilederFornavn', event.target.value)
                }
            />
            <Input
                className="veilederinfo__etternavn"
                label="Etternavn"
                defaultValue={props.veilederEtternavn}
                onChange={event =>
                    props.endreVerdi('veilederEtternavn', event.target.value)
                }
            />
        </div>
        <div className="veilederinfo__rad">
            <Input
                className="veilederinfo__epost"
                label="Epost"
                defaultValue={props.veilederEpost}
                onChange={event =>
                    props.endreVerdi('veilederEpost', event.target.value)
                }
            />
            <Input
                className="veilederinfo__tlf"
                label="Telefonnummer"
                defaultValue={props.veilederTlf}
                onChange={event =>
                    props.endreVerdi('veilederTlf', event.target.value)
                }
            />
        </div>
    </>
);

export default VeilederinfoDel;