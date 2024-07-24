import FunctionGenerator from "./function-generator"

class GeneratorObjects extends FunctionGenerator {
    _length = 0
    _template = {}
    constructor({ length, template }) {
        super()
        this.length = length ?? 1
        this.template = template
        return typeof length === 'object' && length[0] === 1 ? [this.data] : this.data
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
        this._length = typeof n === 'number' ? n : this.functionGenerator.integer(...n)

        this.changeData()
    }
    get template() {
        return this._template
    }

    set template(t) {
        this._template = t

        this.changeData()
    }

    generageArray = (arr) => {
        const res = []
        const length = arr.length
        for (let i = 1; i < arr[0] + 1; i++) {
            res.push(this.construct(arr[i] ?? arr[this.functionGenerator.integer(1, length)]))
        }
        return res
    }

    construct = (value) => {
        if (typeof value !== 'function' && typeof value !== 'string' &&  typeof value !== 'object') return value
        if (typeof value === 'function') return value(value, this.functionGenerator, this.template)
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                return this.generageArray(value)
            } 
            if (value.length) return new GeneratorObjects(value)
            return new GeneratorObjects({
                template: value
            })
        }
        const funcName = value.match(/(?<=\{{2}).+?(?=\(.*\)\}{2})/g)
        if (!funcName || !this.functionGenerator[funcName[0]]) return value
        const arg = value.match(/(?<=\().*?(?=\))/g)[0].split(',')
        const generateValue = this.functionGenerator[funcName[0]](...arg)
        return  typeof generateValue === 'string' ? value.replace(/(\{{2}).+?(\}{2})/g, generateValue) : generateValue
    }

    generage = (template = this.template) => {
        const obj = {}
        for (const key in template) {
            this.index++
            const el = template[key]
            obj[key] = this.construct(el)
        }
        this.index = -1
        return obj
    }
}

export default GeneratorObjects
