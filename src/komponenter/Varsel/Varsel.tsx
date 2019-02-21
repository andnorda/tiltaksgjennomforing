import classNames from 'classnames';
import AlertStripe from 'nav-frontend-alertstriper';
import Lukknapp from 'nav-frontend-lukknapp';
import * as React from 'react';
import './Varsel.less';

interface Props {
    timeout?: number;
    kanLukkes: boolean;
    onLukkVarsel?: () => void;
    type: 'info' | 'suksess';
    className?: string;
}

interface State {
    display: boolean;
}

class Varsel extends React.Component<Props, State> {
    private timerHandle: any;

    state = {
        display: true,
    };

    componentDidMount = (): void => {
        if (this.props.timeout) {
            this.timerHandle = setTimeout(() => {
                this.lukkVarsel();
            }, this.props.timeout);
        }
    };

    componentWillUnmount(): void {
        clearTimeout(this.timerHandle);
    }

    lukkVarsel = () => {
        this.setState({ display: false });
        this.props.onLukkVarsel && this.props.onLukkVarsel();
    };

    render() {
        return (
            this.state.display && (
                <AlertStripe
                    type={this.props.type}
                    solid={true}
                    className={classNames('varsel', this.props.className)}
                >
                    {this.props.children}
                    {this.props.kanLukkes && (
                        <Lukknapp
                            hvit={true}
                            onClick={this.lukkVarsel}
                            className={'varsel__lukknapp'}
                        />
                    )}
                </AlertStripe>
            )
        );
    }
}

export default Varsel;