define ->
    # Converts the number into hex string.
    num2hex: (num, length) ->
        number = if num? then num else 0
        number |= 0
        if number < 0
            number += 0xffffffff + 1
        ret = number.toString 16
        ret = '0' + ret while ret.length < length
        '0x' + ret

    # Converts the hex string into number.
    hex2num: (str) ->
        -(~parseInt(str, 16) + 1)

    # Judging the length from its name.
    lengthFromName: (name) ->
        if name.indexOf('val') isnt -1 or name.indexOf('predPC') isnt -1 then 8 else 1

    # Packup two 4bits into one byte
    hexPack: (high, low) ->
        high * 0x10 + low

    # Get the low 4 bits.
    low4: (b) ->
        b & 0xf

    # Get the high 4 bits.
    high4: (b) ->
        (b >> 4) & 0xf

    gen: (enviroment) ->
        reg: enviroment.reg.slice(0)
        memory: enviroment.memory.slice(0)
        variables: {}
        cc: enviroment.cc.slice(0)
        status: enviroment.status

    getWord: (memory, address) ->
        a = memory[address]
        b = memory[address + 1]
        c = memory[address + 2]
        d = memory[address + 3]
        a | b << 0x8 | c << 0x10 | d << 0x18

    setWord: (memory, address, bytes) ->
        memory[address] = bytes & 0xff
        memory[address + 1] = (bytes >> 0x8) & 0xff
        memory[address + 2] = (bytes >> 0x10) & 0xff
        memory[address + 3] = (bytes >> 0x18) & 0xff