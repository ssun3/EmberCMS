import Ember from 'ember';

export function formatDate(params) {
  return moment(params[0]).format('YYYY');
}

export default Ember.Helper.helper(formatDate);
