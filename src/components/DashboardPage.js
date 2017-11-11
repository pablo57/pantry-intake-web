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


export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMember: null,
      editMode: null
    };
  }

  /**
   * Passed down to be called by child search component when clicking confirm
   * for selecting the desired member from the search results.
   */
  memberSelected = (member) => {
    this.setState({ searchModalshow: false, selectedMember: member });
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
          ) : (<p>No Member Selected. Please search for and select a member to start.</p>)
        }

        {
          [].length === 0 ? (<p>No History</p>) : (
              <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Perishables</th>
                  <th>Camper</th>
                  <th>Diapers</th>
                  <th>Member</th>
                  <th>Size of Household</th>
                </tr>
              </thead>
              <tbody>
              {
                  [].map((data) => (
                      <tr key={data.id} onClick={ () => { this.selectMember(data) } }>
                      <td>{data.id}</td>
                      <td>{data.firstName}</td>
                      <td>{data.lastName}</td>
                      <td>{data.DOB}</td>
                      <td>{data.lastName}</td>
                      <td>{data.DOB}</td>
                    </tr>
                    ))
              }
              </tbody>
            </Table>
          )
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
