console.log('module')


async function start() {
    return await Promise.resolve('Работает')
}

start().then(console.log)