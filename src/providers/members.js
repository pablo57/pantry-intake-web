import axios from 'axios';

/**
 * Perform a GET call on search-members endpoint
 * 
 * @param {*} val The value to search for.
 * @param {*} byField The field type to search by (e.g. id, last_name)
 */
export const searchMembers = (val, byField) => {
    return axios({
        method:'get',
        url:`http://localhost:8081/v1/search-members?${byField}=${val}`,
    })
    .then((response) => {

        // need to serialize the data
        let members = response.data.data.map((data) => {
            return {
                id: data.Id,
                householdId: data.HouseholdId,
                lastName: data.LastName,
                firstName: data.FirstName,
                DOB: data.DOB,
                isAdult: data.IsAdult,
                isHeadOfHousehold: data.IsHeadOfHousehold,
                active: data.Active,
                created: data.Created,
                changed: data.Changed
            }
        });
        return members;
    }).catch((error) => {
        console.log('error posting member data.', error);
    });
};

export const createMember = (memberData) => {
    let requestData = {
        FirstName: memberData.firstName,
        LastName: memberData.lastName,
        DOB: memberData.DOB,
    }

    if (memberData.householdId) {
        requestData.HouseholdId = memberData.householdId;
    }

    return axios({
        method:'post',
        url:`http://localhost:8081/v1/members`,
        data: requestData
    })
    .then((response) => {
        console.log('response in provider', response);
        let data = response.data.data;
        memberData = {
            id: data.Id,
            householdId: data.HouseholdId,
            lastName: data.LastName,
            firstName: data.FirstName,
            DOB: data.DOB,
            isAdult: data.IsAdult,
            isHeadOfHousehold: data.IsHeadOfHousehold,
            active: data.Active,
            created: data.Created,
            changed: data.Changed
        }
        return memberData;
    }).catch((error) => {
        console.log('error posting member data.', error);
    });
};

export const updateMember = (memberData) => {
    return axios({
        method:'patch',
        url:`http://localhost:8081/v1/members`,
        data: 
        {
            FirstName: memberData.firstName,
            LastName: memberData.lastName,
            DOB: memberData.DOB,
        }
    })
    .then((response) => {
        console.log('response in provider', response);
        let data = response.data.data;
        memberData = {
            id: data.Id,
            householdId: data.HouseholdId,
            lastName: data.LastName,
            firstName: data.FirstName,
            DOB: data.DOB,
            isAdult: data.IsAdult,
            isHeadOfHousehold: data.IsHeadOfHousehold,
            active: data.Active,
            created: data.Created,
            changed: data.Changed
        }
        return memberData;
    }).catch((error) => {
        console.log('error posting member data.', error);
    });
};