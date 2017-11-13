import moment from 'moment';

// Get visible (filtered) members

/**
 * Allows filtering and sorting of member data. Takes in array of members and an object containing
 * the filter and sortBy values and returns back the filtered/sorted array.
 */
export default (members, { lastNameText, firstNameText, DOBfilter, sortBy }) => {
  return members.filter((member) => {
    const DOBMoment = moment(member.DOB);
    const DOBMatch = DOBFilter ? DOBFilter.isSame(DOBMoment, 'day') : true;
    const lastNameMatch = member.lastName.toLowerCase().includes(lastNameText.toLowerCase());
    const firstNameMatch = member.firstName.toLowerCase().includes(firstNameText.toLowerCase());

    return DOBMatch && lastNameMatch && firstNameMatch;
  }).sort((a, b) => {
    if (sortBy === 'dob') {
      // TODO: MUST IMPLEMENT
    } else if (sortBy === 'lastName') {
      // TODO: MUST IMPLEMENT
      return true;
    } else if (sortBy === 'id') {
        return a.id < b.id ? 1 : -1;
      }
  });
};
