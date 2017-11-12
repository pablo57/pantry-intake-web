import React from 'react';
import axios from 'axios';
import { 
    Button,
    FormGroup,
    Form,
    ControlLabel,
    FormControl,
    ButtonToolbar,
    Table,
    Modal } from 'react-bootstrap';
import { debounce } from '../utils/utilities';
import { searchMembers } from '../providers/members';


export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        selectedMember: null,
        memberNumber: '',
        memberLastName: '',
        memberDOB: '',
        members: [],
        matchedData: []
    };

    // setup the method to call when searching for a member. 
    // debounce it so that it can only be called every so often.
    this.callSearch = debounce(this.callSearch, 300);
  }

  /**
   * Callback function called everytime the user selects a member from the
   * search results table.
   */
  selectMember = (member) => {
      this.setState({ selectedMember: member });
  }

    /**
     * callback function called on user input change for member number.
     */
    handleMemberNumberChange = (e) => {
        e.persist();
        this.callSearch(e, 'id');

        const val = e.target.value;
        this.setState({ memberNumber: val });
    }

    /**
     * callback function called on user input change for member lastName.
     */
    handleMemberLastNameChange = (e) => {
        e.persist();
        this.callSearch(e, 'last_name');

        const val = e.target.value;
        this.setState({ memberLastName: val });
    }

    callSearch = (e, byField) => {
        const val = e.target.value;

        if (val) {
            searchMembers(val, byField).then((data) => {
                this.setState({ matchedData: data })
            });
        }
    };

    /**
     * callback function called on user input change for member lastName.
     */
    handleMemberLastNameChange = (e) => {
        e.persist();
        this.callSearch(e, 'last_name');

        const val = e.target.value;
        this.setState({ memberLastName: val });
    }

    /**
     * callback function called on user input change for member DOB.
     */
    handleMemberDOBChange = (e) => {
        this.setState({ memberDOB: e.target.value });
    }

    /**
     * callback function called when clicking on confirm after a member has
     * been selected.
     */
    confirmClicked = () => {
        this.props.handleConfirm(this.state.selectedMember);
    }

  render = (props) => {
    return (
      <div>

      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg">Search For Member</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form>
    <FormGroup
      controlId="formBasicText"
    >
      <ControlLabel>Search by Member #</ControlLabel>
      <FormControl
        type="text"
        value={this.state.memberNumber}
        placeholder="Enter Member #"
        onChange={this.handleMemberNumberChange}
        disabled={this.state.memberLastName.length > 0 || this.state.memberDOB.length > 0}
      />
      <hr/>
      <p>Or search by</p>
      <ControlLabel>Last Name</ControlLabel>
      <FormControl
        type="text"
        value={this.state.memberLastName}
        placeholder="Enter Member Last Name"
        onChange={this.handleMemberLastNameChange}
        disabled={this.state.memberNumber.length > 0}
      />

    </FormGroup>
  </form>
      <h4>Matches</h4>
      {
        this.state.matchedData.length === 0 ? (<p>No Matches</p>) : (
            <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Member#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
              </tr>
            </thead>
            <tbody>
            {
                this.state.matchedData.map((data) => (
                    <tr 
                        className={this.state.selectedMember && this.state.selectedMember.id === data.id ? 'active' : ''} 
                        key={data.id} 
                        onClick={ () => { this.selectMember(data) } }
                    >
                        <td>{data.id}</td>
                        <td>{data.firstName}</td>
                        <td>{data.lastName}</td>
                        <td>{data.DOB.format('MM/DD/YYYY')}</td>
                  </tr>
                  ))
            }
            </tbody>
          </Table>
        )
      }
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.props.hideModal}>Cancel</Button>
      <Button onClick={this.confirmClicked} disabled={!this.state.selectedMember}>Confirm</Button>
    </Modal.Footer>

      </div>
    );
  }
}

export default DashboardPage;
