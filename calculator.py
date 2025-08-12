import art

def add(n1, n2):
    return n1 + n2

def subtract(n1, n2):
    return n1 - n2

def multiply(n1, n2):
    return n1 * n2

def divide(n1, n2):
    return n1 / n2

operations = {
    "+" : add,
    "-" : subtract,
    "*" : multiply,
    "/" : divide
}

def calculator():
    print(art.logo)
    should_accumulate = True
    num1 = float(input("What is the first number?:"))

    while should_accumulate:
        for symbol in operations:
            print(symbol)
        operation_symbol = input("Pick an Operation: ")
        num2 = float(input("What is the next number?:"))
        answer = operations[operation_symbol](num1, num2)
        print(f"{num1} {operation_symbol} {num2} = {answer}")

        choice = input(f"Type 'y' to continue calculating with {answer}, or Type 'n' to start a new calculation:").lower()

        if choice == "y":
            num1 = answer
        else:
            should_accumulate = False
            print("\n" * 100)
            calculator()


calculator()
