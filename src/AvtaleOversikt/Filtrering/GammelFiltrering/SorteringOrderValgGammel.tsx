import React, { FunctionComponent } from 'react';
import { ReactComponent as TriangleUp } from '@/assets/ikoner/triangleUp.svg';
import { ReactComponent as TriangleDown } from '@/assets/ikoner/triangleDown.svg';
import BEMHelper from '@/utils/bem';
import { useFilterGammel } from '@/AvtaleOversikt/Filtrering/GammelFiltrering/useFilterGammel';
import { Avtale } from '@/types/avtale';

interface Props {
    label: string | React.ReactNode;
    sorteringsverdi: string;
}

const cls = BEMHelper('avtaletabellradheader');

const SorteringOrderValgGammel: FunctionComponent<Props> = ({ label, sorteringsverdi }) => {
    const { endreFilter, filtre } = useFilterGammel();

    return (
        <div className={cls.element('label-container')}>
            {label}
            <TriangleUp
                style={{ marginLeft: '0.5rem' }}
                className={cls.element(
                    'sortering',
                    filtre.sorteringOrder === 'ASC' && filtre.sorteringskolonne === sorteringsverdi
                        ? 'asc-selected'
                        : 'asc'
                )}
                onClick={() => {
                    endreFilter({
                        sorteringskolonne: sorteringsverdi as keyof Avtale,
                        sorteringOrder: 'ASC',
                    });
                }}
            />
            <TriangleDown
                className={cls.element(
                    'sortering',
                    filtre.sorteringOrder === 'DESC' && filtre.sorteringskolonne === sorteringsverdi
                        ? 'desc-selected'
                        : 'desc'
                )}
                onClick={() => {
                    endreFilter({
                        sorteringskolonne: sorteringsverdi as keyof Avtale,
                        sorteringOrder: 'DESC',
                    });
                }}
            />
        </div>
    );
};
export default SorteringOrderValgGammel;
