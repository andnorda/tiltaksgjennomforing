import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import '../instruks.less';
import OppfLgingOgVarighet from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/OppfølgingOgVarighet';
import ArbeidsmiljLoven from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/Arbeidsmiljøloven';
import YrkesskadeforsikringOgSkadeerstatning from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/YrkesskadeforsikringOgSkadeerstatning';
import FolketrygdlovenEgenmeldingOgSykmelding from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/FolketrygdlovenEgenmeldingOgSykmelding';
import BehandlingAvPersonopplysninger from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/BehandlingAvPersonopplysninger';
import TilskuddsperiodeOgRefusjon from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/TilskuddsperiodeOgRefusjon';
import Refusjon from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/Refusjon';
import HvaSierRegelverket from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/HvaSierRegelverket';

const cls = BEMHelper('instruks');
interface Props {
    erLaast: boolean;
    tiltakstype: TiltaksType;
    erPilot: boolean;
}
const ArbeidsgiverInstruks: FunctionComponent<Props> = (props) => {
    const { erLaast, tiltakstype, erPilot } = props;
    const oppfolgingLenker: { [key in TiltaksType]: string } = {
        MIDLERTIDIG_LONNSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_9',
        VARIG_LONNSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_10',
        SOMMERJOBB: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_8',
        INKLUDERINGSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_11',
        ARBEIDSTRENING: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/kap3#kap3',
        MENTOR: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/kap3#kap5',
    };
    return (
        <>
            {!erLaast && <Normaltekst>Når du godkjenner avtalen godtar du kravene fra NAV</Normaltekst>}
            <VeilederpanelMedUtklippstavle>
                <div className={cls.element('container')}>
                    <div className={cls.element('subheader')}>
                        <Element>Som arbeidsgiver må du</Element>
                    </div>
                    <VerticalSpacer rem={2} />
                    <OppfLgingOgVarighet tiltakstype={tiltakstype} eksternLenke={oppfolgingLenker[props.tiltakstype]} />
                    <ArbeidsmiljLoven tiltakstype={tiltakstype} />
                    <YrkesskadeforsikringOgSkadeerstatning tiltakstype={tiltakstype} />
                    <FolketrygdlovenEgenmeldingOgSykmelding tiltakstype={tiltakstype} />
                    <BehandlingAvPersonopplysninger />
                    <TilskuddsperiodeOgRefusjon erPilot={erPilot} tiltakstype={tiltakstype} />
                    <Refusjon tiltakstype={tiltakstype} />
                    <HvaSierRegelverket tiltakstype={tiltakstype} href={oppfolgingLenker[props.tiltakstype]} />
                </div>
            </VeilederpanelMedUtklippstavle>
        </>
    );
};

export default ArbeidsgiverInstruks;