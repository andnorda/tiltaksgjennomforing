import React from 'react';
import { shallow } from 'enzyme';
import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { MemoryRouter , Route, Routes } from 'react-router-dom';

test('Test that <AvtaleOversikt> renders correctly', () => {
    const innlogetbruker: InnloggetBruker = {
        identifikator: '',
        erNavAnsatt: true,
        altinnOrganisasjoner: [
            {
                Name: '',
                OrganizationForm: '',
                OrganizationNumber: '',
                ParentOrganizationNumber: '',
                Status: '',
                Type: '',
            },
        ],
        rolle: 'ARBEIDSGIVER',
        tilganger: { ['']: ['ARBEIDSTRENING'] },
        navEnheter: [],
        kanVæreBeslutter: true,
    };

    const wrapper = shallow(
        <MemoryRouter >
            <Routes>
                <Route path="*" element={<AvtaleTabell innloggetBruker={innlogetbruker} avtaler={[]} varsler={[]} />} />
            </Routes>
        </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
});
