import * as React from 'react';
import { hentAvtaler, lagreAvtale, opprettAvtale } from '../services/firebase';
import { Avtale } from './avtale';
import { Route, withRouter } from 'react-router-dom';
import * as moment from 'moment';
import { pathTilKontaktinformasjonSteg, pathTilOversikt } from '../paths';
import AvtaleOversikt from './AvtaleOversikt';

export const tomAvtale: Avtale = {
    id: '',
    opprettetTidspunkt: '',

    deltakerFornavn: '',
    deltakerEtternavn: '',
    deltakerAdresse: '',
    deltakerPostnummer: '',
    deltakerPoststed: '',

    bedriftNavn: '',
    bedriftAdresse: '',
    bedriftPostnummer: '',
    bedriftPoststed: '',

    arbeidsgiverFornavn: '',
    arbeidsgiverEtternavn: '',
    arbeidsgiverEpost: '',
    arbeidsgiverTlf: '',

    veilederFornavn: '',
    veilederEtternavn: '',
    veilederEpost: '',
    veilederTlf: '',

    startDatoTimestamp: moment().valueOf(),
    sluttDatoTimestamp: moment().valueOf(),
    maalsetninger: [],

    bekreftetAvBruker: false,
    bekreftetAvArbeidsgiver: false,
    bekreftetAvVeileder: false,
};

export interface Context {
    avtale: Avtale;
    settAvtaleVerdi: (felt: string, verdi: any) => void;
    lagreAvtale: () => void;
}

const AvtaleContext = React.createContext<Context>({
    avtale: tomAvtale,
    settAvtaleVerdi: () => {}, // tslint:disable-line
    lagreAvtale: () => {}, // tslint:disable-line
});

export const AvtaleConsumer = AvtaleContext.Consumer;

interface State {
    avtaler: any;
    valgtAvtaleId: string;
}

export class TempAvtaleProvider extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            avtaler: {},
            valgtAvtaleId: props.location.pathname.split('/')[2],
        };

        this.settAvtaleVerdi = this.settAvtaleVerdi.bind(this);
        this.lagreAvtale = this.lagreAvtale.bind(this);
        this.avtaleKlikk = this.avtaleKlikk.bind(this);
        this.opprettAvtaleKlikk = this.opprettAvtaleKlikk.bind(this);
    }

    componentDidMount() {
        hentAvtaler().then(avtaler => {
            this.setState({ avtaler });
        });
    }

    settAvtaleVerdi(felt: string, verdi: any) {
        const avtale = this.state.avtaler[this.state.valgtAvtaleId];
        if (avtale) {
            avtale[felt] = verdi;

            const avtaler = {
                ...this.state.avtaler,
                [this.state.valgtAvtaleId]: avtale,
            };

            this.setState({ avtaler });
        }
    }

    lagreAvtale() {
        const avtale = this.state.avtaler[this.state.valgtAvtaleId];
        if (avtale) {
            lagreAvtale(avtale);
        }
    }

    avtaleKlikk(avtaleId: string) {
        this.setState({ valgtAvtaleId: avtaleId });
        this.props.history.push(pathTilKontaktinformasjonSteg(avtaleId));
    }

    opprettAvtaleKlikk() {
        opprettAvtale().then(avtale => {
            this.setState({
                avtaler: {
                    ...this.state.avtaler,
                    [avtale.id]: avtale,
                },
                valgtAvtaleId: avtale.id,
            });
            this.props.history.push(pathTilKontaktinformasjonSteg(avtale.id));
        });
    }

    render() {
        const context: Context = {
            avtale: this.state.avtaler[this.state.valgtAvtaleId] || tomAvtale,
            settAvtaleVerdi: this.settAvtaleVerdi,
            lagreAvtale: this.lagreAvtale,
        };

        const erPaHovedmenyen = this.props.location.pathname === '/';
        return (
            <AvtaleContext.Provider value={context}>
                <Route
                    path={pathTilOversikt}
                    exact={true}
                    render={() => (
                        <AvtaleOversikt
                            avtaler={this.state.avtaler}
                            avtaleKlikk={this.avtaleKlikk}
                            opprettAvtaleKlikk={this.opprettAvtaleKlikk}
                        />
                    )}
                />
                {!erPaHovedmenyen && this.props.children}
            </AvtaleContext.Provider>
        );
    }
}

export const AvtaleProvider = withRouter(TempAvtaleProvider);

export const medContext = (Component: any) => {
    return (props: any) => (
        <AvtaleConsumer>
            {context => {
                return <Component {...props} {...context} />;
            }}
        </AvtaleConsumer>
    );
};
