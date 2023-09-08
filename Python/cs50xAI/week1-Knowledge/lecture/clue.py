import termcolor

from logic import *

mustard = Symbol("ColMustard")
plum = Symbol("ProfPlum")
scarlet = Symbol("MsScarlet")
characters = [mustard, plum, scarlet]

ballroom = Symbol("ballroom")
kitchen = Symbol("kitchen")
library = Symbol("library")
rooms = [ballroom, kitchen, library]

knife = Symbol("knife")
revolver = Symbol("revolver")
wrench = Symbol("wrench")
weapons = [knife, revolver, wrench]

symbols = characters + rooms + weapons


def check_knowledge(knowledge):
    for symbol in symbols:
        if model_check(knowledge, symbol):
            termcolor.cprint(f"{symbol}: YES", "green")
        elif not model_check(knowledge, Not(symbol)):
            print(f"{symbol}: MAYBE")


# There must be a person, room, and weapon.
# knowledge: 내가 알고 있는 정보, 나에게 주어진 정보
# 이 인물들중에 하나일것이며, 이 장소들 중에 하나일 것이며, 이 무기중 하나일 것이다
knowledge = And(
    Or(mustard, plum, scarlet),
    Or(ballroom, kitchen, library),
    Or(knife, revolver, wrench)
)

print(knowledge.formula())
# knowledge.formula() 결과
# (ColMustard ∨  ProfPlum ∨  MsScarlet) ∧ 
#   (ballroom ∨  kitchen ∨  library) ∧ 
#   (knife ∨  revolver ∨  wrench)

# Initial cards
# clue 규칙 ) 내가 가진 카드는 이것 == 해당 심볼들은 범인이 아니다
knowledge.add(And(
    Not(mustard), Not(kitchen), Not(revolver)
))

# Unknown card
# clue 규칙 ) 다른 사람의 추리를 보고 뭐가 범인인지 추리한다 == 이중에서 하나는 거짓이다.(정답이 아니다)
knowledge.add(Or(
    Not(scarlet), Not(library), Not(wrench)
))

# Known cards
# clue 규칙 ) 다른 사람이 들고 있는 카드가 뭔지 알았다(해당 카드는 정답이 아니다)고 가정
knowledge.add(Not(plum))
knowledge.add(Not(ballroom))

check_knowledge(knowledge)
