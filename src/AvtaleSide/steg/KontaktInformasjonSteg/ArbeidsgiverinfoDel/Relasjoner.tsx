import { ReactComponent as PenFillIkon } from '@/assets/ikoner/pencil-fill.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import BEMHelper from '@/utils/bem';
import Popover from 'nav-frontend-popover';
import { RadioPanel } from 'nav-frontend-skjema';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { RelasjonerInfo } from '@/types/avtale';
import RelasjonHjelpetekst from '@/AvtaleSide/steg/KontaktInformasjonSteg/ArbeidsgiverinfoDel/RelasjonHjelpetekst';
import './Relasjoner.less';

const Relasjoner: FunctionComponent = () => {
    const { avtale, settAvtaleVerdier }: InputStegProps<RelasjonerInfo> = useContext(AvtaleContext);

    const cls = BEMHelper('relasjoner');

    const harFamilieTilknttningSomJaNeiSvar = (harFamilietilknytning: boolean | undefined): string => {
        switch (harFamilietilknytning) {
            case true:
                return 'Ja';
            case false:
            default:
                return 'Nei';
        }
    };

    const { rolle } = useContext(InnloggetBrukerContext);
    const [popoverAnker, setPopoverAnker] = useState<HTMLElement | undefined>();
    return (
        <>
            <div>
                <div className={cls.className}>
                    <Undertittel>Relasjoner</Undertittel>
                    <VerticalSpacer rem={1} />
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PenFillIkon />
                        <Normaltekst style={{ marginLeft: '1rem' }}>Fylles ut av arbeidsgiver</Normaltekst>
                    </div>
                    <VerticalSpacer rem={1} />

                    <Element>Er det familiære eller økonomiske relasjoner mellom arbeidsgiveren og deltakeren?</Element>
                    <LesMerPanel åpneLabel="Hva menes med dette?" lukkLabel="Lukk">
                        <RelasjonHjelpetekst />
                    </LesMerPanel>
                    <VerticalSpacer eightPx={true} />
                    <div
                        onMouseOver={e => setPopoverAnker(e.currentTarget)}
                        onMouseLeave={() => setPopoverAnker(undefined)}
                        className={cls.element('familietilknytning-valg')}
                        id="familevalg"
                    >
                        {rolle === 'VEILEDER' ? (
                            <Normaltekst>{harFamilieTilknttningSomJaNeiSvar(avtale.harFamilietilknytning)}</Normaltekst>
                        ) : (
                            <>
                                <RadioPanel
                                    label="Ja"
                                    name="familievalg"
                                    checked={avtale.harFamilietilknytning === true}
                                    value="ja"
                                    onChange={() => settAvtaleVerdier({ harFamilietilknytning: true })}
                                />
                                <RadioPanel
                                    label="Nei"
                                    name="familievalg"
                                    checked={avtale.harFamilietilknytning === false}
                                    value="nei"
                                    onChange={() => {
                                        settAvtaleVerdier({
                                            familietilknytningForklaring: undefined,
                                            harFamilietilknytning: false,
                                        });
                                    }}
                                />
                            </>
                        )}
                    </div>
                    {avtale.harFamilietilknytning && (
                        <>
                            <VerticalSpacer sixteenPx={true} />
                            {rolle === 'VEILEDER' ? (
                                <>
                                    <Element>Vennligst utdyp denne relasjonen</Element>
                                    <Normaltekst>{avtale.familietilknytningForklaring || ''}</Normaltekst>
                                </>
                            ) : (
                                <PakrevdTextarea
                                    label="Vennligst utdyp denne relasjonen"
                                    maxLengde={500}
                                    verdi={avtale.familietilknytningForklaring || ''}
                                    settVerdi={verdi => settAvtaleVerdier({ familietilknytningForklaring: verdi })}
                                />
                            )}
                        </>
                    )}
                    <>
                        {rolle === 'VEILEDER' && (
                            <Popover
                                avstandTilAnker={16}
                                onRequestClose={() => setPopoverAnker(undefined)}
                                ankerEl={popoverAnker}
                            >
                                <div style={{ padding: '1rem' }}>Dette fylles ut av arbeidsgiver.</div>
                            </Popover>
                        )}
                    </>
                </div>
            </div>
        </>
    );
};

export default Relasjoner;
