requirejs.config
    baseUrl: 'javascripts/lib',
    paths:
        app: '../app'
        jquery: 'jquery-1.9.0.min',
        kinetic: 'kinetic-v4.5.2.min'
        FileSaver: 'FileSaver.min'
    shim:
        kinetic:
            exports: 'Kinetic'
        FileSaver:
            exports: 'saveAs'

