import { Rolle } from './innlogget-bruker';

export type Hendelse = {
    id: string;
    tidspunkt: string;
    utførtAv: Rolle;
    hendelse: HendelseType;
};

export type HendelseType =
    | 'OPPRETTET'
    | 'GODKJENT_AV_ARBEIDSGIVER'
    | 'GODKJENT_AV_VEILEDER'
    | 'GODKJENT_AV_DELTAKER'
    | 'SIGNERT_AV_MENTOR'
    | 'GODKJENT_PAA_VEGNE_AV'
    | 'GODKJENNINGER_OPPHEVET_AV_ARBEIDSGIVER'
    | 'GODKJENNINGER_OPPHEVET_AV_VEILEDER'
    | 'SMS_VARSLING_FEILET'
    | 'ENDRET'
    | 'DELT_MED_DELTAKER'
    | 'DELT_MED_ARBEIDSGIVER'
    | 'ANNULLERT'
    | 'AVBRUTT'
    | 'GJENOPPRETTET'
    | 'OPPRETTET_AV_ARBEIDSGIVER'
    | 'LÅST_OPP'
    | 'NY_VEILEDER'
    | 'AVTALE_FORDELT'
    | 'TILSKUDDSPERIODE_AVSLATT'
    | 'TILSKUDDSPERIODE_GODKJENT'
    | 'AVTALE_FORKORTET'
    | 'AVTALE_FORLENGET'
    | 'MÅL_ENDRET'
    | 'TILSKUDDSBEREGNING_ENDRET'
    | 'STILLINGSBESKRIVELSE_ENDRET'
    | 'KONTAKTINFORMASJON_ENDRET'
    | 'OPPFØLGING_OG_TILRETTELEGGING_ENDRET'
    | 'AVTALE_INNGÅTT'
    | 'GODKJENT_PAA_VEGNE_AV_ARBEIDSGIVER'
    | 'GODKJENT_PAA_VEGNE_AV_DELTAKER_OG_ARBEIDSGIVER'
    | 'GODKJENT_FOR_ETTERREGISTRERING'
    | 'FJERNET_ETTERREGISTRERING'
    | 'INKLUDERINGSTILSKUDD_ENDRET'
    | 'OM_MENTOR_ENDRET'
    | 'DELT_MED_MENTOR';