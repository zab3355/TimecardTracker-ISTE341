var _0x5d3d = [
  "getSalary",
  "getDeptId",
  "dept_id",
  "getMngId",
  "setEmpName",
  "setEmpNo",
  "setJob",
  "setSalary",
  "setMngId",
  "date-fns/format",
  "getTime",
  "toISOString",
  "YYYY-MM-DD",
  "Employee\x20needs\x20to\x20be\x20called\x20with\x20the\x20new\x20keyword",
  "emp_id",
  "emp_no",
  "hire_date",
  "job",
  "salary",
  "mng_id",
  "prototype",
  "getEmpName",
  "emp_name",
  "getEmpNo",
  "getHireDate",
  "getJob"
];
(function(_0x2d8f05, _0x4b81bb) {
  var _0x4d74cb = function(_0x32719f) {
    while (--_0x32719f) {
      _0x2d8f05["push"](_0x2d8f05["shift"]());
    }
  };
  _0x4d74cb(++_0x4b81bb);
})(_0x5d3d, 0x10d);
var _0x77ab = function(_0x1068fa, _0x55ceb6) {
  _0x1068fa = _0x1068fa - 0x0;
  var _0x4f7242 = _0x5d3d[_0x1068fa];
  return _0x4f7242;
};
const format = require(_0x77ab("0x0"));
function isValidDate(_0x693bc8) {
  var _0x4916d5 = /^\d{4}-\d{2}-\d{2}$/;
  if (!_0x693bc8["match"](_0x4916d5)) return ![];
  var _0x16554e = new Date(_0x693bc8);
  if (!_0x16554e[_0x77ab("0x1")]() && _0x16554e[_0x77ab("0x1")]() !== 0x0)
    return ![];
  return _0x16554e[_0x77ab("0x2")]()["slice"](0x0, 0xa) === _0x693bc8;
}
var Employee = function(
  _0xef1621 = "",
  _0x50dd38 = "",
  _0x15cd74 = format(new Date(), _0x77ab("0x3")),
  _0x21e924 = "",
  _0x505883 = 0x0,
  _0x36f94e = null,
  _0x2fc944 = null,
  _0x592551 = null
) {
  if (!(this instanceof Employee)) {
    throw new Error(_0x77ab("0x4"));
  }
  this[_0x77ab("0x5")] = _0x592551;
  this["emp_name"] = _0xef1621;
  this[_0x77ab("0x6")] = _0x50dd38;
  if (isValidDate(_0x15cd74)) {
    this[_0x77ab("0x7")] = _0x15cd74;
  } else {
    this[_0x77ab("0x7")] = format(new Date(), _0x77ab("0x3"));
  }
  this[_0x77ab("0x8")] = _0x21e924;
  this[_0x77ab("0x9")] = _0x505883;
  this["dept_id"] = _0x36f94e;
  this[_0x77ab("0xa")] = _0x2fc944;
};
Employee[_0x77ab("0xb")]["getId"] = function() {
  return this[_0x77ab("0x5")];
};
Employee[_0x77ab("0xb")][_0x77ab("0xc")] = function() {
  return this[_0x77ab("0xd")];
};
Employee[_0x77ab("0xb")][_0x77ab("0xe")] = function() {
  return this[_0x77ab("0x6")];
};
Employee["prototype"][_0x77ab("0xf")] = function() {
  return this[_0x77ab("0x7")];
};
Employee["prototype"][_0x77ab("0x10")] = function() {
  return this[_0x77ab("0x8")];
};
Employee[_0x77ab("0xb")][_0x77ab("0x11")] = function() {
  return this[_0x77ab("0x9")];
};
Employee[_0x77ab("0xb")][_0x77ab("0x12")] = function() {
  return this[_0x77ab("0x13")];
};
Employee["prototype"][_0x77ab("0x14")] = function() {
  return this[_0x77ab("0xa")];
};
Employee[_0x77ab("0xb")]["setId"] = function(_0x19aba4) {
  this[_0x77ab("0x5")] = _0x19aba4;
};
Employee["prototype"][_0x77ab("0x15")] = function(_0x3544b7) {
  this[_0x77ab("0xd")] = _0x3544b7;
};
Employee[_0x77ab("0xb")][_0x77ab("0x16")] = function(_0x3bf56d) {
  this[_0x77ab("0x6")] = _0x3bf56d;
};
Employee["prototype"]["setHireDate"] = function(_0x2cdeba) {
  if (isValidDate(_0x2cdeba)) {
    this[_0x77ab("0x7")] = _0x2cdeba;
  } else {
    this[_0x77ab("0x7")] = format(new Date(), _0x77ab("0x3"));
  }
};
Employee[_0x77ab("0xb")][_0x77ab("0x17")] = function(_0x3d518c) {
  this[_0x77ab("0x8")] = _0x3d518c;
};
Employee[_0x77ab("0xb")][_0x77ab("0x18")] = function(_0x34902c) {
  this[_0x77ab("0x9")] = _0x34902c;
};
Employee[_0x77ab("0xb")]["setDeptId"] = function(_0x555842) {
  this[_0x77ab("0x13")] = _0x555842;
};
Employee[_0x77ab("0xb")][_0x77ab("0x19")] = function(_0x4bff27) {
  this[_0x77ab("0xa")] = _0x4bff27;
};
module["exports"] = Employee;
