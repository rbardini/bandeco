export default function getBalance (context, payload, done) {
  context.dispatch('RECEIVE_BALANCE_START', payload)

  context.service.read('balance', payload, {}, function (err, balance) {
    if (err) {
      context.dispatch('RECEIVE_BALANCE_FAILURE', err)
      return done()
    }

    context.dispatch('RECEIVE_BALANCE_SUCCESS', balance)
    done()
  })
}
