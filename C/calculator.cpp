#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Stack 구현하기
typedef struct Node
{
    char data[100];
    struct Node *next;
    
}Node;

typedef struct Stack
{
    Node *top;
}Stack;

