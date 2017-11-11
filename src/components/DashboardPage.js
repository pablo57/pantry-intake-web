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
import SearchMember from './SearchMember';
import EditMember from './EditMember';
import { createMember, updateMember } from '../providers/members';
import { getHouseholdIntakes } from '../providers/intakes';


export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMember: undefined,
      householdIntakes: undefined,
      editMode: undefined
    };
  }

  /**
   * Passed down to be called by child search component when clicking confirm
   * for selecting the desired member from the search results.
   */
  memberSelected = (member) => {
    this.setState({ searchModalshow: false, selectedMember: member });

    getHouseholdIntakes(member.householdId).then((intakes) => {
      console.log(intakes);
      this.setState({ householdIntakes: intakes });
    });
  }

  showSearchModal = () => {
    this.setState({ searchModalshow: true });
  }
  hideSearchModal = () => {
    this.setState({ searchModalshow: false });
  }

  showEditModal = (mode) => {
    this.setState({ mode, editModalshow: true });
  }
  hideEditModal = () => {
    this.setState({ editModalshow: false });
  }

  /**
   * Called by child edit component when requesting to create or update a member.
   */
  saveMemberData = (memberData) => {
    if (this.state.editMode === 'edit') {
      // this is an update
      updateMember(memberData).then((data) => {
        this.setState({ selectedMember: { ...this.state.selectedMember, ...memberData } });
      });
    } else {
      // create a new member
      createMember(memberData).then((data) => {
        this.setState({ selectedMember: { ...data } });
      })
    }

    this.setState({ editModalshow: false });
  }

  render = (props) => {
    return (
      <div>

        {
          this.state.selectedMember ? (
            <div>
              <h3>Member Data</h3>
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
                  <tr>
                  <td>{this.state.selectedMember.id}</td>
                  <td>{this.state.selectedMember.firstName}</td>
                  <td>{this.state.selectedMember.lastName}</td>
                  <td>{this.state.selectedMember.DOB}</td>
                </tr>
                </tbody>
              </Table>
            </div>
          ) : (<p>No Member Selected. Please search for and select a member to start.</p>)
        }
        <hr/>
        {
          this.state.householdIntakes && this.state.householdIntakes.length > 0 ?  (
              <div>
                <h3>Intake History</h3>
                <Table striped bordered condensed hover>
                <thead>
                    <tr>
                      <th>FoodBox</th>
                      <th>Perishables</th>
                      <th>Camper</th>
                      <th>Diapers</th>
                      <th>Notes</th>
                      <th>Household Count</th>
                      <th>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.householdIntakes && this.state.householdIntakes.map((data) => (
                          <tr key={data.id}>
                          <td>{data.foodBox}</td>
                          <td>{data.perishable}</td>
                          <td>{data.camper}</td>
                          <td>{data.diaper}</td>
                          <td>{data.notes}</td>
                          <td>{data.householdCount}</td>
                          <td>{data.weight}</td>
                        </tr>
                        ))
                  }
                  </tbody>
                </Table>
              </div>
          ) : (<p>No History</p>)
        }

        <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.showSearchModal}>
          Search
        </Button>
          {this.state.selectedMember ? (
            <Button bsStyle="primary" onClick={() => this.showEditModal('edit')}>
              Edit Member
            </Button>
          ) : (
            <Button bsStyle="primary" onClick={() => this.showEditModal('add')}>
              Create Member
            </Button>
          ) }
        

        <Modal
          show={this.state.searchModalshow}
          onHide={this.hideSearchModal}
          dialogClassName="custom-modal"
        >
          <SearchMember hideModal={this.hideSearchModal} handleConfirm={this.memberSelected} />
        </Modal>

        <Modal
        show={this.state.editModalshow}
        onHide={this.hideEditModal}
        dialogClassName="custom-modal"
      >
        <EditMember 
          hideModal={ this.hideEditModal }
          mode={ this.state.mode }
          memberData={ this.state.selectedMember }
          save={ this.saveMemberData }
        />
      </Modal>
      </ButtonToolbar>

      </div>
    );
  }
}

export default DashboardPage;
