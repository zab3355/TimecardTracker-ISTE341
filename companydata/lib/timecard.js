var _0x4737 = [
  "setEndTime",
  "exports",
  "date-fns/format",
  "match",
  "getTime",
  "toISOString",
  "slice",
  "test",
  "YYYY-MM-DD\x20HH:mm:ss",
  "Timecard\x20needs\x20to\x20be\x20called\x20with\x20the\x20new\x20keyword",
  "emp_id",
  "timecard_id",
  "start_time",
  "split",
  "end_time",
  "prototype",
  "getId",
  "getStartTime",
  "getEndTime",
  "getEmpId",
  "setId",
  "setStartTime"
];
(function(_0x1b4c13, _0x3828d1) {
  var _0x266d54 = function(_0x49812b) {
    while (--_0x49812b) {
      _0x1b4c13["push"](_0x1b4c13["shift"]());
    }
  };
  _0x266d54(++_0x3828d1);
})(_0x4737, 0xde);
var _0x3c8a = function(_0x1e2d84, _0x155ca9) {
  _0x1e2d84 = _0x1e2d84 - 0x0;
  var _0x18b276 = _0x4737[_0x1e2d84];
  return _0x18b276;
};
const format = require(_0x3c8a("0x0"));
function isValidDate(_0x395470) {
  var _0x20df94 = /^\d{4}-\d{2}-\d{2}$/;
  if (!_0x395470[_0x3c8a("0x1")](_0x20df94)) return ![];
  var _0x5e81b3 = new Date(_0x395470);
  if (!_0x5e81b3[_0x3c8a("0x2")]() && _0x5e81b3[_0x3c8a("0x2")]() !== 0x0)
    return ![];
  return _0x5e81b3[_0x3c8a("0x3")]()[_0x3c8a("0x4")](0x0, 0xa) === _0x395470;
}
function validateTime(_0x337f13) {
  var _0x514f66 = new RegExp("([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])");
  if (_0x514f66[_0x3c8a("0x5")](_0x337f13)) {
    return !![];
  } else {
    return ![];
  }
}
var Timecard = function(
  _0x872d92 = format(new Date(), _0x3c8a("0x6")),
  _0x2a77f6 = format(new Date(), _0x3c8a("0x6")),
  _0x2ab2b3 = 0x0,
  _0x3d86ab = null
) {
  if (!(this instanceof Timecard)) {
    throw new Error(_0x3c8a("0x7"));
  }
  this[_0x3c8a("0x8")] = _0x2ab2b3;
  this[_0x3c8a("0x9")] = _0x3d86ab;
  var _0x50a4a3 = _0x872d92["split"]("\x20");
  if (isValidDate(_0x50a4a3[0x0]) && validateTime(_0x50a4a3[0x1])) {
    this[_0x3c8a("0xa")] = _0x872d92;
  } else {
    this["start_time"] = format(new Date(), "YYYY-MM-DD\x20HH:mm:ss");
  }
  var _0x5d26bf = _0x2a77f6[_0x3c8a("0xb")]("\x20");
  if (isValidDate(_0x5d26bf[0x0]) && validateTime(_0x5d26bf[0x1])) {
    this[_0x3c8a("0xc")] = _0x2a77f6;
  } else {
    this["end_time"] = format(new Date(), _0x3c8a("0x6"));
  }
};
Timecard[_0x3c8a("0xd")][_0x3c8a("0xe")] = function() {
  return this[_0x3c8a("0x9")];
};
Timecard[_0x3c8a("0xd")][_0x3c8a("0xf")] = function() {
  return this[_0x3c8a("0xa")];
};
Timecard[_0x3c8a("0xd")][_0x3c8a("0x10")] = function() {
  return this[_0x3c8a("0xc")];
};
Timecard[_0x3c8a("0xd")][_0x3c8a("0x11")] = function() {
  return this["emp_id"];
};
Timecard[_0x3c8a("0xd")][_0x3c8a("0x12")] = function(_0x105ff6) {
  this[_0x3c8a("0x9")] = _0x105ff6;
};
Timecard["prototype"][_0x3c8a("0x13")] = function(_0x1122e1) {
  var _0x39f33d = _0x1122e1[_0x3c8a("0xb")]("\x20");
  if (isValidDate(_0x39f33d[0x0]) && validateTime(_0x39f33d[0x1])) {
    this[_0x3c8a("0xa")] = _0x1122e1;
  } else {
    this[_0x3c8a("0xa")] = format(new Date(), _0x3c8a("0x6"));
  }
};
Timecard[_0x3c8a("0xd")][_0x3c8a("0x14")] = function(_0x488c73) {
  var _0x41d29f = _0x488c73["split"]("\x20");
  if (isValidDate(_0x41d29f[0x0]) && validateTime(_0x41d29f[0x1])) {
    this[_0x3c8a("0xc")] = _0x488c73;
  } else {
    this[_0x3c8a("0xc")] = format(new Date(), _0x3c8a("0x6"));
  }
};
Timecard[_0x3c8a("0xd")]["setEmpId"] = function(_0x22bbed) {
  this[_0x3c8a("0x8")] = _0x22bbed;
};
module[_0x3c8a("0x15")] = Timecard;
