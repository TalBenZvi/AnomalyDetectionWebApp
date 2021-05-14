const LINE_BREAK = '\n'
const VALUE_SEPARATOR = ','

function TimeSeries(dataString) {
    this.data = []
    lines = dataString.split(LINE_BREAK)
    numAttributes = lines[0].split(VALUE_SEPARATOR).length
    for (let i = 0; i < numAttributes; ++i) {
        this.data[i] = []
    }
    for (let i = 0; i < lines.length - 1; ++i) {
        values = lines[i].split(VALUE_SEPARATOR)
        for (let j = 0; j < values.length; ++j) {
            this.data[j][i] = parseFloat(values[j])
        }
    }
}

module.exports.TimeSeries = TimeSeries