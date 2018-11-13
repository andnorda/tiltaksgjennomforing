import * as React from 'react';
import { EndreAvtale } from '../EndreAvtale';
import StegProps from '../StegProps';
import { Innholdstittel } from 'nav-frontend-typografi';

const OppfolgingSteg = (props: EndreAvtale & StegProps) => (
    <>
        <Innholdstittel tag="h2">
            Oppfølging, opplæring og tilrettelegging
        </Innholdstittel>
    </>
);

export default OppfolgingSteg;