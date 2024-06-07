import React from "react";
import { Navigate } from 'react-router-dom';

class Header extends React.Component {
    state = {
        btnProfile: false,
        btnConfig: false,
    }

btnProfile = () => {
    this.setState({ btnProfile: true});
};

btnConfig = () => {
    this.setState({ btnConfig: true });
};
    render() {
        const { btnConfig, btnProfile } = this.state;
        if (btnConfig) {
            return <Navigate to="/config" />;
        }
        if (btnProfile) {
            return <Navigate to="/profile" />;
        }
        return (
            <div>
                <button
                    id="btnprofile-header"
                    data-testid="profile-header-btn"
                    onClick={this.btnProfile}
                >
                    Profile
                </button>
                <button
                    id="btnConfig-header"
                    data-testid="config-header-btn"
                    onClick={this.btnConfig}
                >
                    Config
                </button>
            </div>
        );
    }
}

export default Header;