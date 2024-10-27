import prompt from 'prompt-sync'


export default async function MainMenu({
    configs
}) {

    console.clear()

    console.log('script started')

    const optionsView = configs
        .map(({code,name}) => `[${code}] - ${name}`)
        .join('\n')

        console.log(optionsView);
        

    const chooseOption =  prompt()('choose Option : ')
    return chooseOption
}