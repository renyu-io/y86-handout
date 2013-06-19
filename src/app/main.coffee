define ['jquery', 'FileSaver', './Painter', './Simulator', './Utils'], ($, saveAs, Painter, Simulator, Utils) ->
    # Represents the painter used for paint.
    painter = new Painter('container')
    simulator = new Simulator()
    nowCircle = 1
    playing = false

    handleDropbox = (id) ->
        box = $(id)
        box.on 'dragenter dragover', (e) ->
            e.stopPropagation()
            e.preventDefault()
            box.css('border-color', '#8ED8F8')
            return false

        box.on 'dragleave', (e) ->
            e.stopPropagation()
            e.preventDefault()
            box.css('border-color', '#000000')
            return false

        box.on 'drop', (e) ->
            e.stopPropagation()
            e.preventDefault()
            box.css('border-color', '#000000')

            files = e.originalEvent.dataTransfer.files
            handleFiles(box, files)
            return false

    # Handle the input files.
    handleFiles = (box, files) ->
        file = files[0]
        reader = new FileReader()
        reader.onload = (e) ->
            codes = simulator.load(e.target.result)
            simulator.run()
            report = simulator.report.join('\n')
            console.log(report)

            table = $('<table>')
            for own key, value of codes
                tr = $('<tr>').attr('id', 'line_'+ key)
                tr.append($('<td>').html(Utils.num2hex(key, 3)).addClass('line-no'))
                tr.append($('<td>').addClass('status'))
                tr.append($('<td>').append($('<pre>').html(value)).addClass('code'))
                table.append(tr)
            box.html table
            show(1)
        reader.readAsText(file)

    # Perform the save file action.
    saveResult = (result) ->
        blob = new Blob([result], type: "text/plain;charset=utf-8")
        saveAs(blob, "report.txt")

    $('#report').click ->
        if simulator.report.length is 0
            alert "Please load the yo file first!"
        else saveResult(simulator.report.join('\n'))

    # Show the given cycle
    show = (cycle) ->
        $('#cycle_index').html(cycle - 1)
        painter.show(simulator.cycles[cycle])

        v = simulator.cycles[cycle].variables
        $('#code .status').empty()
        $('#code .code').removeClass('highlight')
        if v.f_pc?
            tr = $('#line_' + v.f_pc)
            tr.find('.status').html 'F'
            tr.find('.code').addClass('highlight')
        if v.D_pc?
            $('#line_' + v.D_pc + ' .status').html 'D'
        if v.E_pc?
            $('#line_' + v.E_pc + ' .status').html 'E'
        if v.M_pc?
            $('#line_' + v.M_pc + ' .status').html 'M'
        if v.W_pc?
            $('#line_' + v.W_pc + ' .status').html 'W'

        if $('.highlight').length is 1
            # Update the scroll state
            height = $('#code').get(0).clientHeight
            pos = $('.highlight').offset().top - $('#code').offset().top
            scrollTop = $('#code').get(0).scrollTop
            scrollHeight = $('#code').get(0).scrollHeight
            if pos < 0 then scrollTop = Math.max(0, scrollTop + pos - height / 2)
            if pos > height then scrollTop = Math.min(scrollTop + pos - height / 2, scrollHeight)
            $('#code').get(0).scrollTop = scrollTop


    # Add actions after document ready.
    $ ->
        painter.render()
        handleDropbox('#code')

    # Deal with the next button
    $('#next').on('click', ->
        if nowCircle + 1 >= simulator.cycles.length
            alert "程序运行结束！"
        else
            show(++nowCircle)
    )

    # Deal with the prev button
    $('#prev').on('click', ->
        if nowCircle is 1
            alert "程序已经在第一个cycle！"
        else
            show(--nowCircle)
    )

    # Play the simulator continuously
    play = ->
        if nowCircle + 1 >= simulator.cycles.length
            $('#play').trigger('click')
        if not playing then return
        show(++nowCircle)
        setTimeout(play, 2100 - $('#speed').val())

    # Bind the play/pause button
    $('#play').on('click', ->
        playing = not playing
        if playing
            $(@).html('pause')
            play()
        else
            $(@).html('play')
    )

    # Render the stage according to the select
    $('#stage').change ->
        switch $(@).val()
            when 'f' then painter.f_render()
            when 'd' then painter.d_render()
            when 'e' then painter.e_render()
            when 'm' then painter.m_render()
            else painter.renderMain()

    $('#mem_submit').click ->
        text = $('#mem_addr').val()
        value = simulator.cycles[nowCircle].memory[Utils.hex2num(text)]
        value = Utils.num2hex(value, 8)
        alert 'The content of address: ' + text + '\nis ' + value + '.'
        $('#mem_addr').val('')

    # Deal with the window resize.
    $(window).on('resize', ->
        if @resizeTimeout
            clearTimeout(@resizeTimeout)
        @resizeTimeout = setTimeout( ->
            $(@).trigger('resizeEnd')
        , 200)
    )

    $(window).on 'resizeEnd orientationChange', ->
        $('#container').empty()
        painter.render()
