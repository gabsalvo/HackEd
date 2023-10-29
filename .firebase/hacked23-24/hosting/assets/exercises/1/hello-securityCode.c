#include <stdio.h>

int calculateTotal(int values[], int size) {
    int total = 0;
    for(int i = 0; i < size; i++) {
        total += values[i];
    }
    return total;
}

int main() {
    int data[5] = {10, 20, 30, 40, 50};
    int result = calculateTotal(data, 10);
    printf("Total: %d\n", result);
    return 0;
}
