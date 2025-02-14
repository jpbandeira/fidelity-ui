export const buildArgs = (args) => {
    let argsLength = args.length
    let argsString = ""

    if (argsLength >= 1) {
        argsString = "?" + args[0]
        for (let i = 1; i < argsLength; i++) {
            if (i + 1 === argsLength) {
                argsString = argsString + args[i]
                continue
            }

            argsString = argsString + args[i] + "&"
        }
    }

    return argsString
}
