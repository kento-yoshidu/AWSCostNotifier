export const hello = (event, context, callback) => {
  const p = new Promise((resolve) => {
    resolve('success')
  })
  p.then(() =>
    callback(null, {
      message: 'Serverless & TypeScript✨',
      event
    })
  ).catch((e) => callback(e))
}
