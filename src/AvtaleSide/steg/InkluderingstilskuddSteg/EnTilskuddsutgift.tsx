import ValutaInput from '@/komponenter/form/ValutaInput';
import KnappMedIkon from '@/komponenter/KnappMedIkon/KnappMedIkon';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { inkluderingstilskuddtypeTekst } from '@/messages';
import { Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formatterPenger } from '@/utils/PengeUtils';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';

type Props = {
    setIRedigeringsmodus: (iModus: boolean) => void;
    iRegideringsmodus: boolean;
    tilskuddsutgift: Inkluderingstilskuddsutgift;
    slett: () => void;
    endre: (beløp: number, type: InkluderingstilskuddsutgiftType) => void;
    ledigeInkluderingstilskuddtyper: InkluderingstilskuddsutgiftType[];
};

const EnTilskuddsutgift: FunctionComponent<Props> = props => {
    const [endrerTilskuddsutgift, setEndrerTilskuddsutgift] = useState(false);

    const [beløp, setBeløp] = useState<number>(props.tilskuddsutgift.beløp);
    const [type, setType] = useState<InkluderingstilskuddsutgiftType>(props.tilskuddsutgift.type);

    // const sorteMaalkategorier = props.ledigeMålkategorier;
    // sorteMaalkategorier.sort();

    const slettTilskuddsutgift = () => {
        props.slett();
    };
    const endreTilskuddsutgift = () => {
        props.endre(beløp, type);
        props.setIRedigeringsmodus(false);
        setEndrerTilskuddsutgift(false);
    };

    return (
        <>
            {endrerTilskuddsutgift ? (
                <>
                    <Select
                        onChange={(e) => setType(e.currentTarget.value as InkluderingstilskuddsutgiftType)}
                        label="Velg hva tilskuddet er knyttet til:"
                        value={type}
                    >
                        <option value={type}>{inkluderingstilskuddtypeTekst[type]}</option>
                        {props.ledigeInkluderingstilskuddtyper.sort().map((type) => (
                            <option key={type} value={type}>
                                {inkluderingstilskuddtypeTekst[type]}
                            </option>
                        ))}
                    </Select>
                    <VerticalSpacer rem={1} />
                    {/* <PakrevdTextarea
                        label="Beløp"
                        maxLengde={1000}
                        verdi={beløp.toString()}
                        settVerdi={verdi => setBeløp(verdi)}
                    /> */}
                    <ValutaInput
                        name="beløp"
                        bredde="M"
                        label="Kostnadsoverslag"
                        value={beløp}
                        onChange={(event) => setBeløp(parseFloat(event.target.value))}
                        min={0}
                    />
                    <VerticalSpacer rem={1} />
                    <div style={{ display: 'flex' }}>
                        <Hovedknapp onClick={endreTilskuddsutgift}>Ok</Hovedknapp>
                        <Flatknapp
                            onClick={() => {
                                setEndrerTilskuddsutgift(false);
                                props.setIRedigeringsmodus(false);
                            }}
                            style={{ marginLeft: '1rem' }}
                        >
                            Avbryt
                        </Flatknapp>
                    </div>
                </>
            ) : (
              
                <div>
        
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', margin: 'auto 0'}}>
                        <Normaltekst style={{minWidth: '11rem'}}>{inkluderingstilskuddtypeTekst[props.tilskuddsutgift.type]}</Normaltekst>
                        <Normaltekst style={{minWidth: '10rem'}}>20.01.2022</Normaltekst>
                        <Normaltekst style={{minWidth: '6rem'}}>{formatterPenger(props.tilskuddsutgift.beløp)}</Normaltekst>
                        </div>
                        <KnappMedIkon onClick={slettTilskuddsutgift} label="Slett" ikonType="soppelkasse" />
                    </div>
                    
                    {/* <VerticalSpacer rem={1} />
                    <Normaltekst>{props.tilskuddsutgift.beløp}</Normaltekst> */}
                    {props.iRegideringsmodus !== true && (
                        <div style={{ display: 'flex' }}>
                            {/* <KnappMedIkon
                                onClick={() => {
                                    setEndrerTilskuddsutgift(true);
                                    props.setIRedigeringsmodus(true);
                                }}
                                label="Endre"
                                ikonType="blyant"
                            /> */}
                            {/* <KnappMedIkon onClick={slettTilskuddsutgift} label="Slett" ikonType="soppelkasse" /> */}
                        </div>
                    )}
                    <VerticalSpacer rem={0.5} />
                    <div style={{ borderTop: '1px solid #C6C2BF' }} />
                </div>
            )}
        </>
    );
};

export default EnTilskuddsutgift;
