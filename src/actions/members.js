// These are the actions that can be used in a redux store dispatch.

// ADD_MEMBER
export const addMember = member => ({
  type: 'ADD_MEMBER',
  member
});

// REMOVE_MEMBER
export const removeMember = ({ id } = {}) => ({
  type: 'REMOVE_MEMBER',
  id
});

// EDIT_MEMBER
export const editMember = (id, updates) => ({
  type: 'EDIT_MEMBER',
  id,
  updates
});
