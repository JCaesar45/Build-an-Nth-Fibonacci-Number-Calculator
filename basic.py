def fibonacci(n):
    # Step 2 & 3: Array (list) named 'sequence' initialized with [0, 1]
    sequence = [0, 1]
    
    # Handle base cases
    if n == 0:
        return 0
    if n == 1:
        return 1
    
    # Dynamic Programming approach
    for i in range(2, n + 1):
        next_num = sequence[i-2] + sequence[i-1]
        sequence.append(next_num)
    
    # Return the n-th Fibonacci number
    return sequence[n]
