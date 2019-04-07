const operations = {
  '%': (previousNumber, inputValue) => (previousNumber / 100 ) * inputValue,
  '^': (previousNumber, inputValue) => Math.pow(previousNumber, inputValue),
  '÷': (previousNumber, inputValue) => previousNumber / inputValue,
  '*': (previousNumber, inputValue) => previousNumber * inputValue,
  '+': (previousNumber, inputValue) => previousNumber + inputValue,
  '-': (previousNumber, inputValue) => previousNumber - inputValue,
  '=': (previousNumber, inputValue) => inputValue
}

export default operations