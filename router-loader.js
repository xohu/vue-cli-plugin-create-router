module.exports = function (source) {
  this.callback(
    null,
    `export default function (component) {
      component.options._router = ${
        source
      }
    }`
  )
}