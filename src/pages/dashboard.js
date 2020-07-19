import React  from 'react';
import Nav from '../components/Nav';
import Table from '../components/Table';
import { connect } from 'react-redux';

const Dashboard = (props) => {
    const cols = ['ID', 'Author', 'Score', 'Text', 'Time', 'Title', 'Type', 'URL', 'Actions']

    return (
        <>
            <Nav />
            <div className="Dashboard container">
                {props.fetchError && props.fetchError.length > 0 && (
                    <div class="alert alert-danger" role="alert">
                        {props.fetchError}
                    </div>
                )}
                {props.newDataReceived > 0 && (
                    <div class="alert alert-warning" role="alert">
                        New data received reloading...
                    </div>
                )}
                <p className="Dashboard__container">Latest Feeds</p>
                {props.fetchInit && (
                    <p>Loading....</p>
                )}
                {!props.fetchInit && (
                    <Table {...props} cols={cols}></Table>
                )}
            </div>
        </>
    )
}

const mapStateToProps = state => ({...state.feeds})

export default connect(mapStateToProps)(Dashboard)