public class FibonacciCalculator {
    
    public static int fibonacci(int n) {
        // Step 2 & 3: Array named 'sequence' initialized with [0, 1]
        int[] sequence = new int[n + 1];
        
        // Initialize base cases
        if (n >= 0) sequence[0] = 0;
        if (n >= 1) sequence[1] = 1;
        
        // Dynamic Programming: fill the array
        for (int i = 2; i <= n; i++) {
            sequence[i] = sequence[i-2] + sequence[i-1];
        }
        
        // Return the n-th Fibonacci number
        return sequence[n];
    }
}
