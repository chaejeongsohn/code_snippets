from logic import *
# 기사는 항상 진실만 말함, 건달은 항상 거짓만 말함

AKnight = Symbol("A is a Knight")
AKnave = Symbol("A is a Knave")

BKnight = Symbol("B is a Knight")
BKnave = Symbol("B is a Knave")

CKnight = Symbol("C is a Knight")
CKnave = Symbol("C is a Knave")

# Puzzle 0
# A says "I am both a knight and a knave."
knowledge0 = And(
    # 둘 중 하나여야만한다
    And(Or(AKnight, AKnave), Not(And(AKnight, AKnave))),
    # 기사라서 참인 경우
    Implication(AKnight, And(AKnight, AKnave)),
    # 건달이라 거짓인 경우
    Implication(AKnave, Not(And(AKnight, AKnave)))

)

# Puzzle 1
# A says "We are both knaves."
# B says nothing.
knowledge1 = And(
    # A와 B둘다 하나의 역할만 가진다
    And(Or(AKnight, AKnave), Not(And(AKnight, AKnave))),
    And(Or(BKnight, BKnave), Not(And(BKnight, BKnave))),
    # A가 기사라서 참인경우
    Implication(AKnight, And(AKnave, BKnave)),
    # A가 건달이라 거짓인 경우
    Implication(AKnave, Not(And(AKnave, BKnave)))
)

# Puzzle 2
# A says "We are the same kind."
# B says "We are of different kinds."
knowledge2 = And(
    # A와 B둘다 하나의 역할만 가진다
    And(Or(AKnight, AKnave), Not(And(AKnight, AKnave))),
    And(Or(BKnight, BKnave), Not(And(BKnight, BKnave))),
    # A가 기사라서 참인경우
    Implication(AKnight, And(AKnight, BKnight)),
    # A가 건달이라 거짓인 경우
    Implication(AKnave, Not(And(AKnave, BKnave))),
    # B가 기사라서 참인경우
    Implication(BKnight, Not(AKnight)),
    # B가 건달이라 거짓인 경우
    Implication(BKnave, AKnave)

)

# Puzzle 3
# A says either "I am a knight." or "I am a knave.", but you don't know which.
# B says "A said 'I am a knave'."
# B says "C is a knave."
# C says "A is a knight."
# A가 ?이고, "I am a knight." 라고 말한 경우
A_say_knight = And(Implication(AKnight, AKnight), Implication(AKnave, Not(AKnight)))
# A가 ?이고, I am a knave."라고 말한 경우 
A_say_knave = And(Implication(AKnight, AKnave), Implication(AKnave, Not(AKnave)))
knowledge3 = And(
    # A, B, C 다 하나의 역할만 가진다
    And(Or(AKnight, AKnave), Not(And(AKnight, AKnave))),
    And(Or(BKnight, BKnave), Not(And(BKnight, BKnave))),
    And(Or(CKnight, CKnave), Not(And(CKnight, CKnave))),
    # A가 무슨 말을 했는지 모른다.
    Or(A_say_knight, A_say_knave),
    # B says "A said 'I am a knave'" and "C is a knave."
    Implication(BKnight, And(A_say_knave, CKnave)),
    Implication(BKnave, And(Not(A_say_knave), Not(CKnave))),
    # C가 기사라서 참인경우
    Implication(CKnight, AKnight),
    # C가 건달이라 거짓인 경우
    Implication(CKnave, Not(AKnight))
   
)



def main():
    symbols = [AKnight, AKnave, BKnight, BKnave, CKnight, CKnave]
    puzzles = [
        ("Puzzle 0", knowledge0),
        ("Puzzle 1", knowledge1),
        ("Puzzle 2", knowledge2),
        ("Puzzle 3", knowledge3)
    ]
    for puzzle, knowledge in puzzles:
        print(puzzle)
        if len(knowledge.conjuncts) == 0:
            print("    Not yet implemented.")
        else:
            for symbol in symbols:
                if model_check(knowledge, symbol):
                    print(f"    {symbol}")


if __name__ == "__main__":
    main()
