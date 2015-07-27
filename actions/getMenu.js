export default function getMenu (context, payload, done) {
  context.dispatch('RECEIVE_MENU_START', payload)

  context.service.read('menu', {}, {}, function (err, menu) {
    if (err) {
      context.dispatch('RECEIVE_MENU_FAILURE', err)
      return done()
    }

    context.dispatch('RECEIVE_MENU_SUCCESS', menu)
    done()
  })
}
