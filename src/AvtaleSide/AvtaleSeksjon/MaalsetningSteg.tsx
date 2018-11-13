import KnappBase from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import PanelBase from 'nav-frontend-paneler';
import { Input } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Maalsetninger, Maalsetning } from '../avtale';
import { EndreAvtale } from '../EndreAvtale';
import StegProps from '../StegProps';
import { Maalkategori } from '../maalkategorier';

const MaalsetningKnapp = (props: {
    kategori: Maalkategori;
    leggTilKategori: (kategori: Maalkategori) => void;
}) => (
    <KnappBase
        type={'standard'}
        onClick={() => props.leggTilKategori(props.kategori)}
    >
        {props.kategori}
    </KnappBase>
);

const MaalsetningBeskrivelsePanel = (props: {
    maalsetning: Maalsetning;
    endreBeskrivelse: (maalsetning: Maalsetning) => void;
    fjern: (maalsetning: Maalsetning) => void;
}) => (
    <div>
        <Undertittel>{props.maalsetning.kategori}</Undertittel>
        <Lukknapp
            type={'standard'}
            onClick={() => props.fjern(props.maalsetning)}
        >
            Fjern
        </Lukknapp>
        <Input
            label={'Beskrivelse'}
            defaultValue={props.maalsetning.beskrivelse}
            onChange={(event: any) =>
                props.endreBeskrivelse({
                    kategori: props.maalsetning.kategori,
                    beskrivelse: event.target.value,
                })
            }
        />
    </div>
);

const MaalsetningSteg = (props: Maalsetninger & EndreAvtale & StegProps) => {
    const leggTilKategori = (kategori: Maalkategori) => {
        const maalsetninger = props.maalsetninger;
        if (!maalsetninger.find((m: Maalsetning) => m.kategori === kategori)) {
            maalsetninger.push({ kategori, beskrivelse: '' });
            props.endreVerdi('maalsetninger', maalsetninger);
        }
    };

    const fjernKategori = (maalsetning: Maalsetning) => {
        props.endreVerdi(
            'maalsetninger',
            props.maalsetninger.filter(
                (m: Maalsetning) => m.kategori !== maalsetning.kategori
            )
        );
    };

    const endreBeskrivelse = (maalsetning: Maalsetning) => {
        const maalsetninger = props.maalsetninger;
        const index = maalsetninger.findIndex(
            (m: Maalsetning) => m.kategori === maalsetning.kategori
        );
        maalsetninger[index] = maalsetning;
        props.endreVerdi('maalsetninger', maalsetninger);
    };

    const beskrivelsesPaneler = props.maalsetninger.map(
        (maalsetning: Maalsetning) => (
            <MaalsetningBeskrivelsePanel
                key={maalsetning.kategori}
                maalsetning={maalsetning}
                fjern={fjernKategori}
                endreBeskrivelse={endreBeskrivelse}
            />
        )
    );

    const kategorier: Maalkategori[] = [
        'Avklaring',
        'Arbeidserfaring',
        'Oppnå fagbrev/kompetansebevis',
        'Språkopplæring',
        'Få jobb på arbeidstreningsplass',
    ];

    const kategoriKnapper = kategorier.map((kategori: Maalkategori) => (
        <MaalsetningKnapp
            key={kategori}
            kategori={kategori}
            leggTilKategori={leggTilKategori}
        />
    ));

    return (
        <PanelBase>
            {kategoriKnapper}
            {beskrivelsesPaneler}
        </PanelBase>
    );
};

export default MaalsetningSteg;