define ['jquery', 'kinetic', './Utils'], ($, K, Utils) ->
    class
        constructor: (@container) ->

        cycle:
            variables: {}
            reg: [0, 0, 0, 0, 0, 0, 0, 0]
            cc: [false, false, false]

        # Represents the main stage and layer.
        mainStage = null
        mainLayer = null
        infoLayer = null
        # Represents the labels container.
        labels = {}
        # Represents the color use for painting.
        colors =
            white: 'white'
            black: 'black'
            blue: '#8ED8F8'
            red: 'red'
        font_family = '"Lucida Console", Monaco, monospace'
        rect_height = 22

        K.Rect::rightX = ->
            @getX() + @getWidth()

        # Represents the basic label rectangle
        basicRect = new K.Rect
            width: 30
            height: rect_height
            stroke: colors.black
            strokeWidth: 1.5

        # Calculate the end X coordinates of the group
        K.Group::rightX = ->
            children = @getChildren()
            x = 0
            for child in children
                if child.getClassName() is "Rect"
                    x = child.rightX()
            return x

        # Add the stage name rectangle.
        K.Group::addNameRect = (width) ->
            rect = basicRect.clone
                width: width
                fill: colors.blue
            label = new K.Text
                width: 20
                fill: colors.white
                text: @stageName
                fontFamily: 'Calibri'
                fontSize: 12
                align: 'center'
            label.setY((rect.getHeight() - label.getHeight()) / 2 + 1)

            @add rect
            @add label

        # Add label rectangle.
        K.Group::addRect = (width, color, text) ->
            x = @rightX()
            rect = basicRect.clone
                width: width
                fill: color
                x: x
                height: rect_height
                stroke: colors.black
                strokeWidth: 1.5
            @add rect
            if text
                label = new K.Text
                    fill: colors.black
                    fontFamily: font_family
                    fontSize: 10
                    align: 'center'
                    width: width
                    x: x

                label.labelName = text
                label.fullName = @stageName + '_' + text
                labels[label.fullName] = label
                @add label

        # Generate the fetch stage.
        fetchStage = (y) ->
            stage = new K.Group
                x: 20
                y: y
            stage.stageName = 'F'

            stage.addNameRect 80
            stage.addRect 70, colors.white, 'predPC'
            stage.addRect 310, colors.blue
            return stage

        # Generate the decode stage
        decodeStage = (y) ->
            stage = new K.Group
                x: 20
                y: y
            stage.stageName = 'D'

            stage.addNameRect 30
            stage.addRect 30, colors.white, 'stat'
            stage.addRect 35, colors.white, 'icode'
            stage.addRect 35, colors.white, 'ifun'
            stage.addRect 30, colors.white, 'rA'
            stage.addRect 30, colors.white, 'rB'
            stage.addRect 70, colors.white, 'valC'
            stage.addRect 15, colors.blue
            stage.addRect 70, colors.white, 'valP'
            stage.addRect 115, colors.blue
            return stage

        # Generate the execute stage.
        executeStage = (y) ->
            stage = new K.Group
                x: 20
                y: y
            stage.stageName = 'E'

            stage.addNameRect 30
            stage.addRect 30, colors.white, 'stat'
            stage.addRect 35, colors.white, 'icode'
            stage.addRect 35, colors.white, 'ifun'
            stage.addRect 70, colors.white, 'valC'
            stage.addRect 70, colors.white, 'valA'
            stage.addRect 70, colors.white, 'valB'
            stage.addRect 30, colors.white, 'dstE'
            stage.addRect 30, colors.white, 'dstM'
            stage.addRect 30, colors.white, 'srcA'
            stage.addRect 30, colors.white, 'srcB'
            return stage

        # Generate the memory stage
        memoryStage = (y) ->
            stage = new K.Group
                x: 20
                y: y
            stage.stageName = 'M'

            stage.addNameRect 30
            stage.addRect 30, colors.white, 'stat'
            stage.addRect 35, colors.white, 'icode'
            stage.addRect 30, colors.blue
            stage.addRect 35, colors.white, 'Cnd'
            stage.addRect 20, colors.blue
            stage.addRect 70, colors.white, 'valE'
            stage.addRect 70, colors.white, 'valA'
            stage.addRect 20, colors.blue
            stage.addRect 30, colors.white, 'dstE'
            stage.addRect 30, colors.white, 'dstM'
            stage.addRect 60, colors.blue
            return stage

        # Generate the writeback stage.
        writebackStage = (y) ->
            stage = new K.Group
                x: 20
                y: y
            stage.stageName = 'W'

            stage.addNameRect 30
            stage.addRect 30, colors.white, 'stat'
            stage.addRect 35, colors.white, 'icode'
            stage.addRect 85, colors.blue
            stage.addRect 70, colors.white, 'valE'
            stage.addRect 70, colors.white, 'valM'
            stage.addRect 20, colors.blue
            stage.addRect 30, colors.white, 'dstE'
            stage.addRect 30, colors.white, 'dstM'
            stage.addRect 60, colors.blue
            #stage.addRect 40, colors.white, 'pc'
            return stage

        registerRects = []
        registerNames = ['%eax', '%ecx', '%edx', '%ebx', '%esp', '%ebp', '%esi', '%edi']
        registerTexts = []

        ccNames = ['ZF', 'SF', 'OF']
        ccTexts = []

        # Render the register the group
        registerGroup = (y) ->
            group = new K.Group
                x: 20
                y: y

            width = 70
            registerRects = []
            registerTexts = []
            for i in [0..7]
                rect = basicRect.clone
                    x: (i % 4) * width
                    y: Math.floor(i / 4) * rect_height
                    fill: colors.white
                    width: width
                text = new K.Text
                    fill: colors.black
                    fontFamily: font_family
                    fontSize: 10
                    align: 'center'
                    x: rect.getX()
                    width: width
                registerRects.push(rect)
                registerTexts.push(text)
                group.add(rect)
                group.add(text)
            width = 50
            ccTexts = []
            for i in [0..2]
                rect = basicRect.clone
                    x: i * width + 310
                    y: 10
                    fill: colors.white
                    width: width
                text = new K.Text
                    fill: colors.black
                    fontFamily: font_family
                    align: 'center'
                    fontSize: 11
                    x: rect.getX()
                    y: rect.getY()
                    width: width
                ccTexts.push(text)
                group.add(rect)
                group.add(text)
            return group

        # Render the whole container.
        render: ->
            scale = $(window).width() / 800.0
            mainStage = new K.Stage
                container: @container
                width: $(window).width() * 0.65
                height: 1000
                scale: scale

            infoLayer = new K.Layer()
            infoLayer.add new K.Text
                id: 'info'
                fontSize: 15
                fill: colors.blue
                padding: 10
                fontFamily: font_family
                shadowColor: colors.black
                shadowBlur: -1
                shadowOffset: 1
            mainStage.add(infoLayer)
            @renderMain()

        renderMain: ->
            if mainLayer? then mainLayer.remove()
            infoLayer.hide()
            labels = {}
            mainLayer = new K.Layer()
            mainLayer.add fetchStage(270)
            mainLayer.add decodeStage(210)
            mainLayer.add executeStage(150)
            mainLayer.add memoryStage(90)
            mainLayer.add writebackStage(30)
            mainLayer.add registerGroup(330)
            mainStage.add(mainLayer)
            @show()

        basePath = 'images/'

        # Generate a tooltip of value
        genTooltip: (x, y, height, width, id, len)->
            rect = new K.Rect
                id: id
                x: x
                y: y
                height: height
                width: width
                len: len
            that = @
            rect.on('mouseover', ->
                len = @getAttr('len')
                text = that.cycle.variables[@getId()]
                if len is -1
                    text = that.strToStat(text)
                else if len isnt 0
                    text = Utils.num2hex(text, len)
                text = @getId() + ' = ' + text
                infoLayer.get('#info')[0].setText(text)
                infoLayer.draw()
            )
            rect.on('mouseout', ->
                infoLayer.get('#info')[0].setText('')
                infoLayer.draw()
            )
            mainLayer.add(rect)

        # Generate a rectangle
        genRect: (x, y, width, prefix, name) ->
            text = new K.Text
                id: prefix + name
                name: name
                x: x
                y: y
                oldY: y
                width: width
                fontSize: 26
                fill: colors.black
                fontFamily: font_family
                align: 'center'
                text: name
            text.setY(text.getAttr('oldY') + (58 - text.getHeight()) / 2 + 1)
            mainLayer.add(text)

        # Generate a line
        genLine: (points, width, name, from) ->
            line = new K.Line
                name: name
                from: from
                points: points
                stroke: colors.red
                strokeWidth: width
            mainLayer.add(line)

        # Add tooltips to f
        f_addTooltip: ->
            @genTooltip(75, 210, 45, 85, 'f_stat', -1)
            @genTooltip(5, 350, 75, 110, 'instr_valid', 0)
            @genTooltip(635, 285, 75, 110, 'need_valC', 0)
            @genTooltip(635, 390, 75, 110, 'need_regids', 0)
            @genTooltip(185, 525, 45, 85, 'f_icode', 1)
            @genTooltip(275, 525, 45, 85, 'f_ifun', 1)
            @genTooltip(300, 890, 165, 135, 'f_pc', 8)
            @genTooltip(1015, 185, 115, 135, 'f_predPC', 8)
            @genTooltip(1169, 0, 22, 92, 'M_icode', 1)
            @genTooltip(1201, 47, 22, 75, 'M_Cnd', 0)
            @genTooltip(1237, 92, 22, 81, 'M_valA', 8)
            @genTooltip(1271, 139, 22, 95, 'W_icode', 1)
            @genTooltip(1304, 184, 22, 88, 'W_valM', 8)
            @genTooltip(62, 773, 22, 127, 'imem_error', 0)

        # Add rectangles to f
        f_addRects: ->
            @genRect(96, 101, 85, 'D_', 'stat')
            @genRect(183, 101, 85, 'D_', 'icode')
            @genRect(272, 101, 85, 'D_', 'ifun')
            @genRect(361, 101, 85, 'D_', 'rA')
            @genRect(450, 101, 85, 'D_', 'rB')
            @genRect(539, 101, 175, 'D_', 'valC')
            @genRect(806, 101, 175, 'D_', 'valP')
            @genRect(278, 1111, 175, 'F_', 'predPC')

        # Add lines to f
        f_addLines: ->
            @genLine([1245, 125, 1245, 977, 455, 977], 6, 'M_valA', 'f_pc_from')
            @genLine([1312, 215, 1312, 1029, 455, 1029], 6, 'W_valM', 'f_pc_from')
            @genLine([366, 1107, 366, 1075], 6, 'F_predPC', 'f_pc_from')

            @genLine([588, 595, 588, 239, 990, 239], 6, 'f_valC', 'f_predPC_from')
            @genLine([893, 308, 893, 282, 990, 282], 6, 'f_valP', 'f_predPC_from')

        # Render the f stage
        f_render: ->
            if mainLayer? then mainLayer.remove()
            infoLayer.show()
            image = new Image()
            that = @
            image.onload = ->
                scale = 800 / image.width * 0.62
                mainLayer = new K.Layer
                    y: 10
                    scale: scale

                img = new K.Image
                    width: image.width
                    height: image.height
                    image: image
                mainLayer.add(img)

                that.f_addLines()
                that.f_addRects()
                that.f_addTooltip()
                mainStage.add(mainLayer)
                that.show()
            image.src = basePath + 'F-D.png'

        # Add lines to d
        d_addLines: ->
            @genLine([1463, 73, 1463, 469, 777, 469, 777, 433], 6, 'e_valE', 'd_valA_from')
            @genLine([1463, 73, 1463, 469, 984, 469, 984, 433], 6, 'e_valE', 'd_valB_from')
            @genLine([1511, 150, 1511, 517, 747, 517, 747, 433], 6, 'M_valE', 'd_valA_from')
            @genLine([1511, 150, 1511, 517, 954, 517, 954, 433], 6, 'M_valE', 'd_valB_from')
            @genLine([1561, 227, 1561, 566, 717, 566, 717, 433], 6, 'm_valM', 'd_valA_from')
            @genLine([1561, 227, 1561, 566, 924, 566, 924, 433], 6, 'm_valM', 'd_valB_from')
            @genLine([1608, 314, 1608, 615, 687, 615, 687, 433], 6, 'W_valM', 'd_valA_from')
            @genLine([1608, 314, 1608, 615, 894, 615, 894, 433], 6, 'W_valM', 'd_valB_from')
            @genLine([1655, 398, 1655, 663, 657, 663, 657, 433], 6, 'W_valE', 'd_valA_from')
            @genLine([1655, 398, 1655, 663, 864, 663, 864, 433], 6, 'W_valE', 'd_valB_from')
            @genLine([736, 770, 736, 749, 627, 749, 627, 433], 6, 'd_rvalA', 'd_valA_from')
            @genLine([900, 770, 900, 750, 834, 750, 834, 433], 6, 'd_rvalB', 'd_valB_from')
            @genLine([785, 1293, 785, 1145, 605, 1145, 605, 433], 6, 'D_valP', 'd_valA_from')

            @genLine([474, 1293, 474, 1274, 1049, 1274, 1049, 1188], 3, 'D_rB', 'd_dstE_from')
            @genLine([474, 1293, 474, 1274, 1316, 1274, 1316, 1188], 3, 'D_rB', 'd_srcB_from')
            @genLine([394, 1293, 394, 1241, 1138, 1241, 1138, 1188], 3, 'D_rA', 'd_dstM_from')
            @genLine([394, 1293, 394, 1241, 1228, 1241, 1228, 1188], 3, 'D_rA', 'd_srcA_from')

        # Add rectangles to d
        d_addRects: ->
            @genRect(93, 224, 85, 'E_', 'stat')
            @genRect(179, 224, 85, 'E_', 'icode')
            @genRect(264, 224, 85, 'E_', 'ifun')
            @genRect(440, 224, 175, 'E_', 'valC')
            @genRect(614, 224, 175, 'E_', 'valA')
            @genRect(832, 224, 175, 'E_', 'valB')
            @genRect(1008, 224, 85, 'E_', 'dstE')
            @genRect(1095, 224, 85, 'E_', 'dstM')
            @genRect(1183, 224, 85, 'E_', 'srcA')
            @genRect(1271, 224, 85, 'E_', 'srcB')

            @genRect(92, 1297, 85, 'D_', 'stat')
            @genRect(177, 1297, 85, 'D_', 'icode')
            @genRect(265, 1297, 85, 'D_', 'ifun')
            @genRect(352, 1297, 85, 'D_', 'rA')
            @genRect(439, 1297, 85, 'D_', 'rB')
            @genRect(525, 1297, 175, 'D_', 'valC')
            @genRect(700, 1297, 175, 'D_', 'valP')

        # Add tooltips to d
        d_addTooltips: ->
            @genTooltip(595, 320, 90, 200, 'd_valA', 8)
            @genTooltip(825, 320, 90, 185, 'd_valB', 8)
            @genTooltip(1005, 1130, 40, 85, 'd_dstE', 1)
            @genTooltip(1095, 1130, 40, 85, 'd_dstM', 1)
            @genTooltip(1185, 1130, 40, 85, 'd_srcA', 1)
            @genTooltip(1275, 1130, 40, 85, 'd_srcB', 1)

            @genTooltip(1446, 0, 21, 75, 'e_dstE', 1)
            @genTooltip(1466, 43, 21, 73, 'e_valE', 8)
            @genTooltip(1486, 88, 21, 81, 'M_dstE', 1)
            @genTooltip(1514, 124, 21, 80, 'M_valE', 8)
            @genTooltip(1538, 165, 21, 84, 'M_dstM', 1)
            @genTooltip(1562, 202, 21, 83, 'm_valM', 8)
            @genTooltip(1583, 242, 21, 88, 'W_dstM', 1)
            @genTooltip(1607, 287, 21, 86, 'W_valM', 8)
            @genTooltip(1630, 329, 21, 84, 'W_dstE', 1)
            @genTooltip(1656, 369, 21, 84, 'W_valE', 8)

            @genTooltip(697, 721, 21, 82, 'd_rvalA', 8)
            @genTooltip(856, 721, 21, 82, 'd_rvalB', 8)

        # Render the d stage
        d_render: ->
            if mainLayer? then mainLayer.remove()
            infoLayer.show()
            image = new Image()
            that = @
            image.onload = ->
                scale = 800 / image.width * 0.62
                mainLayer = new K.Layer
                    y: 10
                    scale: scale
                img = new K.Image
                    width: image.width
                    height: image.height
                    image: image
                mainLayer.add(img)

                that.d_addLines()
                that.d_addRects()
                that.d_addTooltips()

                mainStage.add(mainLayer)
                that.show()
            image.src = basePath + 'D-E.png'

        # Add lines to e stage
        e_addLines: ->
            @genLine([549, 696, 549, 480], 6, 'E_valC', 'aluA_from')
            @genLine([671, 696, 671, 661, 580, 661, 580, 480], 6, 'E_valA', 'aluA_from')

        # Add rectangles to e stage
        e_addRects: ->
            @genRect(95, 4, 85, 'M_', 'stat')
            @genRect(184, 4, 85, 'M_', 'icode')
            @genRect(449, 4, 85, 'M_', 'Cnd')
            @genRect(539, 4, 175, 'M_', 'valE')
            @genRect(718, 4, 175, 'M_', 'valA')
            @genRect(986, 4, 85, 'M_', 'dstE')
            @genRect(1076, 4, 85, 'M_', 'dstM')

            @genRect(95, 700, 85, 'E_', 'stat')
            @genRect(183, 700, 85, 'E_', 'icode')
            @genRect(271, 700, 85, 'E_', 'ifun')
            @genRect(405, 700, 175, 'E_', 'valC')
            @genRect(584, 700, 175, 'E_', 'valA')
            @genRect(763, 700, 175, 'E_', 'valB')
            @genRect(986, 700, 85, 'E_', 'dstE')
            @genRect(1075, 700, 85, 'E_', 'dstM')
            @genRect(1165, 700, 85, 'E_', 'srcA')
            @genRect(1254, 700, 85, 'E_', 'srcB')

        # Add tooltips to e stage
        e_addTooltips: ->
            @genTooltip(337, 383, 75, 100, 'set_cc', 0)
            @genTooltip(498, 383, 75, 105, 'aluA', 8)
            @genTooltip(646, 383, 75, 105, 'aluB', 8)
            @genTooltip(834, 257, 75, 115, 'alufun', 1)
            @genTooltip(989, 157, 60, 85, 'e_dstE', 8)

            @genTooltip(1390, 91, 21, 75, 'e_valE', 8)
            @genTooltip(1390, 121, 21, 77, 'e_dstE', 1)
            @genTooltip(495, 148, 21, 72, 'e_Cnd', 0)
            @genTooltip(4, 392, 21, 78, 'W_stat', 0)
            @genTooltip(8, 428, 21, 74, 'm_stat', 0)

        # Render the e stage
        e_render: ->
            if mainLayer? then mainLayer.remove()
            infoLayer.show()
            image = new Image()
            that = @
            image.onload = ->
                scale = 800 / image.width * 0.62
                mainLayer = new K.Layer
                    y: 50
                    scale: scale
                img = new K.Image
                    width: image.width
                    height: image.height
                    image: image
                mainLayer.add(img)

                that.e_addLines()
                that.e_addRects()
                that.e_addTooltips()

                mainStage.add(mainLayer)
                that.show()
            image.src = basePath + 'E-M.png'

        # Add lines to m stage
        m_addLines: ->
            @genLine([685, 704, 685, 679, 773, 679, 773, 633], 6, 'M_valE', 'mem_addr_from')
            @genLine([863, 704, 863, 650, 818, 650, 818, 633], 6, 'M_valA', 'mem_addr_from')

        # Add rectangles to m stage
        m_addRectangles: ->
            @genRect(150, 222, 80, 'W_', 'stat')
            @genRect(235, 222, 90, 'W_', 'icode')
            @genRect(596, 222, 175, 'W_', 'valE')
            @genRect(774, 222, 175, 'W_', 'valM')
            @genRect(1041, 222, 85, 'W_', 'dstE')
            @genRect(1130, 222, 85, 'W_', 'dstM')

            @genRect(150, 708, 80, 'M_', 'stat')
            @genRect(235, 708, 90, 'M_', 'icode')
            @genRect(419, 708, 85, 'M_', 'Cnd')
            @genRect(596, 708, 175, 'M_', 'valE')
            @genRect(774, 708, 175, 'M_', 'valA')
            @genRect(1041, 708, 85, 'M_', 'dstE')
            @genRect(1130, 708, 85, 'M_', 'dstM')

        # Add tooltips to m stage
        m_addTooltips: ->
            @genTooltip(752, 556, 60, 85, 'mem_addr', 8)
            @genTooltip(508, 376, 75, 115, 'mem_read', 0)
            @genTooltip(508, 473, 75, 115, 'mem_write', 0)
            @genTooltip(147, 324, 60, 85, 'm_stat', 0)
            @genTooltip(408, 316, 21, 136, 'dmem_error', 0)
            @genTooltip(1413, 351, 21, 85, 'm_valM', 8)

        # Render the m stage
        m_render: ->
            if mainLayer? then  mainLayer.remove()
            infoLayer.show()
            image = new Image()
            that = @
            image.onload = ->
                scale = 800 / image.width * 0.62
                mainLayer = new K.Layer
                    y: 50
                    scale: scale
                img = new K.Image
                    width: image.width
                    height: image.height
                    image: image
                mainLayer.add(img)

                that.m_addLines()
                that.m_addRectangles()
                that.m_addTooltips()

                mainStage.add(mainLayer)
                that.show()
            image.src = basePath + 'M-W.png'

        # Change the string into state
        strToStat: (str) ->
            switch str
                when 0 then 'BUB'
                when 1 then 'AOK'
                when 2 then 'HLT'
                when 3 then 'ADR'
                when 4 then 'INS'
                when 5 then 'PIP'
                else 'STAT'

        # Show all the infomation.
        show: (cycle) ->
            if cycle? then @cycle = cycle
            variables = @cycle.variables
            reg = @cycle.reg
            cc = @cycle.cc
            that = @

            deal = (text, name, value) ->
                if name is 'stat'
                    str = that.strToStat(value)
                    text.setText(str)
                    if str in ['AOK', 'STAT']
                        text.setFill(colors.black)
                    else if str is 'BUB'
                        text.setFill(colors.blue)
                    else
                        text.setFill(colors.red)
                else
                    if not value?
                        text.setText(name)
                    else
                        text.setText(name + '\n' + Utils.num2hex(value, Utils.lengthFromName(name)))

            if mainLayer.get("Image").length isnt 0
                # Not in main stage
                texts = mainLayer.get('Text')
                texts.each (text) ->
                    name = text.getName()
                    value = variables[text.getId()]
                    deal(text, name, value)
                    text.setY(text.getAttr('oldY') + (58 - text.getHeight()) / 2 + 1)
                lines = mainLayer.get('Line')
                lines.each (line) ->
                    name = line.getName()
                    value = variables[line.getAttr('from')]
                    if value is name
                        line.show()
                    else
                        line.hide()
            else
                for own key, label of labels
                    name = label.labelName
                    value = variables[key]
                    deal(label, name, value)
                    label.setY((rect_height - label.getHeight()) / 2 + 1)

                # Show reigister
                if registerTexts.length > 0
                    for i in [0..7]
                        label = registerTexts[i]
                        label.setText(registerNames[i] + '\n' + Utils.num2hex(reg[i], 8))
                        label.setFill(colors.black)
                        rect = registerRects[i]
                        rect.setFill(colors.white)
                        label.setY(rect.getY() + (rect_height - label.getHeight()) / 2 + 1)
                    renderDstBG = (dst) ->
                        if dst? and dst isnt 0xf
                            registerRects[dst].setFill(colors.blue)
                            #registerTexts[dst].setFill(colors.white)
                    renderDstBG(variables.W_dstE)
                    renderDstBG(variables.W_dstM)

                # Show condition codes
                if ccTexts.length > 0
                    for i in [0..2]
                        ccTexts[i].setText(ccNames[i] + ': ' + (cc[i] | 0))
                        ccTexts[i].setY(10 + (rect_height - ccTexts[i].getHeight()) / 2 + 1)
            mainLayer.draw()
