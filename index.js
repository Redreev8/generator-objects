class GeneratorObjects {
    index = -1
    phones = []
    uidValue = []

    _length = 0
    _template = {}
    constructor({ length, template }) {
        this.length = length ?? 1
        this.template = template
        return this.data
    }

    changeData = () => {
        if (!this.template) return
        if (this.length === 1) return this.data = this.generage()
        this.data = []
        for (let i = 0; i < this.length; i++) this.data.push(this.generage())
    }

    get length() {
        return this._length
    }

    set length(n) {
        this._length = typeof n === 'number' ? n : this.func.integer(...n)

        this.changeData()
    }
    get template() {
        return this._template
    }

    set template(t) {
        this._template = t

        this.changeData()
    }

    func = {
        uid: () => Date.now().toString(36) + Math.random().toString(36).substr(2),
        index: () => this.index,
        bool: () => Math.round(Math.random()) < 0.5 ? false : true,
        floating: (max, min, rounding = 2) => ((Math.random() * (+max - +min)) + +min).toFixed(rounding),
        integer: (max, min) => Math.floor(this.func.floating(max, min)),
        word: (length) => {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            return result;
        },
        loremParagraf: (length) => {
            const loremIpsumWords = [
                'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero', 'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut', 'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia', 'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis', 'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros', 'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa', 'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus', 'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus', 'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam', 'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in', 'hac', 'habitasse', 'platea', 'dictumst', 'aenean', 'neque', 'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis', 'tortor', 'scelerisque', 'nulla', 'interdum', 'tellus', 'malesuada', 'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam', 'suspendisse', 'potenti', 'vivamus', 'luctus', 'fringilla', 'erat', 'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante', 'primis', 'faucibus', 'ultrices', 'posuere', 'cubilia', 'curae', 'etiam', 'cursus', 'aliquam', 'quam', 'dapibus', 'nisl', 'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu', 'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra', 'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae', 'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu', 'morbi', 'pellentesque', 'metus', 'commodo', 'ut', 'facilisis', 'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis', 'sollicitudin', 'integer', 'rutrum', 'duis', 'est', 'etiam', 'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi', 'fermentum', 'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus', 'netus', 'fames', 'quisque', 'euismod', 'curabitur', 'lectus', 'elementum', 'tempor', 'risus', 'cras'
            ]
            let paragraf = ''
            for (let i = 0; i < length; i++) {
                paragraf += loremIpsumWords[this.func.integer(loremIpsumWords.length, 0)]
                if (i + 1 != length) paragraf += ' '
            }
            return paragraf + '.\n'
        },
        lorem: (paragrafNumber, length = 15) => {
            const [min, max] = typeof length === 'number' ? [length, length] : length
            let string = ''
            for (let i = 0; i < paragrafNumber; i++) string += this.func.loremParagraf(this.func.integer(max, min))
            return string
        },
        phone: () => {
            let phone = ''
            for (let i = 0; i < 10; i++) phone += this.func.integer(0, 9)
            if (this.phones.includes(phone)) return this.func.phone()
            this.phones.push(phone)
            return phone
        },
    }

    generage = () => {
        const obj = {}
        for (const key in this.template) {
            this.index++
            const el = this.template[key]
            obj[key] = el

            if (typeof el !== 'function' && typeof el !== 'string') continue
            
            if (typeof el === 'function') {      
                obj[key] = el(obj, this.func, this.uid)
                continue
            }
            const funcName = el.match(/(?<=\{{2}).+?(?=\(.*\)\}{2})/g)
            
            if (!funcName || !this.func[funcName[0]]) continue 
            const arg = el.match(/(?<=\().*?(?=\))/g)[0].split(',')

            obj[key] = el.replace(/(\{{2}).+?(\}{2})/g, this.func[funcName[0]](...arg))
        }
        this.index = -1
        return obj
    }
}
