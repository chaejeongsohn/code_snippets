from logic import *

rain = Symbol("rain")
hagrid = Symbol("hagrid")
dumbledore = Symbol("dumbledore")

sentence = And(rain, hagrid)
print(sentence.formula())

knowledge = And(
    Implication(Not(rain), hagrid),
    Or(hagrid, dumbledore),
    Not(And(hagrid, dumbledore)),
    dumbledore
)

# knowledge: 내가 알고 있는 정보, 나에게 주어진 정보
# query: 확실히 알고 싶은 정보
# 내가 아는 knowledge를 바탕으로, rain인지를 확실히 알고 있는지 묻고 싶다.
print(model_check(knowledge, rain))
# True라면, 해당 knowledge가 모두 참인 세상에서, query가 확실한 정보임이 확인되었다.