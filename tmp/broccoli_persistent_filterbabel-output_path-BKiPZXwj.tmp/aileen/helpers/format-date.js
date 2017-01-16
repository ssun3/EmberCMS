define('aileen/helpers/format-date', ['exports', 'ember'], function (exports, _ember) {
  exports.formatDate = formatDate;

  function formatDate(params) {
    return moment(params[0]).format('YYYY');
  }

  exports['default'] = _ember['default'].Helper.helper(formatDate);
});