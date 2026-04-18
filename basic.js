function fibonacci(n) {
    // Step 2 & 3: Array named 'sequence' initialized with [0, 1]
    const sequence = [0, 1];
    
    // Handle base cases for n = 0 and n = 1
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // Dynamic Programming: Build the sequence up to n
    for (let i = 2; i <= n; i++) {
        // Each new number is sum of previous two
        const nextNum = sequence[i-2] + sequence[i-1];
        sequence.push(nextNum);
    }
    
    // Return the n-th Fibonacci number
    return sequence[n];
}
