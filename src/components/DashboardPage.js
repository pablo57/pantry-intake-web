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
import EditIntake from './EditIntake';
import { createMember, updateMember } from '../providers/members';
import { getHouseholdIntakes, createIntake } from '../providers/intakes';
import { getHouseholdMembers } from '../providers/households';


export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMember: undefined,
      householdData: undefined,
      householdMembers: [],
      householdIntakes: [],
      editMode: undefined
    };
  }

  /**
   * Passed down to be called by child search component when clicking confirm
   * for selecting the desired member from the search results.
   */
  memberSelected = (member) => {
    this.setState({ searchModalshow: false, selectedMember: member });

    getHouseholdMembers(member.householdId).then((data) => {
      this.setState({ householdMembers: data.members, householdData: data });
    })

    getHouseholdIntakes(member.householdId).then((intakes) => {
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

  showEditIntakeModal = (mode) => {
    this.setState({ mode, editIntakeModalshow: true });
  }
  hideEditIntakeModal = () => {
    this.setState({ editIntakeModalshow: false });
  }

  /**
   * Called when user clicks on clear button. Used to clear the state and remove
   * the currently selected member.
   */
  handleClear = () => {
    this.setState({
      selectedMember: undefined,
      householdData: undefined,
      householdMembers: [],
      householdIntakes: [],
      editMode: undefined
    });
  }

  /**
   * Called by child edit component when requesting to create or update a member.
   */
  saveMemberData = (memberData) => {
    if (this.state.selectedMember && this.state.selectedMember.id) {
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

  /**
   * Called by child edit component when requesting to create an intake.
   */
  saveIntakeData = (intakeData) => {
    intakeData.householdId = this.state.householdData.id;
    intakeData.memberId = this.state.selectedMember.id;
    
    createIntake(intakeData).then((data) => {
      this.setState({ householdIntakes: [...this.state.householdIntakes, data] });
    });
    this.setState({ editIntakeModalshow: false });
  }

  /**
   * Called by child edit component when requesting to create or update a member.
   */
  saveHouseholdMember = (memberData) => {
    // create a new household member
    memberData.householdId = this.state.householdData.id;
    createMember(memberData).then((data) => {
      this.setState({ householdMembers: [...this.state.householdMembers, data] });
    });
  };

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
                  <td>{this.state.selectedMember.DOB.format('MM/DD/YYYY')}</td>
                </tr>
                </tbody>
              </Table>
            </div>
          ) : (<h3>No Member Selected. Please search for and select a member to start.</h3>)
        }
        <hr/>
        <h3>HouseHold</h3>
        {
          this.state.householdMembers && this.state.householdMembers.length === 0 ? (<p>No other members</p>) : (
            
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
                this.state.householdMembers && this.state.householdMembers.map((data) => (
                  <tr key={data.id}>
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
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.householdIntakes && this.state.householdIntakes.map((data) => (
                          <tr key={data.id}>
                          <td><input type="checkbox" checked={data.foodBox} readOnly disabled /></td>
                          <td><input type="checkbox" checked={data.perishable} readOnly disabled /></td>
                          <td><input type="checkbox" checked={data.camper} readOnly disabled /></td>
                          <td><input type="checkbox" checked={data.diaper} readOnly disabled /></td>
                          <td>{data.notes}</td>
                          <td>{data.householdCount}</td>
                          <td>{data.weight}</td>
                          <td>{data.created.format('MM/DD/YYYY')}</td>
                        </tr>
                        ))
                  }
                  </tbody>
                </Table>
              </div>
          ) : (<h3>No Intake History</h3>)
        }

        <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.showSearchModal}>
          Search
        </Button>
          {this.state.selectedMember ? (
            <div>
              <Button bsStyle="primary" onClick={() => this.showEditModal('edit')}>
              Edit
              </Button>
              <Button bsStyle="primary" onClick={() => this.showEditIntakeModal('edit')}>
                Create Intake
              </Button>
              <Button bsStyle="primary" onClick={ this.handleClear }>
                Clear
              </Button>
            </div>
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
          householdMembers={ this.state.householdMembers }
          householdData={ this.state.householdData }
          save={ this.saveMemberData }
          saveHouseholdMember={ this.saveHouseholdMember }
        />
      </Modal>

      <Modal
        show={this.state.editIntakeModalshow}
        onHide={this.hideEditIntakeModal}
        dialogClassName="custom-modal"
      >
        <EditIntake 
          hideModal={ this.hideEditIntakeModal }
          mode={ this.state.mode }
          save={ this.saveIntakeData }
        />
      </Modal>
      </ButtonToolbar>

      </div>
    );
  }
}

export default DashboardPage;
