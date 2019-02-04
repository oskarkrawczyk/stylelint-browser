"use strict"

const rules = require("stylelint/lib/rules")

const context = require.context("stylelint/lib/rules", true, /index\.js$/)

module.exports = function (ruleName) {
  if (rules.includes(ruleName)) {
    return context("./" + ruleName + "/index.js")
  } else {
    return false
  }
}
